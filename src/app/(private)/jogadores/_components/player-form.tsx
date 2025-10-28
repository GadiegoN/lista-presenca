"use client";

interface Props {
  name: string;
  setName: (v: string) => void;
  onAdd: () => void;
}

export function PlayerForm({ name, setName, onAdd }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <input
        className="border rounded-lg px-3 py-2 flex-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome do jogador"
      />
      <button
        onClick={onAdd}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
      >
        Adicionar
      </button>
    </div>
  );
}
