import { createSumField } from "../fields";
import type { GameScoringDefinition } from "../types";

const wingspanFields = [
  createSumField("birds", {
    ru: "ПО за карты птиц",
    en: "VP from bird cards",
    zh: "鸟类卡得分",
  }),
  createSumField("bonuses", {
    ru: "ПО за карты бонусов",
    en: "VP from bonus cards",
    zh: "奖励卡得分",
  }),
  createSumField("roundGoals", {
    ru: "ПО за цели раундов",
    en: "VP from end-of-round goals",
    zh: "回合目标得分",
  }),
  createSumField(
    "eggs",
    { ru: "Остаток яиц", en: "Eggs", zh: "剩余鸟蛋" },
    {
      ru: "1 ПО за каждое яйцо на картах",
      en: "1 VP per egg on your cards",
      zh: "卡牌上每颗鸟蛋得 1 分",
    },
  ),
  createSumField(
    "food",
    {
      ru: "Остаток корма на картах",
      en: "Food on cards",
      zh: "卡牌上剩余的食物",
    },
    {
      ru: "1 ПО за каждый жетон корма",
      en: "1 VP per food token",
      zh: "每个食物标记得 1 分",
    },
  ),
  createSumField(
    "tucked",
    { ru: "Остаток подложенных карт", en: "Tucked cards", zh: "垫入的卡牌" },
    {
      ru: "1 ПО за каждую подложенную карту",
      en: "1 VP per tucked card",
      zh: "每张垫入的卡牌得 1 分",
    },
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
