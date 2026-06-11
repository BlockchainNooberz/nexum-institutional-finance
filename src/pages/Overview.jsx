import React from "react";
import MetricCard from "@/components/dashboard/MetricCard";
import PageHeader from "@/components/dashboard/PageHeader";
import ChartCard from "@/components/dashboard/ChartCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { Building2, Bitcoin, Coins, Landmark, Building, Atom, ArrowUpRight, Globe } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { motion } from "framer-motion";

const areaData = [
  { month: "Jan", traditional: 42, crypto: 18, tokenized: 8 },
  { month: "Feb", traditional: 44, crypto: 22, tokenized: 12 },
  { month: "Mar", traditional: 41, crypto: 28, tokenized: 15 },
  { month: "Apr", traditional: 47, crypto: 32, tokenized: 19 },
  { month: "May", traditional: 52, crypto: 38, tokenized: 24 },
  { month: "Jun", traditional: 58, crypto: 45, tokenized: 31 },
  { month: "Jul", traditional: 55, crypto: 52, tokenized: 38 },
  { month: "Aug", traditional: 62, crypto: 58, tokenized: 44 },
];

const pieData = [
  { name: "Traditional Assets", value: 45, color: "hsl(43, 96%, 56%)" },
  { name: "Tokenized Securities", value: 22, color: "hsl(199, 89%, 48%)" },
  { name: "Digital Assets", value: 18, color: "hsl(142, 71%, 45%)" },
  { name: "Real Estate Tokens", value: 10, color: "hsl(262, 83%, 58%)" },
  { name: "Stablecoins", value: 5, color: "hsl(12, 76%, 61%)" },
];

const activities = [
  { event: "Ripple XRP Settlement", amount: "$2.4B", time: "2 min ago", status: "success" },
  { event: "Ondo USDY Issuance", amount: "$180M", time: "14 min ago", status: "success" },
  { event: "CBDC Pilot — Digital Euro", amount: "€500M", time: "1 hr ago", status: "info" },
  { event: "Tokenized Treasury Bond", amount: "$320M", time: "2 hrs ago", status: "primary" },
  { event: "Quantum Risk Assessment", amount: "—", time: "3 hrs ago", status: "warning" },
  { event: "Real Estate Token Mint", amount: "$45M", time: "4 hrs ago", status: "success" },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-xl">
      <p className="text-xs font-medium text-muted-foreground mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-xs" style={{ color: p.color }}>
          {p.name}: ${p.value}B
        </p>
      ))}
    </div>
  );
};

export default function Overview() {
  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      <PageHeader
        title="Executive Overview"
        subtitle="Institutional finance platform — real-time cross-vertical analytics"
        badge="Live"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        <MetricCard title="Total AUM" value="$847B" change={8.3} changeLabel="vs last quarter" icon={Globe} delay={0} />
        <MetricCard title="Traditional" value="$412B" change={3.1} changeLabel="YoY" icon={Building2} delay={0.05} />
        <MetricCard title="Digital Assets" value="$198B" change={24.7} changeLabel="QoQ" icon={Bitcoin} delay={0.1} />
        <MetricCard title="Tokenized" value="$142B" change={42.3} changeLabel="YoY" icon={Coins} delay={0.15} />
        <MetricCard title="Stablecoins" value="$68B" change={15.8} changeLabel="QoQ" icon={Landmark} delay={0.2} />
        <MetricCard title="Real Estate" value="$27B" change={67.2} changeLabel="YoY" icon={Building} delay={0.25} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <ChartCard title="AUM Growth Trajectory" subtitle="Billions USD — Cross-vertical comparison" className="lg:col-span-2" delay={0.3}>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData}>
                <defs>
                  <linearGradient id="gradTrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(43, 96%, 56%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(43, 96%, 56%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradCrypto" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradToken" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} tickFormatter={v => `$${v}B`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="traditional" name="Traditional" stroke="hsl(43, 96%, 56%)" fill="url(#gradTrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="crypto" name="Digital Assets" stroke="hsl(199, 89%, 48%)" fill="url(#gradCrypto)" strokeWidth={2} />
                <Area type="monotone" dataKey="tokenized" name="Tokenized" stroke="hsl(142, 71%, 45%)" fill="url(#gradToken)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Portfolio Allocation" subtitle="Current distribution" delay={0.35}>
          <div className="h-52 mb-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {pieData.map((item, i) => (
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Live Activity Feed" subtitle="Cross-platform transactions" delay={0.4}>
          <div className="space-y-3">
            {activities.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.event}</p>
                    <p className="text-[11px] text-muted-foreground">{item.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono font-medium text-foreground">{item.amount}</span>
                  <StatusBadge label={item.status === "success" ? "Complete" : item.status === "info" ? "Active" : item.status === "warning" ? "Pending" : "Processing"} variant={item.status} />
                </div>
              </motion.div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Institutional Partners" subtitle="Banking charter holders & licensed entities" delay={0.45}>
          <div className="space-y-3">
            {[
              { name: "Ripple (XRP)", type: "Cross-border Payments", status: "Active", tvl: "$52.8B" },
              { name: "Ondo Finance", type: "Tokenized Treasuries", status: "Active", tvl: "$8.2B" },
              { name: "Circle (USDC)", type: "Stablecoin Issuer", status: "Active", tvl: "$32.4B" },
              { name: "Paxos Trust", type: "Regulated Blockchain", status: "Active", tvl: "$12.1B" },
              { name: "Anchorage Digital", type: "OCC Chartered Bank", status: "Active", tvl: "$18.6B" },
              { name: "Figure Technologies", type: "Tokenized Lending", status: "Active", tvl: "$6.4B" },
            ].map((partner, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{partner.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{partner.name}</p>
                    <p className="text-[11px] text-muted-foreground">{partner.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-mono font-medium text-foreground">{partner.tvl}</p>
                  <StatusBadge label={partner.status} variant="success" />
                </div>
              </motion.div>
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  );
}