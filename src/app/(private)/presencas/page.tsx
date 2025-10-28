"use client";

import { useState } from "react";
import { startOfWeek, addWeeks, subWeeks } from "date-fns";
import { WeekNavigator } from "./_components/week-navigator";
import { ExportButton } from "./_components/export-button";
import { AttendanceTable } from "./_components/attendance-table";
import { useAttendance } from "./_components/use-attendance";

export default function PresencasPage() {
  const [weekStart, setWeekStart] = useState(
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

  if (loading) return <div className="p-6">Carregando...</div>;

  return (
    <div className="py-4 space-y-4 w-[calc(100vw-20rem)] overflow-x-hidden">
      <WeekNavigator
        weekStart={weekStart}
        onPrev={() => setWeekStart((w) => subWeeks(w, 1))}
        onNext={() => setWeekStart((w) => addWeeks(w, 1))}
      />

      <div className="flex justify-end">
        <ExportButton onExport={exportToExcel} />
      </div>

      <div className="bg-white rounded-xl shadow w-full">
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
