"use client";

import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { ArrowUpDown, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

import { deletePet } from "@/actions/delete-pet";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { patientsTable, petsTable } from "@/db/schema";

import { UpsertPetForm } from "./upsert-pet-form";

export type PetRow = typeof petsTable.$inferSelect;

interface PetActionsProps {
  pet: PetRow;
  patients: Array<typeof patientsTable.$inferSelect>;
  userClinicId: string;
}

const PetActions: React.FC<PetActionsProps> = ({
  pet,
  patients,
  userClinicId,
}) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const router = useRouter();

  const { execute: executeDelete, isPending: isDeleting } = useAction(
    deletePet,
    {
      onSuccess: () => {
        toast.success("Pet excluído com sucesso.");
        setIsDeleteDialogOpen(false);
        router.refresh();
      },
      onError: (error) => {
        console.error("Erro ao excluir pet:", error);
        const errorMessage =
          error.error.serverError ||
          JSON.stringify(error.error.validationErrors) ||
          "Ocorreu um erro.";
        toast.error(`Erro ao excluir o pet: ${errorMessage}`);
      },
    },
  );

  const handleDelete = () => {
    if (!pet.id) {
      toast.error("ID do pet não encontrado.");
      return;
    }
    executeDelete({ id: pet.id });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{pet.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
            <Pencil className="mr-2 h-4 w-4" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
            <Trash2 className="mr-2 h-4 w-4" />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <UpsertPetForm
            pet={pet}
            patients={patients}
            userClinicId={userClinicId}
            isOpen={isEditDialogOpen}
            onSuccess={() => {
              setIsEditDialogOpen(false);
              router.refresh();
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o pet &quot;{pet.name}&quot;? Esta
              ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Excluindo..." : "Excluir"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export interface PetTableColumnsProps {
  patients: Array<typeof patientsTable.$inferSelect>;
  userClinicId: string;
}

export const getPetTableColumns = ({
  patients,
  userClinicId,
}: PetTableColumnsProps): ColumnDef<PetRow>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nome do Pet
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "species",
    header: "Espécie",
  },
  {
    accessorKey: "breed",
    header: "Raça",
    cell: ({ row }) => row.original.breed || "-",
  },
  {
    accessorKey: "ownerId",
    header: "Tutor",
    cell: ({ row }) => {
      const owner = patients.find((p) => p.id === row.original.ownerId);
      return owner ? owner.name : "Não associado";
    },
  },
  {
    accessorKey: "dateOfBirth",
    header: "Data de Nasc.",
    cell: ({ row }) => {
      const dateOfBirth = row.original.dateOfBirth;
      return dateOfBirth ? dayjs(dateOfBirth).format("DD/MM/YYYY") : "-";
    },
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const pet = row.original;
      return (
        <PetActions pet={pet} patients={patients} userClinicId={userClinicId} />
      );
    },
  },
];
