"use client";
import { motion } from "framer-motion";

export function HomeTitle() {
  return (
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
  );
}
