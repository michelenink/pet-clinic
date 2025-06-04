import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { toast } from "sonner";
import z from "zod";

import { upsertDoctor } from "@/actions/upsert-doctor";
import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { veterinariansTable } from "@/db/schema";

import { medicalSpecialties } from "../_constants";
import { TimeSelectField } from "./fields/time-select-field";
import { WeekDaySelectField } from "./fields/weekday-select-field";

const formSchema = z
  .object({
    name: z.string().trim().min(1, { message: "Nome é obrigatório" }),
    specialty: z
      .string()
      .trim()
      .min(1, { message: "Especialidade é obrigatória" }),
    appointmentPrice: z
      .number()
      .min(0, { message: "Preço da consulta inválido" }),
    availableFromWeekDay: z.string(),
    availableToWeekDay: z.string(),
    availableFromTime: z.string().trim().min(1, {
      message: "Horário de início é obrigatório",
    }),
    availableToTime: z.string().trim().min(1, {
      message: "Horário de término é obrigatório",
    }),
  })
  .refine(
    (data) => {
      return data.availableFromTime < data.availableToTime;
    },
    {
      path: ["availableToTime"],
      message: "O horário de início não pode anterior ao horário de término",
    },
  );

interface UpsertDoctorFormProps {
  isOpen?: boolean;
  doctor?: typeof veterinariansTable.$inferSelect;
  onSuccess?: () => void;
}

const UpsertDoctorForm = ({
  doctor,
  onSuccess,
  isOpen,
}: UpsertDoctorFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    shouldUnregister: true,
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: doctor?.name ?? "",
      specialty: doctor?.specialty || "",
      appointmentPrice: doctor?.appointmentPriceInCents
        ? doctor.appointmentPriceInCents / 100
        : 0,
      availableFromWeekDay: doctor?.availableFromWeekDay
        ? doctor.availableFromWeekDay?.toString()
        : "1",
      availableToWeekDay: doctor?.availableToWeekDay
        ? doctor.availableToWeekDay?.toString()
        : "5",
      availableFromTime: doctor?.availableFromTime ?? "",
      availableToTime: doctor?.availableToTime ?? "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({
        name: doctor?.name ?? "",
        specialty: doctor?.specialty || "",
        appointmentPrice: doctor?.appointmentPriceInCents
          ? doctor.appointmentPriceInCents / 100
          : 0,
        availableFromWeekDay: doctor?.availableFromWeekDay
          ? doctor.availableFromWeekDay?.toString()
          : "1",
        availableToWeekDay: doctor?.availableToWeekDay
          ? doctor.availableToWeekDay?.toString()
          : "5",
        availableFromTime: doctor?.availableFromTime ?? "",
        availableToTime: doctor?.availableToTime ?? "",
      });
    }
  }, [isOpen, doctor, form]);

  const upsertDoctorAction = useAction(upsertDoctor, {
    onSuccess: () => {
      toast.success("Veterinário adicionado com sucesso.");
      onSuccess?.();
    },
    onError: () => {
      toast.error("Erro ao adicionar Veterinário.");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    upsertDoctorAction.execute({
      ...values,
      id: doctor?.id,
      availableFromWeekDay: parseInt(values.availableFromWeekDay),
      availableToWeekDay: parseInt(values.availableToWeekDay),
      appointmentPriceInCents: values.appointmentPrice * 100,
    });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {doctor ? "Editar Veterinário" : "Adicionar Veterinário"}
        </DialogTitle>
        <DialogDescription>
          {doctor
            ? "Edite as informações do Veterinário"
            : "Adicione um novo Veterinário ao sistema"}
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="specialty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Especialidade</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione uma especialidade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {medicalSpecialties.map((specialty) => (
                      <SelectItem key={specialty.value} value={specialty.value}>
                        {specialty.label}
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
            name="appointmentPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço da consulta</FormLabel>
                <NumericFormat
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value.floatValue);
                  }}
                  decimalScale={2}
                  fixedDecimalScale
                  decimalSeparator=","
                  allowNegative={false}
                  allowLeadingZeros={false}
                  thousandSeparator="."
                  customInput={Input}
                  prefix="R$"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <WeekDaySelectField
            control={form.control}
            name="availableFromWeekDay"
            label="Dia inicial de disponibilidade"
          />

          <WeekDaySelectField
            control={form.control}
            name="availableToWeekDay"
            label="Dia final de disponibilidade"
          />

          <TimeSelectField
            control={form.control}
            name="availableFromTime"
            label="Horário inicial de disponibilidade"
          />

          <TimeSelectField
            control={form.control}
            name="availableToTime"
            label="Horário final de disponibilidade"
          />

          <DialogFooter>
            <Button type="submit" disabled={upsertDoctorAction.isPending}>
              {upsertDoctorAction.isPending
                ? "Salvando..."
                : doctor
                  ? "Salvar"
                  : "Adicionar"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default UpsertDoctorForm;
