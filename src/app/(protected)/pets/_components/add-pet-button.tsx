"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { patientsTable } from "@/db/schema";

import { UpsertPetForm } from "./upsert-pet-form";

interface AddPetButtonProps {
  patients: Array<typeof patientsTable.$inferSelect>;
  userClinicId: string;
}

export function AddPetButton({ patients, userClinicId }: AddPetButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 size-4" />
          Adicionar Pet
        </Button>
      </DialogTrigger>
      <UpsertPetForm
        onSuccess={() => setIsOpen(false)}
        isOpen={isOpen}
        patients={patients}
        userClinicId={userClinicId}
      />
    </Dialog>
  );
}
