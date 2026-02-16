"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useParams } from "next/navigation";
import { IMaskInput } from "react-imask";
import toast from "react-hot-toast";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import {
  retrieveEnoadRequest,
  updateEnoadRequest,
} from "@/service/enoads.service";
import { useCepAutoFill } from "@/shared/hooks/useCep";
import { globalSchema } from "@/shared/schemas/global.schema";
import {
  formatDateToISO,
  formatDateFromISO,
  getSingleParam,
  cleanCharacter,
} from "@/shared/utils/formatData";
import type { IEnoadCreate } from "@/shared/types/models/enoads.model";

type FormData = z.infer<typeof globalSchema>;

export default function UpdateEnoadPage() {
  const router = useRouter();
  const params = useParams();
  const enoadId = getSingleParam(params.id);

  const [loadingData, setLoadingData] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(globalSchema),
    defaultValues: {
      name: "",
      cnpj: "",
      foundation_date: "",
      email: "",
      phone: "",
      status: "active",
      address: {
        zip_code: "",
        address: "",
        address_number: "",
        address_complement: "",
        state: "",
        city: "",
        country: "",
      },
    },
  });

  const { handleCepChange, loading: loadingCep } =
    useCepAutoFill<FormData>(setValue);

  useEffect(() => {
    const loadEnoad = async () => {
      try {
        const response = await retrieveEnoadRequest(enoadId);
        const data: IEnoadCreate = {
          ...response,
          foundation_date: formatDateFromISO(response.foundation_date),
          phone: response.phone,
        };
        Object.entries(data).forEach(([key, value]) => {
          setValue(key as any, value);
        });
      } catch {
        toast.error("Erro ao carregar ENOAD.");
      } finally {
        setLoadingData(false);
      }
    };
    loadEnoad();
  }, [enoadId, setValue]);

  const onSubmit = async (data: FormData) => {
    const payload: IEnoadCreate = {
      ...data,
      foundation_date: formatDateToISO(data.foundation_date),
      phone: cleanCharacter(data.phone),
      cnpj: cleanCharacter(data.cnpj),
    };
    try {
      await updateEnoadRequest(enoadId, payload);
      router.push("/enoads");
    } catch {}
  };

  const renderError = (fieldError?: { message?: string }) => (
    <p className="mt-1 min-h-[1.25rem] text-sm text-red-500">
      {fieldError?.message || " "}
    </p>
  );

  if (loadingData) return <p className="p-8">Carregando ENOAD...</p>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-64 flex-1">
        <Header title="Editar ENOAD" />

        <div className="p-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto max-w-3xl space-y-6 rounded-2xl bg-white p-8 shadow-sm"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col">
                <input
                  {...register("name")}
                  placeholder="Nome do ENOAD"
                  className={`w-full rounded-lg border p-2 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {renderError(errors.name)}
              </div>

              <Controller
                control={control}
                name="cnpj"
                render={({ field }) => (
                  <div className="flex flex-col">
                    <IMaskInput
                      {...field}
                      mask="00.000.000/0000-00"
                      onAccept={value => field.onChange(value)}
                      placeholder="CNPJ"
                      className={`w-full rounded-lg border p-2 ${
                        errors.cnpj ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {renderError(errors.cnpj)}
                  </div>
                )}
              />

              <Controller
                control={control}
                name="foundation_date"
                render={({ field }) => (
                  <div className="flex flex-col">
                    <IMaskInput
                      {...field}
                      mask="00/00/0000"
                      onAccept={value => field.onChange(value)}
                      placeholder="Data de fundação"
                      className={`w-full rounded-lg border p-2 ${
                        errors.foundation_date
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {renderError(errors.foundation_date)}
                  </div>
                )}
              />

              <div className="flex flex-col">
                <input
                  {...register("email")}
                  placeholder="Email"
                  className={`w-full rounded-lg border p-2 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {renderError(errors.email)}
              </div>

              <Controller
                control={control}
                name="phone"
                render={({ field }) => (
                  <div className="flex flex-col">
                    <IMaskInput
                      {...field}
                      mask="(00) 00000-0000"
                      onAccept={value => field.onChange(value)}
                      placeholder="Telefone"
                      className={`w-full rounded-lg border p-2 ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {renderError(errors.phone)}
                  </div>
                )}
              />

              <div className="flex flex-col">
                <select
                  {...register("status")}
                  className={`w-full rounded-lg border p-2 ${
                    errors.status ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                </select>
                {renderError(errors.status)}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Endereço</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Controller
                  control={control}
                  name="address.zip_code"
                  render={({ field }) => (
                    <div className="flex flex-col md:col-span-2">
                      <IMaskInput
                        {...field}
                        mask="00000-000"
                        placeholder="CEP"
                        onAccept={value => {
                          field.onChange(value);
                          handleCepChange(value);
                        }}
                        className={`w-full rounded-lg border p-2 ${
                          errors.address?.zip_code
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {renderError(errors.address?.zip_code)}
                      {loadingCep && (
                        <p className="mt-1 text-sm text-gray-500">
                          Buscando endereço...
                        </p>
                      )}
                    </div>
                  )}
                />

                <div className="flex flex-col">
                  <input
                    {...register("address.address")}
                    placeholder="Rua"
                    disabled={loadingCep}
                    className={`w-full rounded-lg border p-2 ${
                      errors.address?.address
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {renderError(errors.address?.address)}
                </div>

                <div className="flex flex-col">
                  <input
                    {...register("address.address_number")}
                    placeholder="Número"
                    className={`w-full rounded-lg border p-2 ${
                      errors.address?.address_number
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {renderError(errors.address?.address_number)}
                </div>

                <div className="flex flex-col">
                  <input
                    {...register("address.address_complement")}
                    placeholder="Complemento"
                    className={`w-full rounded-lg border p-2 ${
                      errors.address?.address_complement
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {renderError(errors.address?.address_complement)}
                </div>

                <div className="flex flex-col">
                  <input
                    {...register("address.state")}
                    placeholder="Estado"
                    disabled={loadingCep}
                    className={`w-full rounded-lg border p-2 ${
                      errors.address?.state
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {renderError(errors.address?.state)}
                </div>

                <div className="flex flex-col">
                  <input
                    {...register("address.city")}
                    placeholder="Cidade"
                    disabled={loadingCep}
                    className={`w-full rounded-lg border p-2 ${
                      errors.address?.city
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {renderError(errors.address?.city)}
                </div>

                <div className="flex flex-col md:col-span-2">
                  <input
                    {...register("address.country")}
                    placeholder="País"
                    disabled={loadingCep}
                    className={`w-full rounded-lg border p-2 ${
                      errors.address?.country
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {renderError(errors.address?.country)}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? "Atualizando..." : "Atualizar ENOAD"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
