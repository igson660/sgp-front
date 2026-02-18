"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { retrieveCongregationRequest } from "@/service/congregation.service";
import { formatCNPJ, formatPhone } from "@/shared/utils/formatData";

export default function CongregationViewPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["congregation", id],
    queryFn: () => retrieveCongregationRequest(id),
    enabled: !!id,
  });

  const congregation = data?.data;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="ml-64 flex-1">
        <Header title="Visualizar Congregação" />

        <div className="p-8">
          {isLoading ? (
            <p>Carregando...</p>
          ) : !congregation ? (
            <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
              <p className="text-gray-600">Congregação não encontrada.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Ações */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => router.push("/congregation")}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Voltar
                </button>

                <Link
                  href={`/congregation/${congregation.id}`}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
                >
                  Editar
                </Link>
              </div>

              {/* Informações da Congregação */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-xl font-semibold text-gray-900">
                  Informações da Congregação
                </h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Nome</p>
                    <p className="mt-1 text-gray-900">
                      {congregation.name || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">CNPJ</p>
                    <p className="mt-1 text-gray-900">
                      {formatCNPJ(congregation.cnpj) || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Data de fundação
                    </p>
                    <p className="mt-1 text-gray-900">
                      {congregation.foundation_date || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="mt-1 text-gray-900">
                      {congregation.email || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Telefone
                    </p>
                    <p className="mt-1 text-gray-900">
                      {formatPhone(congregation.phone) || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <p className="mt-1 text-gray-900">
                      {congregation.status === "active" ? "Ativa" : "Inativa"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Regional */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-xl font-semibold text-gray-900">
                  Regional
                </h2>

                <div>
                  <p className="text-sm font-medium text-gray-500">Nome</p>
                  <p className="mt-1 text-gray-900">
                    {congregation.regional?.name || "-"}
                  </p>
                </div>
              </div>

              {/* Endereço */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-xl font-semibold text-gray-900">
                  Endereço
                </h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">CEP</p>
                    <p className="mt-1 text-gray-900">
                      {congregation.address?.zip_code || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">Rua</p>
                    <p className="mt-1 text-gray-900">
                      {congregation.address?.address || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">Número</p>
                    <p className="mt-1 text-gray-900">
                      {congregation.address?.address_number || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Complemento
                    </p>
                    <p className="mt-1 text-gray-900">
                      {congregation.address?.address_complement || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">Cidade</p>
                    <p className="mt-1 text-gray-900">
                      {congregation.address?.city || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">Estado</p>
                    <p className="mt-1 text-gray-900">
                      {congregation.address?.state || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">País</p>
                    <p className="mt-1 text-gray-900">
                      {congregation.address?.country || "-"}
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
