import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Valenzia — Illustrator & Character Designer",
  description: "The art portfolio of Valenzia: character design, digital illustration, and visual storytelling from Toronto.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">{children}</body>
    </html>
  );
}
