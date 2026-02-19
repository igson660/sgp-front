"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { EntityCard } from "@/components/dashboard/EntityCard";
import { listEnoadRequest } from "@/service/enoads.service";

export default function ENOADSPage() {
  const router = useRouter();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["enoads"],
      queryFn: ({ pageParam = 1 }) => listEnoadRequest({ page: pageParam }),
      getNextPageParam: lastPage => {
        const next = lastPage?.data?.next;
        if (!next) return undefined;

        const url = new URL(next);
        return Number(url.searchParams.get("page"));
      },
      initialPageParam: 1,
    });

  const enoads = data?.pages.flatMap(page => page.data.results) ?? [];

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

  const handleViewEnoad = (id: string) => {
    router.push(`/enoads/view/${id}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="ml-64 flex-1">
        <Header title="ENOADs" />

        <div className="p-8">
          <div className="mb-6 flex justify-end">
            <Link
              href="/enoads/create"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              + Novo ENOAD
            </Link>
          </div>

          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              Lista de ENOADs
            </h2>

            {isLoading ? (
              <p>Carregando...</p>
            ) : enoads.length > 0 ? (
              <>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {enoads.map(enoad => (
                    <EntityCard
                      key={enoad.id}
                      id={enoad.id}
                      nome={enoad.name}
                      level="enoads"
                      // descricao={`${enoad.total_regionals ?? 0} regionais • ${
                      //   enoad.total_churches ?? 0
                      // } igrejas`}
                      // membros={enoad.total_members}
                      // lider={enoad.president}
                      onClick={handleViewEnoad}
                    />
                  ))}
                </div>

                <div ref={loadMoreRef} className="mt-6 text-center">
                  {isFetchingNextPage && <p>Carregando mais...</p>}
                </div>
              </>
            ) : (
              <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
                <p className="text-gray-600">Nenhum ENOAD cadastrado ainda.</p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
