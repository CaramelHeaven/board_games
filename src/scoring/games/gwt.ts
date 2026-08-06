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
      {
        ru: "Остаток долларов",
        en: "Dollars remaining",
        zh: "剩余金钱",
      },
      5,
      {
        ru: "1 ПО за каждые 5 долларов",
        en: "1 VP per 5 Dollars",
        zh: "每 5 元得 1 分",
      },
    ),
    createSumField("buildings", {
      ru: "ПО жетонов построек",
      en: "VP from building tiles",
      zh: "建筑物板块得分",
    }),
    createSumField("cities", {
      ru: "ПО городов с дисками",
      en: "VP from cities with discs",
      zh: "已放置圆片的城市得分",
    }),
    createSumField("stations", {
      ru: "ПО станций с дисками",
      en: "VP from stations with discs",
      zh: "已放置圆片的车站得分",
    }),
    createSumField("hazards", {
      ru: "ПО жетонов опасности",
      en: "VP from hazard tiles",
      zh: "危险板块得分",
    }),
    createSumField("cattle", {
      ru: "ПО карточек скота",
      en: "VP from cattle cards",
      zh: "牛牌得分",
    }),
    createSumField("objectives", {
      ru: "ПО карточек целей",
      en: "VP from objective cards",
      zh: "目标卡得分",
    }),
    createSumField("stationMasters", {
      ru: "ПО начальников станций",
      en: "VP from station master tiles",
      zh: "站长板块得分",
    }),
    createMultiplyField(
      "workers56",
      {
        ru: "Рабочие на 5, 6 клетке",
        en: "Workers on spaces 5 and 6",
        zh: "第 5、6 格的工人",
      },
      4,
      {
        ru: "4 ПО за каждого рабочего",
        en: "4 VP per worker",
        zh: "每名工人 4 分",
      },
    ),
    createCheckboxField(
      "playerBoardDisc",
      {
        ru: "Диск с клетки планшета",
        en: "Disc cleared from player board",
        zh: "已移除的玩家板圆片",
      },
      3,
      { ru: "+3 ПО", en: "+3 VP", zh: "+3 分" },
    ),
    createCheckboxField(
      "jobMarket",
      {
        ru: "Жетон рынка труда",
        en: "Job market token",
        zh: "劳动力市场标记",
      },
      2,
      { ru: "+2 ПО", en: "+2 VP", zh: "+2 分" },
    ),
  ],
};
