# Phase 5 — Exploratory Data Analysis (Findings)

> The full, reproducible analysis is in [`notebooks/churn_analysis.py`](../notebooks/churn_analysis.py). This document summarizes the **business findings**. Figures are based on the standard "E Commerce" churn dataset (5,630 records, 20 attributes, target `Churn`). Re-run the notebook to refresh exact numbers.

## 5.0 Dataset Overview
- **Rows:** 5,630 customers · **Columns:** 20 · **Target:** `Churn` (1 = churned, 0 = retained)
- **Overall churn rate:** ~**16.8%** (≈947 churned)
- **Grain:** one row per customer (snapshot)

## 5.1 Missing Value Analysis
Seven numeric columns contain missing values (~5% each):

| Column | Approx. Missing | Treatment |
|---|---|---|
| Tenure | ~264 (4.7%) | Median impute by segment |
| WarehouseToHome | ~251 | Median impute |
| HourSpendOnApp | ~255 | Median impute |
| OrderAmountHikeFromlastYear | ~265 | Median impute |
| CouponUsed | ~256 | Median (or 0) impute |
| OrderCount | ~258 | Median impute |
| DaySinceLastOrder | ~307 | Median impute |

**Finding:** Missingness is moderate and roughly random; median imputation (segment-aware for Tenure) preserves distribution without dropping ~25% of rows.

## 5.2 Duplicate Analysis
- **Exact duplicate rows:** 0 (CustomerID is unique).
- **Duplicate CustomerIDs:** 0.
- **Action:** None required; CustomerID dropped before modeling (identifier, not a feature).

## 5.3 Outlier Detection (IQR / boxplots)
| Feature | Observation |
|---|---|
| WarehouseToHome | Right-skewed; a few values >100 km — capped/winsorized. |
| Tenure | Long tail of very high-tenure loyalists — retained, meaningful. |
| CashbackAmount | Right tail of high-cashback customers — meaningful (high value). |
| NumberOfAddress | A handful of high counts — retained. |
**Action:** Winsorize extreme WarehouseToHome; keep behaviorally meaningful tails. Tree models (RF/XGB/LGBM) are robust to remaining outliers.

## 5.4 Correlation Analysis (key churn relationships)
| Driver | Direction vs. Churn | Strength |
|---|---|---|
| **Tenure** | ↓ (higher tenure → much lower churn) | **Strongest** |
| **Complain** | ↑ (complainers churn more) | Strong |
| **SatisfactionScore** | mixed/↑ at low scores | Moderate |
| **CashbackAmount** | ↓ (more cashback → lower churn) | Moderate |
| **DaySinceLastOrder** | ↑ (longer gap → more churn) | Moderate |
| **NumberOfAddress** | ↑ slight | Weak |
| **WarehouseToHome** | ↑ slight (farther → more churn) | Weak |
**Finding:** No severe multicollinearity among predictors; CouponUsed & OrderCount mildly correlated. Tenure dominates.

## 5.5 Customer Segmentation
Segmented by **value** (OrderCount × CashbackAmount × Tenure) and **risk** (model probability):

| Segment | Share | Churn Rate | Strategy |
|---|---|---|---|
| **VIP (top decile value)** | 10% | Low | Protect — VIP program |
| **High-value at-risk** | ~8% | High | Priority win-back |
| **Mid-value** | ~50% | Medium | Personalized offers |
| **Low-value / new** | ~32% | **Highest** | Onboarding + nurture |
**Finding:** Churn concentrates in **new, low-tenure** customers; the highest *ROI* target is **high-value at-risk**.

## 5.6 Category (PreferedOrderCat) Analysis
| Preferred Category | Relative Churn |
|---|---|
| **Mobile Phone / Mobile** | **Highest churn** |
| Laptop & Accessory | Moderate |
| Fashion | Moderate |
| Grocery | **Lowest churn (stickiest)** |
| Others | Mixed |
**Finding:** Mobile-category shoppers churn most (price-sensitive, comparison-driven); **Grocery** buyers are the most loyal (habitual, repeat). → Grow grocery basket attachment to increase stickiness.

## 5.7 Order Frequency Analysis
- Most customers have **OrderCount 1–3**; churn is highest at the **low end**.
- Higher OrderCount → lower churn (engagement effect).
**Finding:** Driving a customer from 1 → 3 orders materially reduces churn risk (the "habit formation" zone).

## 5.8 Complaint Analysis
- ~**28%** of customers have `Complain = 1`.
- **Churn rate among complainers is roughly 2× that of non-complainers.**
**Finding:** Complaints are one of the strongest *actionable* churn levers. Service recovery is high-leverage (see BRule-04).

## 5.9 Coupon Analysis
- Most customers use **0–2 coupons**.
- Light coupon usage alone is a **weak** churn predictor; heavy reliance can signal price sensitivity.
**Finding:** Coupons are not the core retention lever — **personalized**, segment-aware offers beat blanket couponing.

## 5.10 Cashback Analysis
- Higher **CashbackAmount** associates with **lower churn**.
**Finding:** Cashback acts like a soft loyalty mechanism — strengthening/structuring cashback for at-risk mid-value customers is promising.

## 5.11 Warehouse Distance Analysis
- **WarehouseToHome** is right-skewed; farther customers churn slightly more (delivery friction).
**Finding:** Operations lever — prioritize fulfillment improvements / regional warehousing for high-distance, high-value clusters.

## 5.12 Tenure Analysis ⭐
- **Tenure is the single strongest churn driver.**
- Churn is **dramatically higher in the first few months**; drops sharply after ~12 months.
**Finding:** The **first 90 days** are decisive → invest in structured onboarding for new customers.

## 5.13 Satisfaction Analysis
- `SatisfactionScore` 1–5. Counter-intuitively, churn is **not strictly monotonic** — some mid/high scorers still churn, but **low scores + complaint** is a strong combined signal.
**Finding:** Use satisfaction **in combination** with complaints and recency, not alone.

## 5.14 Days-Since-Last-Order Analysis
- Lower `DaySinceLastOrder` → lower churn (recent buyers are engaged).
- Customers with large gaps are drifting toward churn.
**Finding:** **Recency** is a leading indicator → trigger dormancy nudges at >30 days (BRule-05).

---

## 5.15 EDA Executive Takeaways (the "why" behind churn)
1. **New customers churn most** — onboarding is the #1 structural fix (Tenure).
2. **Complaints ≈ 2× churn** — fast, consistent service recovery is high-leverage.
3. **Recency matters** — rising days-since-last-order predicts churn; nudge early.
4. **Cashback retains** — structured cashback reduces churn for mid-value customers.
5. **Mobile-category & low-order-count customers** are the riskiest behavioral cohorts.
6. **Grocery & high-tenure customers** are stickiest — grow basket attachment and protect VIPs.
