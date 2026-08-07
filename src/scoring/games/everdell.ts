import { createMultiplyField, createSumField } from "../fields";
import type { ExpansionDefinition, GameScoringDefinition } from "../types";

/*
 * Дополнения. Строки — только те категории, которые буклет дополнения прямо
 * относит к финальному подсчёту. Карты, которые уходят в город, сюда не идут:
 * их номинал уже считает базовая строка «Базовые ПО карт».
 *
 * Цвет каждого — из его собственного мира, приглушён под сукно и бумагу.
 * Зелёный для Newleaf не годится (сливается с сукном), латунный тоже
 * (спорит с монетой итога), поэтому взят медный тон вокзала.
 */

/** Источник — Everdell: Pearlbrook (EN), разделы «Adornments», «Wonders», «Pearls». */
const pearlbrook: ExpansionDefinition = {
  id: "pearlbrook",
  name: { ru: "Pearlbrook", en: "Pearlbrook", zh: "Pearlbrook" },
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
};

/** Источник — Everdell: Spirecrest (EN), разделы «Expedition» и «Types of Discovery Cards». */
const spirecrest: ExpansionDefinition = {
  id: "spirecrest",
  name: { ru: "Spirecrest", en: "Spirecrest", zh: "Spirecrest" },
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
      zh: "发现牌得分",
    }),
  ],
};

/** Источник — Everdell: Newleaf (EN), раздел «Visitors». */
const newleaf: ExpansionDefinition = {
  id: "newleaf",
  name: { ru: "Newleaf", en: "Newleaf", zh: "Newleaf" },
  accent: "#9c5b3c",
  fields: [
    createSumField("newleafVisitors", {
      ru: "ПО гостей",
      en: "Visitor points",
      zh: "访客得分",
    }),
  ],
};

export const everdellScoring: GameScoringDefinition = {
  id: "everdell",
  minPlayers: 1,
  maxPlayers: 4,
  fields: [
    createSumField("cards", {
      ru: "Базовые ПО карт",
      en: "Base points for cards",
      zh: "卡牌基础分",
    }),
    createSumField("pointTokens", {
      ru: "Жетоны очков",
      en: "Point tokens",
      zh: "分数标记",
    }),
    createSumField("prosperity", {
      ru: "Бонусы Prosperity",
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
};
