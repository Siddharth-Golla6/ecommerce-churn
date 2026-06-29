# Wireframes — Churn Analytics Dashboards

> Low-fidelity ASCII wireframes for the 6 Power BI pages (Phase 7). Use these as the build blueprint; visual styling in [dashboard_spec.md](../powerbi/dashboard_spec.md).

## WF-1 — Executive Summary
```
┌───────────────────────────────────────────────────────────────┐
│  CHURN REDUCTION — EXECUTIVE SUMMARY          [date] [refresh]  │
├──────────┬──────────┬──────────┬──────────┬──────────┬─────────┤
│ Customers│ Churn %  │ Retention│ Complaint│ Repeat % │ CSAT    │
│  5,630   │  16.8% ▲ │  83.2%   │  28% ▲   │   xx%    │  x.x/5  │
├──────────┴────┬─────┴──────────┴────┬─────┴──────────┴─────────┤
│  Churn vs     │  Churn % by Tenure  │  Churn % by Category     │
│  Retained     │  (line, downward)   │  (bar, Mobile highest)   │
│   (donut)     │                     │                          │
├───────────────┴─────────────────────┴──────────────────────────┤
│  [ Slicers: CityTier | Gender | Category | Tenure band ]        │
└───────────────────────────────────────────────────────────────┘
```

## WF-2 — Customer Segmentation
```
┌───────────────────────────────────────────────────────────────┐
│  CUSTOMER SEGMENTATION                                          │
├───────────────────────────┬───────────────────────────────────┤
│  Matrix: Value × Risk      │  Scatter: Value vs Churn Prob      │
│        Low  Med  High      │   (bubble size = OrderCount,       │
│  VIP   ..   ..   ..        │    color = segment)                │
│  High  ..   ..   ..        │                                    │
│  Mid   ..   ..   ..        │                                    │
│  Low   ..   ..   ..        │                                    │
├───────────────────────────┴───────────────────────────────────┤
│  Top VIP customers (table: ID | Value | Orders | Tenure)       │
└───────────────────────────────────────────────────────────────┘
```

## WF-3 — Churn Analysis
```
┌───────────────────────────────────────────────────────────────┐
│  CHURN ANALYSIS — ROOT CAUSES                                  │
├──────────────┬───────────────┬────────────────────────────────┤
│ Churn by     │ Churn by      │ Key Influencers (AI visual):   │
│ Complaint    │ Satisfaction  │ "What drives Churn = 1?"       │
│ (bar)        │ (bar)         │  -> Tenure low, Complain=1...  │
├──────────────┴───────────────┴────────────────────────────────┤
│ Decomposition tree: Churn% -> Category -> Complaint -> Tenure  │
└───────────────────────────────────────────────────────────────┘
```

## WF-4 — Customer Satisfaction
```
┌───────────────────────────────────────────────────────────────┐
│  CUSTOMER SATISFACTION & SERVICE                               │
├──────────────┬────────────────────────────────────────────────┤
│  Gauge       │  Complaint Rate % by Category (bar)             │
│  Avg CSAT    │                                                 │
│  (target 4)  │  Satisfaction distribution split by Churn       │
├──────────────┴────────────────────────────────────────────────┤
│  Card: % of complainers who churned                            │
└───────────────────────────────────────────────────────────────┘
```

## WF-5 — Retention Opportunities (action page)
```
┌───────────────────────────────────────────────────────────────┐
│  RETENTION OPPORTUNITIES            [Export at-risk list ⭳]     │
├──────────────┬────────────────────────────────────────────────┤
│ At-Risk      │  TOP AT-RISK HIGH-VALUE CUSTOMERS               │
│ High-Value   │  ID | Prob | Value | Category | Recency         │
│   = 123      │  ...                                            │
│              │  ...                                            │
├──────────────┴────────────────────────────────────────────────┤
│  Potential revenue saved by segment (bar)                      │
│  [ Slicers: Risk band | Recency | Value segment ]              │
└───────────────────────────────────────────────────────────────┘
```

## WF-6 — KPI Dashboard
```
┌───────────────────────────────────────────────────────────────┐
│  KPI SCORECARD (vs targets)                                    │
├───────────┬───────────┬───────────┬───────────┬───────────────┤
│ Churn %   │ Retention │ CLV proxy │ Repeat %  │ AOV proxy     │
│ 16.8→≤11  │ 83.2→≥89  │ +15% tgt  │ +10% tgt  │ +8% tgt       │
│  🔴       │  🟠       │  🟢       │  🟢       │  🟢           │
├───────────┴───────────┴───────────┴───────────┴───────────────┤
│  Trend lines with target reference line per KPI                │
└───────────────────────────────────────────────────────────────┘
```
