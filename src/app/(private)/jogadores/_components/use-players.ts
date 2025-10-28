"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
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

  async function load() {
    if (!user?.uid) return;
    setLoading(true);

    const q = query(
      collection(db, "players"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);
    setPlayers(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [user]);

  return { name, setName, players, addPlayer, loading };
}
