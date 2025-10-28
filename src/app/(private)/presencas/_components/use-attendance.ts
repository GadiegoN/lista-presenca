"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { addDays, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { useAuth } from "@/context/auth-context";

export function useAttendance(weekStart: Date) {
  const { user } = useAuth();
  const [players, setPlayers] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [attendances, setAttendances] = useState<any[]>([]);
  const [weekDays, setWeekDays] = useState<Date[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Calcula os dias da semana
  useEffect(() => {
    const days = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));
    setWeekDays(days);
  }, [weekStart]);

  // 🔹 Carrega dados específicos do usuário logado
  useEffect(() => {
    if (!user?.uid) return;

    async function loadData() {
      setLoading(true);

      const playersQuery = query(
        collection(db, "players"),
        where("userId", "==", user?.uid)
      );
      const eventsQuery = query(
        collection(db, "events"),
        where("userId", "==", user?.uid)
      );
      const attendancesQuery = query(
        collection(db, "attendances"),
        where("userId", "==", user?.uid)
      );

      const [pSnap, eSnap, aSnap] = await Promise.all([
        getDocs(playersQuery),
        getDocs(eventsQuery),
        getDocs(attendancesQuery),
      ]);

      setPlayers(pSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setEvents(eSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setAttendances(aSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }

    loadData();
  }, [user]);

  // 🔹 Atualiza status de presença
  async function setStatus(
    playerId: string,
    eventId: string,
    date: string,
    status: string
  ) {
    if (!user?.uid) return;

    const existing = attendances.find(
      (a) =>
        a.playerId === playerId &&
        a.eventId === eventId &&
        a.date === date &&
        a.userId === user.uid
    );

    if (existing) {
      await updateDoc(doc(db, "attendances", existing.id), { status });
      setAttendances((prev) =>
        prev.map((a) => (a.id === existing.id ? { ...a, status } : a))
      );
    } else {
      const docRef = await addDoc(collection(db, "attendances"), {
        playerId,
        eventId,
        date,
        status,
        userId: user.uid, // 🔒 salva o dono do registro
      });
      setAttendances((prev) => [
        ...prev,
        { id: docRef.id, playerId, eventId, date, status, userId: user.uid },
      ]);
    }
  }

  function getStatus(playerId: string, eventId: string, date: string) {
    return attendances.find(
      (a) =>
        a.playerId === playerId &&
        a.eventId === eventId &&
        a.date === date &&
        a.userId === user?.uid
    )?.status;
  }

  // 🔹 Exporta para Excel
  async function exportToExcel() {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Presenças Semana");
    const headerRow1 = ["Jogador"];
    const headerRow2 = [""];
    const dayRanges: any[] = [];
    let colIndex = 2;

    weekDays.forEach((day) => {
      const dayLabel = format(day, "EEEE", { locale: ptBR }).toUpperCase();
      const startCol = colIndex;
      events.forEach((ev) => {
        headerRow2.push(`${ev.name} (${ev.time})`);
        headerRow1.push("");
        colIndex++;
      });
      const endCol = colIndex - 1;
      dayRanges.push({ start: startCol, end: endCol, dayLabel });
    });

    sheet.addRow(headerRow1);
    sheet.addRow(headerRow2);
    dayRanges.forEach((r) => {
      sheet.mergeCells(1, r.start, 1, r.end);
      const c = sheet.getCell(1, r.start);
      c.value = r.dayLabel;
      c.alignment = { horizontal: "center", vertical: "middle" };
      c.font = { bold: true };
    });
    sheet.getCell("A1").value = "Jogador";
    sheet.mergeCells("A1:A2");
    sheet.getCell("A1").alignment = {
      horizontal: "center",
      vertical: "middle",
    };

    players.forEach((p) => {
      const row = [p.name];
      weekDays.forEach((day) => {
        const date = format(day, "yyyy-MM-dd");
        events.forEach((ev) => {
          const status = getStatus(p.id, ev.id, date);
          row.push(
            status === "PRESENT"
              ? "🟢"
              : status === "JUSTIFIED"
              ? "🟡"
              : status === "ABSENT"
              ? "🔴"
              : "⚪"
          );
        });
      });
      sheet.addRow(row);
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const fileName = `Presencas_${format(weekDays[0], "dd_MM")}-${format(
      weekDays[6],
      "dd_MM"
    )}.xlsx`;
    saveAs(new Blob([buffer]), fileName);
  }

  return {
    loading,
    weekDays,
    players,
    events,
    attendances,
    setStatus,
    exportToExcel,
  };
}
