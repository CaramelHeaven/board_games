import { createMultiplyField, createSumField } from "../fields";
import type { GameScoringDefinition } from "../types";

export const grandAustriaHotelScoring: GameScoringDefinition = {
  id: "grand-austria-hotel",
  minPlayers: 2,
  maxPlayers: 4,
  fields: [
    createSumField(
      "duringGame",
      "ПО за партию",
      "Гости, император и другие очки за партию",
    ),
    createSumField("staff", "ПО за персонал", "Карты персонала с ПО в конце игры"),
    createMultiplyField("roomsRow1", "Номера, 1 ряд", 1),
    createMultiplyField("roomsRow2", "Номера, 2 ряд", 2),
    createMultiplyField("roomsRow3", "Номера, 3 ряд", 3),
    createMultiplyField("roomsRow4", "Номера, 4 ряд", 4),
    createSumField(
      "kitchen",
      "Кухня",
      "1 ПО за каждую крону, блюдо и напиток",
    ),
    createMultiplyField(
      "cafeGuests",
      "Гости в кафе",
      -5,
      "−5 ПО за каждого гостя",
    ),
  ],
};
