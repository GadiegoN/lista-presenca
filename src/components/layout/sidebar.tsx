"use client";

import { ClipboardCheck, Users, CalendarDays, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import clsx from "clsx";

const menu = [
  { label: "Dashboard", icon: ClipboardCheck, href: "/dashboard" },
  { label: "Turmas", icon: Users, href: "/turmas" },
  { label: "Presenças", icon: CalendarDays, href: "/presencas" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="h-screen w-64 bg-white border-r shadow-sm flex flex-col justify-between fixed left-0 top-0">
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
  );
}
