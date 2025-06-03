"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { updatePassword } from "@/actions/update-password";
import {
  UpdatePasswordSchema,
  updatePasswordSchema,
} from "@/actions/update-password/schema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function UpdatePasswordForm() {
  const form = useForm<UpdatePasswordSchema>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { execute, status } = useAction(updatePassword, {
    onSuccess: (data) => {
      if (data) {
        toast.success("Senha atualizada com sucesso.");
        form.reset();
      } else {
        toast.error("Falha ao atualizar senha.");
      }
    },
    onError: () => {
      toast.error("Erro ao atualizar senha", {
        description: "Por favor, tente novamente.",
      });
    },
  });

  const onSubmit = (data: UpdatePasswordSchema) => {
    execute(data);
  };

  const isLoading = status === "executing";

  return (
    <Card className="w-full max-w-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <CardHeader>
            <CardTitle>Atualizar Senha</CardTitle>
            <CardDescription>Escolha uma nova senha forte.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nova Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Nova Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Atualizar Senha"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
