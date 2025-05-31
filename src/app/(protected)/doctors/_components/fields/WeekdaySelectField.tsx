"use client";

import { Control, FieldValues, Path } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WeekDaySelectFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
}

const weekDays = [
  { label: "Domingo", value: "0" },
  { label: "Segunda-feira", value: "1" },
  { label: "Terça-feira", value: "2" },
  { label: "Quarta-feira", value: "3" },
  { label: "Quinta-feira", value: "4" },
  { label: "Sexta-feira", value: "5" },
  { label: "Sábado", value: "6" },
];

export function WeekDaySelectField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "Selecione um dia",
}: WeekDaySelectFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {weekDays.map((day) => (
                <SelectItem key={day.value} value={day.value}>
                  {day.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
