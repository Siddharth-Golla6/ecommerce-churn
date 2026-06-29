-- =====================================================================
-- E-Commerce Customer Churn — Schema (Phase 6)
-- Compatible with PostgreSQL / SQL Server / MySQL (minor type tweaks).
-- Load the Kaggle "E Comm" sheet (saved as CSV) into this table.
-- =====================================================================

DROP TABLE IF EXISTS ecommerce_customers;

CREATE TABLE ecommerce_customers (
    CustomerID                   INTEGER PRIMARY KEY,
    Churn                        SMALLINT,          -- 1 = churned, 0 = retained
    Tenure                       DECIMAL(10,2),     -- months as customer
    PreferredLoginDevice         VARCHAR(50),
    CityTier                     SMALLINT,          -- 1, 2, 3
    WarehouseToHome              DECIMAL(10,2),     -- distance (km)
    PreferredPaymentMode         VARCHAR(50),
    Gender                       VARCHAR(10),
    HourSpendOnApp               DECIMAL(10,2),
    NumberOfDeviceRegistered     SMALLINT,
    PreferedOrderCat             VARCHAR(50),       -- (sic) original column spelling
    SatisfactionScore            SMALLINT,          -- 1..5
    MaritalStatus                VARCHAR(20),
    NumberOfAddress              SMALLINT,
    Complain                     SMALLINT,          -- 1 = complained
    OrderAmountHikeFromlastYear  DECIMAL(10,2),     -- % hike
    CouponUsed                   DECIMAL(10,2),
    OrderCount                   DECIMAL(10,2),
    DaySinceLastOrder            DECIMAL(10,2),
    CashbackAmount               DECIMAL(10,2)
);

-- Helpful indexes for the analytical queries below
CREATE INDEX idx_churn        ON ecommerce_customers (Churn);
CREATE INDEX idx_category      ON ecommerce_customers (PreferedOrderCat);
CREATE INDEX idx_complain      ON ecommerce_customers (Complain);
CREATE INDEX idx_tenure        ON ecommerce_customers (Tenure);
