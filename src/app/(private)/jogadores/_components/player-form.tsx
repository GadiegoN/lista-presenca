"use client";

interface Props {
  name: string;
  setName: (v: string) => void;
  onAdd: () => void;
}

export function PlayerForm({ name, setName, onAdd }: Props) {
  return (
    <div className="flex gap-2">
      <input
        className="border rounded px-3 py-2 flex-1"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome do jogador"
      />
      <button
        onClick={onAdd}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Adicionar
      </button>
    </div>
  );
}
