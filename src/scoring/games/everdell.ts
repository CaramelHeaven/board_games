import { createSumField } from "../fields";
import type { GameScoringDefinition } from "../types";

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
};
