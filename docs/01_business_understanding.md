# Phase 1 — Business Understanding

## 1.1 Business Problem

Our e-commerce platform is experiencing **customer churn of ~16.8%** (947 of 5,630 active customers in the analysis window have churned). Acquiring a new customer costs **5–7× more** than retaining an existing one, yet the business currently has **no systematic way to identify which customers are about to leave or why**. Retention efforts are reactive, untargeted, and applied uniformly — wasting marketing spend on loyal customers while failing to intervene with genuinely at-risk ones.

**Problem statement:**
> *"The business lacks visibility into the root causes of customer attrition and a mechanism to proactively identify at-risk customers, resulting in avoidable revenue loss, inefficient retention spend, and declining customer lifetime value."*

## 1.2 Why Churn Impacts Revenue

| Mechanism | Financial Impact |
|---|---|
| **Lost recurring revenue** | Each churned customer removes their future order stream from the revenue base. |
| **High replacement cost** | Replacing churned customers via paid acquisition (CAC) is 5–7× the cost of retention. |
| **Compounding CLV loss** | Churn truncates Customer Lifetime Value — the longer a customer stays, the more they spend (order value typically rises with tenure). |
| **Negative word-of-mouth** | Customers who churn after complaints often leave negative reviews, raising future CAC. |
| **Margin erosion** | Heavy discounting to win back churned customers compresses margin vs. retaining at full price. |

**Illustrative math (this dataset):** If average annual revenue per retained customer ≈ **$1,500** and we have ~947 churned customers, the **annual revenue at risk ≈ $1.42M**. Reducing churn from 16.8% → 11% retains ~327 additional customers ≈ **$490K+ recovered revenue per year** (before win-back and CLV compounding effects — see [Phase 10](10_business_impact.md)).

## 1.3 Project Objectives

| # | Objective | Type |
|---|---|---|
| O1 | Identify the **root-cause drivers** of churn using statistical + ML analysis. | Analytical |
| O2 | Build a **predictive early-warning model** that scores every customer's churn probability. | Predictive |
| O3 | Segment customers by **value and risk** to prioritize retention investment. | Strategic |
| O4 | Recommend **data-backed retention strategies** with quantified ROI. | Advisory |
| O5 | Deliver **self-serve dashboards** so business teams can monitor churn KPIs continuously. | Operational |
| O6 | Reduce overall churn rate from **16.8% to ≤ 11%** within 4 quarters. | Outcome |

## 1.4 Key Performance Indicators (KPIs)

| KPI | Definition / Formula | Baseline | Target | Owner |
|---|---|---|---|---|
| **Customer Churn Rate** | `Churned Customers ÷ Total Customers` | 16.8% | ≤ 11% | CEO / Marketing |
| **Customer Retention Rate** | `1 − Churn Rate` | 83.2% | ≥ 89% | Marketing |
| **Customer Lifetime Value (CLV)** | `AOV × Purchase Frequency × Avg. Customer Lifespan` | Baseline | +15% | Sales |
| **Repeat Purchase Rate** | `Customers with >1 order ÷ Total Customers` | Baseline | +10% | Marketing |
| **Average Order Value (AOV)** | `Total Revenue ÷ Total Orders` (proxy via OrderCount & cashback) | Baseline | +8% | Sales |
| **Complaint Rate** | `Customers with Complaint = 1 ÷ Total Customers` | ~28% | ≤ 18% | Support |

> **KPI cadence:** Churn Rate, Retention Rate, Complaint Rate reviewed **weekly**; CLV, AOV, Repeat Purchase Rate reviewed **monthly**; full model performance reviewed **quarterly**.

### KPI Tree (how they connect)
```
                         Revenue / Profit
                               │
              ┌────────────────┼────────────────┐
        Retention Rate     CLV (per cust.)   New Revenue
              │                 │
   ┌──────────┴──────┐    ┌─────┴─────┐
 Churn Rate    Repeat Rate  AOV   Lifespan
   │
 Complaint Rate, Satisfaction, Tenure, Days-Since-Last-Order
```

## 1.5 Scope

**In scope:** Existing customer base analysis, churn driver identification, predictive scoring, retention strategy design, KPI dashboards.
**Out of scope:** New-customer acquisition strategy, pricing engine redesign, supply-chain/logistics overhaul (referenced only where it drives churn, e.g., warehouse distance).

## 1.6 Success Definition
The project is successful when (a) a validated churn model (ROC-AUC ≥ 0.90) is in production scoring customers, (b) at least 3 retention plays are launched against model-identified segments, and (c) measured churn declines toward the 11% target within 4 quarters with positive ROI.
