import {
  createFloorDivField,
  createMultiplyField,
  createSumField,
} from "../fields";
import type { GameScoringDefinition } from "../types";

export const castlesOfBurgundyScoring = {
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
    createMultiplyField(
      "goods",
      { ru: "Непроданные товары", en: "Unsold goods", zh: "未售出的货物" },
      1,
      {
        ru: "1 ПО за каждый товар",
        en: "1 VP per goods tile",
        zh: "每个货物得 1 分",
      },
    ),
    createMultiplyField(
      "silver",
      { ru: "Серебро", en: "Silver", zh: "银币" },
      1,
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
    createSumField(
      "vineyards",
      { ru: "Виноградники", en: "Vineyards", zh: "葡萄园" },
      {
        ru: "ПО за жетоны бонусов лозы",
        en: "VP from vine bonus tiles",
        zh: "藤蔓奖励板块得分",
      },
    ),
    createSumField(
      "shields",
      { ru: "Щиты", en: "Shields", zh: "盾牌" },
      {
        ru: "12, 8 или 4 ПО за каждый щит",
        en: "12, 8 or 4 VP per shield",
        zh: "每个盾牌 12、8 或 4 分",
      },
    ),
  ],
} as const satisfies GameScoringDefinition<"castles-of-burgundy">;
