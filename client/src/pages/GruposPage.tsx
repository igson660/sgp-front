/**
 * Página Grupos
 * Listagem de todos os Grupos com detalhes
 */

import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import { EntityCard } from '@/components/dashboard/EntityCard';
import { federacaoData } from '@/lib/mock-data';

export default function GruposPage() {
  const federacao = federacaoData;

  // Flatten all grupos from all igrejas
  const todosGrupos = federacao.enoads.flatMap((enoads) =>
    enoads.regionais.flatMap((regional) =>
      regional.igrejas.flatMap((igreja) =>
        igreja.grupos.map((grupo) => ({
          ...grupo,
          igrejaPai: igreja.nome,
          regionalPai: regional.nome,
          enoadsPai: enoads.nome,
        }))
      )
    )
  );

  const totalMembrosGrupos = todosGrupos.reduce((sum, g) => sum + g.membros, 0);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentPage="grupos" />

      <main className="ml-64 flex-1">
        <Header title="Grupos" />

        <div className="p-8">
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="text-sm font-medium text-gray-600">Total de Grupos</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{todosGrupos.length}</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="text-sm font-medium text-gray-600">Total de Membros</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {totalMembrosGrupos.toLocaleString('pt-BR')}
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="text-sm font-medium text-gray-600">Média de membros por grupo</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {todosGrupos.length > 0 ? Math.round(totalMembrosGrupos / todosGrupos.length) : 0}
              </p>
            </div>
          </div>

          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900">Lista de Grupos</h2>
            {todosGrupos.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {todosGrupos.map((grupo) => (
                  <EntityCard
                    key={grupo.id}
                    id={grupo.id}
                    nome={grupo.nome}
                    level="grupo"
                    membros={grupo.membros}
                    lider={grupo.lider}
                    descricao={grupo.descricao}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
                <p className="text-gray-600">Nenhum grupo cadastrado ainda.</p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
