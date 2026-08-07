import {
  createFloorDivField,
  createMultiplyField,
  createSumField,
} from "../fields";
import type { GameScoringDefinition } from "../types";

export const tzolkinScoring = {
  id: "tzolkin",
  minPlayers: 2,
  maxPlayers: 4,
  fields: [
    createSumField(
      "track",
      { ru: "ПО на счётчике", en: "VP on the track", zh: "计分轨上的分数" },
      {
        ru: "Очки, полученные за партию",
        en: "Points scored during the game",
        zh: "游戏中累积的分数",
      },
    ),
    createFloorDivField("corn", { ru: "Кукуруза", en: "Corn", zh: "玉米" }, 4, {
      ru: "1 ПО за каждые 4 кукурузы после конвертации ресурсов",
      en: "1 VP per 4 corn after converting resources",
      zh: "资源转换后每 4 个玉米得 1 分",
    }),
    createMultiplyField(
      "skulls",
      { ru: "Черепа", en: "Crystal skulls", zh: "水晶头骨" },
      3,
      { ru: "3 ПО за каждый череп", en: "3 VP per skull", zh: "每个头骨 3 分" },
    ),
    createSumField(
      "monuments",
      { ru: "Памятники", en: "Monuments", zh: "纪念碑" },
      {
        ru: "ПО по правилам памятников",
        en: "VP as printed on the monuments",
        zh: "按纪念碑规则计分",
      },
    ),
  ],
} as const satisfies GameScoringDefinition<"tzolkin">;
