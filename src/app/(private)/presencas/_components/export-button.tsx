"use client";

import { FileDown } from "lucide-react";

export function ExportButton({ onExport }: { onExport: () => void }) {
  return (
    <button
      onClick={onExport}
      className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm sm:text-base"
    >
      <FileDown className="w-4 h-4 sm:w-5 sm:h-5" />
      Exportar Semana
    </button>
  );
}
