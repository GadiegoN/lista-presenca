"use client";

interface Props {
  name: string;
  time: string;
  setName: (v: string) => void;
  setTime: (v: string) => void;
  onAdd: () => void;
}

export function EventForm({ name, time, setName, setTime, onAdd }: Props) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <input
        className="border rounded px-3 py-2 flex-1 min-w-[200px]"
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
        onClick={onAdd}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Adicionar
      </button>
    </div>
  );
}
