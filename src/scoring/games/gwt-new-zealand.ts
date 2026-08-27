import {
  createCheckboxField,
  createFloorDivField,
  createMultiplyField,
  createSumField,
} from "../fields";
import type { GameScoringDefinition } from "../types";

/*
 * Rows follow the booklet's own numbering of 'The final scoring' (EN, p. 19),
 * which lists 12 categories. Category 11 bundles two different sums — 4 VP per
 * worker on a fifth space, plus 2 and/or 4 VP for cleared storehouse pairs —
 * so it is split into three rows here; one input cell cannot express both.
 */
export const gwtNewZealandScoring = {
  id: "gwt-new-zealand",
  minPlayers: 1,
  maxPlayers: 4,
  fields: [
    createFloorDivField(
      "pounds",
      { ru: "Остаток фунтов", en: "Pounds remaining", zh: "剩余英镑" },
      5,
      {
        ru: "1 ПО за каждые 5 фунтов",
        en: "1 VP per 5 Pounds",
        zh: "每 5 英镑得 1 分",
      },
    ),
    createSumField("buildings", {
      ru: "ПО тайлов построек",
      en: "VP from building tiles",
      zh: "建筑物板块得分",
    }),
    createSumField("tradingPosts", {
      ru: "ПО торговых постов с дисками",
      en: "VP from trading posts with discs",
      zh: "已放置圆片的贸易站得分",
    }),
    createSumField("harbours", {
      ru: "ПО гаваней с дисками и складами",
      en: "VP from harbours with discs and storehouses",
      zh: "已放置圆片和仓库的港口得分",
    }),
    createSumField("pathfinder", {
      ru: "ПО трека первопроходца",
      en: "VP from the pathfinder track",
      zh: "探路者轨道得分",
    }),
    createSumField("hazardAndBonusTiles", {
      ru: "ПО тайлов опасности и бонусных тайлов",
      en: "VP from hazard tiles and bonus tiles",
      zh: "危险板块和奖励板块得分",
    }),
    createSumField("sheepAndBonusCards", {
      ru: "ПО карт овец и бонусных карт",
      en: "VP from sheep cards and bonus cards",
      zh: "绵羊卡和奖励卡得分",
    }),
    createSumField("objectives", {
      ru: "ПО карт целей",
      en: "VP from objective cards",
      zh: "目标卡得分",
    }),
    createSumField("harbourmasters", {
      ru: "ПО тайлов начальников гаваней",
      en: "VP from harbourmaster tiles",
      zh: "港务长板块得分",
    }),
    createCheckboxField(
      "handLimitSpace",
      {
        ru: "Клетка лимита руки очищена",
        en: "Hand limit disc space cleared",
        zh: "已清空手牌上限圆片格",
      },
      3,
      { ru: "+3 ПО", en: "+3 VP", zh: "+3 分" },
    ),
    createMultiplyField(
      "workers5",
      {
        ru: "Рабочие на 5 клетке",
        en: "Workers on the fifth space",
        zh: "第 5 格的工人",
      },
      4,
      {
        ru: "4 ПО за каждого рабочего",
        en: "4 VP per worker",
        zh: "每名工人 4 分",
      },
    ),
    createCheckboxField(
      "storehousePair2",
      {
        ru: "Пара складов на 2 ПО очищена",
        en: "Storehouse pair worth 2 cleared",
        zh: "已清空 2 分的仓库对",
      },
      2,
      { ru: "+2 ПО", en: "+2 VP", zh: "+2 分" },
    ),
    createCheckboxField(
      "storehousePair4",
      {
        ru: "Пара складов на 4 ПО очищена",
        en: "Storehouse pair worth 4 cleared",
        zh: "已清空 4 分的仓库对",
      },
      4,
      { ru: "+4 ПО", en: "+4 VP", zh: "+4 分" },
    ),
    createCheckboxField(
      "bonusTilesMarketToken",
      {
        ru: "Жетон рынка бонусных тайлов",
        en: "Bonus tiles market token",
        zh: "奖励板块市场标记",
      },
      5,
      { ru: "+5 ПО", en: "+5 VP", zh: "+5 分" },
    ),
  ],
} as const satisfies GameScoringDefinition<"gwt-new-zealand">;
