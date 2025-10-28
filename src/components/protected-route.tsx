"use client";

import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        <div className="animate-pulse text-center space-y-2">
          <div className="text-3xl font-semibold">Carregando...</div>
          <p>Verificando sessão...</p>
        </div>
      </div>
    );
  }

  return <>{user ? children : null}</>;
}
