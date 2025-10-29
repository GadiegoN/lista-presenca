"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { useAuth } from "@/context/auth-context";

export function usePlayers() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState("createdAt_desc");

  async function addPlayer() {
    if (!name.trim() || !user?.uid) return;

    await addDoc(collection(db, "players"), {
      name,
      createdAt: new Date(),
      userId: user.uid,
    });

    setName("");
    await load();
  }

  async function updatePlayer(id: string, newName: string) {
    if (!newName.trim()) return;
    await updateDoc(doc(db, "players", id), { name: newName });
    await load();
  }

  async function deletePlayer(id: string) {
    await deleteDoc(doc(db, "players", id));
    await load();
  }

  async function load() {
    if (!user?.uid) return;
    setLoading(true);

    const [field, direction] = order.split("_");

    const q = query(
      collection(db, "players"),
      where("userId", "==", user.uid),
      orderBy(field, direction as "asc" | "desc")
    );

    const snapshot = await getDocs(q);
    setPlayers(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [user, order]);

  return {
    name,
    setName,
    players,
    addPlayer,
    updatePlayer,
    deletePlayer,
    order,
    setOrder,
    loading,
  };
}
