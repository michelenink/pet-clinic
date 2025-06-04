"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import z from "zod";

import { db } from "@/db";
import { petsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

export const deletePet = actionClient
  .schema(
    z.object({
      id: z.string().uuid(),
    }),
  )
  .action(async ({ parsedInput: data }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Usuário não autenticado.");
    }

    if (!session.user.clinic?.id) {
      throw new Error("Clínica não encontrada para o usuário.");
    }

    const existingPet = await db.query.petsTable.findFirst({
      where: and(
        eq(petsTable.id, data.id),
        eq(petsTable.clinicId, session.user.clinic.id),
      ),
    });

    if (!existingPet) {
      return { serverError: "Pet não encontrado." };
    }

    if (existingPet.clinicId !== session.user.clinic.id) {
      return { serverError: "Este pet não pertence à sua clínica." };
    }

    await db.delete(petsTable).where(eq(petsTable.id, data.id));

    revalidatePath("/(protected)/pets");
  });
