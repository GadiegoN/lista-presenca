import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function AttendanceTable({
  weekDays,
  players,
  events,
  attendances,
  setStatus,
}: any) {
  function getStatus(playerId: string, eventId: string, date: string) {
    return attendances.find(
      (a: any) =>
        a.playerId === playerId && a.eventId === eventId && a.date === date
    )?.status;
  }

  return (
    <div className="w-full overflow-x-auto pb-2 px-2">
      <table className="border-collapse w-max min-w-full pr-10">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="px-3 py-2 border text-left">Jogador</th>
            {weekDays.map((day: Date) => (
              <th
                key={day.toISOString()}
                colSpan={events.length}
                className="border px-3 py-2 text-center whitespace-nowrap"
              >
                {format(day, "EEE", { locale: ptBR }).toUpperCase()}
              </th>
            ))}
          </tr>
          <tr className="bg-gray-50">
            <th className="border"></th>
            {weekDays.flatMap((day: Date) =>
              events.map((ev: any) => (
                <th
                  key={`${day}-${ev.id}`}
                  className="border px-2 py-1 text-xs text-gray-500 whitespace-nowrap"
                >
                  {ev.name} ({ev.time})
                </th>
              ))
            )}
          </tr>
        </thead>

        <tbody>
          {players.map((p: any) => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="border px-3 py-2 font-medium text-gray-700">
                {p.name}
              </td>
              {weekDays.flatMap((day: Date) =>
                events.map((ev: any) => {
                  const date = format(day, "yyyy-MM-dd");
                  const status = getStatus(p.id, ev.id, date);
                  const color =
                    status === "PRESENT"
                      ? "bg-green-500"
                      : status === "JUSTIFIED"
                      ? "bg-yellow-500"
                      : status === "ABSENT"
                      ? "bg-red-500"
                      : "bg-gray-200";
                  return (
                    <td
                      key={`${p.id}-${ev.id}-${date}`}
                      className="border text-center py-1"
                    >
                      <div className="flex justify-center gap-1">
                        <div
                          className={`w-4 h-4 rounded-full ${color}`}
                          title={status || "Sem registro"}
                        />
                      </div>
                      <div className="flex justify-center gap-1 mt-1">
                        <button
                          onClick={() =>
                            setStatus(p.id, ev.id, date, "PRESENT")
                          }
                          className="w-5 h-5 rounded-full bg-green-100 hover:bg-green-200"
                          title="Foi"
                        />
                        <button
                          onClick={() =>
                            setStatus(p.id, ev.id, date, "JUSTIFIED")
                          }
                          className="w-5 h-5 rounded-full bg-yellow-100 hover:bg-yellow-200"
                          title="Justificou"
                        />
                        <button
                          onClick={() => setStatus(p.id, ev.id, date, "ABSENT")}
                          className="w-5 h-5 rounded-full bg-red-100 hover:bg-red-200"
                          title="Faltou"
                        />
                      </div>
                    </td>
                  );
                })
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
