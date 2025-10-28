"use client";

interface Props {
  events: any[];
}

export function EventList({ events }: Props) {
  if (!events.length)
    return (
      <div className="text-gray-500 text-center py-6">
        Nenhum evento cadastrado ainda.
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
      {events.map((e) => (
        <div
          key={e.id}
          className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition flex flex-col sm:flex-row sm:justify-between sm:items-center"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-gray-800 font-medium">
            <span className="truncate max-w-[200px] sm:max-w-none">
              {e.name}
            </span>
            <span className="text-gray-500 text-sm sm:text-base">
              ⏰ {e.time}
            </span>
          </div>

          <span className="text-xs text-gray-400 mt-1 sm:mt-0">
            {new Date(e.date).toLocaleDateString("pt-BR")}
          </span>
        </div>
      ))}
    </div>
  );
}
