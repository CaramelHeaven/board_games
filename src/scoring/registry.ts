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
 */
const scoringByGameId: Record<GameId, GameScoringDefinition> = {
  gwt: gwtScoring,
  "gwt-argentina": gwtArgentinaScoring,
  "white-castle": whiteCastleScoring,
  tzolkin: tzolkinScoring,
  "castles-of-burgundy": castlesOfBurgundyScoring,
  wingspan: wingspanScoring,
  everdell: everdellScoring,
  "grand-austria-hotel": grandAustriaHotelScoring,
  teotihuacan: teotihuacanScoring,
};

/** Always resolves: the record is exhaustive over `GameId` by construction. */
export function getScoringDefinition(gameId: GameId): GameScoringDefinition {
  return scoringByGameId[gameId];
}
