"use client";

interface Props {
  players: any[];
}

export function PlayerList({ players }: Props) {
  if (!players.length)
    return (
      <div className="text-gray-500 text-center py-4">
        Nenhum jogador cadastrado ainda.
      </div>
    );

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {players.map((p) => (
        <li
          key={p.id}
          className="border rounded-lg p-3 bg-white shadow-sm hover:shadow-md transition text-gray-800 text-center sm:text-left"
        >
          {p.name}
        </li>
      ))}
    </ul>
  );
}
