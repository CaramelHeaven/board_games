import {
  createCheckboxField,
  createFloorDivField,
  createMultiplyField,
  createSumField,
} from "../fields";
import type { GameScoringDefinition } from "../types";

export const gwtScoring: GameScoringDefinition = {
  id: "gwt",
  minPlayers: 2,
  maxPlayers: 4,
  fields: [
    createFloorDivField(
      "money",
      "Остаток долларов",
      5,
      "1 ПО за каждые 5 долларов",
    ),
    createSumField("buildings", "ПО жетонов построек"),
    createSumField("cities", "ПО городов с дисками"),
    createSumField("stations", "ПО станций с дисками"),
    createSumField("hazards", "ПО жетонов опасности"),
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
      3,
      "+3 ПО",
    ),
    createCheckboxField("jobMarket", "Жетон рынка труда", 2, "+2 ПО"),
  ],
};
