"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { createChurchRequest } from "@/service/churches.service";

const schema = z.object({
  name: z.string().min(3),
  cnpj: z.string().min(14),
  foundation_date: z.string(),
  email: z.string().email(),
  phone: z.string().min(8),
  status: z.enum(["active", "inactive"]),
  address: z.object({
    zip_code: z.string().min(8),
    address: z.string().min(3),
    address_number: z.string().min(1),
    address_complement: z.string().optional(),
    state: z.string().min(2),
    city: z.string().min(2),
    country: z.string().min(2),
  }),
});

type FormData = z.infer<typeof schema>;

export default function CreateChurchPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await createChurchRequest(data);
      toast.success("Igreja cadastrada com sucesso");
      router.push("/church");
    } catch {
      toast.error("Erro ao cadastrar igreja");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="ml-64 flex-1">
        <Header title="Nova Igreja" />

        <div className="p-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto max-w-3xl space-y-6 rounded-2xl bg-white p-8 shadow-sm"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <input
                  {...register("name")}
                  placeholder="Nome"
                  className="w-full rounded-lg border p-2"
                />
                {errors.name && (
                  <p className="text-sm text-red-500">Nome inválido</p>
                )}
              </div>

              <div>
                <input
                  {...register("cnpj")}
                  placeholder="CNPJ"
                  className="w-full rounded-lg border p-2"
                />
              </div>

              <div>
                <input
                  type="date"
                  {...register("foundation_date")}
                  className="w-full rounded-lg border p-2"
                />
              </div>

              <div>
                <input
                  {...register("email")}
                  placeholder="Email"
                  className="w-full rounded-lg border p-2"
                />
              </div>

              <div>
                <input
                  {...register("phone")}
                  placeholder="Telefone"
                  className="w-full rounded-lg border p-2"
                />
              </div>

              <div>
                <select
                  {...register("status")}
                  className="w-full rounded-lg border p-2"
                >
                  <option value="active">Ativa</option>
                  <option value="inactive">Inativa</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Endereço</h2>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input
                  {...register("address.zip_code")}
                  placeholder="CEP"
                  className="w-full rounded-lg border p-2"
                />

                <input
                  {...register("address.address")}
                  placeholder="Rua"
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
                  className="w-full rounded-lg border p-2"
                />

                <input
                  {...register("address.city")}
                  placeholder="Cidade"
                  className="w-full rounded-lg border p-2"
                />

                <input
                  {...register("address.country")}
                  placeholder="País"
                  className="w-full rounded-lg border p-2 md:col-span-2"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              Cadastrar Igreja
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
