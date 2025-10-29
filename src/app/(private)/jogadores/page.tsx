"use client";

import { useState } from "react";
import { PlayerForm } from "./_components/player-form";
import { PlayerList } from "./_components/player-list";
import { usePlayers } from "./_components/use-players";
import { Search } from "lucide-react";

export default function JogadoresPage() {
  const {
    name,
    setName,
    players,
    addPlayer,
    toggleActive,
    updatePlayer,
    deletePlayer,
    order,
    setOrder,
    loading,
  } = usePlayers();

  const [search, setSearch] = useState("");

  const filteredPlayers = players.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const noPlayers = !players.length && !loading;
  const noResults = players.length > 0 && filteredPlayers.length === 0;

  return (
    <div className="p-4 sm:p-6 space-y-5 w-full lg:w-[calc(100vw-20rem)] overflow-x-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 flex items-center gap-2">
          ⚽ <span>Jogadores</span>
        </h1>

        <select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          className="border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="createdAt_desc">Mais recentes</option>
          <option value="createdAt_asc">Mais antigos</option>
          <option value="name_asc">Nome (A–Z)</option>
          <option value="name_desc">Nome (Z–A)</option>
        </select>
      </div>

      <PlayerForm name={name} setName={setName} onAdd={addPlayer} />

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar jogador..."
          className="w-full border rounded-lg pl-10 pr-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading ? (
        <div className="text-gray-500 text-center py-6">Carregando...</div>
      ) : noPlayers ? (
        <div className="text-gray-500 text-center py-6">
          Nenhum jogador cadastrado ainda.
        </div>
      ) : noResults ? (
        <div className="text-gray-500 text-center py-6">
          Nenhum jogador encontrado para “{search}”.
        </div>
      ) : (
        <PlayerList
          players={filteredPlayers}
          onUpdate={updatePlayer}
          onDelete={deletePlayer}
          onToggleActive={toggleActive}
        />
      )}
    </div>
  );
}
