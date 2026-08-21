import type { Metadata } from "next";
import "./globals.css";
import "./original-menu.css";

export const metadata: Metadata = {
  title: "Roulote do Marcelo — Ementa Digital",
  description: "Sabores dignos de Valhalla. Consulte a ementa digital da Roulote do Marcelo.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt"><body>{children}</body></html>;
}
