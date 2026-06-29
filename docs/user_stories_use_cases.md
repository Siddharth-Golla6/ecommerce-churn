# User Stories & Use Cases

## Part A — User Stories (Agile format)

### Epic 1: Churn Prediction
- **US-01** — *As a Marketing Manager, I want each customer scored with a churn probability so that I can prioritize who to target.*
  - **AC:** Every active customer has a 0–1 score and a risk band; list sortable by score.
- **US-02** — *As a Data Analyst, I want the model to explain its top drivers (SHAP) so that recommendations are trusted and actionable.*
  - **AC:** Top-10 drivers reported; per-prediction top factors available.
- **US-03** — *As a Marketing Manager, I want an auto-refreshed at-risk list so that I act before customers leave.*
  - **AC:** Daily flagging of prob≥0.60 and dormant>30 days.

### Epic 2: Segmentation & Targeting
- **US-04** — *As a Sales Manager, I want customers grouped by value so that I protect high-value relationships.*
  - **AC:** VIP/High/Mid/Low segments visible and filterable.
- **US-05** — *As a Marketing Manager, I want to target only high-value at-risk customers so that I avoid wasting margin on loyal customers.*
  - **AC:** Exportable High-risk ∧ high-value list.

### Epic 3: Service Recovery
- **US-06** — *As a Support Manager, I want complaint+low-satisfaction customers auto-flagged so that my team resolves them within SLA.*
  - **AC:** BRule-04 triggers a recovery queue entry within 24h.

### Epic 4: KPI Monitoring
- **US-07** — *As the CEO, I want a one-page executive dashboard so that I see churn health at a glance.*
  - **AC:** 6 KPIs with targets and conditional formatting.
- **US-08** — *As a manager, I want to filter KPIs by segment/category/city tier so that I find where churn concentrates.*
  - **AC:** Synced slicers; ≤3 clicks to any insight; drill-down to customer.

### Epic 5: Retention Operations
- **US-09** — *As a Marketing Manager, I want win-back campaigns for dormant customers so that I reactivate revenue.*
  - **AC:** Dormancy (>30d) nudge workflow with measured uplift.
- **US-10** — *As an Operations Manager, I want to see churn by warehouse distance so that I prioritize fulfillment fixes.*
  - **AC:** Churn rate by distance band visualized.

## Part B — Use Cases (detailed)

### UC-01: Score Customers for Churn Risk
| Field | Detail |
|---|---|
| **Actor** | Scoring System (triggered by scheduler) |
| **Precondition** | Clean customer data available |
| **Trigger** | Daily batch job |
| **Main flow** | 1. Load data → 2. Preprocess → 3. Apply model → 4. Compute probability → 5. Assign risk band → 6. Persist scores → 7. Push to dashboard |
| **Postcondition** | Every active customer has an updated score & band |
| **Alt/Exception** | Missing fields → impute+log; model error → keep prior score + alert |

### UC-02: Generate At-Risk Targeting List
| Field | Detail |
|---|---|
| **Actor** | Marketing Manager |
| **Precondition** | Scores exist; value segments computed |
| **Main flow** | 1. Open Dashboard 5 → 2. Filter risk=High ∧ value≥High → 3. Review list → 4. Export CSV → 5. Launch campaign |
| **Postcondition** | Targeted campaign launched; cohort tagged for uplift measurement |

### UC-03: Service-Recovery Routing
| Field | Detail |
|---|---|
| **Actor** | Support System / Support Manager |
| **Trigger** | Customer with Complain=1 ∧ Satisfaction≤2 detected |
| **Main flow** | 1. Auto-flag (BRule-04) → 2. Create recovery ticket → 3. Assign agent → 4. Resolve within SLA → 5. Re-survey satisfaction |
| **Postcondition** | Complaint resolved; outcome logged; churn risk re-scored |

### UC-04: Executive KPI Review
| Field | Detail |
|---|---|
| **Actor** | CEO |
| **Main flow** | 1. Open Dashboard 1 → 2. Read 6 KPIs vs targets → 3. Drill into off-target KPI → 4. Assign action to owner |
| **Postcondition** | Decisions/actions recorded |
