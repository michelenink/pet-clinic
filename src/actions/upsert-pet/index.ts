"use server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { db } from "@/db";
import { petsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

import { upsertPetSchema } from "./schema";

export const upsertPet = actionClient
  .schema(upsertPetSchema)
  .action(async ({ parsedInput: data }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Você precisa estar logado para realizar esta ação.");
    }

    if (!session.user.clinic?.id) {
      throw new Error(
        "Você precisa estar associado a uma clínica para realizar esta ação.",
      );
    }

    const { id, patientId, name, species, breed, sex, dateOfBirth } = data;
    const clinicId = session.user.clinic.id;

    if (id) {
      const pet = await db.query.petsTable.findFirst({
        where: eq(petsTable.id, id),
      });

      if (!pet) {
        throw new Error("Pet não encontrado.");
      }

      if (pet.clinicId !== clinicId) {
        throw new Error("Você não tem permissão para editar este pet.");
      }

      await db
        .update(petsTable)
        .set({
          ownerId: patientId,
          name,
          species,
          breed,
          sex,
          dateOfBirth,
          updatedAt: new Date(),
        })
        .where(eq(petsTable.id, id));

      revalidatePath("/pets");

      return { success: "Pet atualizado com sucesso!" };
    }

    await db.insert(petsTable).values({
      clinicId,
      ownerId: patientId,
      name,
      species,
      breed,
      sex,
      dateOfBirth,
    });

    revalidatePath("/pets");
    return { success: "Pet cadastrado com sucesso!" };
  });
