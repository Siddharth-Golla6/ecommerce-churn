# Project Architecture

## End-to-End Solution Architecture

```mermaid
flowchart LR
    subgraph SRC[1. Data Source]
        A[(Kaggle E-Commerce<br/>Churn Dataset<br/>5,630 customers)]
    end
    subgraph ING[2. Ingestion & Prep]
        B[Load CSV/XLSX]
        C[Clean: impute nulls,<br/>standardize categoricals,<br/>winsorize outliers]
    end
    subgraph ANALYTICS[3. Analytics Layer]
        D[EDA<br/>correlations, segments]
        E[Feature engineering<br/>value score, bands]
        F[Models:<br/>LogReg / RF / XGB / LGBM]
        G[SHAP explainability]
    end
    subgraph STORE[4. Serving]
        H[(Scored table:<br/>churn_prob + risk_band)]
        I[(SQL warehouse:<br/>ecommerce_customers)]
    end
    subgraph CONSUME[5. Consumption]
        J[Power BI<br/>6 dashboards]
        K[At-risk CSV export]
        L[Retention workflows:<br/>Mktg / Support / Sales]
    end
    A --> B --> C --> D --> E --> F --> G
    F --> H
    C --> I
    H --> J
    I --> J
    H --> K --> L
    J --> L
    L -. uplift feedback .-> F
```

## Layer Responsibilities
| Layer | Tools | Output |
|---|---|---|
| **Data Source** | Kaggle dataset | Raw customer attributes |
| **Ingestion & Prep** | Python (pandas), Power Query | Clean modeling table |
| **Analytics** | scikit-learn, XGBoost, LightGBM, SHAP | Trained model + drivers |
| **Serving** | CSV / SQL | Scores, risk bands, KPIs |
| **Consumption** | Power BI, CRM | Dashboards, action lists, campaigns |
| **Feedback loop** | Campaign results | Retraining signal |

## Folder Structure
```
ecommerce-churn-ba-project/
├── README.md
├── docs/
│   ├── 01_business_understanding.md
│   ├── 02_stakeholder_analysis.md
│   ├── 03_requirements.md
│   ├── 04_process_mapping.md
│   ├── 05_eda_findings.md
│   ├── 09_business_recommendations.md
│   ├── 10_business_impact.md
│   ├── BRD.md
│   ├── FRD.md
│   ├── user_stories_use_cases.md
│   ├── data_dictionary.md
│   ├── wireframes.md
│   └── executive_summary.md
├── sql/
│   ├── 00_schema.sql
│   └── business_questions.sql
├── notebooks/
│   └── churn_analysis.py
├── powerbi/
│   └── dashboard_spec.md
├── architecture/
│   └── architecture.md
├── resume/
│   └── resume_bullets.md
└── data/                      ← (you add the dataset here)
    └── ecommerce_churn.csv
```

## Modeling Pipeline (detail)
```mermaid
flowchart TD
    X[Raw features] --> P[ColumnTransformer]
    P --> N[Numeric: median impute -> scale]
    P --> C[Categorical: mode impute -> one-hot]
    N --> M[Classifier]
    C --> M
    M --> E[Evaluate: Acc/Prec/Recall/F1/AUC]
    M --> S[SHAP drivers]
    M --> O[Score full base -> risk bands]
```
