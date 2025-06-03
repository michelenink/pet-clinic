"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

import { updatePasswordSchema } from "./schema";

export const updatePassword = actionClient
  .schema(updatePasswordSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      throw new Error("Usuário não autenticado.");
    }

    const userId = session.user.id;
    const { newPassword } = parsedInput;

    try {
      const ctx = await auth.$context;
      const hashedPassword = await ctx.password.hash(newPassword);

      await ctx.internalAdapter.updatePassword(userId, hashedPassword);

      return { success: "Senha atualizada com sucesso!" };
    } catch (error) {
      console.error("Erro ao atualizar senha:", error);

      if (error instanceof Error) {
        throw new Error(`Falha ao atualizar senha: ${error.message}`);
      }
      throw new Error("Falha ao atualizar senha. Tente novamente mais tarde.");
    }
  });
