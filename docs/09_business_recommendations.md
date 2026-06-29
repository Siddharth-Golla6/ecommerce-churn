# Phase 9 — Business Recommendations

Each recommendation is tied to an **EDA-validated root cause**, mapped to an **owner**, and sized by **impact / effort**. Prioritization uses an Impact × Effort lens.

## 9.1 Recommendation Portfolio

| # | Recommendation | Root Cause (from EDA) | Owner | Impact | Effort | Priority |
|---|---|---|---|---|---|---|
| R1 | **Complaint resolution overhaul** (SLA, service recovery for Complain=1 & Sat≤2) | Complainers churn ~2× | Support | High | Med | **P1** |
| R2 | **90-day onboarding program** for new/low-tenure customers | Tenure = #1 driver; early churn spike | Marketing/CX | High | Med | **P1** |
| R3 | **Early-warning system** (deploy model, daily scoring, auto-flagging) | Churn detected only after the fact | Data/BI | High | Med | **P1** |
| R4 | **Personalized discounts** to high-value at-risk (vs blanket coupons) | Untargeted promos; coupons weak alone | Marketing | High | Low | **P1** |
| R5 | **Loyalty / structured cashback program** | Higher cashback → lower churn | Marketing/Sales | Med | Med | P2 |
| R6 | **Win-back campaigns** for dormant (>30 days) & recently churned | Recency predicts churn | Marketing | Med | Low | P2 |
| R7 | **VIP customer program** (protect top-decile value) | Value concentrated in VIPs | Sales | Med | Low | P2 |
| R8 | **Value/risk-based customer segmentation** embedded in CRM | One-size-fits-all targeting | Marketing/Data | Med | Med | P2 |
| R9 | **Fulfillment improvements** for long warehouse-distance clusters | Distance → delivery friction → churn | Operations | Med | High | P3 |
| R10 | **Category stickiness plays** (grow Grocery basket attachment) | Grocery = stickiest; Mobile = churniest | Sales/Marketing | Med | Med | P3 |

## 9.2 Detailed Plays

### R1 — Complaint Resolution Overhaul (P1)
- **Trigger (BRule-04):** `Complain = 1 AND SatisfactionScore ≤ 2` → auto-route to service-recovery queue within 24h.
- **Actions:** Dedicated recovery agents, apology + goodwill credit, root-cause logging, post-resolution satisfaction re-check.
- **KPI moved:** Complaint Rate ≤18%, churn among complainers ↓.

### R2 — 90-Day Onboarding (P1)
- **Trigger:** `Tenure ≤ 3 months`.
- **Actions:** Welcome series, first-purchase incentive, education on app features, "second order" nudge (the 1→3 order habit zone), proactive check-in.
- **KPI moved:** Retention Rate ↑, Repeat Purchase Rate ↑.

### R3 — Early-Warning System (P1)
- **Mechanism:** Daily batch scoring (XGBoost/LightGBM), risk banding, auto-flag `prob ≥ 0.60` and dormant `>30 days`.
- **Output:** At-risk list pushed to Marketing/Support dashboards (Dashboard 5).
- **KPI moved:** Enables every other play; raises intervention timeliness.

### R4 — Personalized Discounts (P1)
- **Target:** High-value AND high-risk only (margin-protected, BRule-06).
- **Actions:** Offer relevant to `PreferedOrderCat`; A/B test discount depth; suppress offers to low-risk loyalists (stop wasting margin).
- **KPI moved:** Churn Rate ↓, marketing efficiency ↑.

### R5 — Loyalty / Cashback Program (P2)
- Structured tiered cashback that rewards continued purchase; strongest for mid-value customers where cashback↔retention link is clear.

### R6 — Win-Back Campaigns (P2)
- Dormant nudge at 30 days; reactivation offer; "we miss you" for recently churned within a margin-safe ceiling.

### R7 — VIP Program (P2)
- Top-decile value customers (BRule-03): dedicated support line, early access, surprise-and-delight; **defensive** retention of the revenue core.

### R8 — Segmentation in CRM (P2)
- Persist Value Segment + Risk Band as CRM attributes so every team acts on the same definitions.

### R9 — Fulfillment Improvements (P3)
- For high-distance, high-value clusters: regional warehousing, delivery-time SLAs, proactive delay comms.

### R10 — Category Stickiness (P3)
- Cross-sell Grocery (stickiest) to Mobile-category buyers (churniest) to build habitual repeat behavior.

## 9.3 Prioritization Map (Impact × Effort)
```
        HIGH IMPACT
            │  R1  R2  R3  R4   <- DO FIRST (P1)
            │  R5  R7  R6  R8   <- NEXT (P2)
            │  R9  R10          <- LATER (P3)
        LOW │________________________
            LOW EFFORT      HIGH EFFORT
```

## 9.4 Quick-Win vs Strategic
- **Quick wins (≤1 quarter):** R3 scoring, R4 targeted discounts, R6 win-back, R7 VIP perks.
- **Strategic (multi-quarter):** R1 process redesign, R2 onboarding program, R9 fulfillment.
