"use client";

interface Props {
  events: any[];
}

export function EventList({ events }: Props) {
  if (!events.length)
    return <div className="text-gray-500">Nenhum evento cadastrado.</div>;

  return (
    <ul className="mt-4 space-y-2">
      {events.map((e) => (
        <li
          key={e.id}
          className="border rounded p-2 bg-white shadow-sm flex justify-between items-center hover:shadow transition"
        >
          <span>
            {e.name} — {e.time}
          </span>
          <span className="text-xs text-gray-400">
            {new Date(e.date).toLocaleDateString("pt-BR")}
          </span>
        </li>
      ))}
    </ul>
  );
}
