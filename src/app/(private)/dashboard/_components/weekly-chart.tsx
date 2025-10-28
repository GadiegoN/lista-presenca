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
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Visualização Semanal
      </h2>
      <div style={{ width: "100%", height: 320 }}>
        <ResponsiveContainer>
          <BarChart
            data={ranking}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={100} />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="present"
              stackId="a"
              fill="#22c55e"
              name="Presenças 🟢"
            />
            <Bar
              dataKey="justified"
              stackId="a"
              fill="#eab308"
              name="Justificadas 🟡"
            />
            <Bar dataKey="absent" stackId="a" fill="#ef4444" name="Faltas 🔴" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
