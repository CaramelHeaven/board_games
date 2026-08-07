"use client";

/**
 * Состав партии — какие дополнения лежат на столе. Внешнее состояние
 * (localStorage), поэтому читается через useSyncExternalStore, как и язык
 * в `src/i18n/LocaleProvider.tsx`: серверный снимок всегда пустой, клиентский —
 * сохранённый. Так React сам разводит гидрацию, без setState в эффекте.
 *
 * Хранится именно состав, а не «раскрыт ли блок»: раскрытость из состава
 * следует, обратное — нет.
 */

const STORAGE_PREFIX = "board-games:expansions:";

/** Один и тот же объект на все игры: снимок обязан быть ссылочно стабильным. */
const EMPTY: readonly string[] = Object.freeze([]);

const listeners = new Set<() => void>();

/**
 * Кеш обязателен, а не для скорости: useSyncExternalStore сравнивает снимки
 * по ссылке и уйдёт в бесконечный ререндер, если каждый вызов вернёт новый
 * массив.
 */
const cache = new Map<string, readonly string[]>();

function storageKey(gameId: string): string {
  return `${STORAGE_PREFIX}${gameId}`;
}

function read(gameId: string): readonly string[] {
  try {
    const raw = window.localStorage.getItem(storageKey(gameId));
    if (!raw) {
      return EMPTY;
    }

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return EMPTY;
    }

    const ids = parsed.filter((item): item is string => typeof item === "string");
    return ids.length ? Object.freeze(ids) : EMPTY;
  } catch {
    // Приватный режим, заблокированное или битое хранилище — играем в базу.
    return EMPTY;
  }
}

export function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

export function getSnapshot(gameId: string): readonly string[] {
  const cached = cache.get(gameId);
  if (cached) {
    return cached;
  }

  const value = read(gameId);
  cache.set(gameId, value);
  return value;
}

export function getServerSnapshot(): readonly string[] {
  return EMPTY;
}

export function toggleExpansion(gameId: string, expansionId: string): void {
  const current = getSnapshot(gameId);
  const next = current.includes(expansionId)
    ? current.filter((id) => id !== expansionId)
    : [...current, expansionId];

  cache.set(gameId, Object.freeze(next));

  try {
    if (next.length) {
      window.localStorage.setItem(storageKey(gameId), JSON.stringify(next));
    } else {
      window.localStorage.removeItem(storageKey(gameId));
    }
  } catch {
    // Не сохранилось — выбор всё равно действует до перезагрузки.
  }

  listeners.forEach((listener) => listener());
}
