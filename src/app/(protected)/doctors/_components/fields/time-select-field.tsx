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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { timeOptions } from "../../_constants/timeOptions";

export interface TimeSelectFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
}

export function TimeSelectField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "Selecione um horário",
}: TimeSelectFieldProps<T>) {
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
              {Object.entries(timeOptions).map(([period, times]) => (
                <SelectGroup key={period}>
                  <SelectLabel>
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </SelectLabel>
                  {times.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time.slice(0, 5)} {/* exibe "HH:MM" */}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
