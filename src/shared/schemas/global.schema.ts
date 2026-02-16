import z from "zod";

export const globalSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
  cnpj: z.string().min(14, { message: "CNPJ inválido" }),
  foundation_date: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, {
    message: "Data deve estar no formato DD/MM/AAAA",
  }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().min(10, { message: "Telefone inválido" }),
  status: z.enum(["active", "inactive"], { message: "Selecione o status" }),
  address: z.object({
    zip_code: z.string().min(8, { message: "CEP inválido" }),
    address: z.string().min(3, { message: "Rua inválida" }),
    address_number: z.string().min(1, { message: "Número obrigatório" }),
    address_complement: z.string().optional(),
    state: z.string().min(2, { message: "Estado inválido" }),
    city: z.string().min(2, { message: "Cidade inválida" }),
    country: z.string().min(2, { message: "País inválido" }),
  }),
});
