# Phase 3 — Requirement Gathering

## 3.1 Business Requirements (BR)

| ID | Business Requirement | Linked Objective |
|---|---|---|
| BR-01 | The business must be able to identify the **root-cause drivers** of customer churn. | O1 |
| BR-02 | The business must be able to **predict which customers are likely to churn** before they leave. | O2 |
| BR-03 | The business must **segment customers by value and churn risk** to prioritize retention spend. | O3 |
| BR-04 | The business must receive **prioritized, ROI-quantified retention recommendations**. | O4 |
| BR-05 | Business teams must have **self-serve dashboards** to monitor churn KPIs continuously. | O5 |
| BR-06 | The business must **reduce churn from 16.8% to ≤11%** within 4 quarters. | O6 |

## 3.2 Functional Requirements (FR)

| ID | Functional Requirement | Source BR |
|---|---|---|
| FR-01 | The system shall ingest customer data (demographics, orders, complaints, satisfaction, cashback, tenure). | BR-01 |
| FR-02 | The system shall compute a **churn probability score (0–1)** for every customer. | BR-02 |
| FR-03 | The system shall classify each customer into a **risk band** (Low / Medium / High). | BR-02 |
| FR-04 | The system shall assign each customer a **value segment** (e.g., VIP / High / Mid / Low) based on order count, cashback, tenure. | BR-03 |
| FR-05 | The system shall rank features by **importance / SHAP contribution** to explain churn drivers. | BR-01 |
| FR-06 | The system shall surface the **top N at-risk high-value customers** for campaign targeting. | BR-04 |
| FR-07 | The dashboard shall display all 6 KPIs with **filters** (segment, category, city tier, gender, tenure band). | BR-05 |
| FR-08 | The system shall support **monthly batch re-scoring** of all customers. | BR-02 |
| FR-09 | The system shall flag customers crossing a configurable **risk threshold** for the early-warning workflow. | BR-04 |
| FR-10 | The dashboard shall allow **drill-down** from KPI → segment → individual customer. | BR-05 |

## 3.3 Non-Functional Requirements (NFR)

| ID | Category | Requirement |
|---|---|---|
| NFR-01 | **Performance** | Full-base scoring (≤100K customers) completes in < 10 minutes. |
| NFR-02 | **Accuracy** | Churn model achieves **ROC-AUC ≥ 0.90** and **Recall ≥ 0.80** on the churn class. |
| NFR-03 | **Availability** | Dashboards available 99.5% of business hours. |
| NFR-04 | **Usability** | Dashboards usable by non-technical managers; ≤3 clicks to any insight. |
| NFR-05 | **Security** | PII access role-based; customer data encrypted at rest and in transit. |
| NFR-06 | **Scalability** | Pipeline scales to 10× current customer volume without redesign. |
| NFR-07 | **Maintainability** | Model retraining is parameterized & documented; data dictionary maintained. |
| NFR-08 | **Compliance** | Adheres to data-privacy regulations (GDPR/local equivalent) for customer data. |
| NFR-09 | **Explainability** | Every churn score is accompanied by top contributing factors (SHAP). |
| NFR-10 | **Refresh** | KPI dashboard data refreshes at least **daily**. |

## 3.4 Assumptions
- A1: The provided dataset is representative of the live customer base.
- A2: `Churn = 1` accurately labels customers who have left.
- A3: Historical behavior is predictive of future churn (stationarity holds short-term).
- A4: Revenue/AOV proxies (OrderCount, CashbackAmount, order-hike) are acceptable in absence of true transaction value.
- A5: Business teams will act on model outputs (organizational readiness exists).
- A6: Average revenue per customer and CAC figures used in ROI are validated by Finance.

## 3.5 Constraints
- C1: No true monetary order value in the dataset — CLV/AOV are modeled via proxies.
- C2: Snapshot data (no time-series of transactions) limits trend/seasonality analysis.
- C3: ~5,630-record sample limits rare-segment statistical power.
- C4: Class imbalance (16.8% churn) requires resampling/weighting in modeling.
- C5: Budget and team capacity cap the number of retention plays launched per quarter.
- C6: PII/privacy rules restrict how customer-level scores may be shared.

## 3.6 Business Rules
- BRule-01: A customer with **Churn = 1** is excluded from active retention targeting (already churned → win-back track instead).
- BRule-02: A customer is **High Risk** if churn probability **≥ 0.60**.
- BRule-03: A customer is **VIP** if they are in the top decile by value score (order count × cashback × tenure).
- BRule-04: Any customer with **Complaint = 1 AND Satisfaction ≤ 2** is auto-flagged for service-recovery outreach.
- BRule-05: A customer with **DaySinceLastOrder > 30** is flagged "dormant" regardless of risk score.
- BRule-06: Win-back offers are capped at a margin-safe discount ceiling (set by Finance).

## 3.7 Acceptance Criteria

| ID | Acceptance Criterion |
|---|---|
| AC-01 | Churn model validated at **ROC-AUC ≥ 0.90** and **Recall ≥ 0.80** on a held-out test set. |
| AC-02 | Every active customer receives a churn score and a risk band. |
| AC-03 | Feature-importance / SHAP report identifies the **top 10 churn drivers**. |
| AC-04 | All 6 KPIs render correctly on the dashboard with working filters and drill-down. |
| AC-05 | At least 3 prioritized retention recommendations delivered with ROI estimates. |
| AC-06 | A "top at-risk high-value customers" list is exportable for campaign targeting. |
| AC-07 | Documentation (BRD, FRD, data dictionary, user stories) signed off by sponsor. |
