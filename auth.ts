import NextAuth, { User as NextAuthUser } from "next-auth";
import { compareSync } from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "./lib/connectDB";
import User from "./models/user.model";

export const { handlers, authOptions } = NextAuth({

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }
        await connectDB();
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("User not found");
        }
        const isValid = compareSync(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid credentials");
        }
        return user as NextAuthUser;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          email: token.email,
          name: token.name,
        };
      }
      return session;
    }
  },
  pages: {
    signIn: '/signin'
  }
})