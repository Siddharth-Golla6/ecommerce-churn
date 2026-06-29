# 🛒 E-Commerce Customer Churn — Business Analysis Project

> **Reducing customer attrition through data-driven root-cause analysis and predictive modeling.**
> An end-to-end Business Analyst project covering business understanding, stakeholder management, requirements, process design, EDA, SQL, BI dashboards, ML, and quantified business impact.

![Status](https://img.shields.io/badge/status-complete-success)
![Domain](https://img.shields.io/badge/domain-E--Commerce-orange)
![Role](https://img.shields.io/badge/role-Business%20Analyst-blue)
![Tools](https://img.shields.io/badge/tools-SQL%20|%20Python%20|%20Power%20BI-purple)

---

## 📌 Executive Snapshot

| Metric | Baseline | Target | Method |
|---|---|---|---|
| Customer Churn Rate | **16.8%** | **≤ 11%** | Early-warning model + retention plays |
| Customer Retention Rate | 83.2% | ≥ 89% | Complaint resolution + loyalty program |
| Avg. Order Value (proxy) | — | +8% | Personalized offers to at-risk segments |
| Complaint Rate | ~28% | ≤ 18% | Service recovery process redesign |
| Model ROC-AUC (XGBoost) | — | **0.97+** | Predictive churn scoring |
| Estimated Annual Net Benefit | — | **≈ $1.2M+** | See [Phase 10](docs/10_business_impact.md) |

> The single strongest churn driver in this dataset is **Tenure** (new customers churn far more), followed by **Complaints**, **low Satisfaction**, **Cashback amount**, and **Days Since Last Order**.

---

## 🗂️ Project Structure

```
ecommerce-churn-ba-project/
├── README.md                          ← you are here
├── docs/
│   ├── 01_business_understanding.md   ← Phase 1
│   ├── 02_stakeholder_analysis.md     ← Phase 2
│   ├── 03_requirements.md             ← Phase 3
│   ├── 04_process_mapping.md          ← Phase 4 (As-Is / To-Be / BPMN)
│   ├── 05_eda_findings.md             ← Phase 5 (EDA narrative + findings)
│   ├── 09_business_recommendations.md ← Phase 9
│   ├── 10_business_impact.md          ← Phase 10 (ROI model)
│   ├── BRD.md                         ← Phase 11 Business Requirements Document
│   ├── FRD.md                         ← Phase 11 Functional Requirements Document
│   ├── user_stories_use_cases.md      ← Phase 11
│   ├── data_dictionary.md             ← Phase 11
│   ├── wireframes.md                  ← Phase 11
│   └── executive_summary.md           ← Phase 11
├── sql/
│   ├── 00_schema.sql                  ← table DDL
│   └── business_questions.sql         ← Phase 6 (10 business questions)
├── notebooks/
│   └── churn_analysis.py              ← Phase 5 + 8 (EDA, models, SHAP)
├── powerbi/
│   └── dashboard_spec.md              ← Phase 7 (6 dashboards, DAX measures)
├── architecture/
│   └── architecture.md                ← Project architecture diagram
└── resume/
    └── resume_bullets.md              ← Phase 12 ATS-friendly bullets
```

---

## 🔄 Project Phases

| Phase | Deliverable | File |
|---|---|---|
| 1 | Business Understanding | [docs/01_business_understanding.md](docs/01_business_understanding.md) |
| 2 | Stakeholder Analysis | [docs/02_stakeholder_analysis.md](docs/02_stakeholder_analysis.md) |
| 3 | Requirement Gathering | [docs/03_requirements.md](docs/03_requirements.md) |
| 4 | Process Mapping (As-Is / To-Be / BPMN) | [docs/04_process_mapping.md](docs/04_process_mapping.md) |
| 5 | Exploratory Data Analysis | [docs/05_eda_findings.md](docs/05_eda_findings.md) + [notebook](notebooks/churn_analysis.py) |
| 6 | SQL Business Questions | [sql/business_questions.sql](sql/business_questions.sql) |
| 7 | Power BI Dashboards | [powerbi/dashboard_spec.md](powerbi/dashboard_spec.md) |
| 8 | Predictive Analytics (4 models + SHAP) | [notebooks/churn_analysis.py](notebooks/churn_analysis.py) |
| 9 | Business Recommendations | [docs/09_business_recommendations.md](docs/09_business_recommendations.md) |
| 10 | Business Impact & ROI | [docs/10_business_impact.md](docs/10_business_impact.md) |
| 11 | Documentation (BRD/FRD/etc.) | [docs/](docs/) |
| 12 | Resume Deliverables | [resume/resume_bullets.md](resume/resume_bullets.md) |

---

## ▶️ How to Run

### 1. Get the data
Download `E Commerce Dataset.xlsx` from
[Kaggle — E-Commerce Customer Churn](https://www.kaggle.com/datasets/ankitverma2010/ecommerce-customer-churn-analysis-and-prediction)
and place the `E Comm` sheet as `data/ecommerce_churn.csv`.

### 2. Python analysis (EDA + models + SHAP)
```bash
pip install pandas numpy scikit-learn xgboost lightgbm shap matplotlib seaborn openpyxl
python notebooks/churn_analysis.py
```

### 3. SQL
Load the CSV into any SQL engine using `sql/00_schema.sql`, then run `sql/business_questions.sql`.

### 4. Power BI
Open Power BI Desktop → Get Data → CSV → build the 6 dashboards per `powerbi/dashboard_spec.md` (DAX provided).

---

## 🧰 Tech Stack
**Analysis:** Python (pandas, scikit-learn, XGBoost, LightGBM, SHAP) ·
**Database:** SQL (PostgreSQL / SQL Server / MySQL compatible) ·
**BI:** Power BI (DAX) ·
**BA Tooling:** BRD/FRD, BPMN, user stories, stakeholder matrix, RACI

---

## 👤 Author
Business Analyst — Churn Reduction Initiative
Prepared as a portfolio-grade, resume-ready deliverable.
