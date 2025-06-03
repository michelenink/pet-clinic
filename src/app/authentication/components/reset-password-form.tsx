"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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
import { authClient } from "@/lib/auth-client";

const ResetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "Senha deve ter pelo menos 8 caracteres" }),
    confirmPassword: z.string().min(8, {
      message: "Confirmação de senha deve ter pelo menos 8 caracteres",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof ResetPasswordSchema>;

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const urlToken = searchParams.get("token");
    const urlError = searchParams.get("error");
    if (urlError) {
      setError("Link de redefinição inválido ou expirado.");
      toast.error("Link inválido", {
        description: "O link de redefinição de senha é inválido ou expirou.",
      });
      return;
    }
    if (urlToken) {
      setToken(urlToken);
    } else {
      setError("Token não encontrado. O link pode ser inválido.");
      toast.error("Token não encontrado", {
        description: "O link de redefinição de senha parece estar incompleto.",
      });
    }
  }, [searchParams]);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    if (!token) {
      toast.error("Erro de Token", {
        description:
          "Não foi possível redefinir a senha. Token não encontrado.",
      });
      return;
    }
    try {
      const result = await authClient.resetPassword({
        newPassword: data.newPassword,
        token,
      });

      if (result.error) {
        toast.error("Erro ao redefinir senha.", {
          description: result.error.message || "Tente novamente.",
        });
      } else {
        toast.success("Senha redefinida com sucesso!", {
          description: "Você já pode fazer login com sua nova senha.",
        });
        router.push("/authentication");
      }
    } catch (e) {
      let errorMessage = "Tente novamente mais tarde.";
      if (e instanceof Error) {
        errorMessage = e.message;
      }
      toast.error("Ocorreu um erro inesperado.", {
        description: errorMessage,
      });
    }
  };

  if (error) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Erro na Redefinição de Senha</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600">{error}</p>
          <Button
            variant="link"
            type="button"
            className="mt-4"
            onClick={() => router.push("/authentication")}
          >
            Voltar para o Login
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!token && !error) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Carregando...</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <CardHeader>
            <CardTitle>Redefinir Senha</CardTitle>
            <CardDescription>Digite sua nova senha abaixo.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nova Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
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
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting || !token}
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Redefinir Senha"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
