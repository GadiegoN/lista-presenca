import { FileDown } from "lucide-react";

export function ExportButton({ onExport }: { onExport: () => void }) {
  return (
    <button
      onClick={onExport}
      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
    >
      <FileDown className="w-5 h-5" />
      Exportar Semana
    </button>
  );
}
