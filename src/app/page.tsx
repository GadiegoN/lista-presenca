"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ClipboardCheck, Users } from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 via-white to-blue-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center space-y-6 p-6 sm:p-8 rounded-2xl bg-white/80 backdrop-blur-md shadow-lg w-full max-w-md"
      >
        {/* Ícone principal */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <ClipboardCheck className="w-14 h-14 sm:w-16 sm:h-16 text-blue-600" />
        </motion.div>

        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            📋 Lista de Presença
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Gerencie suas presenças de forma rápida e organizada
          </p>
        </motion.div>

        {/* Ícones animados */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center gap-2 sm:gap-3 mt-3"
        >
          <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
          <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
          <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-300" />
        </motion.div>

        {/* Botões */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row justify-center gap-3 mt-5"
        >
          <button
            onClick={() => router.push("/login")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
          >
            Entrar
          </button>

          <button
            onClick={() => router.push("/register")}
            className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition w-full sm:w-auto"
          >
            Criar Conta
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
