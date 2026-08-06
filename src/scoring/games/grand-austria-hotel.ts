import { createMultiplyField, createSumField } from "../fields";
import type { GameScoringDefinition } from "../types";

export const grandAustriaHotelScoring: GameScoringDefinition = {
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
    createSumField(
      "kitchen",
      { ru: "Кухня", en: "Kitchen", zh: "厨房" },
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
};
