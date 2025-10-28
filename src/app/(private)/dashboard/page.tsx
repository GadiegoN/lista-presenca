"use client";

import ProtectedRoute from "@/components/protected-route";
import { useAuth } from "@/context/auth-context";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute>
      <div className="p-6 space-y-3">
        <h1 className="text-2xl font-semibold">
          Bem-vindo, {user?.displayName}
        </h1>
        <p className="text-gray-600">{user?.email}</p>

        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Sair
        </button>
      </div>
    </ProtectedRoute>
  );
}
