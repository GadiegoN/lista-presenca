"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { startOfWeek, addDays, addWeeks, subWeeks, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

export default function PresencasPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [weekStart, setWeekStart] = useState<Date>(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const [weekDays, setWeekDays] = useState<Date[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Atualiza dias da semana com base em weekStart
  useEffect(() => {
    const days = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));
    setWeekDays(days);
  }, [weekStart]);

  // 🔹 Carrega jogadores, eventos e presenças
  useEffect(() => {
    async function loadData() {
      const playersSnap = await getDocs(collection(db, "players"));
      setPlayers(
        playersSnap.docs.map((d) => ({ id: d.id, ...d.data() })) as Player[]
      );

      const eventsSnap = await getDocs(collection(db, "events"));
      setEvents(
        eventsSnap.docs.map((d) => ({ id: d.id, ...d.data() })) as Event[]
      );

      const attendSnap = await getDocs(collection(db, "attendances"));
      setAttendances(
        attendSnap.docs.map((d) => ({ id: d.id, ...d.data() })) as Attendance[]
      );

      setLoading(false);
    }
    loadData();
  }, []);

  // 🔹 Atualiza status no Firestore
  async function setStatus(
    playerId: string,
    eventId: string,
    date: string,
    status: Attendance["status"]
  ) {
    const existing = attendances.find(
      (a) => a.playerId === playerId && a.eventId === eventId && a.date === date
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
      });
      setAttendances((prev) => [
        ...prev,
        { id: docRef.id, playerId, eventId, date, status },
      ]);
    }
  }

  function getStatus(playerId: string, eventId: string, date: string) {
    return attendances.find(
      (a) => a.playerId === playerId && a.eventId === eventId && a.date === date
    )?.status;
  }

  // 🔹 Navegação de semanas
  function previousWeek() {
    setWeekStart((prev) => subWeeks(prev, 1));
  }
  function nextWeek() {
    setWeekStart((prev) => addWeeks(prev, 1));
  }

  if (loading) return <div className="p-6">Carregando...</div>;

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={previousWeek}
          className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded transition"
        >
          <ChevronLeft className="w-4 h-4" /> Semana anterior
        </button>

        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          📅 Semana de {format(weekDays[0], "dd/MM", { locale: ptBR })} a{" "}
          {format(weekDays[6], "dd/MM", { locale: ptBR })}
        </h1>

        <button
          onClick={nextWeek}
          className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded transition"
        >
          Próxima semana <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-3 py-2 border">Jogador</th>
              {weekDays.map((day) => (
                <th
                  key={day.toISOString()}
                  colSpan={events.length}
                  className="border px-3 py-2 text-center"
                >
                  {format(day, "EEE", { locale: ptBR }).toUpperCase()}
                </th>
              ))}
            </tr>
            <tr className="bg-gray-50">
              <th></th>
              {weekDays.flatMap((day) =>
                events.map((ev) => (
                  <th
                    key={`${day}-${ev.id}`}
                    className="border px-2 py-1 text-xs text-gray-500"
                  >
                    {ev.name} ({ev.time})
                  </th>
                ))
              )}
            </tr>
          </thead>

          <tbody>
            {players.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="border px-3 py-2 font-medium text-gray-700">
                  {p.name}
                </td>
                {weekDays.flatMap((day) =>
                  events.map((ev) => {
                    const date = format(day, "yyyy-MM-dd");
                    const status = getStatus(p.id, ev.id, date);

                    const color =
                      status === "PRESENT"
                        ? "bg-green-500"
                        : status === "JUSTIFIED"
                        ? "bg-yellow-500"
                        : status === "ABSENT"
                        ? "bg-red-500"
                        : "bg-gray-200";

                    return (
                      <td
                        key={`${p.id}-${ev.id}-${date}`}
                        className="border text-center py-1"
                      >
                        <div className="flex justify-center gap-1">
                          <div
                            className={`w-4 h-4 rounded-full ${color}`}
                            title={status || "Sem registro"}
                          ></div>
                        </div>

                        <div className="flex justify-center gap-1 mt-1">
                          <button
                            onClick={() =>
                              setStatus(p.id, ev.id, date, "PRESENT")
                            }
                            className="w-5 h-5 rounded-full bg-green-100 hover:bg-green-200"
                            title="Foi"
                          />
                          <button
                            onClick={() =>
                              setStatus(p.id, ev.id, date, "JUSTIFIED")
                            }
                            className="w-5 h-5 rounded-full bg-yellow-100 hover:bg-yellow-200"
                            title="Justificou"
                          />
                          <button
                            onClick={() =>
                              setStatus(p.id, ev.id, date, "ABSENT")
                            }
                            className="w-5 h-5 rounded-full bg-red-100 hover:bg-red-200"
                            title="Faltou"
                          />
                        </div>
                      </td>
                    );
                  })
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
