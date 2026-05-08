"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type DashboardWidgetSuggestionsProps = {
  widgets: string[];
};

export function DashboardWidgetSuggestions({ widgets }: DashboardWidgetSuggestionsProps) {
  const data = widgets.map((widget, index) => ({
    name: widget,
    impact: 88 - index * 9,
  }));

  return (
    <section className="glass-panel rounded-[2rem] p-5">
      <p className="text-sm font-medium text-white">Suggested Dashboard Widgets</p>
      <div className="mt-4 h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 4, right: 16, bottom: 4, left: 16 }}>
            <CartesianGrid stroke="rgba(148,163,184,0.12)" horizontal={false} />
            <XAxis type="number" stroke="#94a3b8" />
            <YAxis dataKey="name" type="category" width={120} stroke="#cbd5e1" />
            <Tooltip />
            <Bar dataKey="impact" fill="#38bdf8" radius={[0, 12, 12, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
