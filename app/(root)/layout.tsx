import Header from "@/components/Header";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";




export const metadata: Metadata = {
  title: "Complaint Redressel",
  description: "A platform for addressing and resolving complaints",
};

export default  async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
 
  return (
    <main>
      <SessionProvider>
        <Header />
      {children}
      </SessionProvider>
    </main>
  );
}
