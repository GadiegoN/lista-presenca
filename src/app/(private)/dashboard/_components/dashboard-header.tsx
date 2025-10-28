"use client";

import { Trophy, FileDown } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Props {
  weekDays: Date[];
  onExport: () => void;
  onLogout: () => void;
}

export function DashboardHeader({ weekDays, onExport, onLogout }: Props) {
  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4 gap-4">
      <div className="w-full">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2 flex-wrap">
          <Trophy className="w-7 h-7 sm:w-8 sm:h-8 text-yellow-500" />
          Ranking de Presenças
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Semana de {format(weekDays[0], "dd/MM", { locale: ptBR })} a{" "}
          {format(weekDays[6], "dd/MM", { locale: ptBR })}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <button
          onClick={onExport}
          className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full sm:w-auto"
        >
          <FileDown className="w-5 h-5" /> Exportar Semana
        </button>
        <button
          onClick={onLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition w-full sm:w-auto"
        >
          Sair
        </button>
      </div>
    </header>
  );
}
