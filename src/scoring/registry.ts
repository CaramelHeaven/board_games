import { castlesOfBurgundyScoring } from "./games/castles-of-burgundy";
import { grandAustriaHotelScoring } from "./games/grand-austria-hotel";
import { gwtArgentinaScoring } from "./games/gwt-argentina";
import { gwtScoring } from "./games/gwt";
import { tzolkinScoring } from "./games/tzolkin";
import { whiteCastleScoring } from "./games/white-castle";
import {
  wingspanAsiaScoring,
  wingspanScoring,
} from "./games/wingspan";
import type { GameScoringDefinition } from "./types";

const scoringByGameId: Record<string, GameScoringDefinition> = {
  gwt: gwtScoring,
  "gwt-argentina": gwtArgentinaScoring,
  "white-castle": whiteCastleScoring,
  tzolkin: tzolkinScoring,
  "castles-of-burgundy": castlesOfBurgundyScoring,
  wingspan: wingspanScoring,
  "wingspan-asia": wingspanAsiaScoring,
  "grand-austria-hotel": grandAustriaHotelScoring,
};

export function getScoringDefinition(
  gameId: string,
): GameScoringDefinition | undefined {
  return scoringByGameId[gameId];
}
