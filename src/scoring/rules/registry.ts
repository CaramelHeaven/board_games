import { castlesOfBurgundyFieldRules } from "./castles-of-burgundy";
import { everdellFieldRules } from "./everdell";
import { grandAustriaHotelFieldRules } from "./grand-austria-hotel";
import { gwtArgentinaFieldRules } from "./gwt-argentina";
import { gwtFieldRules } from "./gwt";
import { teotihuacanFieldRules } from "./teotihuacan";
import { tzolkinFieldRules } from "./tzolkin";
import { whiteCastleFieldRules } from "./white-castle";
import { wingspanFieldRules } from "./wingspan";
import type { GameId } from "@/data/games";
import type { FieldRule, GameFieldRules } from "./types";

/*
 * `Partial` on purpose: a game is allowed to ship without dressed rules — the
 * token then falls back to its letter and the field's own hint. Requiring
 * every game to be present here would be a lie about the process.
 */
export const rulesByGameId: { [K in GameId]?: GameFieldRules<K> } = {
  "gwt": gwtFieldRules,
  "gwt-argentina": gwtArgentinaFieldRules,
  "white-castle": whiteCastleFieldRules,
  "tzolkin": tzolkinFieldRules,
  "castles-of-burgundy": castlesOfBurgundyFieldRules,
  "wingspan": wingspanFieldRules,
  "everdell": everdellFieldRules,
  "grand-austria-hotel": grandAustriaHotelFieldRules,
  "teotihuacan": teotihuacanFieldRules,
};

/*
 * A runtime lookup, so `fieldId` stays a plain string: the UI iterates over
 * fields of a game it only knows as `GameId`, where no exact id type exists.
 * The guarantee lives where the rules are declared — `GameFieldRules<K>`
 * above rejects a key that matches no field of that game.
 */
export function getFieldRule(
  gameId: GameId,
  fieldId: string,
): FieldRule | undefined {
  return (rulesByGameId[gameId] as Record<string, FieldRule> | undefined)?.[
    fieldId
  ];
}
