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
    <header className="flex items-center justify-between border-b pb-4 flex-wrap gap-3">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <Trophy className="w-8 h-8 text-yellow-500" /> Ranking de Presenças
        </h1>
        <p className="text-gray-500 text-sm">
          Semana de {format(weekDays[0], "dd/MM", { locale: ptBR })} a{" "}
          {format(weekDays[6], "dd/MM", { locale: ptBR })}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onExport}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          <FileDown className="w-5 h-5" /> Exportar Semana
        </button>
        <button
          onClick={onLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Sair
        </button>
      </div>
    </header>
  );
}
