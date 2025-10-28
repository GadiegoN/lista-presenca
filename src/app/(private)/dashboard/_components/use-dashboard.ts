"use client";

import { useAuth } from "@/context/auth-context";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { startOfWeek, addDays, format } from "date-fns";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

interface Player {
  id: string;
  name: string;
}

interface Event {
  id: string;
  name: string;
  time: string;
}

interface Attendance {
  id: string;
  playerId: string;
  eventId: string;
  date: string;
  status: "PRESENT" | "JUSTIFIED" | "ABSENT";
}

export function useDashboard() {
  const { user, logout } = useAuth();
  const [players, setPlayers] = useState<Player[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [weekDays, setWeekDays] = useState<Date[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Calcula os dias da semana atual
  useEffect(() => {
    const start = startOfWeek(new Date(), { weekStartsOn: 1 });
    const days = Array.from({ length: 7 }).map((_, i) => addDays(start, i));
    setWeekDays(days);
  }, []);

  // 🔹 Carrega dados do Firestore (somente do usuário logado)
  useEffect(() => {
    if (!user) return;
    async function loadData() {
      const [pSnap, eSnap, aSnap] = await Promise.all([
        getDocs(
          query(collection(db, "players"), where("userId", "==", user?.uid))
        ),
        getDocs(
          query(collection(db, "events"), where("userId", "==", user?.uid))
        ),
        getDocs(
          query(collection(db, "attendances"), where("userId", "==", user?.uid))
        ),
      ]);

      setPlayers(
        pSnap.docs.map((d) => ({ id: d.id, ...d.data() })) as Player[]
      );
      setEvents(eSnap.docs.map((d) => ({ id: d.id, ...d.data() })) as Event[]);
      setAttendances(
        aSnap.docs.map((d) => ({ id: d.id, ...d.data() })) as Attendance[]
      );
      setLoading(false);
    }
    loadData();
  }, [user]);

  // 🔹 Calcula o resumo semanal por jogador
  function getWeeklySummary(playerId: string) {
    let present = 0,
      justified = 0,
      absent = 0;
    weekDays.forEach((day) => {
      const date = format(day, "yyyy-MM-dd");
      events.forEach((ev) => {
        const status = attendances.find(
          (a) =>
            a.playerId === playerId && a.eventId === ev.id && a.date === date
        )?.status;
        if (status === "PRESENT") present++;
        if (status === "JUSTIFIED") justified++;
        if (status === "ABSENT") absent++;
      });
    });
    const total = present + justified + absent;
    const rate = total ? Math.round((present / total) * 100) : 0;
    return { present, justified, absent, rate };
  }

  // 🔹 Monta o ranking
  const ranking = players
    .map((p) => ({ ...p, ...getWeeklySummary(p.id) }))
    .sort((a, b) => b.rate - a.rate);

  // 🔹 Exportar para Excel
  async function exportToExcel() {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Resumo Semanal");

    sheet.addRow([
      "Posição",
      "Jogador",
      "🟢 Presenças",
      "🟡 Justificadas",
      "🔴 Faltas",
      "Aproveitamento (%)",
    ]);

    ranking.forEach((p, index) => {
      const row = sheet.addRow([
        `#${index + 1}`,
        p.name,
        p.present,
        p.justified,
        p.absent,
        `${p.rate}%`,
      ]);

      const rateCell = row.getCell(6);
      if (p.rate >= 80)
        rateCell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "D1FAE5" },
        };
      else if (p.rate >= 50)
        rateCell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FEF9C3" },
        };
      else
        rateCell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FEE2E2" },
        };
    });

    sheet.columns.forEach((col) => (col.width = 20));
    sheet.getRow(1).font = { bold: true };

    const buffer = await workbook.xlsx.writeBuffer();
    const fileName = `Presencas_${format(weekDays[0], "dd_MM")}-${format(
      weekDays[6],
      "dd_MM"
    )}.xlsx`;
    saveAs(new Blob([buffer]), fileName);
  }

  return { user, logout, weekDays, ranking, loading, exportToExcel };
}
