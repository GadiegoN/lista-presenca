"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardCheck,
  Users,
  CalendarDays,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import clsx from "clsx";

const menu = [
  { label: "Dashboard", icon: ClipboardCheck, href: "/dashboard" },
  { label: "Jogadores", icon: Users, href: "/jogadores" },
  { label: "Presenças", icon: CalendarDays, href: "/presencas" },
  { label: "Eventos", icon: CalendarDays, href: "/eventos" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => setOpen((prev) => !prev);
  const closeSidebar = () => setOpen(false);

  return (
    <>
      {/* 🔹 Botão hamburguer (somente mobile) */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 border border-blue-600 bg-white text-blue-600 p-2 rounded-md shadow-md lg:hidden"
        aria-label="Abrir menu"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* 🔹 Overlay (fecha ao clicar fora) */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeSidebar}
              className="fixed inset-0 bg-black z-30 lg:hidden"
            />

            <motion.aside
              key="mobile-sidebar"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="fixed inset-y-0 left-0 z-40 w-64 bg-white border-r shadow-lg flex flex-col justify-between p-4 lg:hidden"
            >
              <div>
                <div className="flex items-center justify-between border-b pb-3 mb-4">
                  <h1 className="text-lg font-semibold text-blue-600">
                    📋 Lista Presença
                  </h1>
                  <button onClick={closeSidebar}>
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <nav className="flex flex-col gap-1">
                  {menu.map((item) => {
                    const Icon = item.icon;
                    const active = pathname.startsWith(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeSidebar}
                        className={clsx(
                          "flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 hover:bg-blue-50 transition",
                          active &&
                            "bg-blue-100 text-blue-700 font-medium border-l-4 border-blue-600"
                        )}
                      >
                        <Icon className="w-5 h-5" />
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="border-t pt-3">
                <button
                  onClick={() => {
                    closeSidebar();
                    logout();
                  }}
                  className="flex items-center gap-3 w-full text-gray-600 hover:text-red-600 transition"
                >
                  <LogOut className="w-5 h-5" />
                  Sair
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* 🔹 Sidebar Desktop (fixa e permanente) */}
      <aside className="hidden lg:flex h-screen w-64 bg-white border-r shadow-sm flex-col justify-between fixed left-0 top-0 z-20">
        <div>
          <div className="p-6 border-b">
            <h1 className="text-xl font-semibold text-blue-600">
              📋 Lista Presença
            </h1>
          </div>
          <nav className="flex flex-col mt-4">
            {menu.map((item) => {
              const Icon = item.icon;
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "flex items-center gap-3 px-5 py-2 text-gray-700 hover:bg-blue-50 transition",
                    active &&
                      "bg-blue-100 text-blue-700 font-medium border-r-4 border-blue-600"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full text-gray-600 hover:text-red-600 transition"
          >
            <LogOut className="w-5 h-5" />
            Sair
          </button>
        </div>
      </aside>
    </>
  );
}
