"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function EventosPage() {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [events, setEvents] = useState<any[]>([]);

  async function addEvent() {
    if (!name || !time) return;
    await addDoc(collection(db, "events"), {
      name,
      time,
      date: new Date().toISOString(),
    });
    setName("");
    setTime("");
    load();
  }

  async function load() {
    const snapshot = await getDocs(collection(db, "events"));
    setEvents(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Eventos</h1>

      <div className="flex gap-2">
        <input
          className="border rounded px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome do evento"
        />
        <input
          className="border rounded px-3 py-2"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button
          onClick={addEvent}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Adicionar
        </button>
      </div>

      <ul className="mt-4 space-y-2">
        {events.map((e) => (
          <li
            key={e.id}
            className="border rounded p-2 bg-white shadow-sm flex justify-between"
          >
            <span>
              {e.name} — {e.time}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
