"use client";
import { motion } from "framer-motion";

interface Props {
  onLogin: () => void;
  onRegister: () => void;
}

export function HomeActions({ onLogin, onRegister }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="flex flex-col sm:flex-row justify-center gap-3 mt-5"
    >
      <button
        onClick={onLogin}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
      >
        Entrar
      </button>

      <button
        onClick={onRegister}
        className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition w-full sm:w-auto"
      >
        Criar Conta
      </button>
    </motion.div>
  );
}
