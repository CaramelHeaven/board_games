import { castlesOfBurgundyFieldRules } from "./castles-of-burgundy";
import { gwtFieldRules } from "./gwt";
import { tzolkinFieldRules } from "./tzolkin";
import type { FieldRule, GameFieldRules } from "./types";
import { whiteCastleFieldRules } from "./white-castle";
import { wingspanFieldRules } from "./wingspan";

const rulesByGameId: Record<string, GameFieldRules> = {
  gwt: gwtFieldRules,
  tzolkin: tzolkinFieldRules,
  "castles-of-burgundy": castlesOfBurgundyFieldRules,
  "white-castle": whiteCastleFieldRules,
  wingspan: wingspanFieldRules,
};

export function getFieldRule(
  gameId: string,
  fieldId: string,
): FieldRule | undefined {
  return rulesByGameId[gameId]?.[fieldId];
}
