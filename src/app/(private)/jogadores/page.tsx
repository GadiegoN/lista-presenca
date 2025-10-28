"use client";

import { PlayerForm } from "./_components/player-form";
import { PlayerList } from "./_components/player-list";
import { usePlayers } from "./_components/use-players";

export default function JogadoresPage() {
  const { name, setName, players, addPlayer, loading } = usePlayers();

  return (
    <div className="space-y-4 w-[calc(100vw-20rem)] overflow-x-hidden py-4">
      <h1 className="text-2xl font-semibold text-gray-800">⚽ Jogadores</h1>

      <PlayerForm name={name} setName={setName} onAdd={addPlayer} />

      {loading ? (
        <div className="text-gray-500">Carregando...</div>
      ) : (
        <PlayerList players={players} />
      )}
    </div>
  );
}
