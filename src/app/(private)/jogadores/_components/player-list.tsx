"use client";

interface Props {
  players: any[];
}

export function PlayerList({ players }: Props) {
  if (!players.length)
    return <div className="text-gray-500">Nenhum jogador cadastrado.</div>;

  return (
    <ul className="mt-4 space-y-2">
      {players.map((p) => (
        <li
          key={p.id}
          className="border rounded p-2 bg-white shadow-sm hover:shadow transition"
        >
          {p.name}
        </li>
      ))}
    </ul>
  );
}
