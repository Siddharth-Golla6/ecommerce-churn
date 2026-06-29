# Phase 2 — Stakeholder Analysis

## 2.1 Stakeholder Register

| ID | Stakeholder | Role in Project | Internal/External |
|---|---|---|---|
| S1 | **CEO** | Executive sponsor; owns revenue & growth targets | Internal |
| S2 | **Marketing Manager** | Owns retention campaigns, loyalty, win-back | Internal |
| S3 | **Sales Manager** | Owns revenue, AOV, CLV, upsell/cross-sell | Internal |
| S4 | **Customer Support Manager** | Owns complaint resolution & service recovery | Internal |
| S5 | **Operations Manager** | Owns fulfillment, warehouse, delivery experience | Internal |
| S6 | **Customers** | End beneficiaries; source of behavioral data | External |
| S7 | Data / BI Team *(supporting)* | Builds model, pipelines, dashboards | Internal |

## 2.2 Stakeholder Matrix (Power / Interest Grid)

```
   HIGH │  KEEP SATISFIED            │  MANAGE CLOSELY
        │                           │  ● CEO (S1)
 P      │  ● Operations Mgr (S5)    │  ● Marketing Mgr (S2)
 O      │                           │  ● Sales Mgr (S3)
 W      │───────────────────────────┼───────────────────────────
 E      │  MONITOR                  │  KEEP INFORMED
 R      │  ● Customers (S6)*        │  ● Support Mgr (S4)
        │                           │  ● Data/BI Team (S7)
   LOW  │                           │
        └───────────────────────────┴───────────────────────────
            LOW            INTEREST              HIGH
```
\* *Customers have low formal power but high strategic importance — their behavior is the project's North Star, so they are actively researched (surveys, behavioral data) even though not "managed."*

### Engagement Strategy by Quadrant
| Quadrant | Stakeholders | Strategy |
|---|---|---|
| Manage Closely | CEO, Marketing, Sales | Steering committee, bi-weekly readouts, sign-off on recommendations |
| Keep Satisfied | Operations | Consulted on fulfillment-driven churn (warehouse distance, delivery) |
| Keep Informed | Support, Data/BI | Working-group cadence, dashboard access, model feedback loop |
| Monitor | Customers | Voice-of-customer via satisfaction scores, complaint data, surveys |

## 2.3 RACI Matrix

| Activity | CEO | Mktg | Sales | Support | Ops | Data/BI |
|---|---|---|---|---|---|---|
| Approve business case | **A** | C | C | I | I | I |
| Define churn KPIs | C | **R** | C | C | I | A |
| Build churn model | I | C | I | I | I | **R/A** |
| Design retention plays | C | **R/A** | C | C | C | I |
| Complaint process redesign | I | C | I | **R/A** | C | I |
| Dashboard delivery | I | C | C | C | I | **R/A** |
| Measure business impact | **A** | R | R | C | C | C |

*R = Responsible, A = Accountable, C = Consulted, I = Informed.*

## 2.4 Stakeholder Needs · Pain Points · Success Criteria

### S1 — CEO
- **Needs:** A clear, quantified line of sight from churn → revenue → ROI.
- **Pain Points:** Revenue leakage with no explanation; uncertain where to invest retention budget.
- **Success Criteria:** Churn ↓ to ≤11%; positive, documented ROI; predictable revenue.

### S2 — Marketing Manager
- **Needs:** A prioritized list of at-risk, high-value customers to target; campaign ROI measurement.
- **Pain Points:** Spray-and-pray campaigns; wasted spend on customers who would have stayed; no early-warning signal.
- **Success Criteria:** Targeted win-back/loyalty campaigns with measurable uplift; lower cost-per-retained-customer.

### S3 — Sales Manager
- **Needs:** Higher CLV, AOV, and repeat-purchase rates; understanding of which categories retain.
- **Pain Points:** Falling repeat purchases; unclear which segments are worth upselling.
- **Success Criteria:** CLV +15%, AOV +8%, repeat-purchase rate +10%.

### S4 — Customer Support Manager
- **Needs:** Visibility into complaint→churn linkage; staffing/process to resolve complaints fast.
- **Pain Points:** High complaint volume; complaints strongly predict churn but resolution is slow/uneven.
- **Success Criteria:** Complaint rate ≤18%; faster resolution SLA; reduced complaint-driven churn.

### S5 — Operations Manager
- **Needs:** Insight into how fulfillment (warehouse distance, delivery) drives dissatisfaction & churn.
- **Pain Points:** Long warehouse-to-home distances correlate with churn but trade-offs are unquantified.
- **Success Criteria:** Reduced churn among long-distance customers; fulfillment improvements prioritized by churn impact.

### S6 — Customers
- **Needs:** Reliable delivery, fair pricing/cashback, quick issue resolution, relevant offers.
- **Pain Points:** Slow complaint handling, irrelevant promotions, inconsistent cashback, delivery friction.
- **Success Criteria:** Higher satisfaction scores; fewer complaints; sustained engagement (lower days-since-last-order).
