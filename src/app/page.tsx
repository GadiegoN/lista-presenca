"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { HomeLogo } from "./_components/home-logo";
import { HomeTitle } from "./_components/home-title";
import { HomeIcons } from "./_components/home-icons";
import { HomeActions } from "./_components/home-actions";
import { HomeFooter } from "./_components/home-footer";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 via-white to-blue-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative text-center space-y-6 p-6 sm:p-8 rounded-2xl bg-white/80 backdrop-blur-md shadow-lg w-full max-w-md"
      >
        <HomeLogo />

        <HomeTitle />

        <HomeIcons />

        <HomeActions
          onLogin={() => router.push("/login")}
          onRegister={() => router.push("/register")}
        />

        <HomeFooter />
      </motion.div>
    </div>
  );
}
