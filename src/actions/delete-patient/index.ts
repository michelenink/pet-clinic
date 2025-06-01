"use server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import z from "zod";

import { db } from "@/db";
import { patientsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

export const deletePatient = actionClient
  .schema(
    z.object({
      id: z.string().uuid(),
    }),
  )
  .action(async ({ parsedInput: { id } }) => {
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

    const patient = await db.query.patientsTable.findFirst({
      where: and(
        eq(patientsTable.id, id),
        eq(patientsTable.clinicId, session.user.clinic.id),
      ),
    });

    if (!patient) {
      throw new Error(
        "Paciente não encontrado ou você não tem permissão para excluí-lo.",
      );
    }

    if (patient.clinicId !== session.user.clinic.id) {
      throw new Error(
        "Paciente não encontrado ou você não tem permissão para excluí-lo.",
      );
    }

    await db.delete(patientsTable).where(eq(patientsTable.id, id));

    revalidatePath("/patients");
  });
