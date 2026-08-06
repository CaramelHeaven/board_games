export const LOCALES = ["ru", "en", "zh"] as const;

export type Locale = (typeof LOCALES)[number];

/** Строка контента на всех поддерживаемых языках. */
export type Translated = Record<Locale, string>;

export const DEFAULT_LOCALE: Locale = "ru";

/** Подпись самого переключателя — каждый язык назван на себе же. */
export const LOCALE_LABELS: Record<Locale, string> = {
  ru: "РУС",
  en: "ENG",
  zh: "中文",
};

/** Значение для атрибута lang у <html>. */
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
