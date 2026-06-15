import { createFloorDivField, createSumField } from "../fields";
import type { GameScoringDefinition } from "../types";

export const castlesOfBurgundyScoring: GameScoringDefinition = {
  id: "castles-of-burgundy",
  minPlayers: 2,
  maxPlayers: 4,
  fields: [
    createSumField(
      "track",
      "ПО на счётчике",
      "Очки, полученные за партию",
    ),
    createSumField("goods", "Непроданные товары", "1 ПО за каждый товар"),
    createSumField("silver", "Серебро", "1 ПО за каждую монету"),
    createFloorDivField("workers", "Рабочие", 2, "1 ПО за каждые 2 рабочих"),
    createSumField(
      "yellowTiles",
      "Жёлтые плитки",
      "ПО по условиям плиток в вашем герцогстве",
    ),
  ],
};
