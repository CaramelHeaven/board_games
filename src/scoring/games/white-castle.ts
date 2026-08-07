import {
  createFloorDivField,
  createMultiplyField,
  createScaledByCountsField,
  createSumField,
} from "../fields";
import type { GameScoringDefinition } from "../types";

const COURTIERS_INSIDE = [
  "courtiersFloor1",
  "courtiersFloor2",
  "courtiersFloor3",
] as const;

export const whiteCastleScoring: GameScoringDefinition = {
  id: "white-castle",
  minPlayers: 1,
  maxPlayers: 4,
  fields: [
    createSumField(
      "duringGame",
      { ru: "ПО за партию", en: "VP during the game", zh: "游戏中获得的分数" },
      {
        ru: "Очки, полученные за раунды",
        en: "Points scored during the rounds",
        zh: "各回合累积的分数",
      },
    ),
    createFloorDivField(
      "coinsAndSeals",
      {
        ru: "Монеты и печати дaimyo",
        en: "Coins and daimyo seals",
        zh: "钱币与大名印章",
      },
      5,
      {
        ru: "1 ПО за каждые 5 монет или печатей",
        en: "1 VP per 5 coins or seals",
        zh: "每 5 枚钱币或印章得 1 分",
      },
    ),
    createSumField(
      "resources",
      { ru: "ПО за ресурсы", en: "VP from resources", zh: "资源得分" },
      {
        ru: "Итог по оставшимся ресурсам",
        en: "Total for leftover resources",
        zh: "剩余资源的合计",
      },
    ),
    createSumField(
      "passageOfTime",
      { ru: "Трек цапли", en: "Passage of time", zh: "时间流逝" },
      {
        ru: "3, 6 или значение на 4-м сезоне",
        en: "3, 6 or the value on the 4th season",
        zh: "3、6 或第四季的数值",
      },
    ),
    createMultiplyField(
      "courtiersGate",
      {
        ru: "Придворные у ворот",
        en: "Courtiers at the gate",
        zh: "门口的家臣",
      },
      1,
    ),
    createMultiplyField(
      "courtiersFloor1",
      {
        ru: "Придворные, 1 этаж",
        en: "Courtiers, 1st floor",
        zh: "家臣，第 1 层",
      },
      3,
    ),
    createMultiplyField(
      "courtiersFloor2",
      {
        ru: "Придворные, 2 этаж",
        en: "Courtiers, 2nd floor",
        zh: "家臣，第 2 层",
      },
      6,
    ),
    createMultiplyField(
      "courtiersFloor3",
      {
        ru: "Придворные, 3 этаж",
        en: "Courtiers, 3rd floor",
        zh: "家臣，第 3 层",
      },
      10,
    ),
    createScaledByCountsField(
      "warriors2",
      {
        ru: "Воины, двор ×2",
        en: "Warriors, ×2 yard",
        zh: "武士，×2 训练场",
      },
      [...COURTIERS_INSIDE],
      { unitValue: 2 },
      {
        ru: "×2 × придворные внутри замка (не у ворот)",
        en: "×2 × courtiers inside the Castle (not at the Gate)",
        zh: "×2 × 城内家臣（不含城门）",
      },
    ),
    createScaledByCountsField(
      "warriors1",
      {
        ru: "Воины, дворы ×1",
        en: "Warriors, ×1 yards",
        zh: "武士，×1 训练场",
      },
      [...COURTIERS_INSIDE],
      { unitValue: 1 },
      {
        ru: "×1 × придворные внутри замка (не у ворот)",
        en: "×1 × courtiers inside the Castle (not at the Gate)",
        zh: "×1 × 城内家臣（不含城门）",
      },
    ),
    createSumField(
      "gardeners",
      { ru: "ПО садовников", en: "VP from gardeners", zh: "园丁得分" },
      {
        ru: "Значения с карт сада",
        en: "Values from the garden cards",
        zh: "庭园卡上的数值",
      },
    ),
  ],
};
