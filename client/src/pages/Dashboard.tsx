/**
 * Página Dashboard
 * Visão geral da CONFRADAC com estatísticas e hierarquia
 */

import { Users, Church, Map, Users2, TrendingUp } from 'lucide-react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import { StatCard } from '@/components/dashboard/StatCard';
import { HierarchyTree } from '@/components/dashboard/HierarchyTree';
import { EntityCard } from '@/components/dashboard/EntityCard';
import { federacaoData } from '@/lib/mock-data';

export default function Dashboard() {
  const federacao = federacaoData;

  // Pega os primeiros ENOADs para exibição
  const destaquesENOADS = federacao.enoads.slice(0, 2);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar currentPage="dashboard" />

      {/* Main Content */}
      <main className="ml-64 flex-1">
        {/* Header */}
        <Header title="Dashboard da CONFRADAC" />

        {/* Content */}
        <div className="p-8">
          {/* KPIs Section */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Visão Geral</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
              <StatCard
                icon={Users}
                label="Total de Membros"
                value={federacao.totalMembros}
                color="blue"
              />
              <StatCard
                icon={Church}
                label="Total de Igrejas"
                value={federacao.totalIgrejas}
                color="green"
              />
              <StatCard
                icon={Users2}
                label="Total de Grupos"
                value={federacao.totalGrupos}
                color="orange"
              />
              <StatCard
                icon={Map}
                label="Total de Regionais"
                value={federacao.totalRegionais}
                color="purple"
              />
              <StatCard
                icon={TrendingUp}
                label="Total de ENOADs"
                value={federacao.totalENOADS}
                color="blue"
              />
            </div>
          </section>

          {/* Main Grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Hierarchy Tree */}
            <section className="lg:col-span-2">
              <h2 className="mb-4 text-xl font-bold text-gray-900">Hierarquia Organizacional</h2>
              <HierarchyTree federacao={federacao} />
            </section>

            {/* Quick Stats */}
            <section>
              <h2 className="mb-4 text-xl font-bold text-gray-900">Informações</h2>
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-6">
                <div>
                  <p className="text-sm font-medium text-gray-600">Presidente</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    {federacao.presidente}
                  </p>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm font-medium text-gray-600">Estatísticas Rápidas</p>
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Média de membros por igreja</span>
                      <span className="font-semibold text-gray-900">
                        {Math.round(federacao.totalMembros / federacao.totalIgrejas)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Média de grupos por igreja</span>
                      <span className="font-semibold text-gray-900">
                        {(federacao.totalGrupos / federacao.totalIgrejas).toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* ENOADs Section */}
          <section className="mt-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">ENOADs Principais</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {destaquesENOADS.map((enoads) => (
                <EntityCard
                  key={enoads.id}
                  id={enoads.id}
                  nome={enoads.nome}
                  level="enoads"
                  membros={enoads.totalMembros}
                  lider={enoads.presidente}
                  descricao={`${enoads.regionais.length} regionais • ${enoads.totalIgrejas} igrejas`}
                />
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
            <p>© 2024 CONFRADAC - Confederação de Igrejas. Todos os direitos reservados.</p>
          </footer>
        </div>
      </main>
    </div>
  );
}
