import React from "react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";

const LITERACY_LABELS = {
  has_retirement_account: "Retirement\nAccount",
  understands_compound_interest: "Compound\nInterest",
  reads_statements: "Reads\nStatements",
  has_budget: "Has\nBudget",
  pays_full_credit_balance: "Pays\nFull CC",
  has_will_or_estate_plan: "Estate\nPlan",
  has_life_insurance: "Life\nInsurance",
};

export default function LiteracyRadar({ behaviors }) {
  const data = Object.entries(LITERACY_LABELS).map(([key, label]) => ({
    subject: label,
    value: behaviors[key] ? 100 : 0,
  }));

  return (
    <div className="h-56">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke="hsl(222, 20%, 16%)" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 9 }}
          />
          <Radar
            name="Literacy"
            dataKey="value"
            stroke="hsl(43, 96%, 56%)"
            fill="hsl(43, 96%, 56%)"
            fillOpacity={0.25}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}