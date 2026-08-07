import birdsArt from "@/assets/rules/wingspan/birds-art.webp";
import birdsIcon from "@/assets/rules/wingspan/birds.webp";
import bonusesIcon from "@/assets/rules/wingspan/bonuses.webp";
import eggsArt from "@/assets/rules/wingspan/eggs-art.webp";
import eggsIcon from "@/assets/rules/wingspan/eggs.webp";
import foodArt from "@/assets/rules/wingspan/food-art.webp";
import foodIcon from "@/assets/rules/wingspan/food.webp";
import roundGoalsArt from "@/assets/rules/wingspan/round-goals-art.webp";
import roundGoalsIcon from "@/assets/rules/wingspan/round-goals.webp";
import tuckedArt from "@/assets/rules/wingspan/tucked-art.webp";
import tuckedIcon from "@/assets/rules/wingspan/tucked.webp";
import type { GameFieldRules } from "./types";

/**
 * Source: official Wingspan rules by Stonemaier Games
 * (English edition, p. 5, 'Game End and Scoring' section).
 * The English texts are verbatim, ru and zh are translated from English.
 *
 * All six scoring fields are entries of that section, none are left out.
 */
export const wingspanFieldRules: GameFieldRules = {
  birds: {
    icon: birdsIcon,
    art: [birdsArt],
    text: {
      ru: "Очки за каждую карту птицы (напечатаны на картах).",
      en: "Points for each bird card (printed on the cards).",
      zh: "每张鸟类卡的分数（印在卡牌上）。",
    },
  },
  bonuses: {
    icon: bonusesIcon,
    text: {
      ru: "Очки за каждую карту бонуса (напечатаны на картах).",
      en: "Points for each bonus card (printed on the cards).",
      zh: "每张奖励卡的分数（印在卡牌上）。",
    },
  },
  roundGoals: {
    icon: roundGoalsIcon,
    art: [roundGoalsArt],
    text: {
      ru: "Очки за цели раундов (показаны на планшете целей).",
      en: "Points for end-of-round goals (shown on goal board).",
      zh: "回合结束目标的分数（显示在目标板上）。",
    },
  },
  eggs: {
    icon: eggsIcon,
    art: [eggsArt],
    text: {
      ru: "1 очко за каждое яйцо на карте птицы.",
      en: "1 point for each egg on a bird card.",
      zh: "鸟类卡上的每颗鸟蛋得 1 分。",
    },
  },
  food: {
    icon: foodIcon,
    art: [foodArt],
    text: {
      ru: "1 очко за каждый жетон корма, отложенный на карте птицы.",
      en: "1 point for each food token cached on a bird card.",
      zh: "储存在鸟类卡上的每个食物标记得 1 分。",
    },
  },
  tucked: {
    icon: tuckedIcon,
    art: [tuckedArt],
    text: {
      ru: "1 очко за каждую карту, подложенную под карту птицы.",
      en: "1 point for each card tucked under a bird card.",
      zh: "垫在鸟类卡下的每张卡牌得 1 分。",
    },
  },
};
