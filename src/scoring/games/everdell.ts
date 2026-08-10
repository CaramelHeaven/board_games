import { createMultiplyField, createSumField } from "../fields";
import type { ExpansionDefinition, GameScoringDefinition } from "../types";

/*
 * Expansions. The rows are only those categories the expansion booklet itself
 * assigns to the final scoring. Cards that end up in the city are not listed
 * here: their value is already counted by the base row 'Base points for cards'.
 *
 * Each accent colour comes from its own world, muted to suit felt and paper.
 * Green does not work for Newleaf (it blends into the felt), brass does not
 * either (it fights the total coin), so the depot's copper tone was taken.
 */

/** Source: Everdell: Pearlbrook (EN), 'Adornments', 'Wonders', 'Pearls' sections. */
const pearlbrook = {
  id: "pearlbrook",
  name: { ru: "Pearlbrook", en: "Pearlbrook", zh: "珍珠溪" },
  accent: "#2f6d7a",
  fields: [
    createSumField("pearlbrookWonders", {
      ru: "ПО чудес",
      en: "Wonder points",
      zh: "奇迹得分",
    }),
    createSumField("pearlbrookAdornments", {
      ru: "ПО украшений",
      en: "Adornment points",
      zh: "饰品得分",
    }),
    createMultiplyField(
      "pearlbrookPearls",
      { ru: "Остаток жемчуга", en: "Leftover pearls", zh: "剩余珍珠" },
      2,
    ),
  ],
} as const satisfies ExpansionDefinition;

/** Source: Everdell: Spirecrest (EN), 'Expedition' and 'Types of Discovery Cards'. */
const spirecrest = {
  id: "spirecrest",
  name: { ru: "Spirecrest", en: "Spirecrest", zh: "螺旋峰" },
  accent: "#64528c",
  fields: [
    createSumField("spirecrestExpedition", {
      ru: "ПО экспедиции",
      en: "Expedition points",
      zh: "远征得分",
    }),
    createSumField("spirecrestDiscoveries", {
      ru: "ПО карт открытий",
      en: "Discovery card points",
      zh: "发现卡得分",
    }),
  ],
} as const satisfies ExpansionDefinition;

/** Source: Everdell: Newleaf (EN), 'Visitors' section. */
const newleaf = {
  id: "newleaf",
  name: { ru: "Newleaf", en: "Newleaf", zh: "新叶城" },
  accent: "#9c5b3c",
  fields: [
    createSumField("newleafVisitors", {
      ru: "ПО гостей",
      en: "Visitor points",
      zh: "访客得分",
    }),
  ],
} as const satisfies ExpansionDefinition;

export const everdellScoring = {
  id: "everdell",
  minPlayers: 1,
  maxPlayers: 4,
  fields: [
    createSumField("cards", {
      ru: "Базовые ПО карт",
      en: "Base points for cards",
      zh: "卡的基础分",
    }),
    createSumField("pointTokens", {
      ru: "Жетоны очков",
      en: "Point tokens",
      zh: "分数标记",
    }),
    createSumField("prosperity", {
      ru: "Бонусы карт процветания",
      en: "Prosperity card bonus points",
      zh: "繁荣卡额外分",
    }),
    createSumField("journey", {
      ru: "ПО путешествия",
      en: "Journey points",
      zh: "旅程得分",
    }),
    createSumField("events", {
      ru: "ПО событий",
      en: "Events",
      zh: "事件得分",
    }),
  ],
  expansions: [pearlbrook, spirecrest, newleaf],
} as const satisfies GameScoringDefinition<"everdell">;
