"use client";

import { useLocale } from "@/i18n/LocaleProvider";
import { LOCALE_LABELS, LOCALES } from "@/i18n/types";

export function LocaleSwitcher() {
  const { locale, setLocale, ut } = useLocale();

  return (
    <nav className="locale-plank" aria-label={ut("languageNav")}>
      {LOCALES.map((code) => {
        const active = code === locale;

        return (
          <button
            key={code}
            type="button"
            lang={code}
            className={`locale-chip${active ? " locale-chip-active" : ""}`}
            aria-current={active ? "true" : undefined}
            onClick={() => setLocale(code)}
          >
            {LOCALE_LABELS[code]}
          </button>
        );
      })}
    </nav>
  );
}
