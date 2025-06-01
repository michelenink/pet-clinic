import { eq } from "drizzle-orm";
import { headers } from "next/headers";

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
import { patientsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { AddPatientButton } from "./_components/add-patient-button";
import PatientCard from "./_components/patient-card";

export default async function PatientsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  let patients: (typeof patientsTable.$inferSelect)[] = [];

  if (session?.user?.clinic?.id) {
    patients = await db.query.patientsTable.findMany({
      where: eq(patientsTable.clinicId, session.user.clinic.id),
      orderBy: (patientsTable, { desc }) => [desc(patientsTable.createdAt)],
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
          <AddPatientButton />
        </PageActions>
      </PageHeader>
      <PageContent>
        {patients.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {patients.map((patient) => (
              <PatientCard key={patient.id} patient={patient} />
            ))}
          </div>
        ) : (
          <div className="text-muted-foreground mt-4 rounded-md border p-8 text-center">
            <h3 className="text-xl font-semibold">
              Nenhum paciente cadastrado
            </h3>
            <p className="mt-2">Clique em Adicionar Paciente para começar.</p>
          </div>
        )}
      </PageContent>
    </PageContainer>
  );
}
