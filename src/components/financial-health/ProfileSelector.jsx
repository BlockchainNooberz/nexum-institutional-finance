import React from "react";
import { cn } from "@/lib/utils";
import { computeFinancialHealthScore } from "@/lib/financialHealthAlgorithm";
import { motion } from "framer-motion";

function tierBg(tier) {
  if (tier === "Excellent") return "border-emerald-500/40 bg-emerald-500/5";
  if (tier === "Good") return "border-sky-500/40 bg-sky-500/5";
  if (tier === "Fair") return "border-amber-500/40 bg-amber-500/5";
  if (tier === "At Risk") return "border-orange-500/40 bg-orange-500/5";
  return "border-red-500/40 bg-red-500/5";
}

function scorePill(score) {
  if (score >= 80) return "bg-emerald-400/15 text-emerald-400";
  if (score >= 65) return "bg-sky-400/15 text-sky-400";
  if (score >= 50) return "bg-amber-400/15 text-amber-400";
  if (score >= 35) return "bg-orange-400/15 text-orange-400";
  return "bg-red-400/15 text-red-400";
}

export default function ProfileSelector({ profiles, selectedId, onSelect }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {profiles.map((profile, i) => {
        const { composite, tier } = computeFinancialHealthScore(profile);
        const isSelected = profile.id === selectedId;
        return (
          <motion.button
            key={profile.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onSelect(profile.id)}
            className={cn(
              "p-3 rounded-xl border text-left transition-all duration-200",
              tierBg(tier),
              isSelected && "ring-2 ring-primary ring-offset-2 ring-offset-background"
            )}
          >
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center mb-2">
              <span className="text-xs font-bold text-foreground">{profile.name.split(" ")[0][0]}{profile.name.split(" ")[1][0]}</span>
            </div>
            <p className="text-xs font-semibold text-foreground truncate">{profile.name}</p>
            <p className="text-[10px] text-muted-foreground">{profile.income_bracket}</p>
            <div className={cn("mt-2 text-xs font-bold px-2 py-0.5 rounded-full inline-block", scorePill(composite))}>
              {composite}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}