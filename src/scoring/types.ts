import type { GameId } from "@/data/games";
import type { Translated } from "@/i18n/types";

export type FieldInputKind = "number" | "checkbox";

/*
 * The `Id` parameter is what keeps the field ids from decaying into bare
 * strings: the factories in `fields.ts` capture the literal, the game files
 * preserve it with `satisfies`, and `FieldIdOf` in `registry.ts` reads it back
 * out. That is why a rules key or a cross-field reference can be checked by
 * the compiler instead of by a test.
 */
export type ScoreFieldDefinition<Id extends string = string> = {
  id: Id;
  label: Translated;
  hint?: Translated;
  kind: FieldInputKind;
  score: (
    raw: string | boolean,
    values?: Record<string, string | boolean>,
  ) => number;
};

/*
 * Every expansion id in the project, spelled out. It cannot be inferred from
 * the registry the way `GameId` is inferred from the catalogue: the registry
 * is typed through `GameScoringDefinition`, which would then reference a type
 * derived from itself. `_ExpansionIdUnionIsExact` in `registry.ts` fails the
 * build if this list ever drifts from the declarations, so writing it out
 * costs nothing in safety.
 */
export type ExpansionId = "pearlbrook" | "spirecrest" | "newleaf";

/**
 * A game expansion: its own scoring rows and its own color.
 * The color comes from the world of the expansion itself, muted to suit
 * the felt and the paper of the sheet.
 */
export type ExpansionDefinition<
  Id extends string = string,
  FieldId extends string = string,
> = {
  id: Id;
  name: Translated;
  /** Accent: the chip on the felt and the highlight of added rows on paper. */
  accent: string;
  fields: readonly ScoreFieldDefinition<FieldId>[];
};

/*
 * The arrays are `readonly` so that a game file can declare itself with
 * `as const satisfies` — a mutable array would reject the frozen literal.
 */
export type GameScoringDefinition<
  Id extends GameId = GameId,
  FieldId extends string = string,
> = {
  id: Id;
  minPlayers: number;
  maxPlayers: number;
  fields: readonly ScoreFieldDefinition<FieldId>[];
  expansions?: readonly ExpansionDefinition<ExpansionId, FieldId>[];
};

export type PlayerScores = Record<string, string | boolean>;

export type PlayerScoreState = PlayerScores[];
