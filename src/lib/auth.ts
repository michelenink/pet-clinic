import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { customSession } from "better-auth/plugins";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import * as schema from "@/db/schema";

import { sendEmail } from "./email";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema,
  }),

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [
    customSession(async ({ user, session }) => {
      //TODO colocar um cache
      const [userData, clinics] = await Promise.all([
        db.query.usersTable.findFirst({
          where: eq(schema.usersTable.id, user.id),
        }),
        db.query.usersToClinicsTable.findMany({
          where: eq(schema.usersToClinicsTable.userId, user.id),
          with: {
            clinic: true,
            user: true,
          },
        }),
      ]);

      //TODO: ao adicionar mais de uma clinica, precisa retornar todas as clinicas
      const clinic = clinics?.[0];
      return {
        user: {
          ...user,
          plan: userData?.plan,
          clinic: clinic?.clinicId
            ? {
                id: clinic?.clinicId,
                name: clinic?.clinic?.name,
              }
            : undefined,
        },
        session,
      };
    }),
  ],
  user: {
    modelName: "usersTable",
  },
  session: {
    modelName: "sessionsTable",
  },
  account: {
    modelName: "accountsTable",
  },
  verification: {
    modelName: "verificationsTable",
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url, token: _token }, _request) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const unusedToken = _token;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const unusedRequest = _request;
      await sendEmail({
        to: user.email,
        subject: "Redefina sua senha",
        text: `Clique no link para redefinir sua senha: ${url}`,
        // html: `<p>Clique no link para redefinir sua senha: <a href="${url}">Redefinir Senha</a></p>`
      });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token: _token }, _request) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const unusedToken = _token;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const unusedRequest = _request;
      // TODO: Create a more user-friendly email template
      await sendEmail({
        to: user.email,
        subject: "Verifique seu endereço de e-mail",
        text: `Clique no link para verificar seu e-mail: ${url}`,
        // html: `<p>Clique no link para verificar seu e-mail: <a href="${url}">Verificar E-mail</a></p>`
      });
    },
  },
});
