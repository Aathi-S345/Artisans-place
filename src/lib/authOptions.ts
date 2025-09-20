// In src/lib/authOptions.ts
import { AuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const adminEmail = "admin@example.com";
        const customerEmail = "customer@example.com";

        if (credentials?.email === adminEmail) {
          return { id: "1", name: "Admin User", email: adminEmail, role: "admin" };
        }
        
        if (credentials?.email === customerEmail) {
          return { id: "2", name: "Customer User", email: customerEmail, role: "customer" };
        }

        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};