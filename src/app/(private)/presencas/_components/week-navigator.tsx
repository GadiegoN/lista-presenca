import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function WeekNavigator({ weekStart, onPrev, onNext }: any) {
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);

  return (
    <div className="flex items-center justify-between flex-wrap gap-2">
      <button
        onClick={onPrev}
        className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded transition"
      >
        <ChevronLeft className="w-4 h-4" /> Semana anterior
      </button>

      <h1 className="text-2xl font-semibold text-gray-800 text-center">
        📅 Semana de {format(weekStart, "dd/MM", { locale: ptBR })} a{" "}
        {format(weekEnd, "dd/MM", { locale: ptBR })}
      </h1>

      <button
        onClick={onNext}
        className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded transition"
      >
        Próxima semana <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
