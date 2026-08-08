import goodsArt from "@/assets/rules/castles-of-burgundy/goods-art.webp";
import goodsIcon from "@/assets/rules/castles-of-burgundy/goods.webp";
import shieldsArt from "@/assets/rules/castles-of-burgundy/shields-art.webp";
import shieldsIcon from "@/assets/rules/castles-of-burgundy/shields.webp";
import silverIcon from "@/assets/rules/castles-of-burgundy/silver.webp";
import vineyardsArt from "@/assets/rules/castles-of-burgundy/vineyards-art.webp";
import vineyardsArt2 from "@/assets/rules/castles-of-burgundy/vineyards-art2.webp";
import vineyardsIcon from "@/assets/rules/castles-of-burgundy/vineyards.webp";
import workersArt from "@/assets/rules/castles-of-burgundy/workers-art.webp";
import workersIcon from "@/assets/rules/castles-of-burgundy/workers.webp";
import yellowTilesArt from "@/assets/rules/castles-of-burgundy/yellow-tiles-art.webp";
import yellowTilesIcon from "@/assets/rules/castles-of-burgundy/yellow-tiles.webp";
import type { GameFieldRules } from "./types";

/**
 * Source: official The Castles of Burgundy: Special Edition rulebook by Awaken
 * Realms and Ravensburger (English, 28 pages), published by the publisher at
 * awakenrealms.com/images/download/CoB/. Final scoring is on p. 10, 'End of the
 * Game'; vineyards on p. 21, 'Vineyards Scoring'; shields on pp. 17-18.
 * The English texts are verbatim, including the flaws of the original;
 * ru and zh are translated from English. All art is cropped from that booklet,
 * whose rasters are 300 ppi throughout.
 *
 * Two deliberate departures worth knowing about:
 *
 * - The `track` field has no rule. The victory point track is not an entry of
 *   the final scoring, so the booklet has no wording for it. It keeps its
 *   letter and its own hint.
 * - The `shields` text is NOT a quote. The booklet has no summary paragraph
 *   for shield scoring: the endgame points are spelled out one by one on each
 *   of the 18 tiles ('End of game: +12 victory points', p. 18). The wording
 *   below joins that repeated ending to the placement rule from p. 17 ('The
 *   shield must be placed on one of the castle tiles in your duchy'). Every
 *   fact in it is from the booklet, but the sentence is ours — do not treat it
 *   as verbatim, and do not use it as a precedent for writing rules text.
 */
export const castlesOfBurgundyFieldRules: GameFieldRules<"castles-of-burgundy"> =
  {
    goods: {
      icon: goodsIcon,
      art: [goodsArt],
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
      art: [workersArt],
      text: {
        ru: "За каждые два жетона рабочих: 1 победное очко.",
        en: "For every two worker tokens: 1 victory point.",
        zh: "每 2 个工人标记得 1 分。",
      },
    },
    yellowTiles: {
      icon: yellowTilesIcon,
      art: [yellowTilesArt],
      text: {
        ru: "За каждый выложенный жёлтый жетон монастыря, который приносит победные очки (см. стр. 11 и 12). Важно: учитываются только шестиугольные жетоны, выложенные в вашем герцогстве, — жетоны в хранилище не считаются.",
        en: "For each placed yellow monastery tile that score victory points (see pages 11 and 12). Important: Only check the hex tiles placed in your duchy – hex tiles in your storage do not count.",
        zh: "每个已放置且能计分的黄色修道院板块按其分数计分（见第 11、12 页）。重要提示：只统计放在你领地中的六角板块，储存区中的板块不计分。",
      },
    },
    vineyards: {
      icon: vineyardsIcon,
      art: [vineyardsArt, vineyardsArt2],
      text: {
        ru: "Виноградники приносят очки в конце игры. Каждый игрок получает победные очки за каждый свой жетон бонуса лозы в зависимости от количества связанных лоз того же типа. Каждый жетон бонуса лозы приносит очки только один раз. То же относится и к каждой области лоз: она приносит очки только один раз, даже если у игрока несколько жетонов бонуса лозы этого типа.",
        en: "Vineyards score at the end of the game. Each player scores victory points for each of their vine bonus tiles depending on the amount of connected vines of the same type. Each vine bonus tile scores only once. This also applies to each vine area, meaning that they score only once – even if a player has more vine bonus tiles of that type.",
        zh: "葡萄园在游戏结束时计分。每位玩家的每个藤蔓奖励板块，按其对应类型的相连藤蔓数量得分。每个藤蔓奖励板块只计分一次；每个藤蔓区域也只计分一次，即使玩家拥有多个该类型的藤蔓奖励板块。",
      },
    },
    shields: {
      icon: shieldsIcon,
      art: [shieldsArt],
      text: {
        ru: "Щиты выкладываются на жетоны замков в вашем герцогстве. В конце игры каждый щит приносит указанные на нём победные очки: +12, +8 или +4 (см. список способностей щитов на стр. 18).",
        en: "Shields are placed on the castle tiles in your duchy. At the end of the game each shield scores the victory points printed on it: +12, +8 or +4 (see the list of shield abilities on page 18).",
        zh: "盾牌放置在你领地中的城堡板块上。游戏结束时，每个盾牌按其上印制的分数计分：+12、+8 或 +4（见第 18 页的盾牌能力列表）。",
      },
    },
  };
