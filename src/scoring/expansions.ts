/**
 * The composition of the game — which expansions are on the table. It is
 * external state (localStorage), so it is read through useSyncExternalStore,
 * just like the language in `src/i18n/LocaleProvider.tsx`: the server
 * snapshot is always empty, the client one is whatever was saved. That way
 * React sorts hydration out itself, without setState in an effect.
 *
 * What is stored is the composition itself, not "is the block open":
 * openness follows from the composition, the reverse does not.
 */

import type { GameId } from "@/data/games";
import type { ExpansionId } from "./types";

const STORAGE_PREFIX = "board-games:expansions:";

/** The same object for all games: the snapshot must be referentially stable. */
const EMPTY: readonly string[] = Object.freeze([]);

const listeners = new Set<() => void>();

/**
 * The cache is mandatory, not there for speed: useSyncExternalStore compares
 * snapshots by reference and will go into an endless re-render if every call
 * returns a new array.
 */
const cache = new Map<string, readonly string[]>();

function warnInDev(message: string, error: unknown): void {
  if (process.env.NODE_ENV !== "production") {
    console.warn(`[expansions] ${message}`, error);
  }
}

function storageKey(gameId: GameId): string {
  return `${STORAGE_PREFIX}${gameId}`;
}

function read(gameId: GameId): readonly string[] {
  try {
    const raw = window.localStorage.getItem(storageKey(gameId));
    if (!raw) {
      return EMPTY;
    }

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return EMPTY;
    }

    const ids = parsed.filter(
      (item): item is string => typeof item === "string",
    );
    return ids.length ? Object.freeze(ids) : EMPTY;
  } catch (error) {
    // Private mode, blocked or broken storage — we play the base game.
    // Silent in production, loud in development: a swallowed exception here
    // looks exactly like "the setup was never saved".
    warnInDev("could not read the saved setup", error);
    return EMPTY;
  }
}

export function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

export function getSnapshot(gameId: GameId): readonly string[] {
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

export function toggleExpansion(
  gameId: GameId,
  expansionId: ExpansionId,
): void {
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
  } catch (error) {
    // Not saved — the choice still applies until the page is reloaded.
    warnInDev("could not persist the setup", error);
  }

  listeners.forEach((listener) => listener());
}
