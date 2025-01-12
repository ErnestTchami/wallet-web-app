import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/db/index";
import { eq } from "drizzle-orm";
import { user as User } from "@/db/schema";

export const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "github" || account?.provider === "google") {
        try {
          const existingUser = await db
            .select()
            .from(User)
            .where(eq(User.email, user.email as string))
            .limit(1);

          // check if is the first time
          if (existingUser?.length === 0) {
            await db.insert(User).values({
              id: user.id,
              firstName: user.name || "",
              lastName: "",
              email: user.email || "",
              imageUrl: user.image || "",
              createdAt: new Date(),
              updatedAt: new Date(),
            });
          }
        } catch (err) {
          const error = err as Error;
          console.log(error);
        }
      }

      return true;
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      if (url.startsWith(baseUrl)) {
      }
      return Promise.resolve(baseUrl);
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.email = token.email as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user?.email) {
        const dbUser = await db.query.user.findFirst({
          where: eq(User.email, user.email),
        });
        if (dbUser) {
          token.id = dbUser.id;
        }
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.JWT_SECRET as string,
  },
};
