/**
 * Componente Sidebar
 * Navegação lateral do dashboard
 */

"use client";

import {
  LayoutDashboard,
  Users,
  Map,
  Church,
  Users2,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    id: "enoads",
    label: "ENOADs",
    icon: Map,
    href: "/enoads",
  },
  {
    id: "regionais",
    label: "Regionais",
    icon: Users,
    href: "/regionais",
  },
  {
    id: "igrejas",
    label: "Igrejas",
    icon: Church,
    href: "/church",
  },
  {
    id: "grupos",
    label: "Grupos",
    icon: Users2,
    href: "/grupos",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-gray-200 bg-gradient-to-b from-blue-50 to-purple-50 p-6">
      {/* Logo/Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold">
            C
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">CONFRADAC</h1>
            <p className="text-xs text-gray-600">Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="space-y-2">
        {navItems.map(item => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link key={item.id} href={item.href}>
              <div
                className={`flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                  active
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-700 hover:bg-white hover:bg-opacity-50"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="my-6 border-t border-gray-200" />

      {/* Footer Items */}
      <div className="space-y-2">
        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition-all hover:bg-white hover:bg-opacity-50">
          <Settings className="h-5 w-5" />
          <span className="font-medium">Configurações</span>
        </button>
        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition-all hover:bg-white hover:bg-opacity-50">
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Sair</span>
        </button>
      </div>

      {/* User Info */}
      <div className="absolute bottom-6 left-6 right-6 rounded-lg border border-gray-200 bg-white p-3">
        <p className="text-xs font-semibold text-gray-900">
          Apóstolo Davi Ferreira
        </p>
        <p className="text-xs text-gray-600">Presidente</p>
      </div>
    </aside>
  );
}
