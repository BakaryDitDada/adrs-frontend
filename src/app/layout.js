import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/providers/StoreProvider";
import StyledComponentsRegistry from "@/lib/registry";
import ClientProviders from "@/components/common/ClientProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ADRS Mali - Platform de Gestion Integrée",
  description: "Platform de gestion intégrée pour ADRS Mali, facilitant la gestion des projets, des ressources et des rapports.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <StoreProvider>
          <ClientProviders>
            {children}
          </ClientProviders>
        </StoreProvider>
      </body>
    </html>
  );
}