import avenueArt from "@/assets/rules/teotihuacan/avenue-art.webp";
import avenueIcon from "@/assets/rules/teotihuacan/avenue.webp";
import masksArt from "@/assets/rules/teotihuacan/masks-art.webp";
import masksIcon from "@/assets/rules/teotihuacan/masks.webp";
import pyramidArt from "@/assets/rules/teotihuacan/pyramid-art.webp";
import pyramidIcon from "@/assets/rules/teotihuacan/pyramid.webp";
import templeBonusesArt from "@/assets/rules/teotihuacan/temple-bonuses-art.webp";
import templeBonusesArt2 from "@/assets/rules/teotihuacan/temple-bonuses-art2.webp";
import templeBonusesIcon from "@/assets/rules/teotihuacan/temple-bonuses.webp";
import unpaidCocoaArt from "@/assets/rules/teotihuacan/unpaid-cocoa-art.webp";
import unpaidCocoaIcon from "@/assets/rules/teotihuacan/unpaid-cocoa.webp";
import type { GameFieldRules } from "./types";

/**
 * Source: official Teotihuacan: City of Gods rules (EN),
 * 'Eclipse scoring' section. EN follows the booklet; RU/ZH translated from EN.
 *
 * The `track` field is missing here on purpose: the victory point track is
 * not an entry of the final Eclipse, and the rules give no verbatim wording
 * for it. It keeps its letter and its own hint.
 */
export const teotihuacanFieldRules: GameFieldRules<"teotihuacan"> = {
  avenue: {
    icon: avenueIcon,
    art: [avenueArt],
    text: {
      ru: "Найдите наименьшее видимое число в ряду Buildings на главном поле. Каждый игрок получает столько победных очков за каждый шаг, на который он продвинулся по Аллее мёртвых.",
      en: "Find the lowest visible number on the Buildings row on the Main Board. Each player scores that many Victory Points for each step they have moved up on the Avenue of the Dead.",
      zh: "找到主板上建筑行中最低可见数字。每位玩家在亡灵大道上每前进一格，获得该数字的胜利分。",
    },
  },
  pyramid: {
    icon: pyramidIcon,
    art: [pyramidArt],
    text: {
      ru: "Игрок (или игроки), дальше всех продвинувшийся по треку Пирамиды, получает 4 победных очка. Каждый игрок получает победные очки за каждый шаг по треку Пирамиды: 4/3/2 ПО за шаг на первом/втором/третьем Eclipse.",
      en: "The player (or players) furthest ahead on the Pyramid track scores 4 Victory Points. Each player scores Victory Points for each step they have moved up on the Pyramid track: 4/3/2 Victory Points if this is the first/second/third Eclipse.",
      zh: "在金字塔轨道上领先最远的玩家获得 4 分。每位玩家按金字塔轨道步数得分：第一次/第二次/第三次日食分别为每步 4/3/2 分。",
    },
  },
  masks: {
    icon: masksIcon,
    art: [masksArt],
    text: {
      ru: "Каждый игрок собирает маски в один или несколько наборов из разных масок. Каждый набор даёт очки в зависимости от числа масок: набор из 1/2/3/4/5/6/7 масок даёт 1/3/6/10/15/21/28 победных очков.",
      en: "Each player organizes their masks into one or more sets, where each set is comprised of different masks. Then each set scores points, depending on the number of masks in that set: Each set of 1/2/3/4/5/6/7 masks score 1/3/6/10/15/21/28 Victory Points.",
      zh: "每位玩家将面具组成一个或多个不同面具的套组。每个套组按面具数量得分：1/2/3/4/5/6/7 个面具的套组分别得 1/3/6/10/15/21/28 分。",
    },
  },
  unpaidCocoa: {
    icon: unpaidCocoaIcon,
    art: [unpaidCocoaArt],
    text: {
      ru: "Каждый игрок платит зарплату: 1 какао за каждого рабочего и ещё 1 какао за каждого рабочего силы 4 или 5. За каждый какао, который игрок не хочет или не может заплатить, он теряет 3 победных очка.",
      en: "Each player must now pay a salary of 1 cocoa per worker, and an additional cocoa for each worker with a power of 4 or 5. For each cocoa a player is unwilling or unable to pay, that player loses 3 Victory Points.",
      zh: "每位玩家支付工资：每个工人 1 可可，力量为 4 或 5 的工人再额外支付 1 可可。每有 1 可可不愿或无法支付，该玩家失去 3 分。",
    },
  },
  templeBonuses: {
    icon: templeBonusesIcon,
    art: [templeBonusesArt, templeBonusesArt2],
    text: {
      ru: "На третьем Eclipse (или если Eclipse вызван размещением последнего тайла Пирамиды) каждый игрок, достигший предпоследней или верхней ступени храма, получает дополнительные победные очки по достигнутым тайлам бонуса храма.",
      en: "If this is the third Eclipse, or if this Eclipse was triggered by placing the final Pyramid tile, each player who has qualified for one or more Temple Bonus tiles (by being on the penultimate or topmost step of a temple) scores additional Victory Points based on any Bonus tiles they have reached.",
      zh: "若为第三次日食，或因放置最后一块金字塔板块触发日食，则站在神庙倒数第二或最高阶的玩家根据已触及的神庙奖励板块获得额外胜利分。",
    },
  },
};
