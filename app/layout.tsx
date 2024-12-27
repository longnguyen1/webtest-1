import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
//import "boostrap/dist/css/bootstrap.css";
import "./globals.css";
import { Navigation } from "@/app/components/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <main>
          <header className="bg-slate-900 text-white p-4 text-center">
            {/*<p>Welcom to my Next.js web </p>*/}
            <Navigation />
          </header>
          {children}
          <footer className="bg-slate-900 text-white p-4 text-center">
            CodeLongs
          </footer>
        </main>
      </body>
    </html>
  );
}
