"use server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { db } from "@/db";
import { patientsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

import { upsertPatientSchema } from "./schema";

export const upsertPatient = actionClient
  .schema(upsertPatientSchema)
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

    const { id, name, email, phoneNumber, sex } = data;

    if (id) {
      const patient = await db.query.patientsTable.findFirst({
        where: eq(patientsTable.id, id),
      });

      if (!patient) {
        throw new Error("Paciente não encontrado.");
      }

      if (patient.clinicId !== session.user.clinic.id) {
        throw new Error("Você não tem permissão para editar este paciente.");
      }

      await db
        .update(patientsTable)
        .set({
          name,
          email,
          phoneNumber,
          sex,
          updatedAt: new Date(),
        })
        .where(eq(patientsTable.id, id));

      revalidatePath("/patients");

      return { success: "Paciente atualizado com sucesso!" };
    }

    await db.insert(patientsTable).values({
      name,
      email,
      phoneNumber,
      sex,
      clinicId: session.user.clinic.id,
    });

    revalidatePath("/patients");
    return { success: "Paciente cadastrado com sucesso!" };
  });
