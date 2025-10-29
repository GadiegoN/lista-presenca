"use client";

import { useState } from "react";
import { Pencil, Trash2, Check, X } from "lucide-react";

interface Props {
  players: any[];
  onUpdate: (id: string, newName: string) => void;
  onDelete: (id: string) => void;
}

export function PlayerList({ players, onUpdate, onDelete }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

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
          className="border rounded-lg p-3 bg-white shadow-sm hover:shadow-md transition text-gray-800 flex items-center justify-between"
        >
          {editingId === p.id ? (
            <div className="flex flex-1 items-center gap-2">
              <input
                className="border rounded px-2 py-1 flex-1 text-sm"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
              <button
                onClick={() => {
                  onUpdate(p.id, editName);
                  setEditingId(null);
                }}
                className="text-green-600 hover:text-green-800"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={() => setEditingId(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <span className="font-medium truncate">{p.name}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingId(p.id);
                    setEditName(p.name);
                  }}
                  className="text-blue-600 hover:text-blue-800"
                  title="Editar"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(p.id)}
                  className="text-red-600 hover:text-red-800"
                  title="Excluir"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
