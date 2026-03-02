"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { retrieveEnoadRequest } from "@/service/enoads.service";

export default function ChurchViewPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["enoad", id],
    queryFn: () => retrieveEnoadRequest(id),
    enabled: !!id,
  });

  const church = data?.data;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="ml-64 flex-1">
        <Header title="ENOADs" />

        <div className="mx-auto max-w-5xl p-8">
          {isLoading ? (
            <div className="flex items-center justify-center rounded-2xl bg-white p-10 shadow-sm">
              <p className="text-gray-500">Carregando...</p>
            </div>
          ) : !church ? (
            <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
              <p className="text-gray-600">ENOAD não encontrado.</p>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
                <h1 className="text-2xl font-semibold text-gray-800">
                  Visualizar ENOAD
                </h1>

                <div className="flex gap-3">
                  <button
                    onClick={() => router.push("/enoads")}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                  >
                    Voltar
                  </button>

                  <Link
                    href={`/enoads/${church.id}`}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                  >
                    Editar
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-8 shadow-sm">
                <h2 className="mb-8 text-lg font-semibold text-gray-800 border-b pb-4">
                  Informações do ENOAD
                </h2>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Nome
                    </p>
                    <p className="text-gray-900">{church.name || "-"}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Data de Fundação
                    </p>
                    <p className="text-gray-900">
                      {church.foundation_date || "-"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Status
                    </p>
                    <p className="text-gray-900">
                      {church.status === "active" ? "Ativo" : "Inativo"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
