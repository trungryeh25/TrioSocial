import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Demo user
        if (
          credentials?.username === "admin" &&
          credentials?.password === "123456"
        ) {
          return {
            id: "1", // thêm id ở đây
            name: "Admin User",
            email: "admin@example.com",
          };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
};
