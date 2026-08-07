import {
  createLookupField,
  createMultiplyField,
  createSumField,
} from "../fields";
import type { GameScoringDefinition } from "../types";

const MASK_SET_VP: Record<number, number> = {
  1: 1,
  2: 3,
  3: 6,
  4: 10,
  5: 15,
  6: 21,
  7: 28,
};

export const teotihuacanScoring = {
  id: "teotihuacan",
  minPlayers: 1,
  maxPlayers: 4,
  fields: [
    createSumField(
      "track",
      {
        ru: "ПО на счётчике",
        en: "VP on the score track",
        zh: "计分轨上的分数",
      },
      {
        ru: "Очки на треке до финального Eclipse",
        en: "Points on the score track before the final Eclipse",
        zh: "最终日食计分前计分轨上的分数",
      },
    ),
    createSumField("avenue", {
      ru: "ПО аллеи мёртвых",
      en: "VP from Avenue of the Dead",
      zh: "亡灵大道得分",
    }),
    createSumField("pyramid", {
      ru: "ПО пирамиды",
      en: "VP from Pyramid track",
      zh: "金字塔轨道得分",
    }),
    createLookupField(
      "masks",
      { ru: "Маски", en: "Masks", zh: "面具" },
      MASK_SET_VP,
      {
        ru: "1/3/6/10/15/21/28 ПО за набор из 1–7 масок",
        en: "1/3/6/10/15/21/28 VP for a set of 1–7 masks",
        zh: "1–7 个面具的套组得 1/3/6/10/15/21/28 分",
      },
    ),
    createMultiplyField(
      "unpaidCocoa",
      {
        ru: "Неоплаченный какао",
        en: "Unpaid cocoa",
        zh: "未支付的可可",
      },
      -3,
      {
        ru: "−3 ПО за каждый неоплаченный какао зарплаты",
        en: "−3 VP for each unpaid cocoa of salary",
        zh: "每未支付 1 可可工资扣 3 分",
      },
    ),
    createSumField("templeBonuses", {
      ru: "ПО бонусов храмов",
      en: "VP from Temple Bonus tiles",
      zh: "神庙奖励板块得分",
    }),
  ],
} as const satisfies GameScoringDefinition<"teotihuacan">;
