"""
=====================================================================
E-Commerce Customer Churn — EDA + Predictive Analytics (Phases 5 & 8)
=====================================================================
Models: Logistic Regression, Random Forest, XGBoost, LightGBM
Evaluation: Accuracy, Precision, Recall, F1, ROC-AUC
Explainability: SHAP feature importance

USAGE:
    pip install pandas numpy scikit-learn xgboost lightgbm shap \
                matplotlib seaborn openpyxl
    python churn_analysis.py

DATA:
    Download "E Commerce Dataset.xlsx" from Kaggle:
    https://www.kaggle.com/datasets/ankitverma2010/ecommerce-customer-churn-analysis-and-prediction
    Save the "E Comm" sheet as data/ecommerce_churn.csv  (or keep the xlsx
    and the loader below will read the sheet directly).
=====================================================================
"""

import os
import warnings
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (accuracy_score, precision_score, recall_score,
                             f1_score, roc_auc_score, classification_report,
                             confusion_matrix, roc_curve)

warnings.filterwarnings("ignore")
sns.set(style="whitegrid")
RANDOM_STATE = 42
OUT_DIR = "outputs"
os.makedirs(OUT_DIR, exist_ok=True)


# ---------------------------------------------------------------------
# 1. LOAD DATA
# ---------------------------------------------------------------------
def load_data():
    csv_path = "data/ecommerce_churn.csv"
    xlsx_path = "data/E Commerce Dataset.xlsx"
    if os.path.exists(csv_path):
        df = pd.read_csv(csv_path)
    elif os.path.exists(xlsx_path):
        df = pd.read_excel(xlsx_path, sheet_name="E Comm")
    else:
        raise FileNotFoundError(
            "Place the dataset at data/ecommerce_churn.csv or "
            "data/E Commerce Dataset.xlsx (sheet 'E Comm')."
        )
    return df


# ---------------------------------------------------------------------
# 2. EDA (Phase 5)
# ---------------------------------------------------------------------
def run_eda(df):
    print("\n================ PHASE 5: EDA ================")
    print(f"Shape: {df.shape}")
    print(f"\nChurn rate: {df['Churn'].mean()*100:.2f}%")

    # 5.1 Missing values
    miss = df.isnull().sum()
    print("\n--- Missing values ---")
    print(miss[miss > 0])

    # 5.2 Duplicates
    print(f"\nExact duplicate rows: {df.duplicated().sum()}")
    print(f"Duplicate CustomerIDs: {df['CustomerID'].duplicated().sum()}")

    # 5.3 Outliers (IQR) on key numeric cols
    print("\n--- Outlier counts (IQR) ---")
    for col in ["WarehouseToHome", "Tenure", "CashbackAmount", "DaySinceLastOrder"]:
        if col in df:
            q1, q3 = df[col].quantile([0.25, 0.75])
            iqr = q3 - q1
            lo, hi = q1 - 1.5 * iqr, q3 + 1.5 * iqr
            n = ((df[col] < lo) | (df[col] > hi)).sum()
            print(f"  {col:20s}: {n} outliers")

    # 5.4 Correlation heatmap
    num = df.select_dtypes(include=[np.number]).drop(columns=["CustomerID"], errors="ignore")
    plt.figure(figsize=(12, 9))
    sns.heatmap(num.corr(), annot=False, cmap="RdBu_r", center=0)
    plt.title("Correlation Matrix")
    plt.tight_layout(); plt.savefig(f"{OUT_DIR}/correlation.png", dpi=120); plt.close()

    # Churn correlation ranking
    corr_churn = num.corr()["Churn"].drop("Churn").sort_values(key=abs, ascending=False)
    print("\n--- Top churn correlations ---")
    print(corr_churn.head(10))

    # 5.x Segment churn rates (business-relevant breakdowns)
    for col in ["Complain", "PreferedOrderCat", "SatisfactionScore", "CityTier", "MaritalStatus"]:
        if col in df:
            g = df.groupby(col)["Churn"].mean().sort_values(ascending=False) * 100
            print(f"\nChurn rate by {col} (%):\n{g.round(2)}")

    # Tenure analysis plot
    plt.figure(figsize=(8, 5))
    df.groupby(df["Tenure"].round())["Churn"].mean().mul(100).plot(marker="o")
    plt.title("Churn Rate by Tenure (months)"); plt.ylabel("Churn rate %"); plt.xlabel("Tenure")
    plt.tight_layout(); plt.savefig(f"{OUT_DIR}/churn_by_tenure.png", dpi=120); plt.close()

    print("\nEDA charts saved to ./outputs/")


# ---------------------------------------------------------------------
# 3. PREPROCESSING
# ---------------------------------------------------------------------
def build_preprocessor(df):
    drop_cols = ["CustomerID", "Churn"]
    X = df.drop(columns=drop_cols)
    y = df["Churn"]

    # Normalize known messy categorical values
    if "PreferredLoginDevice" in X:
        X["PreferredLoginDevice"] = X["PreferredLoginDevice"].replace({"Phone": "Mobile Phone"})
    if "PreferedOrderCat" in X:
        X["PreferedOrderCat"] = X["PreferedOrderCat"].replace({"Mobile": "Mobile Phone"})
    if "PreferredPaymentMode" in X:
        X["PreferredPaymentMode"] = X["PreferredPaymentMode"].replace(
            {"CC": "Credit Card", "COD": "Cash on Delivery"})

    num_cols = X.select_dtypes(include=[np.number]).columns.tolist()
    cat_cols = X.select_dtypes(exclude=[np.number]).columns.tolist()

    num_pipe = Pipeline([("imp", SimpleImputer(strategy="median")),
                         ("sc", StandardScaler())])
    cat_pipe = Pipeline([("imp", SimpleImputer(strategy="most_frequent")),
                         ("oh", OneHotEncoder(handle_unknown="ignore"))])

    pre = ColumnTransformer([("num", num_pipe, num_cols),
                             ("cat", cat_pipe, cat_cols)])
    return X, y, pre, num_cols, cat_cols


# ---------------------------------------------------------------------
# 4. MODELS (Phase 8)
# ---------------------------------------------------------------------
def get_models():
    models = {
        "Logistic Regression": LogisticRegression(max_iter=1000,
                                                   class_weight="balanced",
                                                   random_state=RANDOM_STATE),
        "Random Forest": RandomForestClassifier(n_estimators=300,
                                                 class_weight="balanced",
                                                 random_state=RANDOM_STATE,
                                                 n_jobs=-1),
    }
    # Optional gradient-boosting libs
    try:
        from xgboost import XGBClassifier
        models["XGBoost"] = XGBClassifier(
            n_estimators=400, learning_rate=0.05, max_depth=5,
            subsample=0.9, colsample_bytree=0.9,
            eval_metric="logloss", random_state=RANDOM_STATE, n_jobs=-1)
    except ImportError:
        print("xgboost not installed — skipping XGBoost.")
    try:
        from lightgbm import LGBMClassifier
        models["LightGBM"] = LGBMClassifier(
            n_estimators=500, learning_rate=0.05, num_leaves=31,
            class_weight="balanced", random_state=RANDOM_STATE, n_jobs=-1)
    except ImportError:
        print("lightgbm not installed — skipping LightGBM.")
    return models


def evaluate(name, model, X_test, y_test):
    pred = model.predict(X_test)
    proba = model.predict_proba(X_test)[:, 1]
    return {
        "Model": name,
        "Accuracy": accuracy_score(y_test, pred),
        "Precision": precision_score(y_test, pred),
        "Recall": recall_score(y_test, pred),
        "F1": f1_score(y_test, pred),
        "ROC-AUC": roc_auc_score(y_test, proba),
    }, proba


# ---------------------------------------------------------------------
# 5. SHAP EXPLAINABILITY
# ---------------------------------------------------------------------
def run_shap(best_pipe, X_train, pre, num_cols, cat_cols):
    try:
        import shap
    except ImportError:
        print("shap not installed — skipping SHAP. (pip install shap)")
        return
    print("\n================ SHAP feature importance ================")
    model = best_pipe.named_steps["clf"]
    X_trans = best_pipe.named_steps["pre"].transform(X_train)
    # Recover feature names
    try:
        oh = pre.named_transformers_["cat"].named_steps["oh"]
        cat_names = oh.get_feature_names_out(cat_cols).tolist()
    except Exception:
        cat_names = cat_cols
    feat_names = num_cols + cat_names

    try:
        X_dense = X_trans.toarray() if hasattr(X_trans, "toarray") else X_trans
        explainer = shap.Explainer(model, X_dense, feature_names=feat_names)
        shap_values = explainer(X_dense[:500])
        shap.summary_plot(shap_values, X_dense[:500],
                          feature_names=feat_names, show=False)
        plt.tight_layout(); plt.savefig(f"{OUT_DIR}/shap_summary.png", dpi=120); plt.close()
        print("SHAP summary saved to outputs/shap_summary.png")
    except Exception as e:
        print(f"SHAP plotting skipped: {e}")


# ---------------------------------------------------------------------
# MAIN
# ---------------------------------------------------------------------
def main():
    df = load_data()
    run_eda(df)

    X, y, pre, num_cols, cat_cols = build_preprocessor(df)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, stratify=y, random_state=RANDOM_STATE)

    print("\n================ PHASE 8: MODELS ================")
    results, fitted = [], {}
    plt.figure(figsize=(7, 6))
    for name, clf in get_models().items():
        pipe = Pipeline([("pre", pre), ("clf", clf)])
        pipe.fit(X_train, y_train)
        metrics, proba = evaluate(name, pipe, X_test, y_test)
        results.append(metrics)
        fitted[name] = pipe
        fpr, tpr, _ = roc_curve(y_test, proba)
        plt.plot(fpr, tpr, label=f"{name} (AUC={metrics['ROC-AUC']:.3f})")
        print(f"\n{name}:\n", classification_report(y_test, pipe.predict(X_test)))

    plt.plot([0, 1], [0, 1], "k--", alpha=0.4)
    plt.xlabel("False Positive Rate"); plt.ylabel("True Positive Rate")
    plt.title("ROC Curves — Model Comparison"); plt.legend()
    plt.tight_layout(); plt.savefig(f"{OUT_DIR}/roc_comparison.png", dpi=120); plt.close()

    res_df = pd.DataFrame(results).sort_values("ROC-AUC", ascending=False)
    res_df.to_csv(f"{OUT_DIR}/model_comparison.csv", index=False)
    print("\n================ MODEL COMPARISON ================")
    print(res_df.round(4).to_string(index=False))

    best_name = res_df.iloc[0]["Model"]
    print(f"\nBest model: {best_name}")
    run_shap(fitted[best_name], X_train, pre, num_cols, cat_cols)

    # Score full base & export top at-risk customers (FR-06)
    full_proba = fitted[best_name].predict_proba(X)[:, 1]
    scored = df[["CustomerID"]].copy()
    scored["churn_probability"] = full_proba.round(4)
    scored["risk_band"] = pd.cut(scored["churn_probability"],
                                 bins=[-0.01, 0.3, 0.6, 1.0],
                                 labels=["Low", "Medium", "High"])
    scored.sort_values("churn_probability", ascending=False)\
          .to_csv(f"{OUT_DIR}/customer_churn_scores.csv", index=False)
    print(f"\nScored {len(scored)} customers -> outputs/customer_churn_scores.csv")
    print("High-risk customers:", (scored["risk_band"] == "High").sum())


if __name__ == "__main__":
    main()
