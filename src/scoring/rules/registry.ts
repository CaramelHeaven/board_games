import type { GameId } from "@/data/games";
import { castlesOfBurgundyFieldRules } from "./castles-of-burgundy";
import { everdellFieldRules } from "./everdell";
import { grandAustriaHotelFieldRules } from "./grand-austria-hotel";
import { gwtFieldRules } from "./gwt";
import { gwtArgentinaFieldRules } from "./gwt-argentina";
import { teotihuacanFieldRules } from "./teotihuacan";
import { tzolkinFieldRules } from "./tzolkin";
import type { FieldRule, GameFieldRules } from "./types";
import { whiteCastleFieldRules } from "./white-castle";
import { wingspanFieldRules } from "./wingspan";

/*
 * `Partial` on purpose: a game is allowed to ship without dressed rules — the
 * token then falls back to its letter and the field's own hint. Requiring
 * every game to be present here would be a lie about the process.
 */
export const rulesByGameId: Partial<Record<GameId, GameFieldRules>> = {
  gwt: gwtFieldRules,
  "gwt-argentina": gwtArgentinaFieldRules,
  tzolkin: tzolkinFieldRules,
  "castles-of-burgundy": castlesOfBurgundyFieldRules,
  "white-castle": whiteCastleFieldRules,
  wingspan: wingspanFieldRules,
  "grand-austria-hotel": grandAustriaHotelFieldRules,
  everdell: everdellFieldRules,
  teotihuacan: teotihuacanFieldRules,
};

export function getFieldRule(
  gameId: GameId,
  fieldId: string,
): FieldRule | undefined {
  return rulesByGameId[gameId]?.[fieldId];
}
