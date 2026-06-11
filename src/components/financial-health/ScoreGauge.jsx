import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const TIER_COLORS = {
  emerald: { stroke: "hsl(142, 71%, 45%)", text: "text-emerald-400", bg: "bg-emerald-400/10" },
  sky: { stroke: "hsl(199, 89%, 48%)", text: "text-sky-400", bg: "bg-sky-400/10" },
  amber: { stroke: "hsl(43, 96%, 56%)", text: "text-amber-400", bg: "bg-amber-400/10" },
  orange: { stroke: "hsl(25, 95%, 53%)", text: "text-orange-400", bg: "bg-orange-400/10" },
  red: { stroke: "hsl(0, 72%, 51%)", text: "text-red-400", bg: "bg-red-400/10" },
};

export default function ScoreGauge({ score, tier, tierColor, size = 160 }) {
  const colors = TIER_COLORS[tierColor] || TIER_COLORS.amber;

  // Arc from -210° to 30° (240° sweep)
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.38;
  const startAngle = -210;
  const sweepAngle = 240;
  const scoreAngle = startAngle + (score / 100) * sweepAngle;

  const toRad = (deg) => (deg * Math.PI) / 180;
  const arcPath = (start, sweep) => {
    const end = start + sweep;
    const x1 = cx + r * Math.cos(toRad(start));
    const y1 = cy + r * Math.sin(toRad(start));
    const x2 = cx + r * Math.cos(toRad(end));
    const y2 = cy + r * Math.sin(toRad(end));
    const large = sweep > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
  };

  // Needle tip
  const needleX = cx + (r - 8) * Math.cos(toRad(scoreAngle));
  const needleY = cy + (r - 8) * Math.sin(toRad(scoreAngle));

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size * 0.75} viewBox={`0 0 ${size} ${size * 0.78}`}>
        {/* Track */}
        <path d={arcPath(startAngle, sweepAngle)} fill="none" stroke="hsl(222, 30%, 14%)" strokeWidth={size * 0.075} strokeLinecap="round" />
        {/* Fill arc */}
        <motion.path
          d={arcPath(startAngle, sweepAngle)}
          fill="none"
          stroke={colors.stroke}
          strokeWidth={size * 0.075}
          strokeLinecap="round"
          strokeDasharray={`${r * toRad(sweepAngle)} ${r * 2 * Math.PI}`}
          initial={{ strokeDashoffset: r * toRad(sweepAngle) }}
          animate={{ strokeDashoffset: r * toRad(sweepAngle) * (1 - score / 100) }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ strokeDashoffset: undefined }}
        />
        {/* Needle dot */}
        <motion.circle
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, cx: needleX, cy: needleY }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          r={size * 0.045}
          fill={colors.stroke}
          filter="drop-shadow(0 0 4px rgba(255,255,255,0.3))"
        />
        {/* Score text */}
        <text x={cx} y={cy + size * 0.08} textAnchor="middle" fill="white" fontSize={size * 0.22} fontWeight="700" fontFamily="Inter">
          {score}
        </text>
        <text x={cx} y={cy + size * 0.22} textAnchor="middle" fill="hsl(215, 20%, 55%)" fontSize={size * 0.08} fontFamily="Inter">
          / 100
        </text>
      </svg>
      <span className={cn("text-xs font-bold px-3 py-1 rounded-full border", colors.text, colors.bg, `border-current/20`)}>
        {tier}
      </span>
    </div>
  );
}