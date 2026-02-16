import { z } from "zod";
import { addressEmbeddedSchema } from "./address.schema";

export const churchSchema = z.object({
  name: z.string().min(3, "Nome obrigatório"),
  cnpj: z.string().min(14, "CNPJ inválido"),
  foundation_date: z.string(),
  email: z.string().email("Email inválido"),
  phone: z.string().min(8, "Telefone inválido"),
  status: z.enum(["active", "inactive"]),
  address: addressEmbeddedSchema,
});

export type ChurchFormData = z.infer<typeof churchSchema>;
