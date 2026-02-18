import { globalSchema } from "./global.schema";
import { z } from "zod";

export const congregationSchema = globalSchema.extend({
  regional: z.string().uuid({ message: "ID do Church inválido" }),
});
