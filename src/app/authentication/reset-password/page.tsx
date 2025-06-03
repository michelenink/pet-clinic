import { Suspense } from "react";

import { AuthPageContainer } from "../components/auth-page-container";
import { ResetPasswordForm } from "../components/reset-password-form";

function ResetPasswordFormWrapper() {
  return <ResetPasswordForm />;
}

export default function ResetPasswordPage() {
  return (
    <AuthPageContainer>
      <Suspense fallback={<div>Carregando...</div>}>
        <ResetPasswordFormWrapper />
      </Suspense>
    </AuthPageContainer>
  );
}
