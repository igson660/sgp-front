import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { EntityCard } from "@/components/dashboard/EntityCard";
import { federacaoData } from "@/lib/mock-data";
import Link from "next/link";

export default function RegionaisPage() {
  const federacao = federacaoData;

  const todasRegionais = federacao.enoads.flatMap(enoad =>
    enoad.regionais.map(regional => ({
      ...regional,
      enoadPai: enoad.nome,
    }))
  );

  const totalIgrejas = todasRegionais.reduce(
    (sum, regional) => sum + regional.igrejas.length,
    0
  );

  const totalMembros = todasRegionais.reduce(
    (sum, regional) => sum + regional.totalMembros,
    0
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="ml-64 flex-1">
        <Header title="Regionais" />

        <div className="p-8">
          <div className="mb-6 flex justify-end">
            <Link
              href="/regionals/create"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
            >
              + Nova Regional
            </Link>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="text-sm font-medium text-gray-600">
                Total de Regionais
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {todasRegionais.length}
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="text-sm font-medium text-gray-600">
                Total de Igrejas
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {totalIgrejas}
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
          </div>

          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              Lista de Regionais
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {todasRegionais.map(regional => (
                <EntityCard
                  key={regional.id}
                  id={regional.id}
                  nome={regional.nome}
                  level="regional"
                  membros={regional.totalMembros}
                  lider={regional.coordenador}
                  descricao={`${regional.igrejas.length} igrejas • ${regional.totalGrupos} grupos • ${regional.enoadPai}`}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
