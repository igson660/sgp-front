"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { EntityCard } from "@/components/dashboard/EntityCard";
import { listCongregationRequest } from "@/service/congregation.service";

export default function CongregacoesPage() {
  const router = useRouter();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["congregations"],
      queryFn: ({ pageParam = 1 }) =>
        listCongregationRequest({ page: pageParam }),
      getNextPageParam: lastPage => {
        const next = lastPage.data.next;
        if (!next) return undefined;

        const url = new URL(next);
        return Number(url.searchParams.get("page"));
      },
      initialPageParam: 1,
    });

  const congregacoes = data?.pages.flatMap(page => page.data.results) ?? [];

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  const handleViewCongregation = (id: string) => {
    router.push(`/congregation/view/${id}`);
  };

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

          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              Lista de Congregações
            </h2>

            {isLoading ? (
              <p>Carregando...</p>
            ) : congregacoes.length > 0 ? (
              <>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {congregacoes.map(congregacao => (
                    <EntityCard
                      key={congregacao.id}
                      id={congregacao.id}
                      nome={congregacao.name}
                      level="congregation"
                      descricao={`${congregacao.regional?.name ?? ""} • ${congregacao.address?.city ?? ""}`}
                      onClick={handleViewCongregation}
                    />
                  ))}
                </div>

                <div ref={loadMoreRef} className="mt-6 text-center">
                  {isFetchingNextPage && <p>Carregando mais...</p>}
                </div>
              </>
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
