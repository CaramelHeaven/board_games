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
  matchLocale,
  type Locale,
  type Translated,
} from "./types";
import { format, ui, type UiKey } from "./ui";

const STORAGE_KEY = "board-games:locale";

/**
 * The chosen language is external state (localStorage), so it is read
 * through useSyncExternalStore: the server snapshot is always the default
 * language, the client one is whatever was saved. That way React sorts
 * hydration out itself, without setState in an effect.
 */
const listeners = new Set<() => void>();
let cached: Locale | null = null;

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

/**
 * What the browser asks for. Deliberately not written to localStorage: only an
 * explicit choice is stored, so a saved language always beats a guess and a
 * reader who changes their system language is followed rather than overruled.
 */
function detectLocale(): Locale {
  const tags = navigator.languages ?? [navigator.language];
  return matchLocale(tags) ?? DEFAULT_LOCALE;
}

function getSnapshot(): Locale {
  if (cached === null) {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    cached = isLocale(stored) ? stored : detectLocale();
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
  /** The value of a multilingual content string in the current language. */
  t: (value: Translated) => string;
  /** An interface-chrome string by key, with {placeholder} substitution. */
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

    /*
     * Known limitation, not introduced here: on the hydration pass Next
     * commits the <title> from the metadata export after this assignment, so
     * the tab keeps the prerendered language until the reader switches
     * language by hand. Every switch after that updates it correctly.
     */
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
    throw new Error("useLocale called outside LocaleProvider");
  }
  return context;
}
