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
    <div className="flex flex-col sm:flex-row flex-wrap gap-3 items-stretch sm:items-center">
      <input
        className="border rounded-lg px-3 py-2 flex-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[180px]"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome do evento"
      />

      <input
        className="border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
        type="time"
        value={time}
        placeholder="Horario do evento"
        onChange={(e) => setTime(e.target.value)}
      />

      <button
        onClick={onAdd}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
      >
        Adicionar
      </button>
    </div>
  );
}
