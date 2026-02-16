/**
 * Componente EntityCard
 * Exibe uma entidade (Igreja, Grupo, Regional) com informações básicas
 */

"use client";

import { Users, MapPin, User, ChevronRight } from "lucide-react";
import { HierarchyLevel } from "@/shared/types/confradac";

interface EntityCardProps {
  id: string;
  nome: string;
  level: HierarchyLevel;
  membros: number;
  localidade?: string;
  lider?: string;
  descricao?: string;
  ativa?: boolean;
  onClick?: () => void;
}

const levelColors = {
  federacao: "border-blue-300 bg-blue-50",
  enoads: "border-purple-300 bg-purple-50",
  regional: "border-indigo-300 bg-indigo-50",
  igreja: "border-green-300 bg-green-50",
  grupo: "border-orange-300 bg-orange-50",
};

const levelIcons = {
  federacao: "🏛️",
  enoads: "📍",
  regional: "🗺️",
  igreja: "⛪",
  grupo: "👥",
};

export function EntityCard({
  nome,
  level,
  membros,
  localidade,
  lider,
  descricao,
  ativa = true,
  onClick,
}: EntityCardProps) {
  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer rounded-lg border-2 p-4 transition-all hover:shadow-md ${levelColors[level]} ${
        !ativa ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xl">{levelIcons[level]}</span>
            <h3 className="font-semibold text-gray-900">{nome}</h3>
          </div>

          {descricao && (
            <p className="mt-1 text-xs text-gray-600">{descricao}</p>
          )}

          <div className="mt-3 flex flex-wrap gap-3">
            <div className="flex items-center gap-1 text-sm text-gray-700">
              <Users className="h-4 w-4" />
              <span>{membros} membros</span>
            </div>

            {localidade && (
              <div className="flex items-center gap-1 text-sm text-gray-700">
                <MapPin className="h-4 w-4" />
                <span>{localidade}</span>
              </div>
            )}

            {lider && (
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
