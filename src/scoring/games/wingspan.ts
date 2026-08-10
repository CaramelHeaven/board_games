import {
  createMajorityField,
  createMultiplyField,
  createSumField,
} from "../fields";
import type { ExpansionDefinition, GameScoringDefinition } from "../types";

/*
 * Source: Wingspan: Oceania Expansion (EN), 'Nectar' section, p. 3.
 *
 * The only category the expansion adds to the final scoring, and the only one
 * in the whole project decided by comparing players rather than by reading one
 * column: in each habitat the most nectar spent takes 5 points and the second
 * most takes 2. Hence `createMajorityField`, which also carries the booklet's
 * two other conditions — a habitat with no nectar does not qualify, and a tie
 * splits the awards for the places it occupies, rounded down.
 *
 * Accent: the muted orchid of the nectar tokens themselves. It sits apart from
 * the felt without fighting it.
 */
const NECTAR_AWARDS = [5, 2] as const;

const oceania = {
  id: "oceania",
  name: { ru: "Oceania", en: "Oceania", zh: "大洋洲" },
  accent: "#8a4f7d",
  fields: [
    createMajorityField(
      "oceaniaNectarForest",
      { ru: "Нектар в лесу", en: "Nectar in the forest", zh: "森林中的花蜜" },
      NECTAR_AWARDS,
      {
        ru: "Больше всех — 5 ПО, второе место — 2 ПО",
        en: "Most 5 VP, second most 2 VP",
        zh: "最多得 5 分，次多得 2 分",
      },
    ),
    createMajorityField(
      "oceaniaNectarGrassland",
      {
        ru: "Нектар на лугу",
        en: "Nectar in the grassland",
        zh: "草原中的花蜜",
      },
      NECTAR_AWARDS,
      {
        ru: "Больше всех — 5 ПО, второе место — 2 ПО",
        en: "Most 5 VP, second most 2 VP",
        zh: "最多得 5 分，次多得 2 分",
      },
    ),
    createMajorityField(
      "oceaniaNectarWetland",
      {
        ru: "Нектар в водоёме",
        en: "Nectar in the wetland",
        zh: "湿地中的花蜜",
      },
      NECTAR_AWARDS,
      {
        ru: "Больше всех — 5 ПО, второе место — 2 ПО",
        en: "Most 5 VP, second most 2 VP",
        zh: "最多得 5 分，次多得 2 分",
      },
    ),
  ],
} as const satisfies ExpansionDefinition;

export const wingspanScoring = {
  id: "wingspan",
  minPlayers: 1,
  maxPlayers: 5,
  fields: [
    createSumField("birds", {
      ru: "ПО за карты птиц",
      en: "VP from bird cards",
      zh: "鸟类卡得分",
    }),
    createSumField("bonuses", {
      ru: "ПО за карты бонусов",
      en: "VP from bonus cards",
      zh: "奖励卡得分",
    }),
    createSumField("roundGoals", {
      ru: "ПО за цели раундов",
      en: "VP from end-of-round goals",
      zh: "回合目标得分",
    }),
    createMultiplyField(
      "eggs",
      { ru: "Яйца", en: "Eggs", zh: "鸟蛋" },
      1,
      {
        ru: "1 ПО за каждое яйцо на картах",
        en: "1 VP per egg on your cards",
        zh: "卡上每颗鸟蛋得 1 分",
      },
    ),
    createMultiplyField(
      "food",
      {
        ru: "Корм на картах",
        en: "Food on cards",
        zh: "卡上的食物",
      },
      1,
      {
        ru: "1 ПО за каждый жетон корма",
        en: "1 VP per food token",
        zh: "每个食物标记得 1 分",
      },
    ),
    createMultiplyField(
      "tucked",
      { ru: "Подложенные карты", en: "Tucked cards", zh: "垫入的卡" },
      1,
      {
        ru: "1 ПО за каждую подложенную карту",
        en: "1 VP per tucked card",
        zh: "每张垫入的卡得 1 分",
      },
    ),
  ],
  expansions: [oceania],
} as const satisfies GameScoringDefinition<"wingspan">;
