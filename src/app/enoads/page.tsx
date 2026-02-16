/**
 * Página ENOADs
 * Listagem de todos os ENOADs com detalhes
 */

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { EntityCard } from "@/components/dashboard/EntityCard";
import { federacaoData } from "@/lib/mock-data";
import Link from "next/link";

export default function ENOADSPage() {
  const federacao = federacaoData;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="ml-64 flex-1">
        <Header title="ENOADs" />

        <div className="p-8">
          {/* BOTÃO NO TOPO DIREITO */}
          <div className="mb-6 flex justify-end">
            <Link
              href="/enoads/create"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
            >
              + Novo ENOAD
            </Link>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="text-sm font-medium text-gray-600">
                Total de ENOADs
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {federacao.totalENOADS}
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="text-sm font-medium text-gray-600">
                Total de Regionais
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {federacao.totalRegionais}
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="text-sm font-medium text-gray-600">
                Total de Membros
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {federacao.totalMembros.toLocaleString("pt-BR")}
              </p>
            </div>
          </div>

          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              Lista de ENOADs
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {federacao.enoads.map(enoads => (
                <EntityCard
                  key={enoads.id}
                  id={enoads.id}
                  nome={enoads.nome}
                  level="enoads"
                  membros={enoads.totalMembros}
                  lider={enoads.presidente}
                  descricao={`${enoads.regionais.length} regionais • ${enoads.totalIgrejas} igrejas • ${enoads.totalGrupos} grupos`}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
