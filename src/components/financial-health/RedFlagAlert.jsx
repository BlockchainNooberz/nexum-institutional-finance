import React from "react";
import { AlertTriangle, XOctagon, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const SEVERITY_CONFIG = {
  critical: {
    icon: XOctagon,
    bg: "bg-red-500/10 border-red-500/30",
    text: "text-red-400",
    badge: "bg-red-500/20 text-red-300",
    label: "CRITICAL",
  },
  high: {
    icon: AlertTriangle,
    bg: "bg-orange-500/10 border-orange-500/30",
    text: "text-orange-400",
    badge: "bg-orange-500/20 text-orange-300",
    label: "HIGH",
  },
  medium: {
    icon: AlertCircle,
    bg: "bg-amber-500/10 border-amber-500/30",
    text: "text-amber-400",
    badge: "bg-amber-500/20 text-amber-300",
    label: "MEDIUM",
  },
};

export default function RedFlagAlert({ flags, delay = 0 }) {
  if (!flags || flags.length === 0) return (
    <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
      <span className="text-emerald-400 text-sm font-medium">✓ No red flags detected</span>
    </div>
  );

  return (
    <div className="space-y-2">
      {flags.map((flag, i) => {
        const cfg = SEVERITY_CONFIG[flag.severity] || SEVERITY_CONFIG.medium;
        const Icon = cfg.icon;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + i * 0.07 }}
            className={cn("flex items-start gap-3 p-3 rounded-lg border", cfg.bg)}
          >
            <Icon className={cn("w-4 h-4 mt-0.5 flex-shrink-0", cfg.text)} />
            <div className="flex-1 min-w-0">
              <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded mr-2", cfg.badge)}>
                {cfg.label}
              </span>
              <span className="text-xs text-foreground">{flag.message}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}