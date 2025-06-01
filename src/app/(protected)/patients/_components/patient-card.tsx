"use client";
import { EditIcon, PhoneIcon, TrashIcon, UserIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

import { deletePatient } from "@/actions/delete-patient";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { patientsTable } from "@/db/schema";

import UpsertPatientForm from "./upsert-patient-form";

interface PatientCardProps {
  patient: typeof patientsTable.$inferSelect;
}

const PatientCard = ({ patient }: PatientCardProps) => {
  const [isUpsertPatientDialogOpen, setIsUpsertPatientDialogOpen] =
    useState(false);

  const deletePatientAction = useAction(deletePatient, {
    onSuccess: () => {
      toast.success("Paciente excluído com sucesso.");
    },
    onError: () => {
      toast.error("Erro de validação ao excluir paciente.");
    },
  });

  const handleDeletePatientClick = () => {
    deletePatientAction.execute({ id: patient.id });
  };

  const patientInitials = patient.name
    .split(" ")
    .map((nameSegment) => nameSegment[0])
    .join("")
    .toUpperCase();

  const genderLabel = patient.sex === "male" ? "Masculino" : "Feminino";

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback>{patientInitials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">{patient.name}</h3>
            <p className="text-muted-foreground text-sm">{patient.email}</p>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="mt-4 flex flex-col gap-2">
        <Badge variant="outline" className="px-2 py-1">
          <PhoneIcon className="mr-2 h-4 w-4" />
          {patient.phoneNumber}
        </Badge>
        <Badge variant="outline" className="px-2 py-1">
          <UserIcon className="mr-2 h-4 w-4" />
          {genderLabel}
        </Badge>
      </CardContent>
      <Separator />
      <CardFooter className="mt-4 flex flex-col gap-2 sm:flex-row">
        <Dialog
          open={isUpsertPatientDialogOpen}
          onOpenChange={setIsUpsertPatientDialogOpen}
        >
          <DialogTrigger asChild>
            <Button className="w-full flex-grow sm:w-auto">
              <EditIcon className="mr-2 h-4 w-4" />
              Editar
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Paciente</DialogTitle>
            </DialogHeader>
            <UpsertPatientForm
              patient={patient}
              onSuccess={() => {
                setIsUpsertPatientDialogOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="w-full flex-grow sm:w-auto">
              <TrashIcon className="mr-2 h-4 w-4" />
              Excluir
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Tem certeza que deseja excluir este paciente?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Esta ação não pode ser revertida. Isso irá remover o paciente
                permanentemente.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeletePatientClick}
                disabled={deletePatientAction.status === "executing"}
              >
                {deletePatientAction.status === "executing"
                  ? "Excluindo..."
                  : "Continuar"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default PatientCard;
