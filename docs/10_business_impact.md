# Phase 10 — Business Impact & ROI

> All figures are **modeled estimates** for a base of **5,630 customers** using transparent assumptions. Replace assumption values with Finance-validated numbers to finalize. The model is intentionally conservative.

## 10.1 Assumptions (editable inputs)

| Input | Value | Source |
|---|---|---|
| Total active customers | 5,630 | Dataset |
| Baseline churn rate | 16.8% (≈947 churn/yr) | Dataset |
| Target churn rate | 11.0% | Project objective O6 |
| Avg. annual revenue per customer | $1,500 | Finance proxy (CashbackAmount-scaled) |
| Gross margin | 30% | Finance |
| Customer Acquisition Cost (CAC) | $250 | Finance |
| Retention program annual cost | $180,000 | Budget (tooling + campaigns + 1 FTE) |
| Retention play effectiveness | 35% of targeted at-risk saved | Conservative industry benchmark |

## 10.2 Churn Reduction

| Metric | Baseline | Target | Δ |
|---|---|---|---|
| Churn rate | 16.8% | 11.0% | **−5.8 pts** |
| Annual churned customers | 947 | 619 | **−328 customers** |
| **Customers retained (vs baseline)** | — | — | **≈ 328 / yr** |

## 10.3 Revenue Saved

```
Revenue saved        = customers retained × avg annual revenue
                     = 328 × $1,500
                     ≈ $492,000  (gross revenue retained / yr)

Margin saved         = $492,000 × 30%  ≈ $147,600
CAC avoided          = 328 × $250      ≈ $82,000
(replacement acquisition cost avoided)
```

## 10.4 CLV Uplift
Reducing churn extends the average customer lifespan. With churn 16.8% → 11.0%, average lifespan ≈ `1 / churn`:
```
Baseline lifespan ≈ 1 / 0.168 ≈ 5.95 years
Target  lifespan  ≈ 1 / 0.110 ≈ 9.09 years   → +53% lifespan

CLV (proxy) = annual margin × lifespan
Baseline CLV ≈ $450 × 5.95 ≈ $2,678
Target   CLV ≈ $450 × 9.09 ≈ $4,091           → +$1,413 (+53%) per retained customer
```
*(annual margin = $1,500 × 30% = $450)*

## 10.5 Retention & Repeat Purchase
| KPI | Baseline | Projected | Δ |
|---|---|---|---|
| Retention Rate | 83.2% | **89.0%** | +5.8 pts |
| Repeat Purchase Rate | baseline | **+10%** | onboarding 1→3 order nudge |
| AOV (proxy) | baseline | **+8%** | personalized offers to retained base |

## 10.6 ROI Calculation

```
Annual gross benefit  = Margin saved + CAC avoided
                      = $147,600 + $82,000
                      = $229,600   (year 1, direct)

Including CLV compounding (multi-year value of the 328 retained
customers over their extended lifespan), the lifetime benefit of a
single year's retained cohort is materially larger:

  Lifetime margin of 328 retained × incremental lifespan value
  ≈ 328 × $1,413 (CLV uplift) ≈ $463,000  (cohort lifetime uplift)

Program cost          = $180,000 / yr

ROI (year 1, direct)  = (229,600 − 180,000) / 180,000 ≈ 28%
ROI (with CLV uplift) = (229,600 + 463,000 − 180,000) / 180,000 ≈ 285%
Payback period        ≈ 9–10 months (direct), faster with CLV
```

### Headline (conservative → strategic range)
| View | Net Benefit / yr | ROI |
|---|---|---|
| Direct (margin + CAC avoided) | **≈ $50K** | **≈ 28%** |
| Including CLV compounding | **≈ $513K** | **≈ 285%** |
| Multi-year run-rate (3 cohorts) | **$1.2M+** | — |

## 10.7 Sensitivity (effectiveness of plays)
| Play effectiveness | Customers saved | Direct benefit | Direct ROI |
|---|---|---|---|
| 20% | ~187 | ~$131K | (−27%) below break-even |
| **35% (base)** | **~328** | **~$230K** | **~28%** |
| 50% | ~469 | ~$328K | ~82% |

> Break-even occurs at roughly **27% effectiveness** — well within reach given complaint-driven and tenure-driven churn are highly addressable.

## 10.8 Non-Financial Benefits
- Reduced negative word-of-mouth (lower future CAC).
- Higher CSAT / brand equity from faster complaint resolution.
- Organizational capability: a reusable predictive + dashboard platform.
- Better marketing-spend allocation (stop discounting loyal customers).
