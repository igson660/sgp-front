/**
 * Página Regionais
 * Listagem de todas as Regionais com detalhes
 */

import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import { EntityCard } from '@/components/dashboard/EntityCard';
import { federacaoData } from '@/lib/mock-data';

export default function RegionaisPage() {
  const federacao = federacaoData;

  // Flatten all regionais from all enoads
  const todasRegionais = federacao.enoads.flatMap((enoads) =>
    enoads.regionais.map((regional) => ({
      ...regional,
      enoadsPai: enoads.nome,
    }))
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="ml-64 flex-1">
        <Header title="Regionais" />

        <div className="p-8">
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="text-sm font-medium text-gray-600">Total de Regionais</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{todasRegionais.length}</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="text-sm font-medium text-gray-600">Total de Igrejas</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {todasRegionais.reduce((sum, r) => sum + r.igrejas.length, 0)}
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="text-sm font-medium text-gray-600">Total de Membros</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {todasRegionais.reduce((sum, r) => sum + r.totalMembros, 0).toLocaleString('pt-BR')}
              </p>
            </div>
          </div>

          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900">Lista de Regionais</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {todasRegionais.map((regional) => (
                <EntityCard
                  key={regional.id}
                  id={regional.id}
                  nome={regional.nome}
                  level="regional"
                  membros={regional.totalMembros}
                  lider={regional.coordenador}
                  descricao={`${regional.igrejas.length} igrejas • ${regional.totalGrupos} grupos`}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
