import type { Metadata } from "next";
import { dmSerifDisplay, inter, jetbrainsMono } from "@/lib/fonts";
import { siteMetadata } from "@/lib/metadata";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSerifDisplay.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="grain antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
