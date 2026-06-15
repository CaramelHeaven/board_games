import { createSumField } from "../fields";
import type { GameScoringDefinition } from "../types";

const wingspanFields = [
  createSumField("birds", "ПО за карты птиц"),
  createSumField("bonuses", "ПО за карты бонусов"),
  createSumField("roundGoals", "ПО за цели раундов"),
  createSumField(
    "eggs",
    "Остаток яиц",
    "1 ПО за каждое яйцо на картах",
  ),
  createSumField(
    "food",
    "Остаток корма на картах",
    "1 ПО за каждый жетон корма",
  ),
  createSumField(
    "tucked",
    "Остаток подложенных карт",
    "1 ПО за каждую подложенную карту",
  ),
];

export const wingspanScoring: GameScoringDefinition = {
  id: "wingspan",
  minPlayers: 1,
  maxPlayers: 5,
  fields: wingspanFields,
};

export const wingspanAsiaScoring: GameScoringDefinition = {
  id: "wingspan-asia",
  minPlayers: 1,
  maxPlayers: 5,
  fields: wingspanFields,
};
