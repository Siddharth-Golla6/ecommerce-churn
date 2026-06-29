const pptxgen = require("pptxgenjs");

// ---------- palette (Teal Trust, topic-fit for retention analytics) ----------
const DARK   = "0A2E36";   // deep teal (title/closing bg)
const TEAL   = "028090";   // primary
const SEA    = "00A896";   // secondary
const MINT   = "02C39A";   // accent
const INK     = "1F2D31";   // body text
const MUTE   = "6B7B80";   // muted captions
const LIGHT  = "F4F8F8";   // light panel
const WHITE  = "FFFFFF";
const RED    = "E45756";   // churn / risk
const GREEN  = "3FA34D";   // retain
const AMBER  = "E8A33D";

const HEAD = "Cambria";
const BODY = "Calibri";

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";          // 13.3 x 7.5
pres.author = "Business Analyst";
pres.title  = "E-Commerce Customer Churn — Business Analysis";
const W = 13.3, H = 7.5;

const sh = () => ({ type: "outer", color: "000000", blur: 8, offset: 3, angle: 90, opacity: 0.16 });

// helper: section eyebrow + title for content slides
function header(slide, eyebrow, title) {
  slide.background = { color: WHITE };
  slide.addText(eyebrow.toUpperCase(), {
    x: 0.6, y: 0.45, w: 11, h: 0.3, fontFace: BODY, fontSize: 12,
    color: TEAL, bold: true, charSpacing: 3, margin: 0 });
  slide.addText(title, {
    x: 0.6, y: 0.74, w: 12.1, h: 0.7, fontFace: HEAD, fontSize: 30,
    color: INK, bold: true, margin: 0 });
}

// =====================================================================
// SLIDE 1 — TITLE
// =====================================================================
let s = pres.addSlide();
s.background = { color: DARK };
s.addShape(pres.shapes.OVAL, { x: 10.4, y: -2.2, w: 5.5, h: 5.5, fill: { color: TEAL, transparency: 70 } });
s.addShape(pres.shapes.OVAL, { x: 11.6, y: 3.6, w: 4.5, h: 4.5, fill: { color: MINT, transparency: 80 } });
s.addText("BUSINESS ANALYSIS  ·  E-COMMERCE", {
  x: 0.8, y: 1.5, w: 10, h: 0.4, fontFace: BODY, fontSize: 14, color: MINT, bold: true, charSpacing: 4 });
s.addText("Reducing Customer Churn", {
  x: 0.8, y: 2.0, w: 11.5, h: 1.0, fontFace: HEAD, fontSize: 48, color: WHITE, bold: true });
s.addText("Root-cause analysis, predictive modeling, and a quantified retention strategy", {
  x: 0.8, y: 3.1, w: 10.5, h: 0.6, fontFace: BODY, fontSize: 18, color: "CFE6E6" });
// stat strip
const tstats = [["16.8%", "baseline churn"], ["≤11%", "target churn"], ["0.97", "model ROC-AUC"], ["$490K+", "revenue protected / yr"]];
tstats.forEach((d, i) => {
  const x = 0.8 + i * 3.0;
  s.addText(d[0], { x, y: 4.5, w: 2.8, h: 0.7, fontFace: HEAD, fontSize: 32, color: MINT, bold: true, margin: 0 });
  s.addText(d[1], { x, y: 5.2, w: 2.8, h: 0.4, fontFace: BODY, fontSize: 13, color: "AFC9C9", margin: 0 });
});
s.addText("12-Phase Business Analyst Project  |  Python · SQL · Power BI", {
  x: 0.8, y: 6.6, w: 11, h: 0.4, fontFace: BODY, fontSize: 13, color: "8FB3B3" });

// =====================================================================
// SLIDE 2 — THE BUSINESS PROBLEM
// =====================================================================
s = pres.addSlide();
header(s, "Phase 1 · Business Understanding", "The Problem: Silent Revenue Leakage");
s.addText([
  { text: "1 in 6 customers churns every year", options: { bold: true, color: INK, fontSize: 18, breakLine: true, paraSpaceAfter: 8 } },
  { text: "Retention today is reactive, untargeted, and applied uniformly — we only learn a customer is unhappy when they complain, and only learn they left after they're gone.", options: { color: MUTE, fontSize: 15, breakLine: true, paraSpaceAfter: 10 } },
  { text: "Acquiring a new customer costs 5–7× more than keeping one — so every avoidable exit compounds into lost CLV and wasted acquisition spend.", options: { color: MUTE, fontSize: 15 } },
], { x: 0.6, y: 1.7, w: 6.4, h: 3.0, valign: "top", lineSpacingMultiple: 1.05 });

s.addText("Problem statement", { x: 0.6, y: 4.7, w: 6.4, h: 0.3, fontFace: BODY, fontSize: 12, bold: true, color: TEAL, charSpacing: 2 });
s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 5.05, w: 6.4, h: 1.6, fill: { color: LIGHT }, rectRadius: 0.08, shadow: sh() });
s.addText("“The business lacks visibility into the root causes of churn and a way to proactively identify at-risk customers — causing avoidable revenue loss, inefficient spend, and declining lifetime value.”",
  { x: 0.9, y: 5.2, w: 5.8, h: 1.3, fontFace: HEAD, italic: true, fontSize: 15, color: INK, valign: "middle" });

// right: impact cards
const probCards = [
  ["$1.4M", "annual revenue at risk", RED],
  ["5–7×", "cost to replace vs. retain", AMBER],
  ["~28%", "of customers have complained", TEAL],
];
probCards.forEach((c, i) => {
  const y = 1.7 + i * 1.65;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 7.4, y, w: 5.3, h: 1.4, fill: { color: WHITE }, rectRadius: 0.08, shadow: sh() });
  s.addShape(pres.shapes.OVAL, { x: 7.65, y: y + 0.32, w: 0.75, h: 0.75, fill: { color: c[2], transparency: 85 } });
  s.addText(c[0], { x: 7.6, y: y + 0.3, w: 0.85, h: 0.8, fontFace: HEAD, fontSize: 19, bold: true, color: c[2], align: "center", valign: "middle", margin: 0 });
  s.addText(c[1], { x: 8.7, y, w: 3.8, h: 1.4, fontFace: BODY, fontSize: 15, color: INK, valign: "middle" });
});

// =====================================================================
// SLIDE 3 — KPIs
// =====================================================================
s = pres.addSlide();
header(s, "Phase 1 · KPIs", "Six KPIs Steer the Initiative");
const kpis = [
  ["Churn Rate", "16.8%", "→ ≤ 11%", RED],
  ["Retention Rate", "83.2%", "→ ≥ 89%", GREEN],
  ["Customer Lifetime Value", "Baseline", "+15%", TEAL],
  ["Repeat Purchase Rate", "Baseline", "+10%", SEA],
  ["Avg Order Value (proxy)", "Baseline", "+8%", MINT],
  ["Complaint Rate", "~28%", "→ ≤ 18%", AMBER],
];
kpis.forEach((k, i) => {
  const col = i % 3, row = Math.floor(i / 3);
  const x = 0.6 + col * 4.15, y = 1.75 + row * 2.35;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 3.9, h: 2.05, fill: { color: WHITE }, rectRadius: 0.07, shadow: sh() });
  s.addShape(pres.shapes.OVAL, { x: x + 0.3, y: y + 0.32, w: 0.32, h: 0.32, fill: { color: k[3] } });
  s.addText(k[0], { x: x + 0.75, y: y + 0.28, w: 3.0, h: 0.5, fontFace: BODY, fontSize: 14, bold: true, color: INK, valign: "middle", margin: 0 });
  s.addText(k[1], { x: x + 0.3, y: y + 0.95, w: 3.3, h: 0.6, fontFace: HEAD, fontSize: 26, bold: true, color: k[3], margin: 0 });
  s.addText("Target  " + k[2], { x: x + 0.3, y: y + 1.55, w: 3.3, h: 0.35, fontFace: BODY, fontSize: 13, color: MUTE, margin: 0 });
});

// =====================================================================
// SLIDE 4 — STAKEHOLDERS
// =====================================================================
s = pres.addSlide();
header(s, "Phase 2 · Stakeholder Analysis", "Aligning Six Stakeholder Groups");
const stk = [
  ["CEO", "Quantified churn→revenue→ROI line of sight", TEAL],
  ["Marketing Mgr", "Targeted at-risk list & campaign ROI", SEA],
  ["Sales Mgr", "Higher CLV, AOV & repeat-purchase rate", MINT],
  ["Support Mgr", "Complaint→churn visibility & fast resolution", AMBER],
  ["Operations Mgr", "Fulfillment / distance impact on churn", TEAL],
  ["Customers", "Reliable delivery, fair offers, quick fixes", SEA],
];
stk.forEach((d, i) => {
  const col = i % 2, row = Math.floor(i / 2);
  const x = 0.6 + col * 6.25, y = 1.75 + row * 1.65;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 5.95, h: 1.4, fill: { color: LIGHT }, rectRadius: 0.07, shadow: sh() });
  s.addShape(pres.shapes.OVAL, { x: x + 0.25, y: y + 0.42, w: 0.55, h: 0.55, fill: { color: d[2] } });
  s.addText(d[0], { x: x + 1.0, y: y + 0.18, w: 4.7, h: 0.5, fontFace: HEAD, fontSize: 17, bold: true, color: INK, valign: "middle", margin: 0 });
  s.addText(d[1], { x: x + 1.0, y: y + 0.68, w: 4.8, h: 0.6, fontFace: BODY, fontSize: 13, color: MUTE, valign: "top", margin: 0 });
});

// =====================================================================
// SLIDE 5 — ROOT CAUSES (EDA) with chart
// =====================================================================
s = pres.addSlide();
header(s, "Phase 5 · Exploratory Data Analysis", "Why Customers Leave — Root Causes");
s.addChart(pres.charts.BAR, [{
  name: "Relative churn influence",
  labels: ["Low Tenure", "Complaint", "Low Recency", "Low Cashback", "Mobile Category", "Single Order"],
  values: [100, 78, 62, 55, 48, 40],
}], {
  x: 0.6, y: 1.7, w: 7.0, h: 5.0, barDir: "bar",
  chartColors: [TEAL],
  chartArea: { fill: { color: WHITE } },
  catAxisLabelColor: INK, catAxisLabelFontSize: 12,
  valAxisHidden: true, valGridLine: { style: "none" },
  showValue: true, dataLabelPosition: "outEnd", dataLabelColor: MUTE, dataLabelFontSize: 11,
  showLegend: false, showTitle: false, barGapWidthPct: 40,
});
const finds = [
  ["Tenure is the #1 driver", "New customers churn most — the first 90 days decide loyalty."],
  ["Complaints ≈ 2× churn", "The largest actionable lever; resolution is slow & uneven."],
  ["Recency is a leading signal", "Rising days-since-last-order predicts churn early."],
  ["Cashback retains", "Higher cashback correlates with lower churn."],
];
finds.forEach((f, i) => {
  const y = 1.75 + i * 1.27;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 7.9, y, w: 4.8, h: 1.12, fill: { color: LIGHT }, rectRadius: 0.06 });
  s.addText(f[0], { x: 8.1, y: y + 0.12, w: 4.4, h: 0.4, fontFace: HEAD, fontSize: 15, bold: true, color: TEAL, margin: 0 });
  s.addText(f[1], { x: 8.1, y: y + 0.52, w: 4.5, h: 0.55, fontFace: BODY, fontSize: 12, color: MUTE, margin: 0 });
});

// =====================================================================
// SLIDE 6 — MODEL COMPARISON
// =====================================================================
s = pres.addSlide();
header(s, "Phase 8 · Predictive Analytics", "A Predictive Early-Warning Engine");
s.addText("Four models compared; gradient boosting wins. Every customer is scored 0–1 and risk-banded, with SHAP explaining each driver.",
  { x: 0.6, y: 1.55, w: 12, h: 0.5, fontFace: BODY, fontSize: 14, color: MUTE });
s.addChart(pres.charts.BAR, [{
  name: "ROC-AUC",
  labels: ["Logistic Reg.", "Random Forest", "XGBoost", "LightGBM"],
  values: [0.89, 0.96, 0.97, 0.97],
}], {
  x: 0.6, y: 2.2, w: 7.2, h: 4.4, barDir: "col",
  chartColors: [SEA, TEAL, MINT, MINT],
  valAxisMinVal: 0.8, valAxisMaxVal: 1.0,
  catAxisLabelColor: INK, catAxisLabelFontSize: 12,
  valAxisLabelColor: MUTE, valGridLine: { color: "E2E8F0", size: 0.5 },
  showValue: true, dataLabelPosition: "outEnd", dataLabelColor: INK, dataLabelFontSize: 12,
  showLegend: false, showTitle: false, barGapWidthPct: 55,
});
// eval metric chips
s.addText("Evaluated on", { x: 8.1, y: 2.2, w: 4.6, h: 0.3, fontFace: BODY, fontSize: 12, bold: true, color: TEAL, charSpacing: 2 });
const mets = ["Accuracy", "Precision", "Recall", "F1 Score", "ROC-AUC", "SHAP drivers"];
mets.forEach((m, i) => {
  const col = i % 2, row = Math.floor(i / 2);
  const x = 8.1 + col * 2.35, y = 2.6 + row * 0.95;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 2.15, h: 0.75, fill: { color: LIGHT }, rectRadius: 0.1 });
  s.addText(m, { x, y, w: 2.15, h: 0.75, fontFace: BODY, fontSize: 13, bold: true, color: INK, align: "center", valign: "middle", margin: 0 });
});
s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 8.1, y: 5.65, w: 4.6, h: 1.0, fill: { color: TEAL }, rectRadius: 0.08, shadow: sh() });
s.addText([
  { text: "Best model: XGBoost / LightGBM\n", options: { bold: true, fontSize: 15, color: WHITE } },
  { text: "ROC-AUC ≈ 0.97  ·  Recall ≥ 0.80", options: { fontSize: 13, color: "CFE6E6" } },
], { x: 8.3, y: 5.65, w: 4.3, h: 1.0, fontFace: BODY, valign: "middle", margin: 0 });

// =====================================================================
// SLIDE 7 — RECOMMENDATIONS
// =====================================================================
s = pres.addSlide();
header(s, "Phase 9 · Recommendations", "The Retention Playbook (Do-First)");
const plays = [
  ["1", "Complaint-Resolution Overhaul", "SLA + service recovery for complaint + low-satisfaction customers — the biggest actionable lever.", "Support"],
  ["2", "90-Day Onboarding Program", "Structured nurture for new/low-tenure customers; drive the 1→3 order habit.", "Marketing / CX"],
  ["3", "Early-Warning System", "Daily churn scoring + auto-flagging to intervene before customers leave.", "Data / BI"],
  ["4", "Personalized Discounts", "Target only high-value, high-risk customers — save revenue without wasting margin.", "Marketing"],
];
plays.forEach((p, i) => {
  const col = i % 2, row = Math.floor(i / 2);
  const x = 0.6 + col * 6.25, y = 1.7 + row * 2.45;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 5.95, h: 2.2, fill: { color: WHITE }, rectRadius: 0.07, shadow: sh() });
  s.addShape(pres.shapes.OVAL, { x: x + 0.3, y: y + 0.3, w: 0.7, h: 0.7, fill: { color: TEAL } });
  s.addText(p[0], { x: x + 0.3, y: y + 0.3, w: 0.7, h: 0.7, fontFace: HEAD, fontSize: 24, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0 });
  s.addText(p[1], { x: x + 1.2, y: y + 0.28, w: 4.5, h: 0.7, fontFace: HEAD, fontSize: 16, bold: true, color: INK, valign: "middle", margin: 0 });
  s.addText(p[2], { x: x + 1.2, y: y + 0.95, w: 4.55, h: 0.85, fontFace: BODY, fontSize: 12.5, color: MUTE, margin: 0 });
  s.addText("Owner: " + p[3], { x: x + 1.2, y: y + 1.78, w: 4.5, h: 0.32, fontFace: BODY, fontSize: 11, bold: true, color: TEAL, margin: 0 });
});

// =====================================================================
// SLIDE 8 — BUSINESS IMPACT / ROI
// =====================================================================
s = pres.addSlide();
header(s, "Phase 10 · Business Impact", "The Business Case");
const impact = [
  ["−5.8 pts", "churn reduction\n16.8% → ≤11%", MINT],
  ["~328", "customers retained\nper year", SEA],
  ["$492K", "revenue protected\nper year", TEAL],
  ["28–285%", "projected ROI\n(direct → incl. CLV)", GREEN],
];
impact.forEach((d, i) => {
  const x = 0.6 + i * 3.12;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.8, w: 2.9, h: 2.0, fill: { color: WHITE }, rectRadius: 0.08, shadow: sh() });
  s.addText(d[0], { x, y: 2.05, w: 2.9, h: 0.8, fontFace: HEAD, fontSize: 30, bold: true, color: d[2], align: "center", margin: 0 });
  s.addText(d[1], { x: x + 0.15, y: 2.9, w: 2.6, h: 0.8, fontFace: BODY, fontSize: 13, color: MUTE, align: "center", margin: 0 });
});
// payback + cost line
s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 4.1, w: 12.1, h: 1.05, fill: { color: LIGHT }, rectRadius: 0.07 });
s.addText([
  { text: "Program cost ≈ $180K/yr", options: { bold: true, color: INK } },
  { text: "      Payback ≈ 9–10 months", options: { color: MUTE } },
  { text: "      Break-even at ~27% play effectiveness", options: { color: MUTE } },
], { x: 1.0, y: 4.1, w: 11.3, h: 1.05, fontFace: BODY, fontSize: 15, valign: "middle", margin: 0 });
s.addText("Conservative, transparent model on 5,630 customers. CLV uplift comes from extending average customer lifespan (1/churn) from ~5.9 to ~9.1 years (+53%).",
  { x: 0.6, y: 5.45, w: 12.1, h: 0.9, fontFace: BODY, italic: true, fontSize: 13, color: MUTE });

// =====================================================================
// SLIDE 9 — ROADMAP
// =====================================================================
s = pres.addSlide();
header(s, "Delivery", "Four-Quarter Roadmap");
const road = [
  ["Q1", "Foundation", "Data prep, EDA, model build & validation, KPI dashboards.", TEAL],
  ["Q2", "Deploy", "Launch early-warning; P1 plays — complaints, onboarding, targeted discounts.", SEA],
  ["Q3", "Scale", "Loyalty, win-back & VIP programs; measure campaign uplift.", MINT],
  ["Q4", "Optimize", "Tune plays; confirm churn ≤11%; deliver ROI report.", GREEN],
];
s.addShape(pres.shapes.LINE, { x: 1.0, y: 4.0, w: 11.3, h: 0, line: { color: "D6E4E4", width: 2 } });
road.forEach((r, i) => {
  const x = 0.8 + i * 3.0;
  s.addShape(pres.shapes.OVAL, { x: x + 1.05, y: 3.78, w: 0.45, h: 0.45, fill: { color: r[3] } });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.9, w: 2.7, h: 1.65, fill: { color: WHITE }, rectRadius: 0.07, shadow: sh() });
  s.addText(r[0], { x: x + 0.25, y: 2.05, w: 2.2, h: 0.5, fontFace: HEAD, fontSize: 22, bold: true, color: r[3], margin: 0 });
  s.addText(r[1], { x: x + 0.25, y: 2.55, w: 2.3, h: 0.35, fontFace: BODY, fontSize: 14, bold: true, color: INK, margin: 0 });
  s.addText(r[2], { x: x + 0.25, y: 2.92, w: 2.35, h: 0.6, fontFace: BODY, fontSize: 11, color: MUTE, margin: 0 });
  // alternate cards below the line for visual rhythm
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 4.45, w: 2.7, h: 0.9, fill: { color: LIGHT }, rectRadius: 0.07 });
  s.addText("Milestone " + (i + 1), { x, y: 4.45, w: 2.7, h: 0.9, fontFace: BODY, fontSize: 13, bold: true, color: r[3], align: "center", valign: "middle", margin: 0 });
});
s.addText("Targets: churn ≤11%  ·  retention ≥89%  ·  complaint rate ≤18%  ·  positive, monitored ROI",
  { x: 0.6, y: 5.9, w: 12.1, h: 0.5, fontFace: BODY, fontSize: 14, italic: true, color: MUTE, align: "center" });

// =====================================================================
// SLIDE 10 — CLOSING
// =====================================================================
s = pres.addSlide();
s.background = { color: DARK };
s.addShape(pres.shapes.OVAL, { x: -2.0, y: 4.0, w: 5.5, h: 5.5, fill: { color: TEAL, transparency: 75 } });
s.addShape(pres.shapes.OVAL, { x: 10.8, y: -2.0, w: 5.0, h: 5.0, fill: { color: MINT, transparency: 82 } });
s.addText("THE ASK", { x: 0.9, y: 1.5, w: 8, h: 0.4, fontFace: BODY, fontSize: 14, color: MINT, bold: true, charSpacing: 4 });
s.addText("We know who will churn, why, and what to do.", {
  x: 0.9, y: 2.0, w: 11.3, h: 1.4, fontFace: HEAD, fontSize: 36, bold: true, color: WHITE, lineSpacingMultiple: 1.0 });
s.addText("Approve the $180K/yr retention program and 4-quarter rollout to cut churn to ≤11% — protecting $490K+ in annual revenue at a projected 28–285% ROI.",
  { x: 0.9, y: 3.7, w: 10.8, h: 1.0, fontFace: BODY, fontSize: 17, color: "CFE6E6", lineSpacingMultiple: 1.05 });
s.addText("The remaining step is to act.", {
  x: 0.9, y: 4.9, w: 10, h: 0.5, fontFace: HEAD, italic: true, fontSize: 18, color: MINT });
s.addText("Business Analysis Project  ·  E-Commerce Customer Churn  ·  Python · SQL · Power BI",
  { x: 0.9, y: 6.7, w: 11.5, h: 0.4, fontFace: BODY, fontSize: 12, color: "8FB3B3" });

pres.writeFile({ fileName: "E-Commerce-Churn-Business-Analysis.pptx" }).then(f => console.log("WROTE", f));
