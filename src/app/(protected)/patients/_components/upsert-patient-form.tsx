"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { toast } from "sonner";

import { upsertPatient } from "@/actions/upsert-patient";
import {
  UpsertPatientSchema,
  upsertPatientSchema,
} from "@/actions/upsert-patient/schema";
import { Button } from "@/components/ui/button";
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
import { patientSexEnum, patientsTable } from "@/db/schema";

interface UpsertPatientFormProps {
  isOpen?: boolean;
  patient?: typeof patientsTable.$inferSelect;
  onSuccess?: () => void;
}

export function UpsertPatientForm({
  patient,
  onSuccess,
  isOpen,
}: UpsertPatientFormProps) {
  const form = useForm<UpsertPatientSchema>({
    resolver: zodResolver(upsertPatientSchema),
    defaultValues: patient
      ? {
          ...patient,
          phoneNumber: patient.phoneNumber ?? "",
        }
      : {
          name: "",
          email: "",
          phoneNumber: "",
          sex: undefined,
        },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset(patient);
    }
  }, [isOpen, patient, form]);

  const { execute, status } = useAction(upsertPatient, {
    onSuccess: () => {
      toast.success("Paciente salvo com sucesso.");
      form.reset();
      onSuccess?.();
    },
    onError: () => {
      toast.error("Ocorreu um erro inesperado ao salvar o paciente.");
    },
  });

  const onSubmit = (values: UpsertPatientSchema) => {
    const dataToSubmit: UpsertPatientSchema = {
      ...values,
    };
    if (patient?.id) {
      dataToSubmit.id = patient.id;
    }
    execute(dataToSubmit);
  };

  const isLoading = status === "executing";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome completo do paciente" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email do paciente" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <PatternFormat
                  format="(##) #####-####"
                  customInput={Input}
                  placeholder="(00) 00000-0000"
                  value={field.value}
                  onValueChange={({ value }) => field.onChange(value)}
                />
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
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o sexo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {patientSexEnum.enumValues.map((sexValue) => (
                    <SelectItem key={sexValue} value={sexValue}>
                      {sexValue === "male" ? "Masculino" : "Feminino"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
          Salvar Paciente
        </Button>
      </form>
    </Form>
  );
}
