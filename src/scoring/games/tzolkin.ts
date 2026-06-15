import { createFloorDivField, createMultiplyField, createSumField } from "../fields";
import type { GameScoringDefinition } from "../types";

export const tzolkinScoring: GameScoringDefinition = {
  id: "tzolkin",
  minPlayers: 2,
  maxPlayers: 4,
  fields: [
    createSumField(
      "track",
      "ПО на счётчике",
      "Очки, полученные за партию",
    ),
    createFloorDivField(
      "corn",
      "Кукуруза",
      4,
      "1 ПО за каждые 4 кукурузы после конвертации ресурсов",
    ),
    createMultiplyField("skulls", "Черепа", 3, "3 ПО за каждый череп"),
    createSumField("monuments", "Памятники", "ПО по правилам памятников"),
  ],
};
