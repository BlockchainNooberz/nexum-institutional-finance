import React from "react";
import MetricCard from "@/components/dashboard/MetricCard";
import PageHeader from "@/components/dashboard/PageHeader";
import ChartCard from "@/components/dashboard/ChartCard";
import DataTable from "@/components/dashboard/DataTable";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { Landmark, DollarSign, Globe, Shield, ArrowLeftRight, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, LineChart, Line, CartesianGrid } from "recharts";
import { motion } from "framer-motion";

const stablecoinSupply = [
  { month: "Jan", usdt: 92, usdc: 28, dai: 5, pyusd: 0.8, usdy: 0.4 },
  { month: "Feb", usdt: 95, usdc: 29, dai: 5.2, pyusd: 1.0, usdy: 0.6 },
  { month: "Mar", usdt: 100, usdc: 30, dai: 5.1, pyusd: 1.3, usdy: 0.9 },
  { month: "Apr", usdt: 104, usdc: 31, dai: 5.3, pyusd: 1.6, usdy: 1.2 },
  { month: "May", usdt: 110, usdc: 32, dai: 5.0, pyusd: 2.0, usdy: 1.5 },
  { month: "Jun", usdt: 113, usdc: 33, dai: 5.4, pyusd: 2.4, usdy: 2.0 },
  { month: "Jul", usdt: 118, usdc: 34, dai: 5.2, pyusd: 2.8, usdy: 2.8 },
  { month: "Aug", usdt: 120, usdc: 35, dai: 5.5, pyusd: 3.2, usdy: 3.6 },
];

const cbdcPrograms = [
  { name: "Digital Euro", central_bank: "ECB", phase: "Preparation", population: "340M", timeline: "2025-2027", approach: "Retail + Wholesale" },
  { name: "Digital Yuan (e-CNY)", central_bank: "PBOC", phase: "Pilot", population: "1.4B", timeline: "Live", approach: "Retail" },
  { name: "Digital Pound", central_bank: "Bank of England", phase: "Design", population: "67M", timeline: "2025-2026", approach: "Retail" },
  { name: "Digital Rupee", central_bank: "RBI", phase: "Pilot", population: "1.4B", timeline: "Live", approach: "Wholesale + Retail" },
  { name: "Project Hamilton", central_bank: "Federal Reserve", phase: "Research", population: "330M", timeline: "TBD", approach: "Wholesale" },
  { name: "Drex", central_bank: "Banco Central (Brazil)", phase: "Pilot", population: "215M", timeline: "2025", approach: "Wholesale" },
];

const cbdcTxData = [
  { quarter: "Q1'23", retail: 2.4, wholesale: 8.2 },
  { quarter: "Q2'23", retail: 3.8, wholesale: 12.4 },
  { quarter: "Q3'23", retail: 5.2, wholesale: 18.6 },
  { quarter: "Q4'23", retail: 7.8, wholesale: 24.2 },
  { quarter: "Q1'24", retail: 10.4, wholesale: 32.8 },
  { quarter: "Q2'24", retail: 14.2, wholesale: 42.6 },
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

export default function StablecoinsCBDC() {
  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      <PageHeader title="Stablecoins & CBDCs" subtitle="Global stablecoin markets, central bank digital currencies, and programmable money" badge="Global" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        <MetricCard title="Stablecoin Supply" value="$167B" change={14.8} changeLabel="QoQ" icon={DollarSign} delay={0} />
        <MetricCard title="24h Volume" value="$82.4B" change={22.1} changeLabel="vs avg" icon={ArrowLeftRight} delay={0.05} />
        <MetricCard title="CBDC Pilots" value="134" change={28} changeLabel="countries" icon={Landmark} delay={0.1} />
        <MetricCard title="CBDC Population" value="3.8B" change={15.2} changeLabel="people covered" icon={Globe} delay={0.15} />
        <MetricCard title="Reserve Ratio" value="104.2%" change={2.1} changeLabel="overcollateral" icon={Shield} delay={0.2} />
        <MetricCard title="Tx Throughput" value="42K/s" change={35.8} changeLabel="peak TPS" icon={Activity} delay={0.25} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <ChartCard title="Stablecoin Market Cap Growth" subtitle="Total supply by issuer (Billions USD)" delay={0.3}>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stablecoinSupply}>
                <defs>
                  {[
                    { id: "sUSDT", color: "hsl(142, 71%, 45%)" },
                    { id: "sUSDC", color: "hsl(199, 89%, 48%)" },
                    { id: "sDAI", color: "hsl(43, 96%, 56%)" },
                    { id: "sPYUSD", color: "hsl(262, 83%, 58%)" },
                    { id: "sUSDY", color: "hsl(12, 76%, 61%)" },
                  ].map(g => (
                    <linearGradient key={g.id} id={g.id} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={g.color} stopOpacity={0.25} />
                      <stop offset="100%" stopColor={g.color} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} tickFormatter={v => `$${v}B`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="usdt" name="USDT" stroke="hsl(142, 71%, 45%)" fill="url(#sUSDT)" strokeWidth={2} stackId="1" />
                <Area type="monotone" dataKey="usdc" name="USDC" stroke="hsl(199, 89%, 48%)" fill="url(#sUSDC)" strokeWidth={2} stackId="1" />
                <Area type="monotone" dataKey="dai" name="DAI" stroke="hsl(43, 96%, 56%)" fill="url(#sDAI)" strokeWidth={2} stackId="1" />
                <Area type="monotone" dataKey="pyusd" name="PYUSD" stroke="hsl(262, 83%, 58%)" fill="url(#sPYUSD)" strokeWidth={2} stackId="1" />
                <Area type="monotone" dataKey="usdy" name="USDY" stroke="hsl(12, 76%, 61%)" fill="url(#sUSDY)" strokeWidth={2} stackId="1" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="CBDC Transaction Volume" subtitle="Retail vs Wholesale (Billions USD)" delay={0.35}>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cbdcTxData} barGap={4}>
                <XAxis dataKey="quarter" axisLine={false} tickLine={false} tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} tickFormatter={v => `$${v}B`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="retail" name="Retail CBDC" fill="hsl(43, 96%, 56%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="wholesale" name="Wholesale CBDC" fill="hsl(199, 89%, 48%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {[
          { title: "Reserve Composition", items: [
            { label: "US Treasuries", pct: "78%", bar: 78 },
            { label: "Cash & Equivalents", pct: "14%", bar: 14 },
            { label: "Corporate Bonds", pct: "5%", bar: 5 },
            { label: "Other", pct: "3%", bar: 3 },
          ]},
          { title: "Network Distribution", items: [
            { label: "Ethereum", pct: "52%", bar: 52 },
            { label: "Tron", pct: "28%", bar: 28 },
            { label: "Solana", pct: "8%", bar: 8 },
            { label: "Other L1/L2", pct: "12%", bar: 12 },
          ]},
          { title: "Use Case Breakdown", items: [
            { label: "Trading & DeFi", pct: "42%", bar: 42 },
            { label: "Cross-border", pct: "28%", bar: 28 },
            { label: "Treasury Mgmt", pct: "18%", bar: 18 },
            { label: "Payroll", pct: "12%", bar: 12 },
          ]},
        ].map((section, i) => (
          <ChartCard key={i} title={section.title} delay={0.4 + i * 0.05}>
            <div className="space-y-4">
              {section.items.map((item, j) => (
                <div key={j}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium text-foreground">{item.pct}</span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${item.bar}%` }}
                      transition={{ duration: 1, delay: 0.5 + j * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        ))}
      </div>

      <ChartCard title="Central Bank Digital Currency Programs" subtitle="Major CBDC initiatives worldwide" delay={0.6}>
        <DataTable
          columns={[
            { header: "CBDC", key: "name", render: (v) => <span className="font-semibold text-foreground">{v}</span> },
            { header: "Central Bank", key: "central_bank" },
            { header: "Population", key: "population", className: "font-mono" },
            { header: "Approach", key: "approach" },
            { header: "Timeline", key: "timeline" },
            { header: "Phase", key: "phase", render: (v) => <StatusBadge label={v} variant={v === "Pilot" ? "info" : v === "Live" ? "success" : v === "Research" ? "neutral" : "warning"} /> },
          ]}
          data={cbdcPrograms}
        />
      </ChartCard>
    </div>
  );
}