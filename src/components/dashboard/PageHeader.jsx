import React from "react";
import { motion } from "framer-motion";

export default function PageHeader({ title, subtitle, badge }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-8"
    >
      <div className="flex items-center gap-3 mb-1">
        <h1 className="text-2xl font-heading font-bold text-foreground">{title}</h1>
        {badge && (
          <span className="px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-primary/10 text-primary rounded-full border border-primary/20">
            {badge}
          </span>
        )}
      </div>
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
    </motion.div>
  );
}