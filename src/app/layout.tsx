import type { Metadata } from "next";
import { PT_Sans, PT_Serif } from "next/font/google";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { DEFAULT_LOCALE, LOCALE_HTML_LANG } from "@/i18n/types";
import "./globals.css";

const ptSans = PT_Sans({
  weight: ["400", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-pt-sans",
});

const ptSerif = PT_Serif({
  weight: ["400", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-pt-serif",
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
    // Static export: the markup is prerendered in the default language,
    // the saved choice is applied by LocaleProvider after hydration.
    <html
      lang={LOCALE_HTML_LANG[DEFAULT_LOCALE]}
      className={`${ptSans.variable} ${ptSerif.variable}`}
    >
      <body>
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
