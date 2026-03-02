import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ReactQueryProvider } from "@/shared/providers/reactQuery.provider";

export const metadata: Metadata = {
  title: "CONFRADAC Dashboard",
  description: "Dashboard da Confederação de Igrejas",
  icons: {
    icon: "/image/logo_confredac.png",
    shortcut: "/image/logo_confredac.png",
    apple: "/image/logo_confredac.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Toaster position="top-right" />
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
