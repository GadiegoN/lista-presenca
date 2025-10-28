"use client";

import { PlayerForm } from "./_components/player-form";
import { PlayerList } from "./_components/player-list";
import { usePlayers } from "./_components/use-players";

export default function JogadoresPage() {
  const { name, setName, players, addPlayer, loading } = usePlayers();

  return (
    <div className="p-4 sm:p-6 space-y-5 w-full lg:w-[calc(100vw-20rem)] overflow-x-hidden">
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 flex items-center gap-2">
        ⚽ <span>Jogadores</span>
      </h1>

      <PlayerForm name={name} setName={setName} onAdd={addPlayer} />

      {loading ? (
        <div className="text-gray-500 text-center py-6">Carregando...</div>
      ) : (
        <PlayerList players={players} />
      )}
    </div>
  );
}
