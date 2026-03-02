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
import Image from "next/image";

import logo from "@/assets/images/logo_confredac.png";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { id: "enoads", label: "ENOADs", icon: Map, href: "/enoads" },
  { id: "igrejas", label: "Igrejas", icon: Church, href: "/church" },
  { id: "regionais", label: "Regionais", icon: Users, href: "/regionals" },
  {
    id: "congregacao",
    label: "Congregações",
    icon: Users2,
    href: "/congregation",
  },
  { id: "member", label: "Membros", icon: Users2, href: "/member" },
];

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-gray-200 bg-white p-6">
      {/* Logo */}
      <div className="mb-10 flex justify-center">
        <div className="flex items-center justify-center">
          <Image
            src={logo}
            alt="Logo CONFRADAC"
            width={200}
            height={200}
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Navegação */}
      <nav className="flex-1 space-y-2">
        {navItems.map(item => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link key={item.id} href={item.href}>
              <div
                className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                  active
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Rodapé */}
      <div className="space-y-2 border-t border-gray-200 pt-6">
        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-gray-100">
          <Settings className="h-5 w-5" />
          <span className="text-sm font-medium">Configurações</span>
        </button>

        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-gray-100">
          <LogOut className="h-5 w-5" />
          <span className="text-sm font-medium">Sair</span>
        </button>
      </div>

      {/* Usuário */}
      <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <p className="text-xs font-semibold text-gray-900">
          Apóstolo Davi Ferreira
        </p>
        <p className="text-xs text-gray-500">Presidente</p>
      </div>
    </aside>
  );
}
