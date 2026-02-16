/**
 * Componente Header
 * Cabeçalho do dashboard com breadcrumb e informações
 */

"use client";

import { ChevronRight, Bell } from "lucide-react";
import { BreadcrumbItem } from "@/shared/types/confradac";

interface HeaderProps {
  title: string;
  breadcrumbs?: BreadcrumbItem[];
  onBreadcrumbClick?: (item: BreadcrumbItem) => void;
}

export function Header({ title, breadcrumbs, onBreadcrumbClick }: HeaderProps) {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>

          {breadcrumbs && breadcrumbs.length > 0 && (
            <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
              {breadcrumbs.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  {index > 0 && <ChevronRight className="h-4 w-4" />}
                  <button
                    onClick={() => onBreadcrumbClick?.(item)}
                    className="hover:text-blue-600 hover:underline"
                  >
                    {item.label}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button className="relative rounded-full p-2 hover:bg-gray-100">
            <Bell className="h-6 w-6 text-gray-600" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
          </button>

          <button className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
            <span className="text-sm font-medium text-gray-900">Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
}
