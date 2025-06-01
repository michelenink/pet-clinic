"use client";

import { ColumnDef } from "@tanstack/react-table";

import { patientsTable } from "@/db/schema";

import PatientTableActions from "./table-actions";

type Patient = typeof patientsTable.$inferSelect;

export const patientTableColumns: ColumnDef<Patient>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Nome",
  },
  {
    id: "email",
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "phoneNumber",
    accessorKey: "phoneNumber",
    header: "Telefone",
    cell: ({ row }) => {
      const phoneNumber = row.original.phoneNumber;
      if (!phoneNumber || phoneNumber.length !== 11) {
        return phoneNumber;
      }
      const ddd = phoneNumber.substring(0, 2);
      const firstPart = phoneNumber.substring(2, 7);
      const secondPart = phoneNumber.substring(7, 11);
      return `(${ddd}) ${firstPart}-${secondPart}`;
    },
  },
  {
    id: "sex",
    accessorKey: "sex",
    header: "Sexo",
    cell: ({ row }) => {
      const patient = row.original;
      return patient.sex === "male" ? "Masculino" : "Feminino";
    },
  },
  {
    id: "actions",
    header: "Ações",
    cell: (param) => {
      const patient = param.row.original;
      return <PatientTableActions patient={patient} />;
    },
  },
];
