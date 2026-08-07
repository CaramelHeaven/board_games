import { describe, expect, it } from "vitest";
import { games } from "@/data/games";
import { LOCALES } from "@/i18n/types";
import { getScoringDefinition } from "./registry";
import { getFieldRule, rulesByGameId } from "./rules/registry";
import type { ScoreFieldDefinition } from "./types";

/*
 * Invariants that hold across every game at once. They exist because the data
 * is spread over three places — the catalogue, the scoring definition and the
 * rules — and nothing in the type system ties a field id to a rules key.
 *
 * A failure here is a data mistake, not a logic one: read the message, it names
 * the game and the id.
 */

/** Base fields plus the fields of every expansion, in declaration order. */
function allFields(gameId: (typeof games)[number]["id"]) {
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

    it("has a scoring definition whose id matches the catalogue", () => {
      expect(definition.id).toBe(gameId);
    });

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

    it("has no rule whose key does not match a field", () => {
      // The reverse is allowed on purpose: a field may ship without dressed
      // rules and fall back to its letter (see CLAUDE.md).
      const fieldIds = new Set(fields.map((field) => field.id));
      const orphans = Object.keys(rulesByGameId[gameId] ?? {}).filter(
        (key) => !fieldIds.has(key),
      );
      expect(orphans).toEqual([]);
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

  it("has no rules registered for a game that does not exist", () => {
    const known = new Set<string>(games.map((game) => game.id));
    expect(Object.keys(rulesByGameId).filter((id) => !known.has(id))).toEqual(
      [],
    );
  });
});
