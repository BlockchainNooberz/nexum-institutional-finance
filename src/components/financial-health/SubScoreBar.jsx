import React from "react";
import { WEIGHTS } from "@/lib/financialHealthAlgorithm";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const LABELS = {
  debt_vs_income: "Debt-to-Income",
  spending_quality: "Spending Quality",
  savings_rate: "Savings Rate",
  financial_literacy: "Financial Literacy",
  emergency_fund: "Emergency Fund",
  investment_activity: "Investment Activity",
  impulse_spending: "Impulse Control",
};

function scoreColor(score) {
  if (score >= 75) return { bar: "bg-emerald-500", text: "text-emerald-400" };
  if (score >= 55) return { bar: "bg-sky-500", text: "text-sky-400" };
  if (score >= 40) return { bar: "bg-amber-500", text: "text-amber-400" };
  if (score >= 25) return { bar: "bg-orange-500", text: "text-orange-400" };
  return { bar: "bg-red-500", text: "text-red-400" };
}

export default function SubScoreBar({ subScores, delay = 0 }) {
  return (
    <div className="space-y-3">
      {Object.entries(subScores).map(([key, score], i) => {
        const colors = scoreColor(score);
        const weight = Math.round((WEIGHTS[key] || 0) * 100);
        return (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + i * 0.05 }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs text-foreground">{LABELS[key]}</span>
                <span className="text-[9px] text-muted-foreground font-mono">×{weight}%</span>
              </div>
              <span className={cn("text-xs font-bold font-mono", colors.text)}>{score}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className={cn("h-full rounded-full", colors.bar)}
                  initial={{ width: 0 }}
                  animate={{ width: `${score}%` }}
                  transition={{ duration: 1, delay: delay + i * 0.06 + 0.1 }}
                />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}