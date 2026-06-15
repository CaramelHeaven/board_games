import {
  createCheckboxField,
  createFloorDivField,
  createMultiplyField,
  createSumField,
} from "../fields";
import type { GameScoringDefinition } from "../types";

export const gwtArgentinaScoring: GameScoringDefinition = {
  id: "gwt-argentina",
  minPlayers: 2,
  maxPlayers: 4,
  fields: [
    createFloorDivField(
      "pesos",
      "Остаток песо",
      5,
      "1 ПО за каждые 5 песо",
    ),
    createSumField("buildings", "ПО жетонов построек"),
    createSumField("ships", "ПО кораблей с дисками"),
    createSumField("cities", "ПО городов с дисками"),
    createSumField("stations", "ПО станций с дисками"),
    createMultiplyField(
      "farmers",
      "Остаток фермеров",
      2,
      "2 ПО за каждого фермера",
    ),
    createSumField("cattle", "ПО карточек скота"),
    createSumField("objectives", "ПО карточек целей"),
    createSumField("stationMasters", "ПО начальников станций"),
    createMultiplyField(
      "workers56",
      "Рабочие на 5, 6 клетке",
      4,
      "4 ПО за каждого рабочего",
    ),
    createCheckboxField(
      "playerBoardDisc",
      "Диск с клетки планшета",
      2,
      "+2 ПО",
    ),
    createCheckboxField("jobMarket", "Жетон рынка труда", 2, "+2 ПО"),
  ],
};
