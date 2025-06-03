"use client";

import { CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { AuthPageContainer } from "../components/auth-page-container";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying",
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const errorParam = searchParams.get("error");

    if (errorParam) {
      setStatus("error");
      if (errorParam === "invalid_token") {
        setError(
          "Link de verificação inválido ou expirado. Tente reenviar o e-mail de verificação.",
        );
      } else {
        setError("Ocorreu um erro durante a verificação do e-mail.");
      }
    } else {
      setStatus("success");
    }
  }, [searchParams]);

  return (
    <AuthPageContainer>
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle>
            {status === "verifying" && "Verificando seu E-mail..."}
            {status === "success" && "E-mail Verificado!"}
            {status === "error" && "Erro na Verificação"}
          </CardTitle>
          <CardDescription>
            {status === "success" &&
              "Seu endereço de e-mail foi verificado com sucesso."}
            {status === "error" &&
              (error || "Não foi possível verificar seu e-mail.")}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center">
          {status === "verifying" && <p>Por favor, aguarde...</p>}
          {status === "success" && (
            <CheckCircle className="h-16 w-16 text-green-500" />
          )}
          {status === "error" && <XCircle className="h-16 w-16 text-red-500" />}
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center space-y-4">
          {status === "success" && (
            <Button asChild>
              <Link href="/authentication">Ir para Login</Link>
            </Button>
          )}
          {status === "error" && (
            <Button onClick={() => router.push("/authentication")}>
              Voltar para Login
            </Button>
            // TODO: Add a button to resend verification email if needed
            // <Button variant="outline" onClick={handleResendVerification}>
            //   Reenviar E-mail de Verificação
            // </Button>
          )}
        </CardFooter>
      </Card>
    </AuthPageContainer>
  );
}
