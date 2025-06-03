"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
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

const ForgotPasswordSchema = z.object({
  email: z.string().trim().min(1, { message: "E-mail é obrigatório" }).email({
    message: "E-mail inválido",
  }),
});

type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordSchema>;

export function ForgotPasswordForm() {
  const router = useRouter();
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      const { error } = await authClient.forgetPassword({
        email: data.email,
        redirectTo: "/authentication/reset-password",
      });

      if (error) {
        toast.error("Erro ao enviar e-mail de redefinição de senha.", {
          description: error.message || "Tente novamente mais tarde.",
        });
      } else {
        toast.success("E-mail de redefinição de senha enviado!", {
          description: "Por favor, verifique sua caixa de entrada.",
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

  return (
    <Card className="w-full max-w-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <CardHeader>
            <CardTitle>Esqueceu a Senha?</CardTitle>
            <CardDescription>
              Digite seu e-mail para enviarmos um link de redefinição de senha.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="seuemail@exemplo.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Enviar Link de Redefinição"
              )}
            </Button>
            <Button
              variant="link"
              type="button"
              className="mt-4"
              onClick={() => router.push("/authentication")}
            >
              Voltar para o Login
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
