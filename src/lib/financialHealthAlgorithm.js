/**
 * CITIZEN FINANCIAL HEALTH ALGORITHM
 * Weighted scoring engine that analyzes spending patterns, debt behavior,
 * financial literacy, and purchase quality to generate composite health scores.
 */

// ─── WEIGHT CONFIGURATION ────────────────────────────────────────────────────
export const WEIGHTS = {
  debt_vs_income: 0.25,        // Debt-to-income ratio impact
  spending_quality: 0.20,      // Quality/necessity of purchases
  savings_rate: 0.18,          // % of income being saved
  financial_literacy: 0.15,    // Knowledge & behavior score
  emergency_fund: 0.10,        // Months of runway
  investment_activity: 0.08,   // Participation in wealth-building
  impulse_spending: 0.04,      // Frequency of non-essential impulse buys
};

// ─── CATEGORY CLASSIFICATION ─────────────────────────────────────────────────
export const CATEGORY_SCORES = {
  // HIGH VALUE (70-100)
  housing: { score: 90, label: "Essential", tier: "essential", color: "emerald" },
  healthcare: { score: 95, label: "Essential", tier: "essential", color: "emerald" },
  education: { score: 92, label: "Investment", tier: "investment", color: "sky" },
  groceries: { score: 85, label: "Essential", tier: "essential", color: "emerald" },
  utilities: { score: 88, label: "Essential", tier: "essential", color: "emerald" },
  transportation: { score: 75, label: "Essential", tier: "essential", color: "emerald" },
  retirement_savings: { score: 98, label: "Investment", tier: "investment", color: "sky" },
  investments: { score: 97, label: "Investment", tier: "investment", color: "sky" },
  insurance: { score: 82, label: "Essential", tier: "essential", color: "emerald" },
  childcare: { score: 88, label: "Essential", tier: "essential", color: "emerald" },

  // MODERATE VALUE (40-69)
  dining: { score: 55, label: "Discretionary", tier: "discretionary", color: "amber" },
  clothing: { score: 60, label: "Discretionary", tier: "discretionary", color: "amber" },
  fitness: { score: 65, label: "Wellness", tier: "discretionary", color: "amber" },
  personal_care: { score: 62, label: "Personal", tier: "discretionary", color: "amber" },
  entertainment: { score: 50, label: "Leisure", tier: "discretionary", color: "amber" },
  streaming: { score: 52, label: "Leisure", tier: "discretionary", color: "amber" },
  travel: { score: 58, label: "Lifestyle", tier: "discretionary", color: "amber" },

  // LOW VALUE / RED FLAGS (0-39)
  fast_food: { score: 25, label: "Low Value", tier: "wasteful", color: "red" },
  junk_food: { score: 20, label: "Low Value", tier: "wasteful", color: "red" },
  gambling: { score: 5, label: "High Risk", tier: "wasteful", color: "red" },
  alcohol: { score: 18, label: "Low Value", tier: "wasteful", color: "red" },
  tobacco: { score: 10, label: "Detrimental", tier: "wasteful", color: "red" },
  lottery: { score: 8, label: "High Risk", tier: "wasteful", color: "red" },
  impulse_purchases: { score: 22, label: "Impulsive", tier: "wasteful", color: "red" },
  luxury_debt: { score: 15, label: "Debt Risk", tier: "wasteful", color: "red" },
  payday_loans: { score: 2, label: "Debt Trap", tier: "wasteful", color: "red" },
  buy_now_pay_later: { score: 28, label: "Debt Risk", tier: "wasteful", color: "orange" },
};

// ─── CORE SCORING FUNCTIONS ───────────────────────────────────────────────────

/**
 * Calculates debt-to-income score (inverted — lower DTI = higher score)
 * @param {number} dti - Debt-to-income ratio (0-1)
 */
export function scoreDebtToIncome(dti) {
  if (dti <= 0.15) return 100;
  if (dti <= 0.28) return 85;
  if (dti <= 0.36) return 68;
  if (dti <= 0.43) return 50;
  if (dti <= 0.50) return 30;
  if (dti <= 0.65) return 15;
  return 5;
}

/**
 * Calculates spending quality score from category breakdown
 * @param {object} spendingByCategory - { category: percentOfSpend }
 */
export function scoreSpendingQuality(spendingByCategory) {
  let weightedTotal = 0;
  let totalPct = 0;
  for (const [cat, pct] of Object.entries(spendingByCategory)) {
    const catData = CATEGORY_SCORES[cat];
    if (catData) {
      // Penalty multiplier: if in debt AND spending on wasteful categories
      weightedTotal += catData.score * pct;
      totalPct += pct;
    }
  }
  return totalPct > 0 ? Math.round(weightedTotal / totalPct) : 50;
}

/**
 * Scores savings rate
 * @param {number} rate - Savings as % of income (0-1)
 */
export function scoreSavingsRate(rate) {
  if (rate >= 0.30) return 100;
  if (rate >= 0.20) return 88;
  if (rate >= 0.15) return 75;
  if (rate >= 0.10) return 60;
  if (rate >= 0.05) return 42;
  if (rate > 0) return 25;
  return 0;
}

/**
 * Scores financial literacy based on behaviors
 * @param {object} behaviors - { hasEmergencyFund, hasRetirementAccount, understandsInterest, etc }
 */
export function scoreFinancialLiteracy(behaviors) {
  const items = [
    { key: "has_retirement_account", weight: 20 },
    { key: "understands_compound_interest", weight: 15 },
    { key: "reads_statements", weight: 10 },
    { key: "has_budget", weight: 20 },
    { key: "pays_full_credit_balance", weight: 15 },
    { key: "has_will_or_estate_plan", weight: 10 },
    { key: "has_life_insurance", weight: 10 },
  ];
  let score = 0;
  for (const item of items) {
    if (behaviors[item.key]) score += item.weight;
  }
  return Math.min(100, score);
}

/**
 * Scores emergency fund adequacy
 * @param {number} months - Months of expenses covered
 */
export function scoreEmergencyFund(months) {
  if (months >= 12) return 100;
  if (months >= 6) return 85;
  if (months >= 3) return 65;
  if (months >= 1) return 40;
  if (months > 0) return 20;
  return 0;
}

/**
 * COMPOSITE FINANCIAL HEALTH SCORE
 * Returns a 0-100 score with breakdown and red flags
 */
export function computeFinancialHealthScore(profile) {
  const subScores = {
    debt_vs_income: scoreDebtToIncome(profile.debt_to_income_ratio),
    spending_quality: scoreSpendingQuality(profile.spending_by_category),
    savings_rate: scoreSavingsRate(profile.savings_rate),
    financial_literacy: scoreFinancialLiteracy(profile.literacy_behaviors),
    emergency_fund: scoreEmergencyFund(profile.emergency_fund_months),
    investment_activity: profile.has_investments ? 80 + Math.min(20, profile.investment_months * 2) : 10,
    impulse_spending: Math.max(0, 100 - (profile.impulse_spend_pct * 200)),
  };

  let composite = 0;
  for (const [key, weight] of Object.entries(WEIGHTS)) {
    composite += (subScores[key] || 0) * weight;
  }
  composite = Math.round(composite);

  // ── Red Flag Detection ──
  const redFlags = [];
  const s = profile.spending_by_category || {};

  if (profile.debt_to_income_ratio > 0.43 && (s.fast_food || 0) + (s.junk_food || 0) + (s.gambling || 0) > 0.08)
    redFlags.push({ severity: "critical", message: "High debt combined with significant wasteful spending" });
  if ((s.payday_loans || 0) > 0)
    redFlags.push({ severity: "critical", message: "Payday loan usage detected — debt trap risk" });
  if ((s.gambling || 0) + (s.lottery || 0) > 0.05)
    redFlags.push({ severity: "high", message: "Gambling/lottery spending exceeds 5% of budget" });
  if (profile.savings_rate <= 0 && profile.debt_to_income_ratio > 0.36)
    redFlags.push({ severity: "critical", message: "Zero savings with elevated debt — financially vulnerable" });
  if ((s.fast_food || 0) + (s.junk_food || 0) > 0.15 && profile.debt_to_income_ratio > 0.3)
    redFlags.push({ severity: "high", message: "15%+ budget on fast/junk food while carrying significant debt" });
  if ((s.buy_now_pay_later || 0) > 0.08)
    redFlags.push({ severity: "medium", message: "High BNPL usage — hidden debt accumulation risk" });
  if (!profile.literacy_behaviors?.has_budget && profile.debt_to_income_ratio > 0.36)
    redFlags.push({ severity: "medium", message: "No budget plan while managing above-average debt" });

  // ── Health Tier ──
  let tier, tierColor;
  if (composite >= 80) { tier = "Excellent"; tierColor = "emerald"; }
  else if (composite >= 65) { tier = "Good"; tierColor = "sky"; }
  else if (composite >= 50) { tier = "Fair"; tierColor = "amber"; }
  else if (composite >= 35) { tier = "At Risk"; tierColor = "orange"; }
  else { tier = "Critical"; tierColor = "red"; }

  return { composite, subScores, redFlags, tier, tierColor };
}

// ─── POPULATION PROFILES (sample cohort data) ────────────────────────────────
export const SAMPLE_PROFILES = [
  {
    id: "P001",
    name: "Sarah M.",
    age: 34,
    income_bracket: "$45K–$65K",
    segment: "Middle Income",
    debt_to_income_ratio: 0.52,
    savings_rate: 0.02,
    emergency_fund_months: 0.5,
    has_investments: false,
    investment_months: 0,
    impulse_spend_pct: 0.18,
    spending_by_category: {
      fast_food: 0.14, junk_food: 0.06, entertainment: 0.12, clothing: 0.10,
      buy_now_pay_later: 0.09, housing: 0.30, utilities: 0.08, groceries: 0.06, transportation: 0.05,
    },
    literacy_behaviors: {
      has_retirement_account: false, understands_compound_interest: false,
      reads_statements: false, has_budget: false,
      pays_full_credit_balance: false, has_will_or_estate_plan: false, has_life_insurance: false,
    },
  },
  {
    id: "P002",
    name: "Marcus T.",
    age: 28,
    income_bracket: "$25K–$40K",
    segment: "Lower Income",
    debt_to_income_ratio: 0.68,
    savings_rate: 0.00,
    emergency_fund_months: 0,
    has_investments: false,
    investment_months: 0,
    impulse_spend_pct: 0.22,
    spending_by_category: {
      fast_food: 0.18, junk_food: 0.08, alcohol: 0.06, gambling: 0.04, lottery: 0.03,
      payday_loans: 0.05, housing: 0.28, utilities: 0.10, transportation: 0.10, clothing: 0.08,
    },
    literacy_behaviors: {
      has_retirement_account: false, understands_compound_interest: false,
      reads_statements: false, has_budget: false,
      pays_full_credit_balance: false, has_will_or_estate_plan: false, has_life_insurance: false,
    },
  },
  {
    id: "P003",
    name: "Jennifer K.",
    age: 42,
    income_bracket: "$85K–$120K",
    segment: "Upper Middle",
    debt_to_income_ratio: 0.28,
    savings_rate: 0.15,
    emergency_fund_months: 4,
    has_investments: true,
    investment_months: 36,
    impulse_spend_pct: 0.08,
    spending_by_category: {
      housing: 0.28, groceries: 0.10, transportation: 0.08, healthcare: 0.05,
      dining: 0.08, entertainment: 0.06, fitness: 0.04, streaming: 0.02,
      investments: 0.12, retirement_savings: 0.08, clothing: 0.05, personal_care: 0.04,
    },
    literacy_behaviors: {
      has_retirement_account: true, understands_compound_interest: true,
      reads_statements: true, has_budget: true,
      pays_full_credit_balance: true, has_will_or_estate_plan: false, has_life_insurance: true,
    },
  },
  {
    id: "P004",
    name: "David R.",
    age: 52,
    income_bracket: "$180K+",
    segment: "High Income",
    debt_to_income_ratio: 0.12,
    savings_rate: 0.32,
    emergency_fund_months: 18,
    has_investments: true,
    investment_months: 120,
    impulse_spend_pct: 0.03,
    spending_by_category: {
      housing: 0.22, groceries: 0.06, transportation: 0.05, healthcare: 0.04,
      dining: 0.07, travel: 0.08, fitness: 0.03, education: 0.04,
      investments: 0.18, retirement_savings: 0.14, insurance: 0.05, personal_care: 0.04,
    },
    literacy_behaviors: {
      has_retirement_account: true, understands_compound_interest: true,
      reads_statements: true, has_budget: true,
      pays_full_credit_balance: true, has_will_or_estate_plan: true, has_life_insurance: true,
    },
  },
  {
    id: "P005",
    name: "Aisha W.",
    age: 26,
    income_bracket: "$35K–$50K",
    segment: "Young Adult",
    debt_to_income_ratio: 0.44,
    savings_rate: 0.07,
    emergency_fund_months: 1.5,
    has_investments: true,
    investment_months: 8,
    impulse_spend_pct: 0.13,
    spending_by_category: {
      housing: 0.32, groceries: 0.09, transportation: 0.09, fast_food: 0.09,
      entertainment: 0.08, clothing: 0.07, streaming: 0.03, junk_food: 0.04,
      buy_now_pay_later: 0.06, investments: 0.06, utilities: 0.07,
    },
    literacy_behaviors: {
      has_retirement_account: false, understands_compound_interest: true,
      reads_statements: true, has_budget: true,
      pays_full_credit_balance: false, has_will_or_estate_plan: false, has_life_insurance: false,
    },
  },
  {
    id: "P006",
    name: "Carlos B.",
    age: 38,
    income_bracket: "$55K–$75K",
    segment: "Middle Income",
    debt_to_income_ratio: 0.38,
    savings_rate: 0.10,
    emergency_fund_months: 3,
    has_investments: true,
    investment_months: 24,
    impulse_spend_pct: 0.09,
    spending_by_category: {
      housing: 0.30, groceries: 0.10, transportation: 0.10, dining: 0.08,
      entertainment: 0.07, healthcare: 0.04, fast_food: 0.06, clothing: 0.06,
      retirement_savings: 0.08, utilities: 0.08, fitness: 0.03,
    },
    literacy_behaviors: {
      has_retirement_account: true, understands_compound_interest: true,
      reads_statements: false, has_budget: true,
      pays_full_credit_balance: false, has_will_or_estate_plan: false, has_life_insurance: true,
    },
  },
];