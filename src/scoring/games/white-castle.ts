import {
  createFloorDivField,
  createMultiplyField,
  createSumField,
} from "../fields";
import type { GameScoringDefinition } from "../types";

export const whiteCastleScoring: GameScoringDefinition = {
  id: "white-castle",
  minPlayers: 1,
  maxPlayers: 4,
  fields: [
    createSumField(
      "duringGame",
      "ПО за партию",
      "Очки, полученные за раунды",
    ),
    createFloorDivField(
      "coinsAndSeals",
      "Монеты и печати дaimyo",
      5,
      "1 ПО за каждые 5 монет или печатей",
    ),
    createSumField(
      "resources",
      "ПО за ресурсы",
      "Итог по оставшимся ресурсам",
    ),
    createSumField(
      "passageOfTime",
      "Ход времени",
      "3, 6 или значение на 4-м сезоне",
    ),
    createMultiplyField("courtiersGate", "Придворные у ворот", 1),
    createMultiplyField("courtiersFloor1", "Придворные, 1 этаж", 3),
    createMultiplyField("courtiersFloor2", "Придворные, 2 этаж", 6),
    createMultiplyField("courtiersFloor3", "Придворные, 3 этаж", 10),
    createSumField(
      "warriors",
      "ПО воинов",
      "Сумма с учётом множителя придворных",
    ),
    createSumField("gardeners", "ПО садовников", "Значения с карт сада"),
  ],
};
