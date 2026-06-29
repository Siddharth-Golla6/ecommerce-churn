# Executive Summary — Customer Churn Reduction Initiative

## The Situation
Our e-commerce business loses **~16.8% of customers every year** (≈947 of 5,630). Because retaining a customer costs **5–7× less** than acquiring one, this attrition silently drains an estimated **$1.4M in annual revenue at risk**. Today, retention is *reactive*: we only learn a customer is unhappy when they complain, and only learn they've left after they're gone.

## What We Did
A full Business Analysis engagement across 12 phases: business framing, stakeholder alignment, requirements, process redesign, deep EDA, SQL analysis, BI dashboards, and a 4-model predictive churn engine with explainability (SHAP).

## What We Found (root causes)
1. **Tenure is the #1 driver** — new customers churn dramatically more; the **first 90 days decide loyalty**.
2. **Complaints ≈ double churn** — and complaint handling is slow/uneven (≈28% complaint rate).
3. **Recency predicts churn** — rising days-since-last-order is an early-warning signal.
4. **Cashback retains** — higher cashback correlates with lower churn.
5. **Mobile-category & single-order customers** are riskiest; **Grocery & high-tenure** are stickiest.

## What We Built
- A **churn prediction model** (XGBoost/LightGBM) reaching **ROC-AUC ≈ 0.97**, scoring every customer with a risk band.
- **6 executive dashboards** (Exec Summary, Segmentation, Churn, Satisfaction, Retention, KPIs).
- A **prioritized retention playbook** mapped to root causes and owners.

## What We Recommend (P1 — do first)
| Play | Targets | Expected effect |
|---|---|---|
| **Complaint-resolution overhaul** | Complain=1 & low satisfaction | Cut the largest *actionable* churn lever |
| **90-day onboarding program** | New/low-tenure customers | Fix the #1 structural driver |
| **Early-warning system** | All customers, daily scoring | Intervene *before* churn |
| **Personalized discounts** | High-value, high-risk only | Save revenue without wasting margin |

## The Business Case
| | Direct | Incl. CLV uplift |
|---|---|---|
| Churn | **16.8% → ≤11%** (−5.8 pts) | |
| Customers retained / yr | **≈ 328** | |
| Revenue protected / yr | **≈ $492K** | |
| Net benefit / yr | ≈ $50K | **≈ $513K** |
| **ROI** | **≈ 28%** | **≈ 285%** |
| Payback | 9–10 months | faster |

## The Ask
Approve the **$180K/yr** retention program and a 4-quarter rollout. Target: **churn ≤11%, retention ≥89%, complaint rate ≤18%** with quantified, monitored ROI.

> **Bottom line:** We now know *who* will churn, *why*, and *what to do about it.* The remaining step is to act.
