import {
  createFloorDivField,
  createMultiplyField,
  createScaledByCountsField,
  createSumField,
} from "../fields";
import type { ExpansionDefinition, GameScoringDefinition } from "../types";

const COURTIERS_INSIDE = [
  "courtiersFloor1",
  "courtiersFloor2",
  "courtiersFloor3",
] as const;

/** Every Courtier on the board, wherever they stand. */
const COURTIERS_ALL = ["courtiersGate", ...COURTIERS_INSIDE] as const;

/** Every Warrior on the board, across both kinds of yard. */
const WARRIORS_ALL = ["warriors2", "warriors1"] as const;

/*
 * Source: The White Castle: Matcha (EN), 'End of the Game', p. 11, the
 * entries marked with the tea-cup icon.
 *
 * The expansion adds one category — Geishas in the Tea Garden — but it scores
 * five different ways, so it becomes several rows. Every input is a count of
 * pieces; the multiplication is the app's job.
 *
 * The three Tea House rooms each pay 2 points per clan member of the matching
 * type, per Geisha in that room. The booklet's own example on p. 11 pins the
 * formula down: "+12 points (as there are 3 Gardeners)" is 2 Geishas × 3
 * Gardeners × 2, and "+8 points (there are 3 Courtiers in the Castle and 1 at
 * the Gate)" is 1 Geisha × 4 Courtiers × 2.
 *
 * Courtiers and Warriors are already entered as counts by the base game, so
 * the room rows just reference those fields. Gardeners are not: the base
 * `gardeners` row takes the sum of the values printed on the garden cards, not
 * how many Gardeners there are. Hence the helper row below.
 *
 * Plum — Geishas and cherry blossom. Matcha green is the obvious choice and
 * the wrong one: the felt is green too.
 */
const matcha = {
  id: "matcha",
  name: { ru: "Matcha", en: "Matcha", zh: "Matcha" },
  accent: "#8c4a63",
  fields: [
    createMultiplyField(
      "matchaGeishaPond",
      {
        ru: "Гейша у Пруда",
        en: "Geisha at the Pond Overlook",
        zh: "池畔观景台的艺伎",
      },
      2,
      {
        ru: "2 ПО за гейшу у Пруда. От клана там может быть только одна",
        en: "2 VP for a Geisha at the Pond Overlook. Only one per clan fits there",
        zh: "池畔观景台的艺伎得 2 分。每个家族只能有一位",
      },
    ),
    createMultiplyField(
      "matchaGeishaEntrance",
      {
        ru: "Гейши у входа в сад",
        en: "Geishas at the Tea Garden entrance",
        zh: "茶园入口的艺伎",
      },
      1,
      {
        ru: "1 ПО за каждую гейшу у входа в Чайный сад",
        en: "1 VP for each Geisha at the entrance to the Tea Garden",
        zh: "茶园入口的每位艺伎得 1 分",
      },
    ),
    createMultiplyField(
      "matchaGeishaStep1",
      {
        ru: "Гейши, 1-й шаг Пути чая",
        en: "Geishas, first step of the Path of Tea",
        zh: "茶之道第一步的艺伎",
      },
      2,
      {
        ru: "2 ПО за каждую гейшу на первом шаге Пути чая",
        en: "2 VP for each Geisha on the first step of the Path of Tea",
        zh: "茶之道第一步的每位艺伎得 2 分",
      },
    ),
    createMultiplyField(
      "matchaGeishaStep2",
      {
        ru: "Гейши, 2-й шаг Пути чая",
        en: "Geishas, second step of the Path of Tea",
        zh: "茶之道第二步的艺伎",
      },
      3,
      {
        ru: "3 ПО за каждую гейшу на втором шаге Пути чая",
        en: "3 VP for each Geisha on the second step of the Path of Tea",
        zh: "茶之道第二步的每位艺伎得 3 分",
      },
    ),
    /*
     * Scores nothing on its own — it exists so that the Gardeners' room below
     * has a count to multiply by. The base `gardeners` row holds points, not
     * pieces.
     */
    createMultiplyField(
      "matchaGardenersOnBoard",
      {
        ru: "Садовников на поле",
        en: "Gardeners on the board",
        zh: "场上的园丁数量",
      },
      0,
      {
        ru: "Очков не даёт: нужно, чтобы посчитать комнату садовников",
        en: "Scores nothing: it is the multiplier for the Gardeners' room",
        zh: "本身不计分：用于计算园丁房间的得分",
      },
    ),
    createScaledByCountsField(
      "matchaGeishaRoomGardeners",
      {
        ru: "Гейши в комнате садовников",
        en: "Geishas in the Gardeners' room",
        zh: "园丁房间的艺伎",
      },
      ["matchaGardenersOnBoard"],
      { unitValue: 2 },
      {
        ru: "2 ПО за каждого садовника на поле за каждую гейшу в этой комнате",
        en: "2 VP for each Gardener on the board, for each Geisha in that room",
        zh: "该房间每位艺伎，按场上每名园丁得 2 分",
      },
    ),
    createScaledByCountsField(
      "matchaGeishaRoomWarriors",
      {
        ru: "Гейши в комнате воинов",
        en: "Geishas in the Warriors' room",
        zh: "武士房间的艺伎",
      },
      WARRIORS_ALL,
      { unitValue: 2 },
      {
        ru: "2 ПО за каждого воина на поле за каждую гейшу в этой комнате",
        en: "2 VP for each Warrior on the board, for each Geisha in that room",
        zh: "该房间每位艺伎，按场上每名武士得 2 分",
      },
    ),
    createScaledByCountsField(
      "matchaGeishaRoomCourtiers",
      {
        ru: "Гейши в комнате придворных",
        en: "Geishas in the Courtiers' room",
        zh: "家臣房间的艺伎",
      },
      COURTIERS_ALL,
      { unitValue: 2 },
      {
        ru: "2 ПО за каждого придворного на поле за каждую гейшу в этой комнате",
        en: "2 VP for each Courtier on the board, for each Geisha in that room",
        zh: "该房间每位艺伎，按场上每名家臣得 2 分",
      },
    ),
  ],
} as const satisfies ExpansionDefinition;

export const whiteCastleScoring = {
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
      COURTIERS_INSIDE,
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
      COURTIERS_INSIDE,
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
  expansions: [matcha],
} as const satisfies GameScoringDefinition<"white-castle">;
