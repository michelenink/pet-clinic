"use client";

import { EditIcon, MoreVertical, TrashIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

import { deletePet } from "@/actions/delete-pet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import { petsTable } from "@/db/schema";

import { usePetData } from "./pet-data-context";
import { UpsertPetForm } from "./upsert-pet-form";

interface PetTableActionsProps {
  pet: typeof petsTable.$inferSelect;
}

const PetTableActions = ({ pet }: PetTableActionsProps) => {
  const { patients, userClinicId } = usePetData();
  const [upsertDialogIsOpen, setUpsertDialogIsOpen] = useState(false);
  const [deleteAlertDialogIsOpen, setDeleteAlertDialogIsOpen] = useState(false);

  const { execute: executeDeletePet, status: deleteStatus } = useAction(
    deletePet,
    {
      onSuccess: () => {
        toast.success("Pet excluído com sucesso.");
        setDeleteAlertDialogIsOpen(false);
      },
      onError: () => {
        toast.error("Erro ao excluir pet.");
        setDeleteAlertDialogIsOpen(false);
      },
    },
  );

  const handleDeleteConfirm = () => {
    executeDeletePet({ id: pet.id });
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
          <DropdownMenuItem onClick={() => setUpsertDialogIsOpen(true)}>
            <EditIcon className="mr-2 h-4 w-4" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDeleteAlertDialogIsOpen(true)}>
            <TrashIcon className="mr-2 h-4 w-4" />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={upsertDialogIsOpen} onOpenChange={setUpsertDialogIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Pet</DialogTitle>
          </DialogHeader>
          <UpsertPetForm
            pet={pet}
            patients={patients}
            userClinicId={userClinicId}
            onSuccess={() => {
              setUpsertDialogIsOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={deleteAlertDialogIsOpen}
        onOpenChange={setDeleteAlertDialogIsOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Tem certeza que deseja excluir {pet.name}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser revertida. Isso irá remover o pet
              permanentemente do banco de dados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={deleteStatus === "executing"}
            >
              {deleteStatus === "executing" ? "Excluindo..." : "Deletar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PetTableActions;
