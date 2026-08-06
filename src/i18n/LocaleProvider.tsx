"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import {
  DEFAULT_LOCALE,
  isLocale,
  LOCALE_HTML_LANG,
  type Locale,
  type Translated,
} from "./types";
import { format, ui, type UiKey } from "./ui";

const STORAGE_KEY = "board-games:locale";

/**
 * Выбранный язык — внешнее состояние (localStorage), поэтому читается через
 * useSyncExternalStore: серверный снимок всегда язык по умолчанию, клиентский —
 * сохранённый. Так React сам разводит гидрацию, без setState в эффекте.
 */
const listeners = new Set<() => void>();
let cached: Locale | null = null;

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

function getSnapshot(): Locale {
  if (cached === null) {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    cached = isLocale(stored) ? stored : DEFAULT_LOCALE;
  }
  return cached;
}

function getServerSnapshot(): Locale {
  return DEFAULT_LOCALE;
}

function storeLocale(next: Locale): void {
  cached = next;
  window.localStorage.setItem(STORAGE_KEY, next);
  listeners.forEach((listener) => listener());
}

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** Значение многоязычной строки контента на текущем языке. */
  t: (value: Translated) => string;
  /** Строка обвязки по ключу, с подстановкой {плейсхолдеров}. */
  ut: (key: UiKey, values?: Record<string, string | number>) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    document.documentElement.lang = LOCALE_HTML_LANG[locale];
    document.title = ui.siteTitle[locale];
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    storeLocale(next);
  }, []);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      t: (translated) => translated[locale],
      ut: (key, values) =>
        values ? format(ui[key][locale], values) : ui[key][locale],
    }),
    [locale, setLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale вызван вне LocaleProvider");
  }
  return context;
}
