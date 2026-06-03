import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maitri Dolls | Story-first Indian companion dolls",
  description:
    "Maitri is a story-first companion doll universe inspired by remarkable women from India. Join the Maitri Circle for stories, beta reads, workshops, and founder updates.",
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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
