/**
 * Componente StatCard
 * Exibe uma estatística com ícone, número e descrição
 */

import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  description?: string;
  color?: 'blue' | 'purple' | 'green' | 'orange';
}

const colorClasses = {
  blue: 'bg-blue-50 text-blue-700 border-blue-200',
  purple: 'bg-purple-50 text-purple-700 border-purple-200',
  green: 'bg-green-50 text-green-700 border-green-200',
  orange: 'bg-orange-50 text-orange-700 border-orange-200',
};

const iconColorClasses = {
  blue: 'text-blue-500',
  purple: 'text-purple-500',
  green: 'text-green-500',
  orange: 'text-orange-500',
};

export function StatCard({
  icon: Icon,
  label,
  value,
  description,
  color = 'blue',
}: StatCardProps) {
  return (
    <div
      className={`rounded-lg border-2 p-6 transition-all hover:shadow-lg ${colorClasses[color]}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium opacity-75">{label}</p>
          <p className="mt-2 text-3xl font-bold">{value.toLocaleString('pt-BR')}</p>
          {description && <p className="mt-1 text-xs opacity-60">{description}</p>}
        </div>
        <Icon className={`h-10 w-10 ${iconColorClasses[color]}`} />
      </div>
    </div>
  );
}
