import type { Metadata } from "next";
import { luciole } from "@/font/custom-font";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Hubys",
  description: "Simplifiez votre vie quotidienne et vos moments partagés",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${luciole.className} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
