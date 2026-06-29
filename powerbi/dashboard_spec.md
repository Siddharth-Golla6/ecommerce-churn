# Phase 7 — Power BI Dashboard Specification

> Build target: **6 dashboards** in one Power BI report. Data source: `ecommerce_churn.csv`
> (or the model-scored `customer_churn_scores.csv` joined on `CustomerID`).
> All DAX measures live in a single **`_Measures`** table.

---

## 🎨 Design System
- **Theme:** Clean executive; white canvas, single accent (teal `#1F9E8E`), churn = red `#E45756`, retain = green `#54A24B`.
- **Layout:** KPI cards top row, charts mid, table/detail bottom. Consistent slicers in a left rail.
- **Global slicers (sync across pages):** `CityTier`, `Gender`, `MaritalStatus`, `PreferedOrderCat`, `Tenure band`, `Risk band`.

---

## 📐 Core DAX Measures

```DAX
Total Customers   = DISTINCTCOUNT( ecommerce_churn[CustomerID] )

Churned Customers = CALCULATE( [Total Customers], ecommerce_churn[Churn] = 1 )

Churn Rate %      = DIVIDE( [Churned Customers], [Total Customers] )

Retention Rate %  = 1 - [Churn Rate %]

Complaint Rate %  =
    DIVIDE(
        CALCULATE( [Total Customers], ecommerce_churn[Complain] = 1 ),
        [Total Customers] )

Repeat Purchase Rate % =
    DIVIDE(
        CALCULATE( [Total Customers], ecommerce_churn[OrderCount] > 1 ),
        [Total Customers] )

Avg Satisfaction  = AVERAGE( ecommerce_churn[SatisfactionScore] )

-- Spend / AOV proxy (no monetary value in dataset)
Avg Cashback (AOV proxy) = AVERAGE( ecommerce_churn[CashbackAmount] )

-- CLV proxy = AOV proxy x order frequency x expected lifespan(from tenure)
CLV Proxy =
    AVERAGEX(
        ecommerce_churn,
        ecommerce_churn[CashbackAmount]
          * ecommerce_churn[OrderCount]
          * ( 1 + ecommerce_churn[Tenure] / 12 ) )

-- Value score for VIP segmentation
Value Score =
    SUMX( ecommerce_churn,
          ecommerce_churn[OrderCount] * ecommerce_churn[CashbackAmount]
          * ( 1 + ecommerce_churn[Tenure] / 12 ) )

-- At-risk high-value count (uses model score table)
At-Risk High Value =
    CALCULATE(
        [Total Customers],
        scores[risk_band] = "High",
        ecommerce_churn[OrderCount] > 2 )
```

**Calculated columns**
```DAX
Tenure Band =
    SWITCH( TRUE(),
        ecommerce_churn[Tenure] <= 3,  "0-3 mo (new)",
        ecommerce_churn[Tenure] <= 12, "4-12 mo",
        ecommerce_churn[Tenure] <= 24, "13-24 mo",
        "24+ mo (loyal)" )

Value Segment =
    SWITCH( TRUE(),
        [row value score] >= PERCENTILE...(top 10%), "VIP",
        ... "High", "Mid", "Low" )   -- compute via NTILE in Power Query

Recency Flag =
    IF( ecommerce_churn[DaySinceLastOrder] > 30, "Dormant", "Active" )
```

---

## 🖥️ Dashboard 1 — Executive Summary
**Purpose:** One-glance health for the CEO.
| Visual | Field(s) |
|---|---|
| KPI cards (6) | Total Customers, Churn Rate %, Retention Rate %, Complaint Rate %, Repeat Purchase Rate %, Avg Satisfaction |
| Donut | Churn vs Retained |
| Line | Churn Rate % by Tenure Band |
| Bar | Churn Rate % by PreferedOrderCat |
| Card + arrow | Churn Rate vs 11% target (conditional formatting) |

## 🖥️ Dashboard 2 — Customer Segmentation
**Purpose:** Where value and risk concentrate.
| Visual | Field(s) |
|---|---|
| Matrix | Value Segment (rows) × Risk Band (cols), measure = customer count |
| Scatter | X = Value Score, Y = Churn Probability, size = OrderCount, color = Segment |
| Stacked bar | Segment by CityTier |
| Table | Top VIP customers (Value Score desc) |

## 🖥️ Dashboard 3 — Churn Analysis
**Purpose:** Root causes of attrition.
| Visual | Field(s) |
|---|---|
| Bar | Churn Rate % by Complain (0/1) |
| Line | Churn Rate % by Tenure (months) |
| Bar | Churn Rate % by SatisfactionScore |
| Bar | Churn Rate % by DaySinceLastOrder band |
| Decomposition tree | Churn Rate % → category → complaint → tenure band |
| Key influencers | "What influences Churn = 1" (built-in AI visual) |

## 🖥️ Dashboard 4 — Customer Satisfaction
**Purpose:** Service quality & complaint health (Support Manager).
| Visual | Field(s) |
|---|---|
| Gauge | Avg Satisfaction (target 4.0) |
| Bar | Complaint Rate % by category / city tier |
| Clustered column | Satisfaction distribution split by Churn |
| Card | % complainers who churned (service-failure cohort) |

## 🖥️ Dashboard 5 — Retention Opportunities
**Purpose:** The action list (Marketing Manager).
| Visual | Field(s) |
|---|---|
| Card | At-Risk High Value count |
| Table | Top at-risk high-value customers (CustomerID, prob, value, category) — exportable |
| Bar | Potential revenue saved by segment |
| Funnel | Targetable → contacted → retained (placeholder for campaign tracking) |
| Slicers | Risk Band, Recency Flag, Value Segment |

## 🖥️ Dashboard 6 — KPI Dashboard
**Purpose:** The 6 official KPIs with targets & trends.
| KPI | Visual | Target |
|---|---|---|
| Churn Rate % | KPI card + trend | ≤ 11% |
| Retention Rate % | KPI card | ≥ 89% |
| CLV Proxy | card | +15% |
| Repeat Purchase Rate % | card | +10% |
| Avg Cashback (AOV proxy) | card | +8% |
| Complaint Rate % | KPI card | ≤ 18% |

> Use **conditional formatting** (green/amber/red) on every KPI card against its target. Add a "Target line" to trend charts via a constant-line analytics element.

---

## 🔄 Power Query (data prep) notes
1. Trim/standardize categorical values (`Phone → Mobile Phone`, `CC → Credit Card`, `COD → Cash on Delivery`, `Mobile → Mobile Phone`).
2. Replace nulls in numeric columns with median (Transform → Replace, or Group-median).
3. Add `Value Score`, `Tenure Band`, `Value Segment` (NTILE), `Recency Flag`.
4. (Optional) Merge `customer_churn_scores.csv` on `CustomerID` for model probability & risk band.
