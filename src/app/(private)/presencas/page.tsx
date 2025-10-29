"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { startOfWeek, addWeeks, subWeeks } from "date-fns";
import { WeekNavigator } from "./_components/week-navigator";
import { ExportButton } from "./_components/export-button";
import { AttendanceTable } from "./_components/attendance-table";
import { useAttendance } from "./_components/use-attendance";
import { Button } from "@/components/ui/button";
import { ListOrdered } from "lucide-react";

export default function PresencasPage() {
  const [weekStart, setWeekStart] = useState(() =>
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );

  const {
    loading,
    weekDays,
    players,
    events,
    attendances,
    setStatus,
    exportToExcel,
  } = useAttendance(weekStart);

  if (loading)
    return <div className="p-6 text-gray-500 text-center">Carregando...</div>;

  return (
    <div className="space-y-4 w-[calc(100vw-2rem)] lg:w-[calc(100vw-20rem)] overflow-hidden">
      <WeekNavigator
        weekStart={weekStart}
        onPrev={() => setWeekStart((w) => subWeeks(w, 1))}
        onNext={() => setWeekStart((w) => addWeeks(w, 1))}
      />

      <div className="flex justify-between items-center">
        <Link href="/presencas/ordenar">
          <Button variant="outline" className="flex items-center gap-2">
            <ListOrdered className="w-4 h-4" />
            Ordenar Jogadores
          </Button>
        </Link>

        <ExportButton onExport={exportToExcel} />
      </div>

      <div className="bg-white rounded-xl shadow w-full overflow-hidden">
        <AttendanceTable
          weekDays={weekDays}
          players={players}
          events={events}
          attendances={attendances}
          setStatus={setStatus}
        />
      </div>
    </div>
  );
}
