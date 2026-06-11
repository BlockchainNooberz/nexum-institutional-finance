import React from "react";
import { cn } from "@/lib/utils";

export default function DataTable({ columns, data }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            {columns.map((col, i) => (
              <th key={i} className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider py-2.5 px-3">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
              {columns.map((col, j) => (
                <td key={j} className="py-3 px-3 text-sm">
                  {col.render ? col.render(row[col.key], row) : (
                    <span className={cn("text-foreground", col.className)}>{row[col.key]}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}