import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import { db } from "@/db";
import { patientsTable, petsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { AddPetButton } from "./_components/add-pet-button";
import { PetsDataTable } from "./_components/pets-data-table";

export default async function PetsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }
  if (!session.user.clinic) {
    redirect("/clinic-form");
  }
  if (!session.user.plan) {
    redirect("/new-subscription");
  }

  let pets: (typeof petsTable.$inferSelect & {
    owner?: typeof patientsTable.$inferSelect | null;
  })[] = [];
  let patients: (typeof patientsTable.$inferSelect)[] = [];

  if (session?.user?.clinic?.id) {
    pets = await db.query.petsTable.findMany({
      where: eq(petsTable.clinicId, session.user.clinic.id),
      orderBy: (petsTable, { desc }) => [desc(petsTable.createdAt)],
      with: {
        owner: true,
      },
    });

    patients = await db.query.patientsTable.findMany({
      where: eq(patientsTable.clinicId, session.user.clinic.id),
      orderBy: (patientsTable, { desc }) => [desc(patientsTable.name)],
    });
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Pacientes</PageTitle>
          <PageDescription>
            Gerencie os pacientes da sua clínica.
          </PageDescription>
        </PageHeaderContent>
        <PageActions>
          <AddPetButton
            patients={patients}
            userClinicId={session.user.clinic.id}
          />
        </PageActions>
      </PageHeader>
      <PageContent>
        <PetsDataTable
          pets={pets}
          patients={patients}
          userClinicId={session.user.clinic.id}
        />
      </PageContent>
    </PageContainer>
  );
}
