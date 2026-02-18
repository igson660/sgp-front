import { globalSchema } from "./global.schema";
import { z } from "zod";

export const memberSchema = globalSchema
  .omit({
    cnpj: true,
    foundation_date: true,
  })
  .extend({
    congregation: z.string().uuid({ message: "ID da Congregação inválido" }),

    cpf: z.string().min(14, { message: "CPF inválido" }),

    birth_date: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, {
      message: "Data deve estar no formato DD/MM/AAAA",
    }),
  });
