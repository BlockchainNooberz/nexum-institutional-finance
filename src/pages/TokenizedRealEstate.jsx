import React from "react";
import MetricCard from "@/components/dashboard/MetricCard";
import PageHeader from "@/components/dashboard/PageHeader";
import ChartCard from "@/components/dashboard/ChartCard";
import DataTable from "@/components/dashboard/DataTable";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { Building, MapPin, Users, Percent, TrendingUp, DollarSign } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from "recharts";
import { motion } from "framer-motion";

const portfolioGrowth = [
  { month: "Jan", value: 8.2 }, { month: "Feb", value: 10.4 },
  { month: "Mar", value: 12.8 }, { month: "Apr", value: 15.2 },
  { month: "May", value: 18.6 }, { month: "Jun", value: 21.4 },
  { month: "Jul", value: 24.8 }, { month: "Aug", value: 27.2 },
];

const propertyTypes = [
  { name: "Commercial Office", value: 35, color: "hsl(43, 96%, 56%)" },
  { name: "Residential Multi-family", value: 25, color: "hsl(199, 89%, 48%)" },
  { name: "Industrial / Logistics", value: 20, color: "hsl(142, 71%, 45%)" },
  { name: "Hospitality", value: 12, color: "hsl(262, 83%, 58%)" },
  { name: "Data Centers", value: 8, color: "hsl(12, 76%, 61%)" },
];

const regionData = [
  { region: "North America", value: 12.4 },
  { region: "Europe", value: 6.8 },
  { region: "Asia Pacific", value: 4.2 },
  { region: "Middle East", value: 2.4 },
  { region: "LATAM", value: 1.4 },
];

const properties = [
  { name: "Hudson Yards Tower A", location: "New York, NY", value: "$420M", tokens: "4.2M", yield: "6.8%", occupancy: "94%", status: "Fully Tokenized" },
  { name: "Canary Wharf Complex", location: "London, UK", value: "$380M", tokens: "3.8M", yield: "5.4%", occupancy: "91%", status: "Fully Tokenized" },
  { name: "Marina Bay Plaza", location: "Singapore", value: "$310M", tokens: "3.1M", yield: "7.2%", occupancy: "97%", status: "Fully Tokenized" },
  { name: "Dubai Creek Residence", location: "Dubai, UAE", value: "$240M", tokens: "2.4M", yield: "8.4%", occupancy: "88%", status: "Partial" },
  { name: "Prologis Logistics Hub", location: "Dallas, TX", value: "$180M", tokens: "1.8M", yield: "5.8%", occupancy: "100%", status: "Fully Tokenized" },
  { name: "Hilton Garden Tokyo", location: "Tokyo, JP", value: "$145M", tokens: "1.45M", yield: "4.2%", occupancy: "92%", status: "Minting" },
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

export default function TokenizedRealEstate() {
  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      <PageHeader title="Tokenized Real Estate" subtitle="Fractional ownership, institutional property tokens, and real estate DeFi" badge="Fractional" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        <MetricCard title="Portfolio Value" value="$27.2B" change={67.2} changeLabel="YoY" icon={Building} delay={0} />
        <MetricCard title="Properties" value="1,284" change={42} changeLabel="new this quarter" icon={MapPin} delay={0.05} />
        <MetricCard title="Token Holders" value="184K" change={128.4} changeLabel="YoY" icon={Users} delay={0.1} />
        <MetricCard title="Avg Yield" value="6.4%" change={0.8} changeLabel="vs benchmark" icon={Percent} delay={0.15} />
        <MetricCard title="Occupancy" value="93.2%" change={1.4} changeLabel="vs prior" icon={TrendingUp} delay={0.2} />
        <MetricCard title="Secondary Vol" value="$840M" change={92.1} changeLabel="monthly" icon={DollarSign} delay={0.25} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <ChartCard title="Portfolio Growth" subtitle="Total tokenized real estate value (Billions USD)" className="lg:col-span-2" delay={0.3}>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={portfolioGrowth}>
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(43, 96%, 56%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(43, 96%, 56%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 20%, 14%)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} tickFormatter={v => `$${v}B`} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="value" name="Portfolio" stroke="hsl(43, 96%, 56%)" strokeWidth={2.5} dot={{ fill: "hsl(43, 96%, 56%)", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Property Type Distribution" delay={0.35}>
          <div className="h-44 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={propertyTypes} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                  {propertyTypes.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {propertyTypes.map((item, i) => (
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <ChartCard title="Geographic Distribution" subtitle="Tokenized RE by region (Billions USD)" delay={0.4}>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionData} layout="vertical" barSize={18}>
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} tickFormatter={v => `$${v}B`} />
                <YAxis type="category" dataKey="region" axisLine={false} tickLine={false} tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} width={100} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" name="Value" fill="hsl(43, 96%, 56%)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Key Platform Benefits" subtitle="Why institutional real estate is moving on-chain" delay={0.45}>
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: "Fractional Ownership", desc: "Minimum investment from $100 vs $250K+ traditional", icon: "📊" },
              { title: "24/7 Liquidity", desc: "Secondary market trading vs 6-12 month traditional exits", icon: "⚡" },
              { title: "Instant Settlement", desc: "T+0 settlement vs T+30 in traditional real estate", icon: "🔄" },
              { title: "Global Access", desc: "Cross-border investment without intermediaries", icon: "🌍" },
              { title: "Automated Yields", desc: "Smart contract dividend distribution", icon: "💰" },
              { title: "Transparent Audit", desc: "On-chain proof of reserves and valuations", icon: "🔍" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                className="p-3 bg-secondary/50 rounded-lg"
              >
                <span className="text-lg">{item.icon}</span>
                <p className="text-xs font-semibold text-foreground mt-1">{item.title}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </ChartCard>
      </div>

      <ChartCard title="Tokenized Property Portfolio" subtitle="Top institutional real estate tokens" delay={0.5}>
        <DataTable
          columns={[
            { header: "Property", key: "name", render: (v) => <span className="font-semibold text-foreground">{v}</span> },
            { header: "Location", key: "location" },
            { header: "Value", key: "value", className: "font-mono" },
            { header: "Tokens", key: "tokens", className: "font-mono" },
            { header: "Yield", key: "yield", className: "font-mono" },
            { header: "Occupancy", key: "occupancy", className: "font-mono" },
            { header: "Status", key: "status", render: (v) => <StatusBadge label={v} variant={v === "Fully Tokenized" ? "success" : v === "Partial" ? "info" : "warning"} /> },
          ]}
          data={properties}
        />
      </ChartCard>
    </div>
  );
}