import { globalSchema } from "./global.schema";
export const enoadSchema = globalSchema
  .omit({
    cnpj: true,
    email: true,
    address: true,
    phone: true,
  })
  .extend({});
