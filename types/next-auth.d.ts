

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      name: string;

    };
  }
  interface User {
    id: string;
    email: string;
    name: string;

  }
}
