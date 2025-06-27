import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import { auth } from "@/lib/auth";

import { SubscriptionPlan } from "./_components/subscription-plan";

const SubscriptionPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }
  if (!session.user.clinic) {
    redirect("/clinic-form");
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Assinatura</PageTitle>
          <PageDescription>Gerencie sua assinatura e planos</PageDescription>
        </PageHeaderContent>
      </PageHeader>
      <PageContent>
        <div className="max-w-2xl">
          {!session.user.plan && (
            <div className="mb-6 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 dark:bg-blue-950/20">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Modo Demonstração:</strong> Você está usando o sistema em modo gratuito. 
                    Para acessar recursos avançados e suporte prioritário, considere fazer uma assinatura.
                  </p>
                </div>
              </div>
            </div>
          )}
          <SubscriptionPlan
            className="w-[350px]"
            active={session.user.plan === "essential"}
            userEmail={session.user.email}
          />
        </div>
      </PageContent>
    </PageContainer>
  );
};

export default SubscriptionPage;
