import z from "zod";

export const globalSchema = z.object({
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
