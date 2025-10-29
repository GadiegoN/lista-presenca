"use client";

import { useState } from "react";
import { Pencil, Trash2, Check, X } from "lucide-react";

interface Props {
  events: any[];
  onUpdate: (id: string, name: string, time: string) => void;
  onDelete: (id: string) => void;
}

export function EventList({ events, onUpdate, onDelete }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editTime, setEditTime] = useState("");

  if (!events.length)
    return (
      <div className="text-gray-500 text-center py-6">
        Nenhum evento cadastrado ainda.
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
      {events.map((e) => {
        const isEditing = editingId === e.id;
        return (
          <div
            key={e.id}
            className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition flex flex-col gap-3"
          >
            {isEditing ? (
              <>
                <input
                  value={editName}
                  onChange={(ev) => setEditName(ev.target.value)}
                  className="border rounded px-2 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="time"
                  value={editTime}
                  onChange={(ev) => setEditTime(ev.target.value)}
                  className="border rounded px-2 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => {
                      onUpdate(e.id, editName, editTime);
                      setEditingId(null);
                    }}
                    className="flex items-center gap-1 text-green-600 hover:text-green-700"
                  >
                    <Check size={16} /> Salvar
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
                  >
                    <X size={16} /> Cancelar
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <div className="text-gray-800 font-medium flex items-center gap-2">
                    <span className="truncate max-w-40 sm:max-w-[200px]">
                      {e.name}
                    </span>
                    <span className="text-gray-500 text-sm">⏰ {e.time}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingId(e.id);
                        setEditName(e.name);
                        setEditTime(e.time);
                      }}
                      className="text-blue-600 hover:text-blue-700"
                      title="Editar"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(e.id)}
                      className="text-red-600 hover:text-red-700"
                      title="Excluir"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <span className="text-xs text-gray-400">
                  Criado em{" "}
                  {new Date(e.date).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </span>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
