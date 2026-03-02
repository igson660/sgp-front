"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IMaskInput } from "react-imask";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { createEnoadRequest } from "@/service/enoads.service";
import { formatDateToISO } from "@/shared/utils/formatData";
import { enoadSchema } from "@/shared/schemas/enoad.schema";

type FormData = z.infer<typeof enoadSchema>;

export default function CreateEnoadPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(enoadSchema),
    defaultValues: {
      name: "",
      foundation_date: "",
      status: "active",
    },
  });

  const onSubmit = async (data: FormData) => {
    const payload = {
      ...data,
      foundation_date: formatDateToISO(data.foundation_date),
    };

    await createEnoadRequest(payload);
    router.push("/enoads");
  };

  const renderError = (fieldError?: { message?: string }) => (
    <p className="mt-1 min-h-[1.25rem] text-sm text-red-500">
      {fieldError?.message || " "}
    </p>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="ml-64 flex-1">
        <Header title="ENOADs" />

        <div className="p-8">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-800">Novo ENOAD</h1>

            <Link
              href="/enoads"
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Voltar
            </Link>
          </div>

          <div className="rounded-2xl bg-white shadow-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-8">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-gray-700">
                    Nome
                  </label>
                  <input
                    {...register("name")}
                    className={`rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 ${
                      errors.name
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-blue-200"
                    }`}
                  />
                  {renderError(errors.name)}
                </div>

                <Controller
                  control={control}
                  name="foundation_date"
                  render={({ field }) => (
                    <div className="flex flex-col">
                      <label className="mb-1 text-sm font-medium text-gray-700">
                        Data de Fundação
                      </label>
                      <IMaskInput
                        {...field}
                        mask="00/00/0000"
                        onAccept={(value: string) => field.onChange(value)}
                        className={`rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 ${
                          errors.foundation_date
                            ? "border-red-500 focus:ring-red-200"
                            : "border-gray-300 focus:ring-blue-200"
                        }`}
                      />
                      {renderError(errors.foundation_date)}
                    </div>
                  )}
                />

                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    {...register("status")}
                    className={`rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 ${
                      errors.status
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-blue-200"
                    }`}
                  >
                    <option value="active">Ativo</option>
                    <option value="inactive">Inativo</option>
                  </select>
                  {renderError(errors.status)}
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t pt-6">
                <Link
                  href="/enoads"
                  className="rounded-lg border border-gray-300 px-5 py-2 font-medium text-gray-700 hover:bg-gray-100"
                >
                  Cancelar
                </Link>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSubmitting ? "Cadastrando..." : "Salvar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
