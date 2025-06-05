import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageContainer } from "@/components/ui/page-container";
import { auth } from "@/lib/auth";

import { SubscriptionPlan } from "../(protected)/subscription/_components/subscription-plan";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/authentication");
  }
  return (
    <PageContainer>
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gray-900 dark:text-gray-50">
              Desbloqueie todo o potencial da sua clínica
            </CardTitle>
            <CardDescription className="text-xl text-gray-600 dark:text-gray-300">
              Para continuar utilizando nossa plataforma e transformar a gestão
              do seu consultório, é necessário escolher um plano que se adapte
              às suas necessidades.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-900/30">
              <p className="font-medium text-amber-800 dark:text-amber-200">
                🚀{" "}
                <span className="font-semibold">
                  Profissionais que utilizam nossa plataforma economizam em
                  média 15 horas por semana
                </span>{" "}
                em tarefas administrativas. Não perca mais tempo com agendas
                manuais e processos ineficientes!
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mx-auto w-full max-w-md">
          <SubscriptionPlan userEmail={session.user.email} />
        </div>

        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Junte-se a mais de 2.000 profissionais de saúde que já
              transformaram sua rotina com nossa solução. Garantia de satisfação
              de 30 dias ou seu dinheiro de volta.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
