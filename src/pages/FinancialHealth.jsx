import React, { useState, useMemo } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import ChartCard from "@/components/dashboard/ChartCard";
import MetricCard from "@/components/dashboard/MetricCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import ScoreGauge from "@/components/financial-health/ScoreGauge";
import RedFlagAlert from "@/components/financial-health/RedFlagAlert";
import SpendingBreakdownChart from "@/components/financial-health/SpendingBreakdownChart";
import SubScoreBar from "@/components/financial-health/SubScoreBar";
import ProfileSelector from "@/components/financial-health/ProfileSelector";
import PopulationHeatmap from "@/components/financial-health/PopulationHeatmap";
import LiteracyRadar from "@/components/financial-health/LiteracyRadar";
import WeightEditor from "@/components/financial-health/WeightEditor";
import {
  SAMPLE_PROFILES,
  computeFinancialHealthScore,
  WEIGHTS,
} from "@/lib/financialHealthAlgorithm";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  Cell,
} from "recharts";
import { Users, AlertTriangle, TrendingUp, Brain, ShieldAlert, Target } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-xl">
      <p className="text-xs font-medium text-muted-foreground mb-1">{label || payload[0]?.payload?.name}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-xs" style={{ color: p.color || "hsl(43,96%,56%)" }}>
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

export default function FinancialHealth() {
  const [selectedId, setSelectedId] = useState("P001");
  const [weights, setWeights] = useState({ ...WEIGHTS });

  const selectedProfile = SAMPLE_PROFILES.find(p => p.id === selectedId);
  const result = useMemo(() =>
    computeFinancialHealthScore(selectedProfile),
    [selectedProfile, weights]
  );

  // Population stats
  const populationResults = useMemo(() =>
    SAMPLE_PROFILES.map(p => ({
      ...p,
      ...computeFinancialHealthScore(p),
    })),
    [weights]
  );

  const avgScore = Math.round(populationResults.reduce((a, p) => a + p.composite, 0) / populationResults.length);
  const criticalCount = populationResults.filter(p => p.tier === "Critical" || p.tier === "At Risk").length;
  const totalFlags = populationResults.reduce((a, p) => a + p.redFlags.length, 0);
  const excellentCount = populationResults.filter(p => p.tier === "Excellent" || p.tier === "Good").length;

  const scoreDistribution = [
    { label: "Critical (<35)", count: populationResults.filter(p => p.composite < 35).length, fill: "hsl(0, 72%, 51%)" },
    { label: "At Risk (35–49)", count: populationResults.filter(p => p.composite >= 35 && p.composite < 50).length, fill: "hsl(25, 95%, 53%)" },
    { label: "Fair (50–64)", count: populationResults.filter(p => p.composite >= 50 && p.composite < 65).length, fill: "hsl(43, 96%, 56%)" },
    { label: "Good (65–79)", count: populationResults.filter(p => p.composite >= 65 && p.composite < 80).length, fill: "hsl(199, 89%, 48%)" },
    { label: "Excellent (80+)", count: populationResults.filter(p => p.composite >= 80).length, fill: "hsl(142, 71%, 45%)" },
  ];

  const scatterData = populationResults.map(p => ({
    name: p.name,
    x: Math.round(p.debt_to_income_ratio * 100),
    y: Math.round(p.savings_rate * 100),
    z: p.composite,
  }));

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      <PageHeader
        title="Citizen Financial Health"
        subtitle="Weighted behavioral scoring — spending habits, debt patterns, financial literacy & risk flags"
        badge="Analytics"
      />

      {/* Population Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard title="Population Avg Score" value={avgScore} change={2.4} changeLabel="vs last period" icon={Brain} delay={0} />
        <MetricCard title="At Risk / Critical" value={criticalCount} change={-8} changeLabel="vs prior" icon={ShieldAlert} delay={0.05} />
        <MetricCard title="Red Flags Detected" value={totalFlags} change={-12} changeLabel="flagged down" icon={AlertTriangle} delay={0.1} />
        <MetricCard title="Financially Healthy" value={excellentCount} change={15} changeLabel="improving" icon={TrendingUp} delay={0.15} />
      </div>

      {/* Profile Selector */}
      <ChartCard title="Citizen Profiles" subtitle="Select a profile to inspect — scores computed in real time" delay={0.2} className="mb-6">
        <ProfileSelector
          profiles={SAMPLE_PROFILES}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </ChartCard>

      {/* Main Profile Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">

        {/* Score Gauge + Identity */}
        <ChartCard delay={0.25}>
          <div className="flex flex-col items-center gap-4">
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">{selectedProfile.name}</p>
              <p className="text-xs text-muted-foreground">Age {selectedProfile.age} · {selectedProfile.income_bracket}</p>
              <span className="text-[10px] bg-secondary text-muted-foreground px-2 py-0.5 rounded mt-1 inline-block">{selectedProfile.segment}</span>
            </div>
            <ScoreGauge score={result.composite} tier={result.tier} tierColor={result.tierColor} size={180} />
            <div className="w-full grid grid-cols-2 gap-2 text-center">
              <div className="bg-secondary/50 rounded-lg p-2">
                <p className="text-[10px] text-muted-foreground">DTI Ratio</p>
                <p className="text-sm font-bold font-mono text-foreground">{Math.round(selectedProfile.debt_to_income_ratio * 100)}%</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-2">
                <p className="text-[10px] text-muted-foreground">Savings Rate</p>
                <p className="text-sm font-bold font-mono text-foreground">{Math.round(selectedProfile.savings_rate * 100)}%</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-2">
                <p className="text-[10px] text-muted-foreground">Emergency Fund</p>
                <p className="text-sm font-bold font-mono text-foreground">{selectedProfile.emergency_fund_months}mo</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-2">
                <p className="text-[10px] text-muted-foreground">Impulse Spend</p>
                <p className="text-sm font-bold font-mono text-foreground">{Math.round(selectedProfile.impulse_spend_pct * 100)}%</p>
              </div>
            </div>
          </div>
        </ChartCard>

        {/* Sub-score breakdown */}
        <ChartCard title="Weighted Sub-Scores" subtitle="Each dimension × its algorithm weight" delay={0.3}>
          <SubScoreBar subScores={result.subScores} delay={0.3} />
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Composite Score</span>
              <span className="text-lg font-bold font-mono text-primary">{result.composite} / 100</span>
            </div>
          </div>
        </ChartCard>

        {/* Red Flags */}
        <ChartCard title="Red Flag Alerts" subtitle="Behavioral risk signals detected" delay={0.35}>
          <RedFlagAlert flags={result.redFlags} delay={0.35} />
          {result.redFlags.length > 0 && (
            <div className="mt-4 p-3 bg-secondary/50 rounded-lg">
              <p className="text-xs font-semibold text-foreground mb-1">AI Recommendation</p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                {result.composite < 35
                  ? "Immediate financial counseling recommended. Prioritize eliminating predatory debt instruments (payday loans, BNPL) and establishing even a minimal emergency fund before discretionary spending."
                  : result.composite < 50
                  ? "Reduce wasteful spending by at least 50% and redirect toward debt paydown. Creating a written budget is the highest-leverage first step for this profile."
                  : "Profile shows moderate risk signals. Focus on improving savings rate and reducing high-interest debt before increasing discretionary spending."}
              </p>
            </div>
          )}
        </ChartCard>
      </div>

      {/* Spending breakdown + Literacy Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <ChartCard title="Spending Breakdown" subtitle="Category score × budget allocation" delay={0.4}>
          <SpendingBreakdownChart spendingByCategory={selectedProfile.spending_by_category} />
          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border flex-wrap">
            {[
              { label: "Essential", color: "bg-emerald-500" },
              { label: "Investment", color: "bg-sky-500" },
              { label: "Discretionary", color: "bg-amber-500" },
              { label: "Low Value / Risk", color: "bg-red-500" },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className={`w-2.5 h-2.5 rounded-full ${l.color}`} />
                <span className="text-[11px] text-muted-foreground">{l.label}</span>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Financial Literacy Radar" subtitle="Knowledge & behavior indicators" delay={0.45}>
          <LiteracyRadar behaviors={selectedProfile.literacy_behaviors} />
          <div className="grid grid-cols-2 gap-2 mt-2">
            {Object.entries(selectedProfile.literacy_behaviors).map(([key, val]) => (
              <div key={key} className="flex items-center gap-2">
                <div className={cn("w-2 h-2 rounded-full flex-shrink-0", val ? "bg-emerald-400" : "bg-red-400")} />
                <span className="text-[10px] text-muted-foreground capitalize">{key.replace(/_/g, " ")}</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Population Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <ChartCard title="Score Distribution" subtitle="Population health tier breakdown" delay={0.5}>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scoreDistribution}>
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 10 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" name="Citizens" radius={[6, 6, 0, 0]}>
                  {scoreDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Manual bars since recharts Cell doesn't work in Bar shorthand */}
          <div className="space-y-2 mt-4">
            {scoreDistribution.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-28 text-[10px] text-muted-foreground truncate">{s.label}</div>
                <div className="flex-1 h-3 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: s.fill }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(s.count / populationResults.length) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.5 + i * 0.08 }}
                  />
                </div>
                <span className="text-xs font-mono text-foreground w-4">{s.count}</span>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="All Profiles Compared" subtitle="Financial health scores by citizen" delay={0.55}>
          <div className="space-y-3">
            {populationResults.map((p, i) => (
              <motion.button
                key={p.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.06 }}
                onClick={() => setSelectedId(p.id)}
                className={cn(
                  "w-full flex items-center gap-3 p-2.5 rounded-lg border transition-all hover:bg-secondary/50",
                  p.id === selectedId ? "border-primary/40 bg-primary/5" : "border-border"
                )}
              >
                <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-bold text-foreground">{p.name.split(" ")[0][0]}{p.name.split(" ")[1][0]}</span>
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-xs font-medium text-foreground">{p.name}</p>
                  <p className="text-[10px] text-muted-foreground">{p.income_bracket} · DTI {Math.round(p.debt_to_income_ratio * 100)}%</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${p.composite}%`,
                        backgroundColor: p.composite >= 80 ? "hsl(142,71%,45%)" : p.composite >= 65 ? "hsl(199,89%,48%)" : p.composite >= 50 ? "hsl(43,96%,56%)" : p.composite >= 35 ? "hsl(25,95%,53%)" : "hsl(0,72%,51%)"
                      }}
                    />
                  </div>
                  <span className="text-xs font-mono font-bold text-foreground w-8">{p.composite}</span>
                  {p.redFlags.length > 0 && (
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Spending Heatmap */}
      <ChartCard title="Population Spending Heatmap" subtitle="Average budget allocation across all profiles — color coded by financial value" delay={0.6} className="mb-6">
        <PopulationHeatmap profiles={SAMPLE_PROFILES} />
        <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-border">
          {[
            { label: "Essential (high value)", color: "bg-emerald-500/20 border-emerald-500/30 text-emerald-300" },
            { label: "Investment (wealth building)", color: "bg-sky-500/20 border-sky-500/30 text-sky-300" },
            { label: "Discretionary", color: "bg-amber-500/20 border-amber-500/30 text-amber-300" },
            { label: "Low Value / Risk", color: "bg-red-500/20 border-red-500/30 text-red-300" },
          ].map(l => (
            <div key={l.label} className={cn("flex items-center gap-2 px-2.5 py-1 rounded-lg border text-[11px]", l.color)}>
              {l.label}
            </div>
          ))}
        </div>
      </ChartCard>

      {/* Weight Editor */}
      <ChartCard title="Algorithm Weight Configuration" subtitle="Tune the scoring model — adjust which dimensions matter most" delay={0.65}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <WeightEditor weights={weights} onChange={setWeights} />
          <div>
            <p className="text-xs font-semibold text-foreground mb-3">Score Impact Preview</p>
            <div className="space-y-2">
              {Object.entries(WEIGHTS).map(([key, defaultW]) => {
                const currentW = weights[key] || 0;
                const diff = Math.round((currentW - defaultW) * 100);
                return (
                  <div key={key} className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground capitalize">{key.replace(/_/g, " ")}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-muted-foreground">{Math.round(defaultW * 100)}%</span>
                      <span className="text-muted-foreground">→</span>
                      <span className="font-mono text-foreground">{Math.round(currentW * 100)}%</span>
                      {diff !== 0 && (
                        <span className={cn("font-mono text-[10px]", diff > 0 ? "text-emerald-400" : "text-red-400")}>
                          {diff > 0 ? "+" : ""}{diff}%
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </ChartCard>
    </div>
  );
}