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
import { listRegionalRequest } from "@/service/regional.service";
import { memberSchema } from "@/shared/schemas/member.schema copy";
import {
  retrievePeopleRequest,
  updatePeopleRequest,
} from "@/service/people.service";

const AsyncSelect = dynamic(() => import("react-select/async"), { ssr: false });

type FormData = z.infer<typeof memberSchema>;

export default function UpdateCongregationPage() {
  const router = useRouter();
  const params = useParams();
  const peopleId = params.id as string;

  const [selectedregional, setSelectedcongregation] = useState<{
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
    resolver: zodResolver(memberSchema),
  });

  const { handleCepChange, loading: loadingCep } =
    useCepAutoFill<FormData>(setValue);

  useEffect(() => {
    const loadCongregation = async () => {
      const response = await retrievePeopleRequest(peopleId);
      const data = response.data;

      setValue("name", data.name);
      setValue("cpf", data.cpf);
      setValue("birth_date", formatDateFromISO(data.birth_date));
      setValue("email", data.email);
      setValue("phone", data.phone);
      setValue("status", data.status);
      setValue("congregation", data.congregation.id);

      setValue("address.zip_code", data.address.zip_code);
      setValue("address.address", data.address.address);
      setValue("address.address_number", data.address.address_number);
      setValue("address.address_complement", data.address.address_complement);
      setValue("address.state", data.address.state);
      setValue("address.city", data.address.city);
      setValue("address.country", data.address.country);

      setSelectedcongregation({
        label: data.congregation.name,
        value: data.congregation.id,
      });

      setLoadingData(false);
    };

    loadCongregation();
  }, [peopleId, setValue]);

  const onSubmit = async (data: FormData) => {
    const payload = {
      ...data,
      birth_date: formatDateToISO(data.birth_date),
      phone: cleanCharacter(data.phone),
      cnpj: cleanCharacter(data.cpf),
    };

    await updatePeopleRequest(peopleId, payload);
    router.push("/member");
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
        <Header title="Editar Membro" />

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
                name="cpf"
                render={({ field }) => (
                  <div className="flex flex-col">
                    <IMaskInput
                      {...field}
                      mask="000.000.000-00"
                      onAccept={field.onChange}
                      placeholder="CNPJ"
                      className={`w-full rounded-lg border p-2 ${
                        errors.cpf ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>
                )}
              />

              <Controller
                control={control}
                name="birth_date"
                render={({ field }) => (
                  <div className="flex flex-col">
                    <IMaskInput
                      {...field}
                      mask="00/00/0000"
                      onAccept={field.onChange}
                      placeholder="Data de nascimento"
                      className={`w-full rounded-lg border p-2 ${
                        errors.birth_date ? "border-red-500" : "border-gray-300"
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
                    name="congregation"
                    render={({ field }) => (
                      <>
                        <AsyncSelect
                          cacheOptions
                          defaultOptions
                          loadOptions={async (inputValue: string) => {
                            const response = await listRegionalRequest({
                              search: inputValue,
                            });
                            return response.data.results.map(regional => ({
                              label: regional.name,
                              value: regional.id,
                            }));
                          }}
                          onChange={(option: any) => {
                            field.onChange(option?.value ?? "");
                            setSelectedcongregation(option ?? null);
                          }}
                          value={selectedregional}
                          placeholder="Selecione o ENOAD"
                          isClearable
                          classNamePrefix="react-select"
                        />
                        {renderError(errors.congregation)}
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
