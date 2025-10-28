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

export function useEvents() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function addEvent() {
    if (!name.trim() || !time.trim() || !user?.uid) return;

    await addDoc(collection(db, "events"), {
      name,
      time,
      date: new Date().toISOString(),
      userId: user.uid,
    });

    setName("");
    setTime("");
    await load();
  }

  async function load() {
    if (!user?.uid) return;
    setLoading(true);

    const q = query(
      collection(db, "events"),
      where("userId", "==", user.uid),
      orderBy("date", "desc")
    );

    const snapshot = await getDocs(q);
    setEvents(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [user]);

  return { name, time, setName, setTime, events, addEvent, loading };
}
