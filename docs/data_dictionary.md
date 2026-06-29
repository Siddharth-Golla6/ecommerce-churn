# Data Dictionary — E-Commerce Churn Dataset

**Source:** Kaggle — *E Commerce Customer Churn Analysis and Prediction* (sheet `E Comm`).
**Grain:** one row per customer · **Rows:** 5,630 · **Target:** `Churn`.

| # | Column | Type | Description | Example / Values | Notes |
|---|---|---|---|---|---|
| 1 | **CustomerID** | Integer | Unique customer identifier | 50001 | Primary key; dropped before modeling |
| 2 | **Churn** | Binary (0/1) | **Target** — 1 = customer churned, 0 = retained | 0 / 1 | ~16.8% positive |
| 3 | **Tenure** | Numeric | Months as a customer | 0–60+ | Has nulls; **strongest driver** |
| 4 | **PreferredLoginDevice** | Categorical | Device used to log in | Mobile Phone, Phone, Computer | "Phone"≈"Mobile Phone" (standardize) |
| 5 | **CityTier** | Ordinal (1–3) | City tier (1=metro … 3=smaller) | 1, 2, 3 | |
| 6 | **WarehouseToHome** | Numeric | Distance warehouse→home (km) | 5–127 | Has nulls; right-skewed; winsorize |
| 7 | **PreferredPaymentMode** | Categorical | Preferred payment method | Debit Card, Credit Card, UPI, E wallet, COD, CC | "CC"≈Credit Card, "COD"≈Cash on Delivery |
| 8 | **Gender** | Categorical | Customer gender | Male, Female | |
| 9 | **HourSpendOnApp** | Numeric | Hours spent on app/website | 0–5 | Has nulls |
| 10 | **NumberOfDeviceRegistered** | Numeric | Devices registered | 1–6 | Engagement proxy |
| 11 | **PreferedOrderCat** | Categorical | Preferred order category *(sic spelling)* | Laptop & Accessory, Mobile Phone, Mobile, Fashion, Grocery, Others | "Mobile"≈"Mobile Phone"; Grocery=stickiest |
| 12 | **SatisfactionScore** | Ordinal (1–5) | Self-reported satisfaction | 1–5 | Use with Complain/recency |
| 13 | **MaritalStatus** | Categorical | Marital status | Single, Married, Divorced | |
| 14 | **NumberOfAddress** | Numeric | Saved addresses | 1–22 | |
| 15 | **Complain** | Binary (0/1) | Raised a complaint last month | 0 / 1 | ~28% = 1; complainers churn ~2× |
| 16 | **OrderAmountHikeFromlastYear** | Numeric | % increase in order amount YoY | 11–26 | Has nulls |
| 17 | **CouponUsed** | Numeric | Coupons used last month | 0–16 | Has nulls; weak driver alone |
| 18 | **OrderCount** | Numeric | Orders placed last month | 1–16 | Has nulls; engagement signal |
| 19 | **DaySinceLastOrder** | Numeric | Days since last order (recency) | 0–46 | Has nulls; >30 = dormant (BRule-05) |
| 20 | **CashbackAmount** | Numeric | Avg. cashback received | 0–325 | Spend/AOV proxy; higher→lower churn |

## Derived / Engineered Fields
| Field | Definition |
|---|---|
| `churn_probability` | Model output 0–1 (FR-02) |
| `risk_band` | Low <0.3, Medium 0.3–0.6, High ≥0.6 (FR-03) |
| `value_score` | OrderCount × CashbackAmount × (1 + Tenure/12) |
| `value_segment` | NTILE of value_score → VIP / High / Mid / Low |
| `tenure_band` | 0–3 / 4–12 / 13–24 / 24+ months |
| `recency_flag` | Dormant if DaySinceLastOrder > 30 else Active |

## Data Quality Notes
- 7 numeric columns have ~5% missing values → median imputation.
- Categorical inconsistencies must be standardized (see Notes column).
- No monetary order value or order date → CLV/AOV use proxies; "monthly" analysis uses tenure cohorts.
