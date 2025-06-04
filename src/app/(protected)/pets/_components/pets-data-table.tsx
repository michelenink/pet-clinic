"use client";

import { DataTable } from "@/components/ui/data-table";
import { patientsTable } from "@/db/schema";

import { getPetTableColumns, PetRow } from "./table-columns";

interface PetsDataTableProps {
  pets: PetRow[];
  patients: Array<typeof patientsTable.$inferSelect>;
  userClinicId: string;
}

export function PetsDataTable({
  pets,
  patients,
  userClinicId,
}: PetsDataTableProps) {
  const columns = getPetTableColumns({ patients, userClinicId });

  if (pets.length === 0) {
    return (
      <p>Nenhum pet cadastrado ainda. Clique em Adicionar Pet para começar.</p>
    );
  }

  return <DataTable columns={columns} data={pets} />;
}
