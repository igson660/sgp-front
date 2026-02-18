"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { IMaskInput } from "react-imask";
import dynamic from "next/dynamic";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { useCepAutoFill } from "@/shared/hooks/useCep";
import { cleanCharacter, formatDateToISO } from "@/shared/utils/formatData";
import z from "zod";
import { memberSchema } from "@/shared/schemas/member.schema copy";
import { createPeopleRequest } from "@/service/people.service";
import { listCongregationRequest } from "@/service/congregation.service";

const AsyncSelect = dynamic(() => import("react-select/async"), { ssr: false });

type FormData = z.infer<typeof memberSchema>;

export default function CreateCongregationPage() {
  const router = useRouter();
  const [selectedRegional, setSelectedRegional] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      name: "",
      cpf: "",
      birth_date: "",
      email: "",
      phone: "",
      status: "active",
      congregation: "",
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

  const onSubmit = async (data: FormData) => {
    const payload = {
      ...data,
      birth_date: formatDateToISO(data.birth_date),
      phone: cleanCharacter(data.phone),
      cpf: cleanCharacter(data.cpf),
    };
    try {
      await createPeopleRequest(payload);
      router.push("/member");
    } catch (error) {
      console.error(error);
    }
  };

  const renderError = (fieldError?: { message?: string }) => (
    <p className="mt-1 min-h-[1.25rem] text-sm text-red-500">
      {fieldError?.message || " "}
    </p>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-64 flex-1">
        <Header title="Nova Membro" />

        <div className="p-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto max-w-3xl space-y-6 rounded-2xl bg-white p-8 shadow-sm"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col">
                <input
                  {...register("name")}
                  placeholder="Nome da Congregação"
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
                      placeholder="cpf"
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
                  className={`w-full rounded-lg border p-2 ${
                    errors.status ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                </select>
                {renderError(errors.status)}
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
                            const response = await listCongregationRequest({
                              search: inputValue,
                            });
                            return response.data.results.map(congregation => ({
                              label: congregation.name,
                              value: congregation.id,
                            }));
                          }}
                          onChange={(option: any) => {
                            field.onChange(option?.value ?? "");
                            setSelectedRegional(option ?? null);
                          }}
                          value={selectedRegional}
                          placeholder="Selecione a Regional"
                          isClearable
                          classNamePrefix="react-select"
                          className={`w-full rounded-lg border ${
                            errors.congregation
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
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
              {isSubmitting ? "Cadastrando..." : "Cadastrar Membro"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
