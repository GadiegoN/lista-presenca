"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export function HomeFooter() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="flex flex-col items-center justify-center mt-6"
    >
      <div className="flex items-center gap-3 mb-2 opacity-70">
        <Image
          src="/icons/nextjs.svg"
          alt="Next.js"
          width={30}
          height={30}
          className="opacity-80"
        />
        <Image
          src="/icons/firebase.svg"
          alt="Firebase"
          width={22}
          height={22}
          className="opacity-80"
        />
        <Image
          src="/icons/tailwind.svg"
          alt="Tailwind"
          width={22}
          height={22}
          className="opacity-80"
        />
      </div>
      <p className="text-[11px] text-gray-400">by Gadiego Nogueira</p>
    </motion.div>
  );
}
