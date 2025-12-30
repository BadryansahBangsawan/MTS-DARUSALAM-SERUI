import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "../index.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "MTs Darussalam - Sekolah Islam Setingkat SMP",
  description: "MTs Darussalam adalah sekolah Islam setingkat SMP yang siap membimbing kamu dengan metode pembelajaran modern dan islami",
  icons: {
    icon: "/logo-mts.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${poppins.variable} font-sans antialiased flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}