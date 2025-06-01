import { z } from "zod";

import { patientSexEnum } from "@/db/schema";

export const upsertPatientSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
  email: z.string().email("Email inválido."),
  phoneNumber: z
    .string()
    .min(10, "O número de telefone deve ter pelo menos 10 caracteres."),
  sex: z.enum(patientSexEnum.enumValues),
});

export type UpsertPatientSchema = z.infer<typeof upsertPatientSchema>;
