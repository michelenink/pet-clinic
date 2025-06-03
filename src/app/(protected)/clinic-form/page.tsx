import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { auth } from "@/lib/auth";

import ClinicForm from "./components/form";

const ClinicFormPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/authentication");
  }

  if (!session.user.plan) {
    redirect("/new-subscription");
  }
  return (
    <div>
      <Dialog open={true}>
        <form>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar clínica</DialogTitle>
              <DialogDescription>
                Adicione uma clínica para que você possa gerenciar seus
                pacientes
              </DialogDescription>
            </DialogHeader>
            <ClinicForm />
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};

export default ClinicFormPage;
