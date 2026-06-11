import React from "react";
import { cn } from "@/lib/utils";

const variants = {
  success: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
  warning: "bg-amber-400/10 text-amber-400 border-amber-400/20",
  danger: "bg-red-400/10 text-red-400 border-red-400/20",
  info: "bg-sky-400/10 text-sky-400 border-sky-400/20",
  neutral: "bg-muted text-muted-foreground border-border",
  primary: "bg-primary/10 text-primary border-primary/20",
};

export default function StatusBadge({ label, variant = "neutral" }) {
  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded-full border", variants[variant])}>
      {label}
    </span>
  );
}