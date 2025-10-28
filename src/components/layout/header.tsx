"use client";

import { useAuth } from "@/context/auth-context";
import { Menu } from "lucide-react";

export function Header() {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white border-b shadow-sm flex items-center justify-between px-6 ml-64 fixed top-0 right-0 left-0 z-10">
      <div className="flex items-center gap-3">
        <Menu className="w-5 h-5 text-gray-600 md:hidden" />
        <h2 className="text-lg font-semibold text-gray-800">Painel</h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="font-medium">{user?.displayName || "Usuário"}</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
          {user?.displayName?.[0]?.toUpperCase() ?? "U"}
        </div>
      </div>
    </header>
  );
}
