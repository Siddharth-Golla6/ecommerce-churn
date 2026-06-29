-- =====================================================================
-- Phase 6 — SQL Business Questions
-- Engine notes: written in ANSI SQL. For MySQL replace FETCH FIRST n ROWS
--   ONLY with LIMIT n. For SQL Server use TOP n.
-- Proxy note: the dataset has no monetary order value or order date.
--   * SPEND / REVENUE is proxied by CashbackAmount (and OrderCount).
--   * MONTHLY churn is proxied via Tenure buckets (cohort age), since
--     no transaction dates exist. Limitations are documented inline.
-- =====================================================================


-- Q1. TOP SPENDING CUSTOMERS (spend proxied by CashbackAmount) -------------
SELECT CustomerID,
       PreferedOrderCat,
       CashbackAmount        AS spend_proxy,
       OrderCount,
       Tenure,
       Churn
FROM   ecommerce_customers
ORDER  BY CashbackAmount DESC
FETCH FIRST 20 ROWS ONLY;


-- Q2. CUSTOMERS WITH COMPLAINTS (and their churn outcome) ------------------
SELECT CustomerID,
       SatisfactionScore,
       Tenure,
       PreferedOrderCat,
       Churn
FROM   ecommerce_customers
WHERE  Complain = 1
ORDER  BY SatisfactionScore ASC, Tenure ASC;

-- Q2b. Does complaining raise churn? (complaint vs non-complaint churn rate)
SELECT Complain,
       COUNT(*)                                   AS customers,
       SUM(Churn)                                 AS churned,
       ROUND(100.0 * AVG(CAST(Churn AS DECIMAL(10,4))), 2) AS churn_rate_pct
FROM   ecommerce_customers
GROUP  BY Complain;


-- Q3. CUSTOMERS LIKELY TO CHURN (rule-based risk flag) --------------------
-- Heuristic mirrors the business rules: low tenure, complaint+low sat,
-- long recency gap, or low engagement.
SELECT CustomerID,
       Tenure,
       Complain,
       SatisfactionScore,
       DaySinceLastOrder,
       OrderCount,
       CashbackAmount,
       CASE
         WHEN Tenure <= 3                                THEN 'High (new customer)'
         WHEN Complain = 1 AND SatisfactionScore <= 2    THEN 'High (service failure)'
         WHEN DaySinceLastOrder > 30                     THEN 'Medium (dormant)'
         WHEN OrderCount <= 1                            THEN 'Medium (low engagement)'
         ELSE 'Low'
       END AS rule_based_risk
FROM   ecommerce_customers
WHERE  Churn = 0      -- only active customers are targetable
ORDER  BY rule_based_risk;


-- Q4. AVERAGE SATISFACTION (overall and by churn status) ------------------
SELECT 'Overall' AS scope,
       ROUND(AVG(CAST(SatisfactionScore AS DECIMAL(10,4))), 3) AS avg_satisfaction
FROM   ecommerce_customers
UNION ALL
SELECT CASE WHEN Churn = 1 THEN 'Churned' ELSE 'Retained' END,
       ROUND(AVG(CAST(SatisfactionScore AS DECIMAL(10,4))), 3)
FROM   ecommerce_customers
GROUP  BY Churn;


-- Q5. MONTHLY CHURN RATE (proxied by Tenure cohort, in months) ------------
-- No order dates exist, so "monthly" = churn rate by months-as-customer.
-- This reveals WHEN in the lifecycle churn happens (early-tenure spike).
SELECT CAST(Tenure AS INTEGER)                               AS tenure_month,
       COUNT(*)                                              AS customers,
       SUM(Churn)                                            AS churned,
       ROUND(100.0 * AVG(CAST(Churn AS DECIMAL(10,4))), 2)   AS churn_rate_pct
FROM   ecommerce_customers
WHERE  Tenure IS NOT NULL
GROUP  BY CAST(Tenure AS INTEGER)
ORDER  BY tenure_month;


-- Q6. ORDERS BY CATEGORY (volume) -----------------------------------------
SELECT PreferedOrderCat,
       COUNT(*)               AS customers,
       SUM(OrderCount)        AS total_orders,
       ROUND(AVG(OrderCount),2) AS avg_orders_per_customer
FROM   ecommerce_customers
GROUP  BY PreferedOrderCat
ORDER  BY total_orders DESC;


-- Q7. REVENUE BY CATEGORY (revenue proxied by CashbackAmount * OrderCount) -
SELECT PreferedOrderCat,
       ROUND(SUM(CashbackAmount), 2)                         AS cashback_proxy_revenue,
       ROUND(SUM(CashbackAmount * OrderCount), 2)            AS weighted_revenue_proxy,
       ROUND(100.0 * AVG(CAST(Churn AS DECIMAL(10,4))), 2)   AS churn_rate_pct
FROM   ecommerce_customers
GROUP  BY PreferedOrderCat
ORDER  BY weighted_revenue_proxy DESC;


-- Q8. REPEAT CUSTOMERS (more than one order) ------------------------------
SELECT CustomerID,
       OrderCount,
       PreferedOrderCat,
       Tenure,
       Churn
FROM   ecommerce_customers
WHERE  OrderCount > 1
ORDER  BY OrderCount DESC;

-- Q8b. Repeat purchase rate (KPI)
SELECT ROUND(100.0 * SUM(CASE WHEN OrderCount > 1 THEN 1 ELSE 0 END)
             / COUNT(*), 2) AS repeat_purchase_rate_pct
FROM   ecommerce_customers;


-- Q9. HIGH-VALUE CUSTOMERS (top decile by composite value score) ----------
-- value = OrderCount * CashbackAmount * (Tenure normalized).
WITH scored AS (
  SELECT CustomerID,
         OrderCount,
         CashbackAmount,
         Tenure,
         Churn,
         (COALESCE(OrderCount,0) * COALESCE(CashbackAmount,0)
            * (1 + COALESCE(Tenure,0)/12.0)) AS value_score
  FROM   ecommerce_customers
),
ranked AS (
  SELECT s.*,
         NTILE(10) OVER (ORDER BY value_score DESC) AS value_decile
  FROM   scored s
)
SELECT CustomerID, OrderCount, CashbackAmount, Tenure, value_score, Churn
FROM   ranked
WHERE  value_decile = 1            -- top 10% = VIP
ORDER  BY value_score DESC;


-- Q10. INACTIVE CUSTOMERS (dormant by recency) ----------------------------
SELECT CustomerID,
       DaySinceLastOrder,
       OrderCount,
       Tenure,
       CashbackAmount,
       Churn
FROM   ecommerce_customers
WHERE  DaySinceLastOrder > 30
ORDER  BY DaySinceLastOrder DESC;


-- =====================================================================
-- BONUS: KPI ROLL-UP (single row for the executive dashboard) ----------
-- =====================================================================
SELECT
   COUNT(*)                                                       AS total_customers,
   SUM(Churn)                                                     AS churned_customers,
   ROUND(100.0 * AVG(CAST(Churn AS DECIMAL(10,4))), 2)            AS churn_rate_pct,
   ROUND(100.0 * (1 - AVG(CAST(Churn AS DECIMAL(10,4)))), 2)      AS retention_rate_pct,
   ROUND(100.0 * AVG(CAST(Complain AS DECIMAL(10,4))), 2)         AS complaint_rate_pct,
   ROUND(100.0 * SUM(CASE WHEN OrderCount > 1 THEN 1 ELSE 0 END)
         / COUNT(*), 2)                                           AS repeat_purchase_rate_pct,
   ROUND(AVG(CashbackAmount), 2)                                  AS avg_cashback_proxy_aov,
   ROUND(AVG(CAST(SatisfactionScore AS DECIMAL(10,4))), 2)        AS avg_satisfaction
FROM ecommerce_customers;
