import NextAuth, { User as NextAuthUser } from "next-auth";
import { compareSync } from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "./lib/connectDB";
import User from "./models/user.model";

export const { handlers, auth, signIn, signOut } = NextAuth({

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials) {
        const { email, password } = credentials || {};
        if (!email || !password) {
          throw new Error("Invalid credentials");
        }
        await connectDB();
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("User not found");
        }
        const isValid = compareSync(password.toString(), user.password);
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
        session.user.id = token.id!;
        session.user.email = token.email!;
        session.user.name = token.name;
      }
      return session;
    }
  },
  pages: {
    signIn: '/signin'
  
  },
  session: {
    strategy: "jwt"
  }
})