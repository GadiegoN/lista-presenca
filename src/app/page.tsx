"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ClipboardCheck, Users } from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex h-screen items-center justify-center bg-linear-to-br from-blue-50 via-white to-blue-100">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center space-y-6 p-8 rounded-2xl bg-white/80 backdrop-blur-md shadow-lg"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <ClipboardCheck className="w-16 h-16 text-blue-600" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h1 className="text-4xl font-bold text-gray-800">
            📋 Lista de Presença
          </h1>
          <p className="text-gray-600 mt-2">
            Gerencie suas presenças de forma rápida e organizada
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center gap-3 mt-4"
        >
          <Users className="w-8 h-8 text-blue-500" />
          <Users className="w-8 h-8 text-blue-400" />
          <Users className="w-8 h-8 text-blue-300" />
        </motion.div>

        {/* Botões de ação */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-center gap-4 mt-6"
        >
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
        </motion.div>
      </motion.div>
    </div>
  );
}
