"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

const loginSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres"),
});

type LoginData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginData) {
    try {
      await loginUser(data.email, data.password);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Credenciais inválidas");
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-md w-96 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <input
          {...register("email")}
          placeholder="Email"
          className="w-full border rounded px-3 py-2"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <input
          type="password"
          {...register("password")}
          placeholder="Senha"
          className="w-full border rounded px-3 py-2"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isSubmitting ? "Entrando..." : "Entrar"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Não tem conta?{" "}
          <a
            href="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Cadastre-se
          </a>
        </p>
      </form>
    </div>
  );
}
