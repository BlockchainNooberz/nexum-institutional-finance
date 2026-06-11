import React from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

export default function MetricCard({ title, value, change, changeLabel, icon: Icon, accentColor = "text-primary", delay = 0 }) {
  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-card border border-border rounded-xl p-5 hover:border-primary/20 transition-all duration-300 group"
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
        {Icon && (
          <div className={cn("p-2 rounded-lg bg-secondary", accentColor)}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
      <p className="text-2xl font-bold font-heading text-foreground mb-1">{value}</p>
      {change !== undefined && (
        <div className="flex items-center gap-1.5">
          {isPositive ? (
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5 text-red-400" />
          )}
          <span className={cn("text-xs font-medium", isPositive ? "text-emerald-400" : "text-red-400")}>
            {isPositive ? "+" : ""}{change}%
          </span>
          {changeLabel && <span className="text-xs text-muted-foreground">{changeLabel}</span>}
        </div>
      )}
    </motion.div>
  );
}