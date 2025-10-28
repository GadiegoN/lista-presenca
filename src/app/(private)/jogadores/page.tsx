"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function JogadoresPage() {
  const [name, setName] = useState("");
  const [players, setPlayers] = useState<any[]>([]);

  async function addPlayer() {
    if (!name.trim()) return;
    await addDoc(collection(db, "players"), { name, createdAt: new Date() });
    setName("");
    load();
  }

  async function load() {
    const snapshot = await getDocs(collection(db, "players"));
    setPlayers(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Jogadores</h1>

      <div className="flex gap-2">
        <input
          className="border rounded px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome do jogador"
        />
        <button
          onClick={addPlayer}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Adicionar
        </button>
      </div>

      <ul className="mt-4 space-y-2">
        {players.map((p) => (
          <li key={p.id} className="border rounded p-2 bg-white shadow-sm">
            {p.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
