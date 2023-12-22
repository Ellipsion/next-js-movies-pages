import prisma from "@/libs/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";

import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Handle Auth Logic (Login)

        // if email and password is there
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // check if user exists
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // if no user or no password (because different login provider)
        if (!user || !user?.password) {
          return null;
        }

        // check if password matches
        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
};

export { authOptions };