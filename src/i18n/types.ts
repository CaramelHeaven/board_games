export const LOCALES = ["ru", "en", "zh"] as const;

export type Locale = (typeof LOCALES)[number];

/** A content string in every supported language. */
export type Translated = Record<Locale, string>;

export const DEFAULT_LOCALE: Locale = "ru";

/** The label of the switcher itself — each language named in itself. */
export const LOCALE_LABELS: Record<Locale, string> = {
  ru: "РУС",
  en: "ENG",
  zh: "中文",
};

/** Value for the lang attribute of <html>. */
export const LOCALE_HTML_LANG: Record<Locale, string> = {
  ru: "ru",
  en: "en",
  zh: "zh-Hans",
};

export function isLocale(value: unknown): value is Locale {
  return (
    typeof value === "string" && (LOCALES as readonly string[]).includes(value)
  );
}
