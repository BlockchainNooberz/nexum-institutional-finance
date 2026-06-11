import React from "react";
import MetricCard from "@/components/dashboard/MetricCard";
import PageHeader from "@/components/dashboard/PageHeader";
import ChartCard from "@/components/dashboard/ChartCard";
import DataTable from "@/components/dashboard/DataTable";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { Bitcoin, Wallet, ArrowLeftRight, Shield, Zap, Globe } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { motion } from "framer-motion";

const settlementData = [
  { hour: "00:00", xrp: 1.2, usdc: 0.8, pyusd: 0.3 },
  { hour: "04:00", xrp: 0.9, usdc: 0.5, pyusd: 0.2 },
  { hour: "08:00", xrp: 2.4, usdc: 1.8, pyusd: 0.7 },
  { hour: "12:00", xrp: 3.8, usdc: 2.4, pyusd: 1.1 },
  { hour: "16:00", xrp: 4.2, usdc: 3.1, pyusd: 1.4 },
  { hour: "20:00", xrp: 2.8, usdc: 1.9, pyusd: 0.9 },
  { hour: "24:00", xrp: 1.5, usdc: 1.0, pyusd: 0.4 },
];

const corridorData = [
  { corridor: "USD→EUR", volume: 4.2 },
  { corridor: "USD→JPY", volume: 3.8 },
  { corridor: "USD→GBP", volume: 2.9 },
  { corridor: "EUR→USD", volume: 2.5 },
  { corridor: "USD→SGD", volume: 1.8 },
  { corridor: "USD→AED", volume: 1.4 },
];

const cryptoBanks = [
  { name: "Ripple Labs", charter: "NY BitLicense + Partner Banks", product: "RippleNet / ODL", tvl: "$52.8B", corridors: "55+", settlement: "3-5 sec", status: "Operational" },
  { name: "Ondo Finance", charter: "SEC Regulated", product: "USDY / OUSG", tvl: "$8.2B", corridors: "—", settlement: "Instant", status: "Operational" },
  { name: "Anchorage Digital", charter: "OCC National Trust", product: "Custody & Staking", tvl: "$18.6B", corridors: "Global", settlement: "< 1 min", status: "Operational" },
  { name: "Paxos Trust", charter: "NY Trust Company", product: "PYUSD / PAXG", tvl: "$12.1B", corridors: "—", settlement: "Instant", status: "Operational" },
  { name: "Circle Internet", charter: "State Money Transmitter", product: "USDC / CCTP", tvl: "$32.4B", corridors: "Global", settlement: "< 20 sec", status: "Operational" },
  { name: "Figure Technologies", charter: "Pending Bank Charter", product: "Provenance Blockchain", tvl: "$6.4B", corridors: "US", settlement: "< 5 sec", status: "Expanding" },
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

export default function CryptoBanking() {
  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      <PageHeader title="Crypto Banking" subtitle="Licensed digital asset banks — Ripple, Ondo, Anchorage, Paxos, Circle, and more" badge="Regulated" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        <MetricCard title="24h Settlement" value="$14.2B" change={18.4} changeLabel="vs yesterday" icon={ArrowLeftRight} delay={0} />
        <MetricCard title="Active Corridors" value="127" change={12} changeLabel="new this month" icon={Globe} delay={0.05} />
        <MetricCard title="Avg Settlement" value="4.2s" change={-32} changeLabel="faster" icon={Zap} delay={0.1} />
        <MetricCard title="Digital Custody" value="$130.5B" change={22.8} changeLabel="QoQ" icon={Wallet} delay={0.15} />
        <MetricCard title="Licensed Entities" value="28" change={6} changeLabel="new charters" icon={Shield} delay={0.2} />
        <MetricCard title="XRP Volume" value="$8.4B" change={31.2} changeLabel="24h" icon={Bitcoin} delay={0.25} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <ChartCard title="Real-Time Settlement Volume" subtitle="Cross-border settlement by rail (Billions USD)" className="lg:col-span-2" delay={0.3}>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={settlementData}>
                <defs>
                  <linearGradient id="gradXRP" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(43, 96%, 56%)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="hsl(43, 96%, 56%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradUSDC" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradPYUSD" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(262, 83%, 58%)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="hsl(262, 83%, 58%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} tickFormatter={v => `$${v}B`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="xrp" name="XRP/ODL" stroke="hsl(43, 96%, 56%)" fill="url(#gradXRP)" strokeWidth={2} />
                <Area type="monotone" dataKey="usdc" name="USDC/CCTP" stroke="hsl(199, 89%, 48%)" fill="url(#gradUSDC)" strokeWidth={2} />
                <Area type="monotone" dataKey="pyusd" name="PYUSD" stroke="hsl(262, 83%, 58%)" fill="url(#gradPYUSD)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Top Payment Corridors" subtitle="Daily volume (Billions USD)" delay={0.35}>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={corridorData} layout="vertical" barSize={14}>
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} tickFormatter={v => `$${v}B`} />
                <YAxis type="category" dataKey="corridor" axisLine={false} tickLine={false} tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} width={70} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="volume" name="Volume" fill="hsl(43, 96%, 56%)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <ChartCard title="Licensed Crypto Banks & Regulated Entities" subtitle="Charter holders, product suites, and operational metrics" delay={0.4}>
        <DataTable
          columns={[
            { header: "Entity", key: "name", render: (v) => <span className="font-semibold text-foreground">{v}</span> },
            { header: "Charter / License", key: "charter" },
            { header: "Core Product", key: "product" },
            { header: "AUC / TVL", key: "tvl", className: "font-mono" },
            { header: "Corridors", key: "corridors" },
            { header: "Settlement", key: "settlement", className: "font-mono" },
            { header: "Status", key: "status", render: (v) => <StatusBadge label={v} variant={v === "Operational" ? "success" : "info"} /> },
          ]}
          data={cryptoBanks}
        />
      </ChartCard>
    </div>
  );
}