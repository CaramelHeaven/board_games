import birdsArt from "@/assets/rules/wingspan/birds-art.webp";
import birdsIcon from "@/assets/rules/wingspan/birds.webp";
import bonusesIcon from "@/assets/rules/wingspan/bonuses.webp";
import eggsArt from "@/assets/rules/wingspan/eggs-art.webp";
import eggsIcon from "@/assets/rules/wingspan/eggs.webp";
import foodArt from "@/assets/rules/wingspan/food-art.webp";
import foodIcon from "@/assets/rules/wingspan/food.webp";
import nectarArt from "@/assets/rules/wingspan/oceania-nectar-art.webp";
import nectarIcon from "@/assets/rules/wingspan/oceania-nectar.webp";
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
export const wingspanFieldRules: GameFieldRules<"wingspan"> = {
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

  /*
   * Oceania. Source: Wingspan: Oceania Expansion (EN), 'Nectar', p. 3. The
   * booklet states the rule once for all habitats ("the "spent nectar" space of
   * each habitat"); each row below names its own habitat and otherwise keeps
   * the wording, including the qualifying condition and the tie rule.
   *
   * The Automa's nectar is not modelled: in a solo game the sheet has nobody to
   * compare against, so a lone player takes the 5 points in every habitat.
   */
  oceaniaNectarForest: {
    icon: nectarIcon,
    art: [nectarArt],
    text: {
      ru: "В конце игры сравните, у кого больше жетонов нектара на поле «потраченный нектар» в лесу. Больше всех — 5 очков, второе место — 2 очка. Чтобы претендовать на очки, нужен хотя бы 1 жетон нектара в этой среде обитания. При ничьей сложите очки за занятые места и разделите поровну, округляя вниз.",
      en: "At game end, count who has the most nectar tokens in the “spent nectar” space of the forest. The player with the most nectar receives 5 points, and the player with the second-most nectar receives 2 points. You must have at least 1 nectar token in a habitat to qualify for the nectar points for that habitat. If two or more players are tied, add the points and divide them evenly, rounded down.",
      zh: "游戏结束时，比较谁在森林的「已花费花蜜」区域上的花蜜标记最多。最多者得 5 分，次多者得 2 分。该栖息地至少要有 1 个花蜜标记才有资格得分。若两名或更多玩家并列，将所占名次的分数相加后平分，向下取整。",
    },
  },
  oceaniaNectarGrassland: {
    icon: nectarIcon,
    art: [nectarArt],
    text: {
      ru: "В конце игры сравните, у кого больше жетонов нектара на поле «потраченный нектар» на лугу. Больше всех — 5 очков, второе место — 2 очка. Чтобы претендовать на очки, нужен хотя бы 1 жетон нектара в этой среде обитания. При ничьей сложите очки за занятые места и разделите поровну, округляя вниз.",
      en: "At game end, count who has the most nectar tokens in the “spent nectar” space of the grassland. The player with the most nectar receives 5 points, and the player with the second-most nectar receives 2 points. You must have at least 1 nectar token in a habitat to qualify for the nectar points for that habitat. If two or more players are tied, add the points and divide them evenly, rounded down.",
      zh: "游戏结束时，比较谁在草原的「已花费花蜜」区域上的花蜜标记最多。最多者得 5 分，次多者得 2 分。该栖息地至少要有 1 个花蜜标记才有资格得分。若两名或更多玩家并列，将所占名次的分数相加后平分，向下取整。",
    },
  },
  oceaniaNectarWetland: {
    icon: nectarIcon,
    art: [nectarArt],
    text: {
      ru: "В конце игры сравните, у кого больше жетонов нектара на поле «потраченный нектар» в водоёме. Больше всех — 5 очков, второе место — 2 очка. Чтобы претендовать на очки, нужен хотя бы 1 жетон нектара в этой среде обитания. При ничьей сложите очки за занятые места и разделите поровну, округляя вниз.",
      en: "At game end, count who has the most nectar tokens in the “spent nectar” space of the wetland. The player with the most nectar receives 5 points, and the player with the second-most nectar receives 2 points. You must have at least 1 nectar token in a habitat to qualify for the nectar points for that habitat. If two or more players are tied, add the points and divide them evenly, rounded down.",
      zh: "游戏结束时，比较谁在湿地的「已花费花蜜」区域上的花蜜标记最多。最多者得 5 分，次多者得 2 分。该栖息地至少要有 1 个花蜜标记才有资格得分。若两名或更多玩家并列，将所占名次的分数相加后平分，向下取整。",
    },
  },
};
