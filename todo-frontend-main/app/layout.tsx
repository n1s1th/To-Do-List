import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "To-Do List App",
  description: "A full-stack To-Do List application built with Next.js and Spring Boot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
