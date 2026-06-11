import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, Building2, Bitcoin, Coins, Landmark, 
  Building, Atom, ChevronLeft, ChevronRight, TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { path: "/", label: "Overview", icon: LayoutDashboard },
  { path: "/traditional-banking", label: "Traditional Banking", icon: Building2 },
  { path: "/crypto-banking", label: "Crypto Banking", icon: Bitcoin },
  { path: "/tokenization", label: "Tokenization", icon: Coins },
  { path: "/stablecoins-cbdc", label: "Stablecoins & CBDCs", icon: Landmark },
  { path: "/tokenized-real-estate", label: "Tokenized Real Estate", icon: Building },
  { path: "/quantum-finance", label: "Quantum Finance", icon: Atom },
];

export default function Sidebar({ collapsed, onToggle }) {
  const location = useLocation();

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border z-50 flex flex-col"
    >
      <div className="p-4 flex items-center gap-3 border-b border-sidebar-border h-16">
        <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
          <TrendingUp className="w-5 h-5 text-primary-foreground" />
        </div>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="overflow-hidden"
          >
            <h1 className="font-heading font-bold text-sm text-sidebar-foreground tracking-wide">NEXUS FINANCE</h1>
            <p className="text-[10px] text-muted-foreground tracking-widest uppercase">Institutional Platform</p>
          </motion.div>
        )}
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map(({ path, label, icon: Icon }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-r-full"
                />
              )}
              <Icon className={cn("w-[18px] h-[18px] flex-shrink-0", isActive && "text-primary")} />
              {!collapsed && (
                <span className="text-[13px] font-medium truncate">{label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={onToggle}
        className="p-3 border-t border-sidebar-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </motion.aside>
  );
}