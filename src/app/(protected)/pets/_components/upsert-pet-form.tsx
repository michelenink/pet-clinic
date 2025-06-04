"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { CalendarIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { upsertPet } from "@/actions/upsert-pet";
import { petSexEnum } from "@/actions/upsert-pet/schema";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { patientsTable, petsTable } from "@/db/schema";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Nome é obrigatório."),
  species: z.string().min(1, "Espécie é obrigatória."),
  breed: z.string().optional(),
  sex: petSexEnum,
  dateOfBirth: z.coerce.date().optional(),
  patientId: z.string().min(1, "Paciente é obrigatório."),
  clinicId: z.string().min(1, "Clínica é obrigatória."),
});

interface UpsertPetFormProps {
  pet?: typeof petsTable.$inferSelect;
  patients: Array<typeof patientsTable.$inferSelect>;
  userClinicId: string;
  isOpen?: boolean;
  onSuccess?: () => void;
}

export function UpsertPetForm({
  pet,
  patients,
  userClinicId,
  isOpen,
  onSuccess,
}: UpsertPetFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    shouldUnregister: true,
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: pet?.id,
      name: pet?.name ?? "",
      species: pet?.species ?? "",
      breed: pet?.breed ?? "",
      sex: pet?.sex ?? "undefined",
      dateOfBirth: pet?.dateOfBirth ? new Date(pet.dateOfBirth) : undefined,
      patientId: pet?.ownerId ?? "",
      clinicId: pet?.clinicId ?? userClinicId,
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({
        id: pet?.id,
        name: pet?.name ?? "",
        species: pet?.species ?? "",
        breed: pet?.breed ?? undefined,
        sex: pet?.sex ?? "undefined",
        dateOfBirth: pet?.dateOfBirth ? new Date(pet.dateOfBirth) : undefined,
        patientId: pet?.ownerId ?? "",
        clinicId: pet?.clinicId ?? userClinicId,
      });
    }
  }, [isOpen, pet, form, userClinicId]);

  const upsertPetAction = useAction(upsertPet, {
    onSuccess: () => {
      toast.success("Pet salvo com sucesso.");
      onSuccess?.();
    },
    onError: () => {
      toast.error("Erro ao salvar o pet.");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    upsertPetAction.execute({
      ...values,
      id: pet?.id,
    });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{pet ? "Editar Pet" : "Adicionar Pet"}</DialogTitle>
        <DialogDescription>
          {pet
            ? "Edite as informações do pet."
            : "Adicione um novo pet e associe-o a um paciente."}
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="patientId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Paciente (Dono)</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o dono do pet" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {patients && patients.length > 0 ? (
                      patients.map((patient) => (
                        <SelectItem key={patient.id} value={patient.id}>
                          {patient.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-patients" disabled>
                        Nenhum paciente disponível para seleção
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Pet</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Bob" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="species"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Espécie</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Cachorro, Gato" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="breed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Raça (Opcional)</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Labrador, Siamês" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sex"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sexo</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o sexo do pet" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {petSexEnum.options.map((sexValue) => (
                      <SelectItem key={sexValue} value={sexValue}>
                        {sexValue === "male" && "Macho"}
                        {sexValue === "female" && "Fêmea"}
                        {sexValue === "undefined" && "Não definido"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data de Nascimento (Opcional)</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          dayjs(field.value).format("DD/MM/YYYY")
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button
              type="submit"
              disabled={upsertPetAction.isPending || !form.watch("patientId")}
            >
              {upsertPetAction.isPending ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
