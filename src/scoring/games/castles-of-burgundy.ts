import { createFloorDivField, createSumField } from "../fields";
import type { GameScoringDefinition } from "../types";

export const castlesOfBurgundyScoring: GameScoringDefinition = {
  id: "castles-of-burgundy",
  minPlayers: 2,
  maxPlayers: 4,
  fields: [
    createSumField(
      "track",
      { ru: "ПО на счётчике", en: "VP on the track", zh: "计分轨上的分数" },
      {
        ru: "Очки, полученные за партию",
        en: "Points scored during the game",
        zh: "游戏中累积的分数",
      },
    ),
    createSumField(
      "goods",
      { ru: "Непроданные товары", en: "Unsold goods", zh: "未售出的货物" },
      {
        ru: "1 ПО за каждый товар",
        en: "1 VP per goods tile",
        zh: "每个货物得 1 分",
      },
    ),
    createSumField(
      "silver",
      { ru: "Серебро", en: "Silver", zh: "银币" },
      {
        ru: "1 ПО за каждую монету",
        en: "1 VP per coin",
        zh: "每枚银币得 1 分",
      },
    ),
    createFloorDivField(
      "workers",
      { ru: "Рабочие", en: "Workers", zh: "工人" },
      2,
      {
        ru: "1 ПО за каждые 2 рабочих",
        en: "1 VP per 2 workers",
        zh: "每 2 名工人得 1 分",
      },
    ),
    createSumField(
      "yellowTiles",
      { ru: "Жёлтые плитки", en: "Yellow tiles", zh: "黄色板块" },
      {
        ru: "ПО по условиям плиток в вашем герцогстве",
        en: "VP from the tiles in your estate",
        zh: "按你领地内板块的条件计分",
      },
    ),
  ],
};
