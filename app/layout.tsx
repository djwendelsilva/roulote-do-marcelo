import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Roulote do Marcelo — Cardápio Digital",
  description: "Sabores dignos de Valhalla. Consulte o cardápio digital da Roulote do Marcelo.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt"><body>{children}</body></html>;
}
