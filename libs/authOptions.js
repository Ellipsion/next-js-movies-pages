import prisma from "@/libs/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare, hash } from "bcrypt";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { sendVerificationMail } from "@/utils/mailer";
import { createVerificationToken } from "@/utils/verification";

const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
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
          throw new Error("Missing Fields");
        }

        // check if user exists

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // if no user or no password (because different login provider)
        if (!user || !user?.password) {
          throw new Error("User not registered");
        }

        // check if password matches
        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid username or password");
        }

        if (!user.verified) {
          const verificationToken = await createVerificationToken(user.id);

          await sendVerificationMail(
            user.name,
            user.email,
            verificationToken.token
          );
          throw new Error("USER_NOT_VERIFIED");
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
  pages: {
    signIn: "/auth/login/",
    newUser: "/",
  },
};

export { authOptions };
