import cardsArt from "@/assets/rules/everdell/cards-art.webp";
import cardsIcon from "@/assets/rules/everdell/cards.webp";
import eventsArt from "@/assets/rules/everdell/events-art.webp";
import eventsIcon from "@/assets/rules/everdell/events.webp";
import journeyArt from "@/assets/rules/everdell/journey-art.webp";
import journeyIcon from "@/assets/rules/everdell/journey.webp";
import pointTokensArt from "@/assets/rules/everdell/point-tokens-art.webp";
import pointTokensIcon from "@/assets/rules/everdell/point-tokens.webp";
import prosperityArt from "@/assets/rules/everdell/prosperity-art.webp";
import prosperityIcon from "@/assets/rules/everdell/prosperity.webp";
import type { GameFieldRules } from "./types";

/**
 * Источник — официальные правила «Everdell» (EN), раздел «End Game»
 * и «Scoring Example» (печатная стр. 13–14 / PDF стр. 14–15).
 * EN — по формулировкам буклета; RU/ZH — перевод с английского.
 */
export const everdellFieldRules: GameFieldRules = {
  cards: {
    icon: cardsIcon,
    art: [cardsArt],
    text: {
      ru: "Базовая стоимость каждой карты в вашем городе.",
      en: "The base value of each card in your city.",
      zh: "你城市中每张卡牌的基础分。",
    },
  },
  pointTokens: {
    icon: pointTokensIcon,
    art: [pointTokensArt],
    text: {
      ru: "Жетоны очков.",
      en: "Point tokens.",
      zh: "分数标记。",
    },
  },
  prosperity: {
    icon: prosperityIcon,
    art: [prosperityArt],
    text: {
      ru: "Бонусы фиолетовых карт Prosperity.",
      en: "Purple Prosperity card bonuses.",
      zh: "紫色繁荣卡的额外奖励分。",
    },
  },
  journey: {
    icon: journeyIcon,
    art: [journeyArt],
    text: {
      ru: "Очки путешествия (Journey).",
      en: "Journey points.",
      zh: "旅程得分。",
    },
  },
  events: {
    icon: eventsIcon,
    art: [eventsArt],
    text: {
      ru: "События (Events).",
      en: "Events.",
      zh: "事件得分。",
    },
  },
};
