import { globalSchema } from "./global.schema";
import { z } from "zod";

export const churchSchema = globalSchema.extend({
  enoad: z.string().uuid({ message: "ID do ENOAD inválido" }),
});
