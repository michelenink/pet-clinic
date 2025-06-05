import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";

import LoginForm from "./components/login-form";
import SignUpForm from "./components/sign-up-form";

const AuthenticationPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen w-full lg:grid">
      <div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md space-y-8">
          <div className="max-w-md space-y-6">
            <Image
              className="mx-auto"
              src="/logo.svg"
              alt="Pet Clinic"
              width={250}
              height={32}
            />
          </div>

          <Tabs defaultValue="login" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Criar conta</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register">
              <SignUpForm />
            </TabsContent>
          </Tabs>

          <div className="text-muted-foreground text-center text-sm">
            <p>
              Ao continuar, você concorda com nossos{" "}
              <a
                href="/terms"
                className="hover:text-primary underline underline-offset-4"
              >
                Termos de Serviço
              </a>{" "}
              e{" "}
              <a
                href="/privacy"
                className="hover:text-primary underline underline-offset-4"
              >
                Política de Privacidade
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;
