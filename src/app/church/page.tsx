"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { EntityCard } from "@/components/dashboard/EntityCard";
import { listChurchRequest } from "@/service/churches.service";

export default function ChurchPage() {
  const router = useRouter();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["churches"],
      queryFn: ({ pageParam = 1 }) => listChurchRequest({ page: pageParam }),
      getNextPageParam: lastPage => {
        const next = lastPage?.data?.next;
        if (!next) return undefined;

        const url = new URL(next);
        return Number(url.searchParams.get("page"));
      },
      initialPageParam: 1,
    });

  const igrejas = data?.pages.flatMap(page => page.data.results) ?? [];

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  const handleViewChurch = (id: string) => {
    router.push(`/church/view/${id}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="ml-64 flex-1">
        <Header title="Igrejas" />

        <div className="p-8">
          <div className="mb-6 flex justify-end">
            <Link
              href="/church/create"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              + Nova Igreja
            </Link>
          </div>

          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              Lista de Igrejas
            </h2>

            {isLoading ? (
              <p>Carregando...</p>
            ) : igrejas.length > 0 ? (
              <>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {igrejas.map(igreja => (
                    <EntityCard
                      key={igreja.id}
                      id={igreja.id}
                      nome={igreja.name}
                      level="church"
                      descricao={`${igreja.enoad?.name ?? ""} • ${
                        igreja.address?.city ?? ""
                      }`}
                      ativa={igreja.status === "active"}
                      onClick={handleViewChurch}
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
                  Nenhuma igreja cadastrada ainda.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
