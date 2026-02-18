import { globalSchema } from "./global.schema";
import { z } from "zod";

export const regionalSchema = globalSchema.extend({
  church: z.string().uuid({ message: "ID do Church inválido" }),
});
