import { z } from "zod";

export const updatePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "Nova senha deve ter pelo menos 8 caracteres" }),
    confirmPassword: z
      .string()
      .min(8, {
        message: "Confirmação de senha deve ter pelo menos 8 caracteres",
      }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;
