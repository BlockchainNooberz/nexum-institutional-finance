import React from "react";
import MetricCard from "@/components/dashboard/MetricCard";
import PageHeader from "@/components/dashboard/PageHeader";
import ChartCard from "@/components/dashboard/ChartCard";
import DataTable from "@/components/dashboard/DataTable";
import StatusBadge from "@/components/dashboard/StatusBadge";
import ProgressRing from "@/components/dashboard/ProgressRing";
import { Building2, DollarSign, Users, CreditCard, ShieldCheck, ArrowLeftRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";

const lendingData = [
  { quarter: "Q1'23", commercial: 28, retail: 18, mortgage: 34 },
  { quarter: "Q2'23", commercial: 32, retail: 21, mortgage: 31 },
  { quarter: "Q3'23", commercial: 35, retail: 24, mortgage: 29 },
  { quarter: "Q4'23", commercial: 38, retail: 26, mortgage: 33 },
  { quarter: "Q1'24", commercial: 42, retail: 28, mortgage: 36 },
  { quarter: "Q2'24", commercial: 45, retail: 31, mortgage: 38 },
];

const depositTrend = [
  { month: "Jan", deposits: 182 }, { month: "Feb", deposits: 188 },
  { month: "Mar", deposits: 195 }, { month: "Apr", deposits: 201 },
  { month: "May", deposits: 212 }, { month: "Jun", deposits: 224 },
  { month: "Jul", deposits: 231 }, { month: "Aug", deposits: 248 },
];

const loanBook = [
  { borrower: "BlackRock RE Fund", type: "Commercial", amount: "$480M", rate: "5.75%", maturity: "2028", status: "Performing", risk: "A+" },
  { borrower: "Vanguard Infrastructure", type: "Project Finance", amount: "$320M", rate: "6.12%", maturity: "2031", status: "Performing", risk: "A" },
  { borrower: "State Street Holdings", type: "Syndicated", amount: "$750M", rate: "5.45%", maturity: "2027", status: "Performing", risk: "AA-" },
  { borrower: "JPM Real Assets", type: "Mortgage", amount: "$210M", rate: "6.80%", maturity: "2029", status: "Watch", risk: "BBB+" },
  { borrower: "Goldman PE VII", type: "Leveraged", amount: "$580M", rate: "7.25%", maturity: "2030", status: "Performing", risk: "A-" },
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

export default function TraditionalBanking() {
  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      <PageHeader title="Traditional Banking" subtitle="Core banking operations, lending portfolio, and deposit analytics" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        <MetricCard title="Total Deposits" value="$248B" change={5.2} changeLabel="QoQ" icon={Building2} delay={0} />
        <MetricCard title="Loan Portfolio" value="$186B" change={8.7} changeLabel="YoY" icon={DollarSign} delay={0.05} />
        <MetricCard title="Net Interest Margin" value="3.42%" change={0.18} changeLabel="bps" icon={ArrowLeftRight} delay={0.1} />
        <MetricCard title="Tier 1 Capital" value="14.8%" change={0.3} changeLabel="vs req" icon={ShieldCheck} delay={0.15} />
        <MetricCard title="Active Accounts" value="2.4M" change={12.1} changeLabel="YoY" icon={Users} delay={0.2} />
        <MetricCard title="Card Volume" value="$18.2B" change={9.4} changeLabel="QoQ" icon={CreditCard} delay={0.25} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <ChartCard title="Lending Portfolio Breakdown" subtitle="Billions USD by segment" delay={0.3}>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={lendingData} barGap={4}>
                <XAxis dataKey="quarter" axisLine={false} tickLine={false} tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} tickFormatter={v => `$${v}B`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="commercial" name="Commercial" fill="hsl(43, 96%, 56%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="retail" name="Retail" fill="hsl(199, 89%, 48%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="mortgage" name="Mortgage" fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Deposit Growth" subtitle="Total deposits trend (Billions USD)" delay={0.35}>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={depositTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 20%, 14%)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} tickFormatter={v => `$${v}B`} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="deposits" name="Deposits" stroke="hsl(43, 96%, 56%)" strokeWidth={2.5} dot={{ fill: "hsl(43, 96%, 56%)", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        <ChartCard title="Capital Adequacy" delay={0.4}>
          <div className="flex flex-col items-center gap-4">
            <ProgressRing value={92} />
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">CET1 Ratio: 14.8%</p>
              <p className="text-xs text-muted-foreground">Requirement: 10.5%</p>
            </div>
          </div>
        </ChartCard>
        <ChartCard title="Liquidity Coverage" delay={0.45}>
          <div className="flex flex-col items-center gap-4">
            <ProgressRing value={87} color="hsl(199, 89%, 48%)" />
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">LCR: 142%</p>
              <p className="text-xs text-muted-foreground">Minimum: 100%</p>
            </div>
          </div>
        </ChartCard>
        <ChartCard title="NPL Ratio" delay={0.5}>
          <div className="flex flex-col items-center gap-4">
            <ProgressRing value={96} color="hsl(142, 71%, 45%)" />
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">NPL: 1.2%</p>
              <p className="text-xs text-muted-foreground">Industry avg: 2.8%</p>
            </div>
          </div>
        </ChartCard>
        <ChartCard title="Efficiency Ratio" delay={0.55}>
          <div className="flex flex-col items-center gap-4">
            <ProgressRing value={78} color="hsl(262, 83%, 58%)" />
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">CIR: 52.4%</p>
              <p className="text-xs text-muted-foreground">Target: 50%</p>
            </div>
          </div>
        </ChartCard>
      </div>

      <ChartCard title="Institutional Loan Book" subtitle="Top performing credit facilities" delay={0.6}>
        <DataTable
          columns={[
            { header: "Borrower", key: "borrower" },
            { header: "Type", key: "type" },
            { header: "Amount", key: "amount", className: "font-mono" },
            { header: "Rate", key: "rate", className: "font-mono" },
            { header: "Maturity", key: "maturity" },
            { header: "Risk", key: "risk", render: (v) => <StatusBadge label={v} variant={v.startsWith("A") ? "success" : "warning"} /> },
            { header: "Status", key: "status", render: (v) => <StatusBadge label={v} variant={v === "Performing" ? "success" : "warning"} /> },
          ]}
          data={loanBook}
        />
      </ChartCard>
    </div>
  );
}