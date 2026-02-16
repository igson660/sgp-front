"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { createEnoadRequest } from "@/service/enoads.service";
import { globalSchema } from "@/shared/types/schema/global.schema";
import { useCepAutoFill } from "@/shared/hooks/useCep";

type FormData = z.infer<typeof globalSchema>;

export default function CreateEnoadPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(globalSchema),
  });

  const { handleCepChange, loading: loadingCep } =
    useCepAutoFill<FormData>(setValue);

  const onSubmit = async (data: FormData) => {
    try {
      await createEnoadRequest(data);
      toast.success("ENOAD cadastrado com sucesso");
      router.push("/enoads");
    } catch {
      toast.error("Erro ao cadastrar ENOAD");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="ml-64 flex-1">
        <Header title="Novo ENOAD" />

        <div className="p-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto max-w-3xl space-y-6 rounded-2xl bg-white p-8 shadow-sm"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <input
                  {...register("name")}
                  placeholder="Nome do ENOAD"
                  className="w-full rounded-lg border p-2"
                />
                {errors.name && (
                  <p className="text-sm text-red-500">Nome inválido</p>
                )}
              </div>

              <input
                {...register("cnpj")}
                placeholder="CNPJ"
                className="w-full rounded-lg border p-2"
              />

              <input
                type="date"
                {...register("foundation_date")}
                className="w-full rounded-lg border p-2"
              />

              <input
                {...register("email")}
                placeholder="Email"
                className="w-full rounded-lg border p-2"
              />

              <input
                {...register("phone")}
                placeholder="Telefone"
                className="w-full rounded-lg border p-2"
              />

              <select
                {...register("status")}
                className="w-full rounded-lg border p-2"
              >
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
              </select>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Endereço</h2>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <input
                    {...register("address.zip_code")}
                    placeholder="CEP"
                    className="w-full rounded-lg border p-2"
                    onChange={e => {
                      register("address.zip_code").onChange(e);
                      handleCepChange(e.target.value);
                    }}
                  />

                  {loadingCep && (
                    <p className="mt-1 text-sm text-gray-500">
                      Buscando endereço...
                    </p>
                  )}
                </div>

                <input
                  {...register("address.address")}
                  placeholder="Rua"
                  disabled={loadingCep}
                  className="w-full rounded-lg border p-2"
                />

                <input
                  {...register("address.address_number")}
                  placeholder="Número"
                  className="w-full rounded-lg border p-2"
                />

                <input
                  {...register("address.address_complement")}
                  placeholder="Complemento"
                  className="w-full rounded-lg border p-2"
                />

                <input
                  {...register("address.state")}
                  placeholder="Estado"
                  disabled={loadingCep}
                  className="w-full rounded-lg border p-2"
                />

                <input
                  {...register("address.city")}
                  placeholder="Cidade"
                  disabled={loadingCep}
                  className="w-full rounded-lg border p-2"
                />

                <input
                  {...register("address.country")}
                  placeholder="País"
                  disabled={loadingCep}
                  className="w-full rounded-lg border p-2 md:col-span-2"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? "Cadastrando..." : "Cadastrar ENOAD"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
