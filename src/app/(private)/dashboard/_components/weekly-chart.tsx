"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export function WeeklyChart({ ranking }: { ranking: any[] }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
        Visualização Semanal
      </h2>
      <div className="w-full h-60 sm:h-80">
        <ResponsiveContainer>
          <BarChart
            data={ranking}
            layout="vertical"
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis
              dataKey="name"
              type="category"
              width={80}
              tick={{ fontSize: 12 }}
            />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            <Bar
              dataKey="present"
              stackId="a"
              fill="#22c55e"
              name="🟢 Presenças"
            />
            <Bar
              dataKey="justified"
              stackId="a"
              fill="#eab308"
              name="🟡 Justificadas"
            />
            <Bar dataKey="absent" stackId="a" fill="#ef4444" name="🔴 Faltas" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
