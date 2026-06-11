import React from "react";
import MetricCard from "@/components/dashboard/MetricCard";
import PageHeader from "@/components/dashboard/PageHeader";
import ChartCard from "@/components/dashboard/ChartCard";
import DataTable from "@/components/dashboard/DataTable";
import StatusBadge from "@/components/dashboard/StatusBadge";
import ProgressRing from "@/components/dashboard/ProgressRing";
import { Atom, Cpu, ShieldCheck, Zap, Binary, Lock } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar } from "recharts";
import { motion } from "framer-motion";

const quantumCapabilities = [
  { capability: "Portfolio Optimization", current: 92, quantum: 99 },
  { capability: "Risk Assessment", current: 78, quantum: 96 },
  { capability: "Fraud Detection", current: 85, quantum: 98 },
  { capability: "Price Discovery", current: 72, quantum: 95 },
  { capability: "Cryptography", current: 88, quantum: 100 },
  { capability: "Monte Carlo", current: 65, quantum: 97 },
];

const speedupData = [
  { task: "VaR Calculation", classical: 480, quantum: 12 },
  { task: "Option Pricing", classical: 360, quantum: 8 },
  { task: "Credit Risk", classical: 240, quantum: 5 },
  { task: "Portfolio Opt", classical: 720, quantum: 15 },
  { task: "Fraud Detect", classical: 180, quantum: 3 },
  { task: "Market Sim", classical: 600, quantum: 10 },
];

const quantumTimeline = [
  { year: "2024", qubits: 1200, errorRate: 0.1, applications: 8 },
  { year: "2025", qubits: 4000, errorRate: 0.05, applications: 18 },
  { year: "2026", qubits: 10000, errorRate: 0.01, applications: 42 },
  { year: "2027", qubits: 50000, errorRate: 0.005, applications: 85 },
  { year: "2028", qubits: 100000, errorRate: 0.001, applications: 150 },
];

const quantumProjects = [
  { project: "Q-RISK Engine", provider: "IBM Quantum / JPMorgan", status: "Production", qubits: "1,121", use_case: "Real-time portfolio risk", speedup: "40x" },
  { project: "Quantum Monte Carlo", provider: "Google Quantum AI", status: "Beta", qubits: "72", use_case: "Derivative pricing", speedup: "100x" },
  { project: "QML Fraud Detection", provider: "D-Wave / Goldman Sachs", status: "Pilot", qubits: "5,000+", use_case: "Anomaly detection", speedup: "25x" },
  { project: "PQC Migration", provider: "Microsoft / HSBC", status: "Production", qubits: "—", use_case: "Post-quantum cryptography", speedup: "—" },
  { project: "Quantum Portfolio Opt", provider: "IonQ / Fidelity", status: "Beta", qubits: "32", use_case: "Multi-asset optimization", speedup: "60x" },
  { project: "Q-Settlement", provider: "Rigetti / BNY Mellon", status: "Research", qubits: "84", use_case: "Atomic settlement", speedup: "Est. 200x" },
];

const pqcReadiness = [
  { algo: "CRYSTALS-Kyber", type: "Key Encapsulation", status: "NIST Standard", migration: "85%" },
  { algo: "CRYSTALS-Dilithium", type: "Digital Signatures", status: "NIST Standard", migration: "72%" },
  { algo: "SPHINCS+", type: "Hash-based Signatures", status: "NIST Standard", migration: "58%" },
  { algo: "FALCON", type: "Lattice Signatures", status: "NIST Standard", migration: "42%" },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-xl">
      <p className="text-xs font-medium text-muted-foreground mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-xs" style={{ color: p.color }}>{p.name}: {p.value}{typeof p.value === 'number' && p.value < 10 ? '%' : ''}</p>
      ))}
    </div>
  );
};

export default function QuantumFinance() {
  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      <PageHeader title="Quantum Finance" subtitle="Quantum computing capabilities, post-quantum cryptography, and next-gen financial modeling" badge="Frontier" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        <MetricCard title="Qubit Capacity" value="1,121" change={186} changeLabel="vs last gen" icon={Atom} delay={0} />
        <MetricCard title="Quantum Advantage" value="40x" change={300} changeLabel="vs classical" icon={Zap} delay={0.05} />
        <MetricCard title="Error Rate" value="0.1%" change={-65} changeLabel="improvement" icon={ShieldCheck} delay={0.1} />
        <MetricCard title="Active Projects" value="24" change={8} changeLabel="new this year" icon={Cpu} delay={0.15} />
        <MetricCard title="PQC Migration" value="72%" change={28} changeLabel="complete" icon={Lock} delay={0.2} />
        <MetricCard title="Compute Cost" value="$0.04/q" change={-42} changeLabel="reduction" icon={Binary} delay={0.25} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <ChartCard title="Quantum vs Classical Performance" subtitle="Capability scores (0-100)" delay={0.3}>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={quantumCapabilities}>
                <PolarGrid stroke="hsl(222, 20%, 16%)" />
                <PolarAngleAxis dataKey="capability" tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 10 }} />
                <Radar name="Classical" dataKey="current" stroke="hsl(215, 20%, 55%)" fill="hsl(215, 20%, 55%)" fillOpacity={0.15} strokeWidth={1.5} />
                <Radar name="Quantum" dataKey="quantum" stroke="hsl(43, 96%, 56%)" fill="hsl(43, 96%, 56%)" fillOpacity={0.2} strokeWidth={2} />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-muted-foreground" />
              <span className="text-xs text-muted-foreground">Classical</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-primary" />
              <span className="text-xs text-primary">Quantum</span>
            </div>
          </div>
        </ChartCard>

        <ChartCard title="Computational Speedup" subtitle="Processing time comparison (seconds)" delay={0.35}>
          <div className="space-y-4">
            {speedupData.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground font-medium">{item.task}</span>
                  <span className="text-primary font-bold font-mono">{Math.round(item.classical / item.quantum)}x faster</span>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-muted-foreground/30 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground font-mono w-14 text-right">{item.classical}s</span>
                </div>
                <div className="flex gap-2 items-center mt-1">
                  <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.quantum / item.classical) * 100}%` }}
                      transition={{ duration: 0.8, delay: 0.6 + i * 0.1 }}
                    />
                  </div>
                  <span className="text-[10px] text-primary font-mono w-14 text-right">{item.quantum}s</span>
                </div>
              </motion.div>
            ))}
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <ChartCard title="Qubit Scaling Roadmap" subtitle="Projected growth and error correction" className="lg:col-span-2" delay={0.4}>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={quantumTimeline}>
                <defs>
                  <linearGradient id="qGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(43, 96%, 56%)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="hsl(43, 96%, 56%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} tickFormatter={v => v >= 1000 ? `${v / 1000}K` : v} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="qubits" name="Qubits" stroke="hsl(43, 96%, 56%)" fill="url(#qGrad)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Post-Quantum Cryptography" subtitle="Migration readiness" delay={0.45}>
          <div className="space-y-4">
            {pqcReadiness.map((algo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="p-3 bg-secondary/50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-foreground">{algo.algo}</span>
                  <StatusBadge label={algo.status} variant="success" />
                </div>
                <p className="text-[10px] text-muted-foreground mb-2">{algo.type}</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: algo.migration }}
                      transition={{ duration: 1, delay: 0.6 + i * 0.1 }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-primary">{algo.migration}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </ChartCard>
      </div>

      <ChartCard title="Quantum Computing Projects in Finance" subtitle="Active research & production deployments" delay={0.5}>
        <DataTable
          columns={[
            { header: "Project", key: "project", render: (v) => <span className="font-semibold text-foreground">{v}</span> },
            { header: "Provider / Partner", key: "provider" },
            { header: "Qubits", key: "qubits", className: "font-mono" },
            { header: "Use Case", key: "use_case" },
            { header: "Speedup", key: "speedup", className: "font-mono text-primary" },
            { header: "Status", key: "status", render: (v) => <StatusBadge label={v} variant={v === "Production" ? "success" : v === "Beta" ? "info" : v === "Pilot" ? "warning" : "neutral"} /> },
          ]}
          data={quantumProjects}
        />
      </ChartCard>
    </div>
  );
}