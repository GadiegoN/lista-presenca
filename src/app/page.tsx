"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">📋 Lista de Presença</h1>
        <p className="text-gray-600">
          Gerencie presenças de forma simples e eficiente
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => router.push("/login")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Entrar
          </button>

          <button
            onClick={() => router.push("/register")}
            className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition"
          >
            Criar Conta
          </button>
        </div>
      </div>
    </div>
  );
}
