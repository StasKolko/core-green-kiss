import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/shared/lib/utils";
import { Toaster } from "@/shared/ui/sonner";
import { AppProvider } from "./_providers/app-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <AppProvider>{children}</AppProvider>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
