import React from "react";
import { SAMPLE_PROFILES, computeFinancialHealthScore, CATEGORY_SCORES } from "@/lib/financialHealthAlgorithm";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Aggregate population-level spending patterns
function aggregateSpending(profiles) {
  const totals = {};
  const counts = {};
  for (const p of profiles) {
    for (const [cat, pct] of Object.entries(p.spending_by_category)) {
      totals[cat] = (totals[cat] || 0) + pct;
      counts[cat] = (counts[cat] || 0) + 1;
    }
  }
  return Object.entries(totals)
    .map(([cat, total]) => ({
      cat,
      avgPct: total / profiles.length,
      catData: CATEGORY_SCORES[cat],
    }))
    .filter(e => e.catData)
    .sort((a, b) => b.avgPct - a.avgPct);
}

const TIER_CELL = {
  essential: "bg-emerald-500/20 border-emerald-500/30 text-emerald-300",
  investment: "bg-sky-500/20 border-sky-500/30 text-sky-300",
  discretionary: "bg-amber-500/20 border-amber-500/30 text-amber-300",
  wasteful: "bg-red-500/20 border-red-500/30 text-red-300",
};

export default function PopulationHeatmap({ profiles }) {
  const data = aggregateSpending(profiles);

  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
      {data.map((item, i) => {
        const tier = item.catData?.tier || "discretionary";
        return (
          <motion.div
            key={item.cat}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03 }}
            className={cn(
              "border rounded-lg p-2.5 text-center cursor-default",
              TIER_CELL[tier]
            )}
            title={`Avg: ${Math.round(item.avgPct * 100)}% of budget`}
          >
            <p className="text-[10px] font-semibold capitalize leading-tight mb-1">
              {item.cat.replace(/_/g, " ")}
            </p>
            <p className="text-sm font-bold font-mono">{Math.round(item.avgPct * 100)}%</p>
            <p className="text-[9px] opacity-70 mt-0.5">{item.catData.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
}