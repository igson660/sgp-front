"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChurchFormData, churchSchema } from "@/shared/schemas/church.schema";
import { createChurchRequest } from "@/service/churches.service";

export function ChurchForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChurchFormData>({
    resolver: zodResolver(churchSchema),
    defaultValues: {
      status: "active",
      address: { country: "Brasil" },
    },
  });

  const onSubmit = async (data: ChurchFormData) => {
    await createChurchRequest(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register("name")} placeholder="Nome da igreja" />
      {errors.name && <span>{errors.name.message}</span>}

      <input {...register("cnpj")} placeholder="CNPJ" />
      {errors.cnpj && <span>{errors.cnpj.message}</span>}

      <input type="date" {...register("foundation_date")} />
      {errors.foundation_date && <span>{errors.foundation_date.message}</span>}

      <input {...register("email")} placeholder="Email" />
      {errors.email && <span>{errors.email.message}</span>}

      <input {...register("phone")} placeholder="Telefone" />
      {errors.phone && <span>{errors.phone.message}</span>}

      <select {...register("status")}>
        <option value="active">Ativo</option>
        <option value="inactive">Inativo</option>
      </select>

      <hr />

      <input {...register("address.zip_code")} placeholder="CEP" />
      {errors.address?.zip_code && (
        <span>{errors.address.zip_code.message}</span>
      )}

      <input {...register("address.address")} placeholder="Endereço" />
      {errors.address?.address && <span>{errors.address.address.message}</span>}

      <input {...register("address.address_number")} placeholder="Número" />
      {errors.address?.address_number && (
        <span>{errors.address.address_number.message}</span>
      )}

      <input
        {...register("address.address_complement")}
        placeholder="Complemento"
      />

      <input {...register("address.state")} placeholder="UF" />
      {errors.address?.state && <span>{errors.address.state.message}</span>}

      <input {...register("address.city")} placeholder="Cidade" />
      {errors.address?.city && <span>{errors.address.city.message}</span>}

      <input {...register("address.country")} placeholder="País" />

      <button type="submit" disabled={isSubmitting}>
        Salvar igreja
      </button>
    </form>
  );
}
