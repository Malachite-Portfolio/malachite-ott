import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Malachite Play",
  description: "Premium OTT demo with horizontally scrollable movie rows.",
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
