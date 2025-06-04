import { z } from "zod";

export const petSexEnum = z.enum(["male", "female", "undefined"], {
  errorMap: (issue, ctx) => {
    if (issue.code === "invalid_type") {
      return { message: "O sexo deve ser masculino, feminino ou indefinido." };
    }
    if (issue.code === "invalid_enum_value") {
      return { message: "O sexo deve ser masculino, feminino ou indefinido." };
    }
    return { message: ctx.defaultError };
  },
});

export const upsertPetSchema = z.object({
  id: z.string().uuid().optional(),
  clinicId: z.string().uuid({ message: "A clínica deve ser um UUID válido." }),
  patientId: z
    .string()
    .uuid({ message: "O paciente deve ser um UUID válido." }),
  name: z.string().trim().min(1, { message: "O nome do pet é obrigatório." }),
  species: z
    .string()
    .trim()
    .min(1, { message: "A espécie do pet é obrigatória." }),
  breed: z.string().trim().optional(),
  sex: petSexEnum,
  dateOfBirth: z.coerce
    .date({
      errorMap: (issue, ctx) => {
        if (issue.code === "invalid_date") {
          return { message: "Data de nascimento inválida." };
        }
        return { message: ctx.defaultError };
      },
    })
    .optional(),
});

export type UpsertPetFormValues = z.infer<typeof upsertPetSchema>;
