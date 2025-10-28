"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

const registerSchema = z
  .object({
    name: z.string().min(2, "Nome muito curto"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string().min(6, "Confirme sua senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type RegisterData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterData) {
    try {
      await registerUser(data.name, data.email, data.password);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Erro ao criar conta. Tente novamente.");
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-md w-96 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Cadastro</h1>

        <div>
          <input
            {...register("name")}
            placeholder="Nome completo"
            className="w-full border rounded px-3 py-2"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="w-full border rounded px-3 py-2"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("password")}
            type="password"
            placeholder="Senha"
            className="w-full border rounded px-3 py-2"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirmar senha"
            className="w-full border rounded px-3 py-2"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isSubmitting ? "Criando..." : "Cadastrar"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Já tem conta?{" "}
          <a
            href="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Entrar
          </a>
        </p>
      </form>
    </div>
  );
}
