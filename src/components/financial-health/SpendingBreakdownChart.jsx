import React from "react";
import { CATEGORY_SCORES } from "@/lib/financialHealthAlgorithm";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const TIER_COLORS = {
  essential: { bar: "bg-emerald-500", text: "text-emerald-400", label: "bg-emerald-400/10 text-emerald-400" },
  investment: { bar: "bg-sky-500", text: "text-sky-400", label: "bg-sky-400/10 text-sky-400" },
  discretionary: { bar: "bg-amber-500", text: "text-amber-400", label: "bg-amber-400/10 text-amber-400" },
  wasteful: { bar: "bg-red-500", text: "text-red-400", label: "bg-red-400/10 text-red-400" },
};

export default function SpendingBreakdownChart({ spendingByCategory }) {
  const entries = Object.entries(spendingByCategory)
    .map(([cat, pct]) => ({
      cat,
      pct,
      ...CATEGORY_SCORES[cat],
    }))
    .filter(e => e.tier)
    .sort((a, b) => b.pct - a.pct);

  return (
    <div className="space-y-3">
      {entries.map((item, i) => {
        const colors = TIER_COLORS[item.tier] || TIER_COLORS.discretionary;
        return (
          <motion.div
            key={item.cat}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs text-foreground capitalize">{item.cat.replace(/_/g, " ")}</span>
                <span className={cn("text-[9px] px-1.5 py-0.5 rounded font-medium", colors.label)}>
                  {item.label}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-muted-foreground">{Math.round(item.pct * 100)}%</span>
                <span className={cn("text-[10px] font-bold font-mono", colors.text)}>
                  {item.score}/100
                </span>
              </div>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className={cn("h-full rounded-full", colors.bar)}
                initial={{ width: 0 }}
                animate={{ width: `${item.pct * 100}%` }}
                transition={{ duration: 0.8, delay: i * 0.04 + 0.2 }}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}