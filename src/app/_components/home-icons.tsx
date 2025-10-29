"use client";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

export function HomeIcons() {
  return (
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
  );
}
