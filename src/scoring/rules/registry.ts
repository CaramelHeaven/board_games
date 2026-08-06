import { gwtFieldRules } from "./gwt";
import type { FieldRule, GameFieldRules } from "./types";

const rulesByGameId: Record<string, GameFieldRules> = {
  gwt: gwtFieldRules,
};

export function getFieldRule(
  gameId: string,
  fieldId: string,
): FieldRule | undefined {
  return rulesByGameId[gameId]?.[fieldId];
}
