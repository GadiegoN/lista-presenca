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
      <div className="relative flex-1 min-w-[180px]">
        <input
          id="event-name"
          className="peer border rounded-lg px-3 py-2 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome do evento"
        />
      </div>

      <div className="relative w-full sm:w-auto">
        <input
          id="event-time"
          type="time"
          className="peer border rounded-lg px-3 py-2 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder=" "
        />
        <label
          htmlFor="event-time"
          className="absolute left-3 -top-2.5 bg-white px-1 text-xs text-gray-500 block sm:hidden"
        >
          Horário do evento
        </label>
      </div>

      <button
        onClick={onAdd}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
      >
        Adicionar
      </button>
    </div>
  );
}
