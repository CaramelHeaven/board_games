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

/*
 * Prefixes shared by most scoring labels in each language — "VP from cattle",
 * "ПО городов". The letter taken from them would be the same on every row and
 * therefore useless, so the token strips them before picking one. Chinese
 * labels carry no such prefix, hence a pattern that never matches.
 */
export const SCORE_LABEL_PREFIX: Record<Locale, RegExp> = {
  ru: /^ПО\s+/i,
  en: /^VP(\s+from)?\s+/i,
  zh: /(?!)/,
};

export function isLocale(value: unknown): value is Locale {
  return (
    typeof value === "string" && (LOCALES as readonly string[]).includes(value)
  );
}
