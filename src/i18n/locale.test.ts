import { describe, expect, it } from "vitest";
import { DEFAULT_LOCALE, matchLocale } from "./types";

describe("matchLocale", () => {
  it("honours the order of preference", () => {
    expect(matchLocale(["ru-RU", "en-US"])).toBe("ru");
    expect(matchLocale(["en-US", "ru-RU"])).toBe("en");
  });

  it("skips unsupported languages instead of giving up on them", () => {
    expect(matchLocale(["de-DE", "fr-FR", "en"])).toBe("en");
  });

  it("ignores the region and the script", () => {
    expect(matchLocale(["ru-BY"])).toBe("ru");
    expect(matchLocale(["EN-GB"])).toBe("en");
  });

  it("resolves every Chinese variant to the Simplified one we have", () => {
    expect(matchLocale(["zh-CN"])).toBe("zh");
    expect(matchLocale(["zh-TW"])).toBe("zh");
    expect(matchLocale(["zh-Hant-HK"])).toBe("zh");
  });

  it("returns null when nothing matches, leaving the fallback to the caller", () => {
    expect(matchLocale(["de", "fr"])).toBeNull();
    expect(matchLocale([])).toBeNull();
  });
});

describe("DEFAULT_LOCALE", () => {
  it("is English: it is both the prerendered language and the fallback", () => {
    expect(DEFAULT_LOCALE).toBe("en");
  });
});
