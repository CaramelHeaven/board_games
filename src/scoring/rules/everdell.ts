import cardsArt from "@/assets/rules/everdell/cards-art.webp";
import cardsIcon from "@/assets/rules/everdell/cards.webp";
import eventsArt from "@/assets/rules/everdell/events-art.webp";
import eventsIcon from "@/assets/rules/everdell/events.webp";
import journeyArt from "@/assets/rules/everdell/journey-art.webp";
import journeyIcon from "@/assets/rules/everdell/journey.webp";
import newleafVisitorsArt from "@/assets/rules/everdell/newleaf-visitors-art.webp";
import newleafVisitorsIcon from "@/assets/rules/everdell/newleaf-visitors.webp";
import pearlbrookAdornmentsArt from "@/assets/rules/everdell/pearlbrook-adornments-art.webp";
import pearlbrookAdornmentsIcon from "@/assets/rules/everdell/pearlbrook-adornments.webp";
import pearlbrookPearlsArt from "@/assets/rules/everdell/pearlbrook-pearls-art.webp";
import pearlbrookPearlsIcon from "@/assets/rules/everdell/pearlbrook-pearls.webp";
import pearlbrookWondersArt from "@/assets/rules/everdell/pearlbrook-wonders-art.webp";
import pearlbrookWondersIcon from "@/assets/rules/everdell/pearlbrook-wonders.webp";
import pointTokensArt from "@/assets/rules/everdell/point-tokens-art.webp";
import pointTokensIcon from "@/assets/rules/everdell/point-tokens.webp";
import prosperityArt from "@/assets/rules/everdell/prosperity-art.webp";
import prosperityIcon from "@/assets/rules/everdell/prosperity.webp";
import type { GameFieldRules } from "./types";

/**
 * Source: official Everdell rules (EN), 'End Game' section
 * and 'Scoring Example' (printed pp. 13–14 / PDF pp. 14–15).
 * EN follows the booklet wording; RU/ZH are translated from English.
 */
export const everdellFieldRules: GameFieldRules<"everdell"> = {
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

  /* Pearlbrook: EN booklet, 'Adornments', 'Wonders', 'Pearls' sections. */
  pearlbrookWonders: {
    icon: pearlbrookWondersIcon,
    art: [pearlbrookWondersArt],
    text: {
      ru: "Построенные Чудеса стоят столько очков, сколько на них указано.",
      en: "Any Wonders you have built are worth their listed points at the end of the game.",
      zh: "你建造的每座奇迹，按其标示的分值计分。",
    },
  },
  pearlbrookAdornments: {
    icon: pearlbrookAdornmentsIcon,
    art: [pearlbrookAdornmentsArt],
    text: {
      ru: "Нижняя половина карты Украшения показывает, сколько очков она стоит в конце игры.",
      en: "The bottom half is how many points the Adornment is worth at the end of the game.",
      zh: "饰品卡下半部分标示的数字，即为它在游戏结束时的分值。",
    },
  },
  pearlbrookPearls: {
    icon: pearlbrookPearlsIcon,
    art: [pearlbrookPearlsArt],
    text: {
      ru: "Каждая оставшаяся у вас жемчужина стоит 2 очка. Впишите количество жемчужин.",
      en: "Any pearls you have remaining at the end of the game are worth 2 points each. Enter the number of pearls.",
      zh: "游戏结束时你剩余的每颗珍珠价值 2 分。请填写珍珠数量。",
    },
  },

  /* Spirecrest: EN booklet, 'Expedition' and 'Types of Discovery Cards'.
   * No icon/art: the English booklet's component rasters are ~75–84 ppi /
   * under 200 px — a letter beats an illegible upscale (CLAUDE.md). */
  spirecrestExpedition: {
    text: {
      ru: "Каждый исследованный жетон карты вашей Экспедиции приносит очки в конце игры — но только если вы оплатили указанную на нём стоимость перехода.",
      en: "Each map tile of your Expedition will grant you endgame points, but only if you pay the listed cost to travel there first.",
      zh: "远征路线上每块已探索的地图板块都会在游戏结束时给你分数，但前提是你先支付了它标示的旅行费用。",
    },
  },
  spirecrestDiscoveries: {
    text: {
      ru: "Тропы приносят свои очки, если вы выполнили их требования. Города приносят очки за типы карт, которых в вашем городе нет.",
      en: "Trails will challenge you to fulfill certain requirements in order to gain their endgame points. Cities will gain you endgame points based on card types that are not in your city.",
      zh: "小径卡需要你满足其要求才能得到分数。城市卡则根据你城市中所没有的卡牌类型给你分数。",
    },
  },

  /* Newleaf: EN booklet, 'Visitors' section. */
  newleafVisitors: {
    icon: newleafVisitorsIcon,
    art: [newleafVisitorsArt],
    text: {
      ru: "Карты Гостей приносят указанные на них очки, если в конце игры ваш город отвечает их требованиям.",
      en: "Visitor cards will score their listed point value if your city contains their requirements at the end of the game.",
      zh: "游戏结束时，若你的城市满足访客卡的要求，该卡按其标示的分值计分。",
    },
  },
};
