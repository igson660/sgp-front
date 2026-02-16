/**
 * Página Igrejas
 * Listagem de todas as Igrejas com detalhes
 */

import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import { EntityCard } from '@/components/dashboard/EntityCard';
import { federacaoData } from '@/lib/mock-data';

export default function IgrejasPage() {
  const federacao = federacaoData;

  // Flatten all igrejas from all regionais
  const todasIgrejas = federacao.enoads.flatMap((enoads) =>
    enoads.regionais.flatMap((regional) =>
      regional.igrejas.map((igreja) => ({
        ...igreja,
        regionalPai: regional.nome,
        enoadsPai: enoads.nome,
      }))
    )
  );

  const igrejasAtivas = todasIgrejas.filter((i) => i.ativa).length;
  const igrejasInativas = todasIgrejas.length - igrejasAtivas;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentPage="igrejas" />

      <main className="ml-64 flex-1">
        <Header title="Igrejas" />

        <div className="p-8">
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="text-sm font-medium text-gray-600">Total de Igrejas</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{todasIgrejas.length}</p>
            </div>
            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <p className="text-sm font-medium text-green-600">Igrejas Ativas</p>
              <p className="mt-2 text-3xl font-bold text-green-900">{igrejasAtivas}</p>
            </div>
            <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
              <p className="text-sm font-medium text-orange-600">Igrejas Inativas</p>
              <p className="mt-2 text-3xl font-bold text-orange-900">{igrejasInativas}</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="text-sm font-medium text-gray-600">Total de Membros</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {todasIgrejas.reduce((sum, i) => sum + i.membros, 0).toLocaleString('pt-BR')}
              </p>
            </div>
          </div>

          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900">Lista de Igrejas</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {todasIgrejas.map((igreja) => (
                <EntityCard
                  key={igreja.id}
                  id={igreja.id}
                  nome={igreja.nome}
                  level="igreja"
                  membros={igreja.membros}
                  localidade={igreja.localidade}
                  lider={igreja.pastor}
                  descricao={`${igreja.grupos.length} grupos`}
                  ativa={igreja.ativa}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
