"use client";

import { useState } from "react";
import { useAttendance } from "../_components/use-attendance";
import { PlayerOrderList } from "../_components/player-order-list";
import { startOfWeek } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function OrdenarJogadoresPage() {
  const [weekStart] = useState(() =>
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const { players, reorderPlayers, loading } = useAttendance(weekStart);

  if (loading)
    return (
      <div className="p-6 text-center text-gray-500">
        Carregando jogadores...
      </div>
    );

  return (
    <div className="space-y-6 w-[calc(100vw-2rem)] lg:w-[calc(100vw-20rem)] overflow-hidden">
      <div className="flex items-center justify-between p-4 sm:p-6 bg-white rounded-xl shadow">
        <div className="flex items-center gap-3">
          <Link href="/presencas">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
          </Link>

          <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
            Ordenar Jogadores
          </h1>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4 sm:p-6">
        <PlayerOrderList players={players} onReorder={reorderPlayers} />
      </div>
    </div>
  );
}
