
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;

    };
  }
  interface User {
    id: string;
    email: string;
    name: string;
    role: string;

  }
}
