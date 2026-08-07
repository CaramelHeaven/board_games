import goodsIcon from "@/assets/rules/castles-of-burgundy/goods.webp";
import silverIcon from "@/assets/rules/castles-of-burgundy/silver.webp";
import vineyardsArt from "@/assets/rules/castles-of-burgundy/vineyards-art.webp";
import vineyardsIcon from "@/assets/rules/castles-of-burgundy/vineyards.webp";
import workersIcon from "@/assets/rules/castles-of-burgundy/workers.webp";
import yellowTilesIcon from "@/assets/rules/castles-of-burgundy/yellow-tiles.webp";
import type { GameFieldRules } from "./types";

/**
 * Source: official The Castles of Burgundy: Special Edition rules
 * by Awaken Realms and Ravensburger (English edition, p. 10, 'End of the
 * Game' section, and p. 21, 'Vineyards Scoring').
 * The English texts are verbatim, including the flaws of the original;
 * ru and zh are translated from English.
 *
 * The `track` and `shields` fields are missing here on purpose. The victory
 * point track is not an entry of the final scoring. For shields, the endgame
 * points are spelled out one by one on each of the 18 tiles ('End of game:
 * +12 victory points', p. 18), and no summary wording exists in the booklet.
 * Both fields keep their letter and their own hint.
 */
export const castlesOfBurgundyFieldRules: GameFieldRules<"castles-of-burgundy"> =
  {
    goods: {
      icon: goodsIcon,
      text: {
        ru: "Каждый непроданный жетон товаров: 1 победное очко.",
        en: "Each unsold goods tile: 1 victory point.",
        zh: "每个未售出的货物板块得 1 分。",
      },
    },
    silver: {
      icon: silverIcon,
      text: {
        ru: "За каждую серебряную монету: 1 победное очко.",
        en: "For each silver coin: 1 victory point.",
        zh: "每枚银币得 1 分。",
      },
    },
    workers: {
      icon: workersIcon,
      text: {
        ru: "За каждые два жетона рабочих: 1 победное очко.",
        en: "For every two worker tokens: 1 victory point.",
        zh: "每 2 个工人标记得 1 分。",
      },
    },
    yellowTiles: {
      icon: yellowTilesIcon,
      text: {
        ru: "За каждый выложенный жёлтый жетон монастыря, который приносит победные очки (см. стр. 11 и 12). Важно: учитываются только шестиугольные жетоны, выложенные в вашем герцогстве, — жетоны в хранилище не считаются.",
        en: "For each placed yellow monastery tile that score victory points (see pages 11 and 12). Important: Only check the hex tiles placed in your duchy – hex tiles in your storage do not count.",
        zh: "每个已放置且能计分的黄色修道院板块按其分数计分（见第 11、12 页）。重要提示：只统计放在你领地中的六角板块，储存区中的板块不计分。",
      },
    },
    vineyards: {
      icon: vineyardsIcon,
      art: [vineyardsArt],
      text: {
        ru: "Виноградники приносят очки в конце игры. Каждый игрок получает победные очки за каждый свой жетон бонуса лозы в зависимости от количества связанных лоз того же типа. Каждый жетон бонуса лозы приносит очки только один раз. То же относится и к каждой области лоз: она приносит очки только один раз, даже если у игрока несколько жетонов бонуса лозы этого типа.",
        en: "Vineyards score at the end of the game. Each player scores victory points for each of their vine bonus tiles depending on the amount of connected vines of the same type. Each vine bonus tile scores only once. This also applies to each vine area, meaning that they score only once – even if a player has more vine bonus tiles of that type.",
        zh: "葡萄园在游戏结束时计分。每位玩家的每个藤蔓奖励板块，按其对应类型的相连藤蔓数量得分。每个藤蔓奖励板块只计分一次；每个藤蔓区域也只计分一次，即使玩家拥有多个该类型的藤蔓奖励板块。",
      },
    },
  };
