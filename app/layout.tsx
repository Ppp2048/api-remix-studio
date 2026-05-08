import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "API Remix Studio",
  description:
    "Mix free public APIs, remix design inspiration, and generate deployable MVP plans.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="min-h-full bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
