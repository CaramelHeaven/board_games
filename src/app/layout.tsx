import type { Metadata } from "next";
import { PT_Sans } from "next/font/google";
import "./globals.css";

const ptSans = PT_Sans({
  weight: ["400", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-pt-sans",
});

export const metadata: Metadata = {
  title: "Онлайн подсчет очков | Настольные игры",
  description:
    "Удобный онлайн сервис для определения победителя в популярных настольных играх.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${ptSans.variable} h-full`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
