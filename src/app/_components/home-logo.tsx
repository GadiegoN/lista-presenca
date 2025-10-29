"use client";
import { motion } from "framer-motion";
import { ClipboardCheck } from "lucide-react";

export function HomeLogo() {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="flex justify-center"
    >
      <ClipboardCheck className="w-14 h-14 sm:w-16 sm:h-16 text-blue-600" />
    </motion.div>
  );
}
