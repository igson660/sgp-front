"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { EntityCard } from "@/components/dashboard/EntityCard";
import { listPeopleRequest } from "@/service/people.service";

export default function MembrosPage() {
  const router = useRouter();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["members"],
      queryFn: ({ pageParam = 1 }) => listPeopleRequest({ page: pageParam }),
      getNextPageParam: lastPage => {
        const next = lastPage.data.next;
        if (!next) return undefined;

        const url = new URL(next);
        return Number(url.searchParams.get("page"));
      },
      initialPageParam: 1,
    });

  const membros = data?.pages.flatMap(page => page.data.results) ?? [];

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

  const handleViewMember = (id: string) => {
    router.push(`/member/view/${id}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="ml-64 flex-1">
        <Header title="Membros" />

        <div className="p-8">
          <div className="mb-6 flex justify-end">
            <Link
              href="/member/create"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
            >
              + Novo Membro
            </Link>
          </div>

          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              Lista de Membros
            </h2>

            {isLoading ? (
              <p>Carregando...</p>
            ) : membros.length > 0 ? (
              <>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {membros.map(membro => (
                    <EntityCard
                      key={membro.id}
                      id={membro.id}
                      nome={membro.name}
                      level="member"
                      descricao={`${membro.congregation?.name ?? ""} • ${membro.address?.city ?? ""}`}
                      onClick={handleViewMember}
                    />
                  ))}
                </div>

                <div ref={loadMoreRef} className="mt-6 text-center">
                  {isFetchingNextPage && <p>Carregando mais...</p>}
                </div>
              </>
            ) : (
              <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
                <p className="text-gray-600">Nenhum membro cadastrado ainda.</p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
