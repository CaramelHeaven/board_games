export const LOCALES = ["ru", "en", "zh"] as const;

export type Locale = (typeof LOCALES)[number];

/** A content string in every supported language. */
export type Translated = Record<Locale, string>;

/**
 * The language of the prerendered markup, and the fallback when the reader's
 * browser asks for nothing we speak.
 */
export const DEFAULT_LOCALE: Locale = "en";

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

/**
 * Pick a supported locale from BCP 47 tags, most preferred first. Only the
 * primary subtag is examined, so "ru-BY" resolves to Russian and every zh-*
 * variant — including the Traditional zh-TW — resolves to the Simplified
 * Chinese that is the only Chinese the interface has.
 *
 * Returns null rather than DEFAULT_LOCALE: "nothing matched" and "English
 * matched" are different facts, and what to do about the first one is the
 * caller's decision.
 */
export function matchLocale(tags: readonly string[]): Locale | null {
  for (const tag of tags) {
    const primary = tag.toLowerCase().split("-")[0];
    const match = LOCALES.find((locale) => locale === primary);
    if (match) {
      return match;
    }
  }
  return null;
}
