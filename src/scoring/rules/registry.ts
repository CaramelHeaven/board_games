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

const rulesByGameId: Record<string, GameFieldRules> = {
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
  gameId: string,
  fieldId: string,
): FieldRule | undefined {
  return rulesByGameId[gameId]?.[fieldId];
}
