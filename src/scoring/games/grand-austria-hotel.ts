import { createMultiplyField, createSumField } from "../fields";
import type { ExpansionDefinition, GameScoringDefinition } from "../types";

/*
 * Source: Grand Austria Hotel: Let's Waltz! (EN, Retail Edition, Lookout
 * 2022), module 1 'Vienna Ballrooms', 'Game End and Final Scoring', p. 7.
 *
 * The box holds five modules and only this one line of theirs reaches the
 * final scoring: "Each champagne left in your kitchen is worth 1 victory
 * point." Modules 2-5 all state "No changes" under their own Game End
 * heading, so they add no rows.
 *
 * The ballrooms themselves are not a row either: they are scored after the
 * Emperor scoring at the end of rounds 3, 5 and 7 — during the game, on the
 * victory point track — and so are already covered by the base row 'VP during
 * the game', exactly like the guests and the Emperor.
 *
 * Champagne is a separate row rather than part of the base 'Kitchen' row: the
 * base row is what a player without the box counts, and the expansion's own
 * final scoring card lists champagne beside the dishes and drinks at the same
 * 1 VP each.
 *
 * Accent: the warm gold of the champagne tokens. Muted, so the chip stays
 * readable on the felt and the row stays quiet on the paper.
 */
const letsWaltz = {
  id: "lets-waltz",
  name: { ru: "Let's Waltz!", en: "Let's Waltz!", zh: "一起华尔兹！" },
  accent: "#a3762e",
  fields: [
    createMultiplyField(
      "letsWaltzChampagne",
      { ru: "Шампанское", en: "Champagne", zh: "香槟" },
      1,
      {
        ru: "1 ПО за каждое шампанское в кухне",
        en: "1 VP per champagne in your kitchen",
        zh: "厨房中每份香槟得 1 分",
      },
    ),
  ],
} as const satisfies ExpansionDefinition;

export const grandAustriaHotelScoring = {
  id: "grand-austria-hotel",
  minPlayers: 2,
  maxPlayers: 4,
  fields: [
    createSumField(
      "duringGame",
      { ru: "ПО за партию", en: "VP during the game", zh: "游戏中获得的分数" },
      {
        ru: "Гости, император и другие очки за партию",
        en: "Guests, the emperor and other points scored during the game",
        zh: "客人、皇帝及其他游戏中得分",
      },
    ),
    createSumField(
      "staff",
      { ru: "ПО за персонал", en: "VP from staff", zh: "员工得分" },
      {
        ru: "Карты персонала с ПО в конце игры",
        en: "Staff cards that score at the end of the game",
        zh: "游戏结束时计分的员工卡",
      },
    ),
    createMultiplyField(
      "roomsRow1",
      { ru: "Номера, 1 ряд", en: "Rooms, row 1", zh: "客房，第 1 排" },
      1,
    ),
    createMultiplyField(
      "roomsRow2",
      { ru: "Номера, 2 ряд", en: "Rooms, row 2", zh: "客房，第 2 排" },
      2,
    ),
    createMultiplyField(
      "roomsRow3",
      { ru: "Номера, 3 ряд", en: "Rooms, row 3", zh: "客房，第 3 排" },
      3,
    ),
    createMultiplyField(
      "roomsRow4",
      { ru: "Номера, 4 ряд", en: "Rooms, row 4", zh: "客房，第 4 排" },
      4,
    ),
    createMultiplyField(
      "kitchen",
      { ru: "Кухня", en: "Kitchen", zh: "厨房" },
      1,
      {
        ru: "1 ПО за каждую крону, блюдо и напиток",
        en: "1 VP per crown, dish and drink",
        zh: "每个皇冠、菜肴和饮品各得 1 分",
      },
    ),
    createMultiplyField(
      "cafeGuests",
      { ru: "Гости в кафе", en: "Guests in the café", zh: "咖啡厅的客人" },
      -5,
      {
        ru: "−5 ПО за каждого гостя",
        en: "−5 VP per guest",
        zh: "每位客人 −5 分",
      },
    ),
  ],
  expansions: [letsWaltz],
} as const satisfies GameScoringDefinition<"grand-austria-hotel">;
