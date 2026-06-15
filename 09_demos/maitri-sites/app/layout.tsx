import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maitri | Story-first Indian companion dolls for children",
  description:
    "Maitri is a story-first companion doll universe for children ages 5-12, inspired by brave Indian heroines, friendship, imagination, and parent-trusted values.",
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
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (() => {
                const stored = window.localStorage.getItem("maitri.theme");
                const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                document.documentElement.dataset.theme = stored || (systemDark ? "dark" : "light");
              })();
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
