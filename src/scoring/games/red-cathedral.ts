import { createFloorDivField, createSumField } from "../fields";
import type { GameScoringDefinition } from "../types";

export const redCathedralScoring = {
  id: "red-cathedral",
  minPlayers: 1,
  maxPlayers: 4,
  fields: [
    createSumField(
      "track",
      { ru: "ПО на треке", en: "VP on the track", zh: "计分轨上的分数" },
      {
        ru: "Очки престижа на треке после отката к ближайшему делению очков престижа",
        en: "Prestige Points on the track after moving back to the closest Prestige Point space",
        zh: "退回最近的声望分格后计分轨上的声望分",
      },
    ),
    createFloorDivField(
      "leftovers",
      {
        ru: "Материалы и рубли",
        en: "Materials and rubles",
        zh: "材料和卢布",
      },
      5,
      {
        ru: "1 ПО за каждые 5 оставшихся материалов и рублей",
        en: "1 VP per 5 leftover materials and rubles",
        zh: "每剩余 5 个材料和卢布得 1 分",
      },
    ),
    createSumField(
      "towers",
      { ru: "Башни", en: "Towers", zh: "塔楼" },
      {
        ru: "Сумма ПО за большинство во всех башнях",
        en: "Total VP from majorities in all towers",
        zh: "所有塔楼多数奖励的总分",
      },
    ),
  ],
} as const satisfies GameScoringDefinition<"red-cathedral">;
