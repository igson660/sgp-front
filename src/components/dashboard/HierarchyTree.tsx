/**
 * Componente HierarchyTree
 * Exibe a hierarquia da CONFRADAC de forma expandível/colapsável
 */

"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Federacao } from "@/shared/types/confradac";

interface TreeNodeProps {
  label: string;
  icon: string;
  count?: number;
  level: number;
  children?: React.ReactNode;
  defaultExpanded?: boolean;
}

function TreeNode({
  label,
  icon,
  count,
  children,
  defaultExpanded = false,
}: TreeNodeProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const hasChildren = !!children;

  return (
    <div className="select-none">
      <div
        className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 hover:bg-gray-100"
        onClick={() => hasChildren && setExpanded(!expanded)}
      >
        {hasChildren ? (
          expanded ? (
            <ChevronDown className="h-4 w-4 text-gray-600" />
          ) : (
            <ChevronRight className="h-4 w-4 text-gray-600" />
          )
        ) : (
          <div className="h-4 w-4" />
        )}

        <span className="text-lg">{icon}</span>

        <span className="font-medium text-gray-800">{label}</span>

        {count !== undefined && (
          <span className="ml-auto rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
            {count}
          </span>
        )}
      </div>

      {hasChildren && expanded && (
        <div className="ml-4 border-l-2 border-gray-200 pl-2">{children}</div>
      )}
    </div>
  );
}

interface HierarchyTreeProps {
  federacao: Federacao;
}

export function HierarchyTree({ federacao }: HierarchyTreeProps) {
  return (
    <div className="space-y-1 rounded-lg border border-gray-200 bg-white p-4">
      <TreeNode
        label={federacao.nome}
        icon="🏛️"
        count={federacao.totalMembros}
        level={0}
        defaultExpanded={true}
      >
        {federacao.enoads.map(enoads => (
          <TreeNode
            key={enoads.id}
            label={enoads.nome}
            icon="📍"
            count={enoads.totalMembros}
            level={1}
          >
            {enoads.regionais.map(regional => (
              <TreeNode
                key={regional.id}
                label={regional.nome}
                icon="🗺️"
                count={regional.totalMembros}
                level={2}
              >
                {regional.igrejas.map(igreja => (
                  <TreeNode
                    key={igreja.id}
                    label={igreja.nome}
                    icon="⛪"
                    count={igreja.membros}
                    level={3}
                  >
                    {igreja.grupos.length > 0 && (
                      <>
                        {igreja.grupos.map(grupo => (
                          <TreeNode
                            key={grupo.id}
                            label={grupo.nome}
                            icon="👥"
                            count={grupo.membros}
                            level={4}
                          />
                        ))}
                      </>
                    )}
                  </TreeNode>
                ))}
              </TreeNode>
            ))}
          </TreeNode>
        ))}
      </TreeNode>
    </div>
  );
}
