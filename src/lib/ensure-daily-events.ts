import { db } from "./firebase";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { format } from "date-fns";

export async function ensureDailyEvents() {
  const today = format(new Date(), "yyyy-MM-dd");

  const baseSnap = await getDocs(collection(db, "events"));
  const baseEvents = baseSnap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  })) as any[];

  const q = query(collection(db, "events"), where("date", "==", today));
  const snapshot = await getDocs(q);

  if (!snapshot.empty) return;

  for (const ev of baseEvents) {
    await addDoc(collection(db, "events"), {
      name: ev.name,
      time: ev.time,
      date: today,
      createdAt: new Date(),
    });
  }

  console.log("Eventos automáticos criados para o dia", today);
}
