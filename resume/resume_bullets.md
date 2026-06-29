# Phase 12 — Resume Deliverables

## ATS-Friendly Resume Bullet Points
*(Quantified, action-verb-led, keyword-rich for Business Analyst / Data Analyst ATS screening.)*

### Business Analysis focus
- Led an **end-to-end customer churn reduction initiative** for an e-commerce business of **5,630 customers**, delivering a 12-phase Business Analysis project spanning requirements, process design, analytics, and ROI quantification.
- Authored complete BA documentation suite — **BRD, FRD, user stories, use cases, data dictionary, and stakeholder/RACI matrices** — aligning 6 stakeholder groups (CEO, Marketing, Sales, Support, Operations, Customers) on objectives and KPIs.
- Conducted **root-cause analysis** identifying low tenure, customer complaints (≈2× churn), and order recency as primary churn drivers, translating findings into a prioritized retention playbook.
- Defined and instrumented **6 business KPIs** (Churn Rate, Retention Rate, CLV, Repeat Purchase Rate, AOV, Complaint Rate) with targets, reducing churn from **16.8% to a targeted ≤11%**.
- Mapped **As-Is and To-Be customer journeys** and designed a **BPMN early-warning & retention process**, converting reactive churn handling into a proactive, model-driven workflow.

### Data / Technical focus
- Built and compared **4 churn-prediction models** (Logistic Regression, Random Forest, XGBoost, LightGBM), achieving **ROC-AUC ≈ 0.97**, and explained drivers with **SHAP** for stakeholder trust.
- Performed comprehensive **EDA in Python** (missing-value, outlier, correlation, segmentation, complaint, cashback, tenure analysis) on 20 customer attributes to surface actionable churn signals.
- Wrote **10+ SQL business queries** (top spenders, at-risk customers, monthly/cohort churn, revenue by category, repeat & inactive customers) to answer executive questions.
- Designed **6 executive Power BI dashboards** with DAX measures (Executive Summary, Segmentation, Churn, Satisfaction, Retention, KPI scorecard) enabling self-serve monitoring.
- Quantified a business case projecting **~$492K annual revenue protected** and **28%–285% ROI**, with a 9–10 month payback on a $180K retention program.

### One-line summary (for profile/LinkedIn headline)
> *Business Analyst | Turned 16.8% e-commerce churn into a data-driven retention strategy — predictive modeling (AUC 0.97), 6 Power BI dashboards, and a quantified $490K+/yr business case.*

---

## Skills Demonstrated (keyword bank)
`Business Analysis` · `Requirements Gathering (BRD/FRD)` · `Stakeholder Management` · `RACI` · `Process Mapping` · `BPMN` · `User Stories` · `Use Cases` · `KPI Definition` · `Customer Churn` · `Customer Lifetime Value` · `Customer Segmentation` · `Exploratory Data Analysis` · `SQL` · `Python` · `pandas` · `scikit-learn` · `XGBoost` · `LightGBM` · `SHAP` · `Predictive Analytics` · `Power BI` · `DAX` · `Data Storytelling` · `ROI Analysis`

---

## Suggested GitHub Repo Description
> **E-Commerce Customer Churn — Business Analysis Project.** End-to-end BA case study: business understanding, stakeholder analysis, requirements, process mapping, EDA, SQL, Power BI dashboards, 4-model churn prediction with SHAP, and a quantified retention business case. Tools: Python, SQL, Power BI.

## Interview Talking Points
1. **"Why does Tenure dominate?"** — New customers haven't formed a habit; the 1→3 order zone is where loyalty forms, so onboarding is the highest-leverage structural fix.
2. **"Why target only high-value at-risk?"** — Discounting low-risk loyalists wastes margin; ROI comes from precision targeting (the model enables it).
3. **"How did you handle class imbalance (16.8%)?"** — `class_weight='balanced'` / weighting, plus optimizing for **Recall + ROC-AUC** over raw accuracy.
4. **"Proxy limitations?"** — No monetary value/date in the data, so CLV/AOV use cashback & order-count proxies and "monthly" churn uses tenure cohorts — clearly documented as a constraint.
