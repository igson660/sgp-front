"use client";

import { Users, MapPin, User, ChevronRight } from "lucide-react";
import type { HierarchyLevel } from "@/shared/types/confradac";

interface EntityCardProps {
  id: string;
  nome: string;
  level: HierarchyLevel;

  membros?: number;
  lider?: string;
  localidade?: string;
  descricao?: string;
  ativa?: boolean;
  status?: "active" | "inactive";

  onClick?: (id: string) => void;
}

const levelColors: Record<HierarchyLevel, string> = {
  federation: "border-blue-300 bg-blue-50",
  enoads: "border-purple-300 bg-purple-50",
  regional: "border-indigo-300 bg-indigo-50",
  church: "border-green-300 bg-green-50",
  congregation: "border-orange-300 bg-orange-50",
  member: "border-gray-300 bg-gray-50",
};

const levelIcons: Record<HierarchyLevel, string> = {
  federation: "🏛️",
  enoads: "📍",
  regional: "🗺️",
  church: "⛪",
  congregation: "👥",
  member: "👤",
};

export function EntityCard({
  id,
  nome,
  level,
  membros,
  localidade,
  lider,
  descricao,
  ativa = true,
  status,
  onClick,
}: EntityCardProps) {
  const isMember = level === "member";

  const handleClick = () => {
    onClick?.(id);
  };

  return (
    <div
      onClick={handleClick}
      className={`group rounded-lg border-2 p-4 transition-all hover:shadow-md ${
        levelColors[level]
      } ${!ativa ? "opacity-60" : ""} ${onClick ? "cursor-pointer" : ""}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xl">{levelIcons[level]}</span>
            <h3 className="font-semibold text-gray-900">{nome}</h3>

            {isMember && status && (
              <span
                className={`ml-2 rounded-full px-2 py-0.5 text-xs font-medium ${
                  status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {status === "active" ? "Ativo" : "Inativo"}
              </span>
            )}
          </div>

          {descricao && (
            <p className="mt-1 text-xs text-gray-600">{descricao}</p>
          )}

          <div className="mt-3 flex flex-wrap gap-3">
            {!isMember && typeof membros === "number" && (
              <div className="flex items-center gap-1 text-sm text-gray-700">
                <Users className="h-4 w-4" />
                <span>{membros} membros</span>
              </div>
            )}

            {localidade && (
              <div className="flex items-center gap-1 text-sm text-gray-700">
                <MapPin className="h-4 w-4" />
                <span>{localidade}</span>
              </div>
            )}

            {!isMember && lider && (
              <div className="flex items-center gap-1 text-sm text-gray-700">
                <User className="h-4 w-4" />
                <span>{lider}</span>
              </div>
            )}
          </div>
        </div>

        {onClick && (
          <ChevronRight className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1" />
        )}
      </div>
    </div>
  );
}
