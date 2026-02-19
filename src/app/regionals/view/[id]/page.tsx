"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { formatCPF, formatPhone } from "@/shared/utils/formatData";
import { retrieveRegionalRequest } from "@/service/regional.service";

export default function regionalViewPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["regional", id],
    queryFn: () => retrieveRegionalRequest(id),
    enabled: !!id,
  });

  const regional = data?.data;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="ml-64 flex-1">
        <Header title="Visualizar Membro" />

        <div className="p-8">
          {isLoading ? (
            <p>Carregando...</p>
          ) : !regional ? (
            <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
              <p className="text-gray-600">Membro não encontrado.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Ações */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => router.push("/regionals")}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Voltar
                </button>

                <Link
                  href={`/regionals/${regional.id}`}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
                >
                  Editar
                </Link>
              </div>

              {/* Informações pessoais */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-xl font-semibold text-gray-900">
                  Informações do Membro
                </h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Nome</p>
                    <p className="mt-1 text-gray-900">{regional.name || "-"}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">CPF</p>
                    <p className="mt-1 text-gray-900">
                      {formatCPF(regional.cnpj) || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Data de nascimento
                    </p>
                    <p className="mt-1 text-gray-900">
                      {regional.foundation_date || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="mt-1 text-gray-900">
                      {regional.email || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Telefone
                    </p>
                    <p className="mt-1 text-gray-900">
                      {formatPhone(regional.phone) || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <p className="mt-1 text-gray-900">
                      {regional.status === "active" ? "Ativo" : "Inativo"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Congregação */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-xl font-semibold text-gray-900">
                  Igreja
                </h2>

                <div>
                  <p className="text-sm font-medium text-gray-500">Nome</p>
                  <p className="mt-1 text-gray-900">
                    {regional.church?.name || "-"}
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
                      {regional.address?.zip_code || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">Rua</p>
                    <p className="mt-1 text-gray-900">
                      {regional.address?.address || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">Número</p>
                    <p className="mt-1 text-gray-900">
                      {regional.address?.address_number || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Complemento
                    </p>
                    <p className="mt-1 text-gray-900">
                      {regional.address?.address_complement || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">Cidade</p>
                    <p className="mt-1 text-gray-900">
                      {regional.address?.city || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">Estado</p>
                    <p className="mt-1 text-gray-900">
                      {regional.address?.state || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">País</p>
                    <p className="mt-1 text-gray-900">
                      {regional.address?.country || "-"}
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
