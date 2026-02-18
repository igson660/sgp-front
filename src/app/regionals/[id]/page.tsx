"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useParams } from "next/navigation";
import { IMaskInput } from "react-imask";
import dynamic from "next/dynamic";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { useCepAutoFill } from "@/shared/hooks/useCep";
import {
  cleanCharacter,
  formatDateToISO,
  formatDateFromISO,
} from "@/shared/utils/formatData";

import z from "zod";
import { congregationSchema } from "@/shared/schemas/congregation.schema";
import {
  retrieveCongregationRequest,
  updateCongregationRequest,
} from "@/service/congregation.service";
import { listRegionalchRequest } from "@/service/regional.service";

const AsyncSelect = dynamic(() => import("react-select/async"), { ssr: false });

type FormData = z.infer<typeof congregationSchema>;

export default function UpdateRegionalPage() {
  const router = useRouter();
  const params = useParams();
  const congregationId = params.id as string;

  const [selectedregional, setSelectedregional] = useState<{
    label: string;
    value: string;
  } | null>(null);

  const [isMounted, setIsMounted] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => setIsMounted(true), []);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(congregationSchema),
  });

  const { handleCepChange, loading: loadingCep } =
    useCepAutoFill<FormData>(setValue);

  useEffect(() => {
    const loadCongregaton = async () => {
      const response = await retrieveCongregationRequest(congregationId);
      const data = response.data;

      setValue("name", data.name);
      setValue("cnpj", data.cnpj);
      setValue("foundation_date", formatDateFromISO(data.foundation_date));
      setValue("email", data.email);
      setValue("phone", data.phone);
      setValue("status", data.status);
      setValue("regional", data.regional.id);

      setValue("address.zip_code", data.address.zip_code);
      setValue("address.address", data.address.address);
      setValue("address.address_number", data.address.address_number);
      setValue("address.address_complement", data.address.address_complement);
      setValue("address.state", data.address.state);
      setValue("address.city", data.address.city);
      setValue("address.country", data.address.country);

      setSelectedregional({
        label: data.regional.name,
        value: data.regional.id,
      });

      setLoadingData(false);
    };

    loadCongregaton();
  }, [congregationId, setValue]);

  const onSubmit = async (data: FormData) => {
    const payload = {
      ...data,
      foundation_date: formatDateToISO(data.foundation_date),
      phone: cleanCharacter(data.phone),
      cnpj: cleanCharacter(data.cnpj),
    };

    await updateCongregationRequest(congregationId, payload);
    router.push("/regionais");
  };

  const renderError = (fieldError?: { message?: string }) => (
    <p className="mt-1 min-h-[1.25rem] text-sm text-red-500">
      {fieldError?.message || " "}
    </p>
  );

  if (loadingData) return null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-64 flex-1">
        <Header title="Editar Regional" />

        <div className="p-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto max-w-3xl space-y-6 rounded-2xl bg-white p-8 shadow-sm"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col">
                <input
                  {...register("name")}
                  placeholder="Nome da Igreja"
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
                      onAccept={field.onChange}
                      placeholder="CNPJ"
                      className={`w-full rounded-lg border p-2 ${
                        errors.cnpj ? "border-red-500" : "border-gray-300"
                      }`}
                    />
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
                      onAccept={field.onChange}
                      placeholder="Data de fundação"
                      className={`w-full rounded-lg border p-2 ${
                        errors.foundation_date
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
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
                      onAccept={field.onChange}
                      placeholder="Telefone"
                      className={`w-full rounded-lg border p-2 ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>
                )}
              />

              <div className="flex flex-col">
                <select
                  {...register("status")}
                  className="w-full rounded-lg border border-gray-300 p-2"
                >
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                </select>
              </div>

              {isMounted && (
                <div className="flex flex-col md:col-span-2">
                  <Controller
                    control={control}
                    name="regional"
                    render={({ field }) => (
                      <>
                        <AsyncSelect
                          cacheOptions
                          defaultOptions
                          loadOptions={async (inputValue: string) => {
                            const response = await listRegionalchRequest({
                              search: inputValue,
                            });
                            return response.data.results.map(regional => ({
                              label: regional.name,
                              value: regional.id,
                            }));
                          }}
                          onChange={(option: any) => {
                            field.onChange(option?.value ?? "");
                            setSelectedregional(option ?? null);
                          }}
                          value={selectedregional}
                          placeholder="Selecione o ENOAD"
                          isClearable
                          classNamePrefix="react-select"
                        />
                        {renderError(errors.regional)}
                      </>
                    )}
                  />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Endereço</h2>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Controller
                  control={control}
                  name="address.zip_code"
                  render={({ field }) => (
                    <div className="flex flex-col">
                      <IMaskInput
                        {...field}
                        mask="00000-000"
                        onAccept={value => {
                          field.onChange(value);
                          handleCepChange(value);
                        }}
                        placeholder="CEP"
                        className="w-full rounded-lg border border-gray-300 p-2"
                      />
                    </div>
                  )}
                />
                <div className="flex flex-col">
                  <input
                    {...register("address.address")}
                    placeholder="Rua"
                    disabled={loadingCep}
                    className="w-full rounded-lg border border-gray-300 p-2"
                  />
                </div>
                <div className="flex flex-col">
                  <input
                    {...register("address.address_number")}
                    placeholder="Número"
                    className="w-full rounded-lg border border-gray-300 p-2"
                  />
                </div>
                <div className="flex flex-col">
                  <input
                    {...register("address.address_complement")}
                    placeholder="Complemento"
                    className="w-full rounded-lg border border-gray-300 p-2"
                  />
                </div>
                <div className="flex flex-col">
                  <input
                    {...register("address.state")}
                    placeholder="Estado"
                    disabled={loadingCep}
                    className="w-full rounded-lg border border-gray-300 p-2"
                  />
                </div>
                <div className="flex flex-col">
                  <input
                    {...register("address.city")}
                    placeholder="Cidade"
                    disabled={loadingCep}
                    className="w-full rounded-lg border border-gray-300 p-2"
                  />
                </div>
                <div className="flex flex-col">
                  <input
                    {...register("address.country")}
                    placeholder="País"
                    disabled={loadingCep}
                    className="w-full rounded-lg border border-gray-300 p-2 md:col-span-2"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? "Salvando..." : "Salvar Alterações"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
