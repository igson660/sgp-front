import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { EntityCard } from "@/components/dashboard/EntityCard";
import { federacaoData } from "@/lib/mock-data";
import Link from "next/link";

export default function CongregacoesPage() {
  const federacao = federacaoData;

  const todasCongregacoes = federacao.enoads.flatMap(enoad =>
    enoad.regionais.flatMap(regional =>
      regional.igrejas.flatMap(igreja =>
        igreja.grupos.map(congregacao => ({
          ...congregacao,
          igrejaPai: igreja.nome,
          regionalPai: regional.nome,
          enoadPai: enoad.nome,
        }))
      )
    )
  );

  const totalMembros = todasCongregacoes.reduce(
    (sum, congregacao) => sum + congregacao.membros,
    0
  );

  const mediaMembros =
    todasCongregacoes.length > 0
      ? Math.round(totalMembros / todasCongregacoes.length)
      : 0;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="ml-64 flex-1">
        <Header title="Congregações" />

        <div className="p-8">
          <div className="mb-6 flex justify-end">
            <Link
              href="/congregation/create"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
            >
              + Nova Congregação
            </Link>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="text-sm font-medium text-gray-600">
                Total de Congregações
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {todasCongregacoes.length}
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="text-sm font-medium text-gray-600">
                Total de Membros
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {totalMembros.toLocaleString("pt-BR")}
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="text-sm font-medium text-gray-600">
                Média de membros por congregação
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {mediaMembros}
              </p>
            </div>
          </div>

          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              Lista de Congregações
            </h2>

            {todasCongregacoes.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {todasCongregacoes.map(congregacao => (
                  <EntityCard
                    key={congregacao.id}
                    id={congregacao.id}
                    nome={congregacao.nome}
                    level="congregacao"
                    membros={congregacao.membros}
                    lider={congregacao.lider}
                    descricao={`${congregacao.igrejaPai} • ${congregacao.regionalPai} • ${congregacao.enoadPai}`}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
                <p className="text-gray-600">
                  Nenhuma congregação cadastrada ainda.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
