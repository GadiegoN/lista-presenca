"use client";

import ProtectedRoute from "@/components/protected-route";
import { useDashboard } from "./_components/use-dashboard";
import { DashboardHeader } from "./_components/dashboard-header";
import { WeeklyChart } from "./_components/weekly-chart";
import { RankingTable } from "./_components/ranking-table";

export default function DashboardPage() {
  const { logout, weekDays, ranking, loading, exportToExcel } = useDashboard();

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="p-6 text-center text-gray-600">
          Carregando resumo semanal...
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="p-4 sm:p-6 space-y-6 w-full lg:w-[calc(100vw-20rem)] overflow-x-hidden">
        <DashboardHeader
          weekDays={weekDays}
          onExport={exportToExcel}
          onLogout={logout}
        />

        <WeeklyChart ranking={ranking} />

        <RankingTable ranking={ranking} />
      </div>
    </ProtectedRoute>
  );
}
