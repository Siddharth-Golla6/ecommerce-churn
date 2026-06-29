# Phase 4 — Process Mapping

## 4.1 Current (As-Is) Customer Journey

The current journey is **reactive** — the business only learns a customer is unhappy after they complain, and only learns they churned after they're gone.

```
[Acquire] → [Onboard] → [Browse & Order] → [Fulfillment] → [Use/Receive]
     │           │             │                 │              │
     ▼           ▼             ▼                 ▼              ▼
  Generic     No early      Untargeted       Long warehouse   Issue arises
  welcome     engagement    promotions       distance =       → Complaint
              tracking                        delays           │
                                                               ▼
                                              [Complaint logged] → slow/uneven resolution
                                                               │
                                                               ▼
                                              Dissatisfaction rises → Days-since-last-order grows
                                                               │
                                                               ▼
                                              ❌ CUSTOMER CHURNS (discovered after the fact)
```

**As-Is pain points:**
1. No tenure-based onboarding → new customers (highest churn risk) get no special attention.
2. Complaints handled slowly and inconsistently → complaint strongly predicts churn.
3. Promotions are untargeted → spend wasted, low relevance.
4. Churn detected only *after* it happens → no chance to intervene.
5. Fulfillment friction (warehouse distance) not linked to retention action.

## 4.2 Future (To-Be) Customer Journey

The future journey is **proactive and predictive** — the model continuously scores risk and triggers the right intervention at the right moment.

```
[Acquire] → [Smart Onboard] → [Engage] → [Predict & Score] → [Intervene] → [Retain/Grow]
     │            │               │             │                  │             │
     ▼            ▼               ▼             ▼                  ▼             ▼
  Welcome +   Tenure-based     Personalized   Daily churn      Risk-based     Loyalty/VIP
  segment     onboarding for   offers by      scoring +        plays:         program,
  tagging     first 90 days    category &     early-warning    - service      rising CLV
              (high-risk)      cashback       flags            recovery
                                              │                - win-back
                                              ▼                - VIP perks
                                       Auto-flag:              - dormancy
                                       complaint+low-sat,      nudge
                                       dormant >30d,
                                       prob ≥ 0.60
```

**To-Be improvements:**
- Early-warning model flags risk **before** churn.
- Complaint + low satisfaction → automatic service-recovery workflow (BRule-04).
- Personalized offers replace mass promotions.
- High-value at-risk customers routed to VIP retention.
- Dormant customers (>30 days) nudged automatically.

## 4.3 Process Flow — Churn Prevention (swimlane narrative)

| Step | Actor | Action |
|---|---|---|
| 1 | Data/BI | Ingest & refresh customer data daily |
| 2 | Model | Score churn probability for all customers |
| 3 | Model | Apply business rules → risk band + flags |
| 4 | System | Route flagged customers to the right play |
| 5 | Marketing | Execute targeted retention/win-back campaign |
| 6 | Support | Handle service-recovery for complaint+low-sat customers |
| 7 | Sales | Upsell/VIP perks for high-value retained customers |
| 8 | Data/BI | Measure campaign uplift, feed back to model & KPIs |

## 4.4 BPMN Diagram (Churn Early-Warning & Retention)

```mermaid
flowchart TD
    Start([Daily data refresh]) --> A[Ingest customer data]
    A --> B[Run churn model -> probability score]
    B --> C{Churn prob >= 0.60?}
    C -- No --> D{Days since last order > 30?}
    D -- No --> E[Standard engagement / monitor]
    D -- Yes --> F[Dormancy nudge campaign]
    C -- Yes --> G{Complaint = 1 AND Satisfaction <= 2?}
    G -- Yes --> H[Service-recovery outreach - Support]
    G -- No --> I{High-value / VIP segment?}
    I -- Yes --> J[VIP retention: perks + dedicated offer]
    I -- No --> K[Personalized win-back discount - Marketing]
    H --> L[Log outcome]
    J --> L
    K --> L
    F --> L
    E --> L
    L --> M[Measure uplift and update KPIs]
    M --> End([Feed results back to model])
```

### BPMN swimlane view (pools/lanes)

```mermaid
flowchart LR
    subgraph DataBI[Lane: Data / BI]
        d1[Refresh data] --> d2[Score churn] --> d3[Apply rules and flags]
    end
    subgraph System[Lane: Routing System]
        s1{Route by risk and flags}
    end
    subgraph Marketing[Lane: Marketing]
        m1[Win-back / personalized offer]
        m2[Dormancy nudge]
    end
    subgraph Support[Lane: Customer Support]
        c1[Service recovery]
    end
    subgraph Sales[Lane: Sales]
        sa1[VIP perks / upsell]
    end
    d3 --> s1
    s1 --> m1
    s1 --> m2
    s1 --> c1
    s1 --> sa1
    m1 --> r1[Measure uplift]
    c1 --> r1
    sa1 --> r1
    m2 --> r1
    r1 --> d2
```

> Render the Mermaid blocks in any Markdown viewer that supports Mermaid (GitHub, VS Code, Obsidian) to see the diagrams visually.
