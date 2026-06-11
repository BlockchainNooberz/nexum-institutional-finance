import React from "react";
import MetricCard from "@/components/dashboard/MetricCard";
import PageHeader from "@/components/dashboard/PageHeader";
import ChartCard from "@/components/dashboard/ChartCard";
import DataTable from "@/components/dashboard/DataTable";
import StatusBadge from "@/components/dashboard/StatusBadge";
import ProgressRing from "@/components/dashboard/ProgressRing";
import { Coins, FileText, Lock, Layers, ArrowRight, Clock } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { motion } from "framer-motion";

const tokenizationGrowth = [
  { month: "Jan", treasuries: 12, equity: 3, bonds: 8, commodities: 2 },
  { month: "Feb", treasuries: 15, equity: 4, bonds: 10, commodities: 3 },
  { month: "Mar", treasuries: 19, equity: 6, bonds: 13, commodities: 4 },
  { month: "Apr", treasuries: 24, equity: 8, bonds: 16, commodities: 5 },
  { month: "May", treasuries: 31, equity: 11, bonds: 20, commodities: 7 },
  { month: "Jun", treasuries: 38, equity: 14, bonds: 24, commodities: 9 },
  { month: "Jul", treasuries: 46, equity: 18, bonds: 29, commodities: 11 },
  { month: "Aug", treasuries: 55, equity: 22, bonds: 34, commodities: 14 },
];

const assetBreakdown = [
  { name: "US Treasuries", value: 44, color: "hsl(43, 96%, 56%)" },
  { name: "Corporate Bonds", value: 22, color: "hsl(199, 89%, 48%)" },
  { name: "Equity Tokens", value: 17, color: "hsl(142, 71%, 45%)" },
  { name: "Commodities", value: 11, color: "hsl(262, 83%, 58%)" },
  { name: "Other", value: 6, color: "hsl(12, 76%, 61%)" },
];

const pipeline = [
  { asset: "BlackRock MMF Token", issuer: "BlackRock / Securitize", value: "$2.4B", chain: "Ethereum", stage: "Live", eta: "—" },
  { asset: "Ondo USDY", issuer: "Ondo Finance", value: "$580M", chain: "Multi-chain", stage: "Live", eta: "—" },
  { asset: "Franklin Templeton BENJI", issuer: "Franklin Templeton", value: "$420M", chain: "Stellar / Polygon", stage: "Live", eta: "—" },
  { asset: "JPM Onyx Bonds", issuer: "JPMorgan", value: "$1.8B", chain: "Onyx (Private)", stage: "Pilot", eta: "Q1 2025" },
  { asset: "HSBC Gold Token", issuer: "HSBC / Paxos", value: "$340M", chain: "Ethereum", stage: "Live", eta: "—" },
  { asset: "Goldman Sachs DAP", issuer: "Goldman Sachs", value: "$1.2B", chain: "Canton Network", stage: "Beta", eta: "Q2 2025" },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-xl">
      <p className="text-xs font-medium text-muted-foreground mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-xs" style={{ color: p.color }}>{p.name}: ${p.value}B</p>
      ))}
    </div>
  );
};

export default function Tokenization() {
  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      <PageHeader title="Asset Tokenization" subtitle="Tokenized securities pipeline, RWA markets, and institutional adoption" badge="RWA" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        <MetricCard title="Total Tokenized" value="$142B" change={42.3} changeLabel="YoY" icon={Coins} delay={0} />
        <MetricCard title="Tokenized Treasuries" value="$55B" change={58.2} changeLabel="YoY" icon={FileText} delay={0.05} />
        <MetricCard title="Live Issuances" value="847" change={124} changeLabel="new this year" icon={Layers} delay={0.1} />
        <MetricCard title="Avg Settlement" value="T+0" change={-100} changeLabel="vs T+2" icon={Clock} delay={0.15} />
        <MetricCard title="Custody Value" value="$98B" change={35.4} changeLabel="QoQ" icon={Lock} delay={0.2} />
        <MetricCard title="Secondary Volume" value="$3.2B" change={89.1} changeLabel="daily avg" icon={ArrowRight} delay={0.25} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <ChartCard title="Tokenization Growth by Asset Class" subtitle="Cumulative value (Billions USD)" className="lg:col-span-2" delay={0.3}>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={tokenizationGrowth}>
                <defs>
                  {[
                    { id: "gTreas", color: "hsl(43, 96%, 56%)" },
                    { id: "gEquity", color: "hsl(142, 71%, 45%)" },
                    { id: "gBonds", color: "hsl(199, 89%, 48%)" },
                    { id: "gCommod", color: "hsl(262, 83%, 58%)" },
                  ].map(g => (
                    <linearGradient key={g.id} id={g.id} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={g.color} stopOpacity={0.3} />
                      <stop offset="100%" stopColor={g.color} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} tickFormatter={v => `$${v}B`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="treasuries" name="Treasuries" stroke="hsl(43, 96%, 56%)" fill="url(#gTreas)" strokeWidth={2} stackId="1" />
                <Area type="monotone" dataKey="bonds" name="Bonds" stroke="hsl(199, 89%, 48%)" fill="url(#gBonds)" strokeWidth={2} stackId="1" />
                <Area type="monotone" dataKey="equity" name="Equity" stroke="hsl(142, 71%, 45%)" fill="url(#gEquity)" strokeWidth={2} stackId="1" />
                <Area type="monotone" dataKey="commodities" name="Commodities" stroke="hsl(262, 83%, 58%)" fill="url(#gCommod)" strokeWidth={2} stackId="1" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Asset Class Distribution" delay={0.35}>
          <div className="h-48 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={assetBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                  {assetBreakdown.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {assetBreakdown.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-medium text-foreground">{item.value}%</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Smart Contract Audit", value: 98, color: "hsl(43, 96%, 56%)", sub: "48/49 passed" },
          { label: "Regulatory Compliance", value: 94, color: "hsl(199, 89%, 48%)", sub: "SEC / MiCA aligned" },
          { label: "Chain Diversification", value: 72, color: "hsl(142, 71%, 45%)", sub: "12 chains supported" },
          { label: "Institutional Adoption", value: 68, color: "hsl(262, 83%, 58%)", sub: "340+ institutions" },
        ].map((item, i) => (
          <ChartCard key={i} title={item.label} delay={0.4 + i * 0.05}>
            <div className="flex flex-col items-center gap-3">
              <ProgressRing value={item.value} color={item.color} />
              <p className="text-xs text-muted-foreground">{item.sub}</p>
            </div>
          </ChartCard>
        ))}
      </div>

      <ChartCard title="Tokenization Pipeline" subtitle="Institutional issuances — live and upcoming" delay={0.6}>
        <DataTable
          columns={[
            { header: "Asset", key: "asset", render: (v) => <span className="font-semibold text-foreground">{v}</span> },
            { header: "Issuer", key: "issuer" },
            { header: "Value", key: "value", className: "font-mono" },
            { header: "Blockchain", key: "chain" },
            { header: "ETA", key: "eta", className: "font-mono" },
            { header: "Stage", key: "stage", render: (v) => <StatusBadge label={v} variant={v === "Live" ? "success" : v === "Pilot" ? "info" : "warning"} /> },
          ]}
          data={pipeline}
        />
      </ChartCard>
    </div>
  );
}