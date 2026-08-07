import { castlesOfBurgundyScoring } from "./games/castles-of-burgundy";
import { everdellScoring } from "./games/everdell";
import { grandAustriaHotelScoring } from "./games/grand-austria-hotel";
import { gwtArgentinaScoring } from "./games/gwt-argentina";
import { gwtScoring } from "./games/gwt";
import { teotihuacanScoring } from "./games/teotihuacan";
import { tzolkinScoring } from "./games/tzolkin";
import { whiteCastleScoring } from "./games/white-castle";
import { wingspanScoring } from "./games/wingspan";
import type { GameScoringDefinition } from "./types";

const scoringByGameId: Record<string, GameScoringDefinition> = {
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

export function getScoringDefinition(
  gameId: string,
): GameScoringDefinition | undefined {
  return scoringByGameId[gameId];
}
