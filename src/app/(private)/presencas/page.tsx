"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
  doc,
  updateDoc,
  where,
} from "firebase/firestore";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Player {
  id: string;
  name: string;
}

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
}

interface Attendance {
  id: string;
  playerId: string;
  eventId: string;
  status: "PRESENT" | "JUSTIFIED" | "ABSENT";
}

export default function PresencasPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>("");
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    }
    loadData();
  }, []);

  useEffect(() => {
    async function loadAttendances() {
      if (!selectedEvent) return;
      const q = query(
        collection(db, "attendances"),
        where("eventId", "==", selectedEvent)
      );
      const snapshot = await getDocs(q);
      setAttendances(
        snapshot.docs.map((d) => ({ id: d.id, ...d.data() })) as Attendance[]
      );
    }
    loadAttendances();
  }, [selectedEvent]);

  async function setStatus(playerId: string, status: Attendance["status"]) {
    if (!selectedEvent) return alert("Selecione um evento primeiro");
    const existing = attendances.find((a) => a.playerId === playerId);

    if (existing) {
      await updateDoc(doc(db, "attendances", existing.id), { status });
    } else {
      await addDoc(collection(db, "attendances"), {
        playerId,
        eventId: selectedEvent,
        status,
        createdAt: new Date(),
      });
    }

    setAttendances((prev) => {
      const updated = prev.filter((a) => a.playerId !== playerId);
      return [
        ...updated,
        { id: existing?.id || "new", playerId, eventId: selectedEvent, status },
      ];
    });
  }

  if (loading) return <div className="p-6">Carregando...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Controle de Presenças</h1>

      <select
        className="border rounded p-2"
        value={selectedEvent}
        onChange={(e) => setSelectedEvent(e.target.value)}
      >
        <option value="">Selecione um evento</option>
        {events.map((ev) => (
          <option key={ev.id} value={ev.id}>
            {ev.name} - {ev.time} (
            {format(new Date(ev.date), "dd/MM/yyyy", { locale: ptBR })})
          </option>
        ))}
      </select>

      {!selectedEvent && <p>Selecione um evento para ver as presenças.</p>}

      {selectedEvent && (
        <div className="bg-white rounded-xl shadow p-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Jogador</th>
                <th className="text-center py-2">Status</th>
                <th className="text-center py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {players.map((p) => {
                const attendance = attendances.find((a) => a.playerId === p.id);
                const status = attendance?.status || "ABSENT";

                return (
                  <tr key={p.id} className="border-b hover:bg-gray-50">
                    <td className="py-2">{p.name}</td>
                    <td className="text-center">
                      <div
                        className={`mx-auto w-4 h-4 rounded-full ${
                          status === "PRESENT"
                            ? "bg-green-500"
                            : status === "JUSTIFIED"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      ></div>
                    </td>
                    <td className="text-center space-x-2">
                      <button
                        onClick={() => setStatus(p.id, "PRESENT")}
                        className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm"
                      >
                        Foi
                      </button>
                      <button
                        onClick={() => setStatus(p.id, "JUSTIFIED")}
                        className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-sm"
                      >
                        Justificou
                      </button>
                      <button
                        onClick={() => setStatus(p.id, "ABSENT")}
                        className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm"
                      >
                        Faltou
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
