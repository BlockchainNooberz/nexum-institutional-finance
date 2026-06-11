import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const LABELS = {
  debt_vs_income: "Debt-to-Income Ratio",
  spending_quality: "Spending Quality",
  savings_rate: "Savings Rate",
  financial_literacy: "Financial Literacy",
  emergency_fund: "Emergency Fund",
  investment_activity: "Investment Activity",
  impulse_spending: "Impulse Control",
};

export default function WeightEditor({ weights, onChange }) {
  const total = Object.values(weights).reduce((a, b) => a + b, 0);

  const handleChange = (key, rawVal) => {
    const val = Math.max(0, Math.min(0.5, parseFloat(rawVal) / 100));
    onChange({ ...weights, [key]: val });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">Adjust algorithm weights (total must = 100%)</p>
        <span className={cn(
          "text-xs font-mono font-bold px-2 py-0.5 rounded",
          Math.abs(total - 1) < 0.01 ? "text-emerald-400 bg-emerald-400/10" : "text-red-400 bg-red-400/10"
        )}>
          Total: {Math.round(total * 100)}%
        </span>
      </div>
      {Object.entries(weights).map(([key, val], i) => (
        <motion.div
          key={key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.04 }}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-foreground">{LABELS[key]}</span>
            <span className="text-xs font-mono text-primary">{Math.round(val * 100)}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={50}
            step={1}
            value={Math.round(val * 100)}
            onChange={e => handleChange(key, e.target.value)}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-primary"
            style={{ background: `linear-gradient(to right, hsl(43,96%,56%) ${val * 200}%, hsl(222,30%,14%) ${val * 200}%)` }}
          />
        </motion.div>
      ))}
    </div>
  );
}