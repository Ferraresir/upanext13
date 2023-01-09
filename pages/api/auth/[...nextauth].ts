import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {},
      // @ts-ignore
      async authorize(credentials, _) {
        const { user, password } = credentials as {
          user: string;
          password: string;
        };
        if (!user || !password) {
          throw new Error("Missing username or password");
        }
        const usuario = await prisma.user.findUnique({
          where: {
            user,
          },
        });
        // if user doesn't exist or password doesn't match
        if (!usuario || !(await compare(password, usuario.password))) {
          throw new Error("Invalid username or password");
        }
        return usuario;
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.SECRET,
});
