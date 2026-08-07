import { describe, expect, it } from "vitest";
import { games, type GameId } from "@/data/games";
import { LOCALES } from "@/i18n/types";
import { getScoringDefinition } from "./registry";
import { getFieldRule } from "./rules/registry";
import type { ScoreFieldDefinition } from "./types";

/*
 * Invariants that hold across every game at once, and that types cannot state:
 * translations being present and non-empty, ids being unique, ranges being
 * sane. What the compiler now guarantees on its own — a definition's id
 * matching its registry key, a rules key matching a field, a cross-field
 * reference resolving — is deliberately not retested here.
 *
 * A failure here is a data mistake, not a logic one: read the message, it names
 * the game and the id.
 */

/** Base fields plus the fields of every expansion, in declaration order. */
function allFields(gameId: GameId) {
  const definition = getScoringDefinition(gameId);
  const fields: ScoreFieldDefinition[] = [...definition.fields];
  for (const expansion of definition.expansions ?? []) {
    fields.push(...expansion.fields);
  }
  return fields;
}

describe.each(games.map((game) => [game.id, game.name.en] as const))(
  "%s (%s)",
  (gameId) => {
    const definition = getScoringDefinition(gameId);
    const fields = allFields(gameId);

    it("has at least one scoring field", () => {
      expect(fields.length).toBeGreaterThan(0);
    });

    it("has unique field ids across the base game and every expansion", () => {
      // A collision would silently merge two rows into one input value.
      const seen = new Map<string, number>();
      for (const field of fields) {
        seen.set(field.id, (seen.get(field.id) ?? 0) + 1);
      }
      const duplicates = [...seen.entries()]
        .filter(([, count]) => count > 1)
        .map(([id]) => id);
      expect(duplicates).toEqual([]);
    });

    it("has a sane player range", () => {
      expect(definition.minPlayers).toBeGreaterThan(0);
      expect(definition.maxPlayers).toBeGreaterThanOrEqual(
        definition.minPlayers,
      );
    });

    it("labels every field in every locale", () => {
      for (const field of fields) {
        for (const locale of LOCALES) {
          expect(
            field.label[locale]?.trim(),
            `${gameId} / ${field.id} / ${locale}`,
          ).toBeTruthy();
        }
      }
    });

    it("names every expansion in every locale and gives it an accent", () => {
      for (const expansion of definition.expansions ?? []) {
        for (const locale of LOCALES) {
          expect(
            expansion.name[locale]?.trim(),
            `${gameId} / ${expansion.id} / ${locale}`,
          ).toBeTruthy();
        }
        expect(expansion.accent).toMatch(/^#[0-9a-f]{6}$/i);
      }
    });

    it("has unique expansion ids", () => {
      const ids = (definition.expansions ?? []).map((e) => e.id);
      expect(ids).toEqual([...new Set(ids)]);
    });

    it("translates every rule it does have into every locale", () => {
      for (const field of fields) {
        const rule = getFieldRule(gameId, field.id);
        if (!rule) {
          continue;
        }
        for (const locale of LOCALES) {
          expect(
            rule.text[locale]?.trim(),
            `${gameId} / ${field.id} / ${locale}`,
          ).toBeTruthy();
        }
      }
    });
  },
);

describe("catalogue", () => {
  it("has unique game ids", () => {
    const ids = games.map((game) => game.id);
    expect(ids).toEqual([...new Set(ids)]);
  });

  it("names every game in every locale", () => {
    for (const game of games) {
      for (const locale of LOCALES) {
        expect(
          game.name[locale]?.trim(),
          `${game.id} / ${locale}`,
        ).toBeTruthy();
      }
    }
  });
});
