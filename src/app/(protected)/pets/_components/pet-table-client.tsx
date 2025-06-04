"use client";

import { DataTable } from "@/components/ui/data-table";
import { patientsTable, petsTable } from "@/db/schema";

import { getPetTableColumns } from "./table-columns";

interface PetTableClientProps {
  pets: Array<typeof petsTable.$inferSelect>;
  patients: Array<typeof patientsTable.$inferSelect>;
  userClinicId: string;
}

export function PetTableClient({
  pets,
  patients,
  userClinicId,
}: PetTableClientProps) {
  const columns = getPetTableColumns({ patients, userClinicId });

  return <DataTable columns={columns} data={pets} />;
}
