# Functional Requirement Document (FRD)
### Project: E-Commerce Customer Churn Reduction Initiative

| Field | Value |
|---|---|
| Document | Functional Requirement Document |
| Version | 1.0 |
| Author | Business Analyst |
| Traces to | BRD v1.0 |

---

## 1. Purpose
Translate the business requirements (BRD) into detailed functional specifications for the churn analytics solution: data pipeline, scoring engine, segmentation logic, and BI dashboards.

## 2. Functional Requirements Detail

| ID | Requirement | Input | Process | Output | Trace |
|---|---|---|---|---|---|
| FR-01 | Data ingestion | Customer CSV/DB | Validate, clean, impute, standardize categoricals | Clean modeling table | BR-01 |
| FR-02 | Churn scoring | Clean features | Apply trained model | `churn_probability` 0–1 per customer | BR-02 |
| FR-03 | Risk banding | Probability | Bucket: Low<0.3, Med 0.3–0.6, High≥0.6 | `risk_band` | BR-02 |
| FR-04 | Value segmentation | OrderCount, Cashback, Tenure | NTILE value score | `value_segment` (VIP/High/Mid/Low) | BR-03 |
| FR-05 | Driver explainability | Trained model | SHAP / feature importance | Ranked top-10 drivers | BR-01 |
| FR-06 | At-risk targeting list | Scores + value | Filter High risk ∧ high value | Exportable customer list | BR-04 |
| FR-07 | KPI dashboards | Aggregates | DAX measures + visuals | 6 dashboards w/ filters | BR-05 |
| FR-08 | Batch re-scoring | Refreshed data | Monthly pipeline run | Updated scores | BR-02 |
| FR-09 | Threshold flagging | Probability / recency | Apply business rules | Early-warning flags | BR-04 |
| FR-10 | Drill-down | Dashboard interaction | KPI→segment→customer | Detail view | BR-05 |

## 3. Business Rules Implemented
BRule-01 … BRule-06 — see [Phase 3 §3.6](03_requirements.md). Encoded in the scoring pipeline and dashboard logic.

## 4. Data Requirements
Source: 20 attributes per customer (see [Data Dictionary](data_dictionary.md)). Refresh: daily ingestion, monthly model re-score.

## 5. Interface / Report Requirements
- Power BI report with 6 pages (see [dashboard_spec](../powerbi/dashboard_spec.md)).
- Exportable CSV of at-risk high-value customers.
- SHAP summary image + model-comparison CSV from the analytics job.

## 6. Functional Acceptance Criteria
- AC-01 … AC-07 — see [Phase 3 §3.7](03_requirements.md).

## 7. Error Handling
- Missing critical field → median/mode impute + log; if >40% of a record missing → quarantine for review.
- Unknown categorical value → mapped to "Other" (OneHotEncoder `handle_unknown='ignore'`).
- Scoring failure → retain previous score, raise alert.

## 8. Non-Functional Requirements
NFR-01 … NFR-10 — see [Phase 3 §3.3](03_requirements.md).
