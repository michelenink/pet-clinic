"use server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

import { db } from "@/db";
import { veterinariansTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

export const deleteDoctor = actionClient
  .schema(
    z.object({
      id: z.string().uuid(),
    }),
  )
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const doctor = await db.query.veterinariansTable.findFirst({
      where: eq(veterinariansTable.id, parsedInput.id),
    });

    if (!doctor) {
      throw new Error("Veterinário não encontrado");
    }

    if (doctor.clinicId !== session.user.clinic?.id) {
      throw new Error("Veterinário não encontrado");
    }

    await db
      .delete(veterinariansTable)
      .where(eq(veterinariansTable.id, parsedInput.id));
    revalidatePath("/doctors");
  });
