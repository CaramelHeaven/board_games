import { castlesOfBurgundyScoring } from "./games/castles-of-burgundy";
import { everdellScoring } from "./games/everdell";
import { grandAustriaHotelScoring } from "./games/grand-austria-hotel";
import { gwtArgentinaScoring } from "./games/gwt-argentina";
import { gwtScoring } from "./games/gwt";
import { teotihuacanScoring } from "./games/teotihuacan";
import { tzolkinScoring } from "./games/tzolkin";
import { whiteCastleScoring } from "./games/white-castle";
import { wingspanScoring } from "./games/wingspan";
import type { GameId } from "@/data/games";
import type { GameScoringDefinition } from "./types";

/*
 * Keyed by `GameId`, so a game added to the catalogue without a scoring
 * definition fails to compile. The import is type-only and erased at build
 * time — `scoring/` gains no runtime dependency on `data/`.
 *
 * The key is tied to the definition's own id by `GameScoringDefinition<K>`:
 * writing `gwt: gwtArgentinaScoring` no longer compiles. `satisfies` rather
 * than an annotation, so the literal field ids survive for `FieldIdOf`.
 */
const scoringByGameId = {
  "gwt": gwtScoring,
  "gwt-argentina": gwtArgentinaScoring,
  "white-castle": whiteCastleScoring,
  "tzolkin": tzolkinScoring,
  "castles-of-burgundy": castlesOfBurgundyScoring,
  "wingspan": wingspanScoring,
  "everdell": everdellScoring,
  "grand-austria-hotel": grandAustriaHotelScoring,
  "teotihuacan": teotihuacanScoring,
} as const satisfies { [K in GameId]: GameScoringDefinition<K> };

type ScoringOf<G extends GameId> = (typeof scoringByGameId)[G];

/** Every field id of a game: its own rows plus the rows of its expansions. */
export type FieldIdOf<G extends GameId> =
  | ScoringOf<G>["fields"][number]["id"]
  | (ScoringOf<G> extends { expansions: infer E }
      ? E extends readonly { fields: readonly { id: infer I }[] }[]
        ? I
        : never
      : never);

/*
 * Cross-field references (`createScaledByCountsField`) are plain ids, and a
 * typo in one would silently zero the multiplier rather than fail. The
 * assertion below resolves every referenced id against the game's own fields:
 * a game referencing something it does not have yields `false` and breaks the
 * build right here, with the game named in the error.
 */
type RefsOf<G extends GameId> = Extract<
  ScoringOf<G>["fields"][number],
  { countFieldIds: readonly string[] }
>["countFieldIds"][number];

type AssertEveryRefResolves<T extends { [K in GameId]: true }> = T;

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- checked by tsc, never read
type _CrossFieldRefsResolve = AssertEveryRefResolves<{
  [K in GameId]: [RefsOf<K>] extends [FieldIdOf<K>] ? true : false;
}>;

/*
 * Deliberately widened to `GameScoringDefinition`: callers want one stable
 * shape with an optional `expansions`, not a per-game tuple. The exact types
 * stay inside this module, where `FieldIdOf` reads the literals off them.
 */
export function getScoringDefinition(gameId: GameId): GameScoringDefinition {
  return scoringByGameId[gameId];
}
