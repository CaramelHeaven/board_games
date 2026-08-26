import { createCheckboxField, createSumField } from "../fields";
import type { GameScoringDefinition } from "../types";

/*
 * Silverfrost is a standalone game, not an Everdell expansion — it cannot even
 * be combined with Spirecrest — so it gets its own definition rather than a set
 * of rows on 'everdell'. Row order follows the booklet's own 'Score for' list
 * (EN rulebook, 'End of Game', printed p. 16).
 *
 * The Snow reward side is chosen during setup and only one of the two can be in
 * play. Modelled here is 'Flurries', the side the booklet recommends; 'Ice
 * Storm' would double-count against these rows and is left out.
 */
export const everdellSilverfrostScoring = {
  id: "everdell-silverfrost",
  minPlayers: 1,
  maxPlayers: 4,
  fields: [
    createSumField("cards", {
      ru: "Базовые ПО карт",
      en: "Base points for cards",
      zh: "卡的基础分",
    }),
    createSumField("prosperity", {
      ru: "Бонусы карт процветания",
      en: "Prosperity card bonus points",
      zh: "繁荣卡额外分",
    }),
    createSumField("quests", {
      ru: "ПО заданий",
      en: "Quest points",
      zh: "任务得分",
    }),
    createSumField(
      "snow",
      { ru: "Расчищенный снег", en: "Snow cleared", zh: "已清除的雪" },
      { ru: "1 ПО за жетон", en: "1 VP per token", zh: "每个标记 1 分" },
    ),
    /*
     * Not a majority field: on a tie the booklet gives 5 to every leader, while
     * createMajorityField splits one pot between them. Each tied player ticks
     * this box.
     */
    createCheckboxField(
      "snowMost",
      {
        ru: "Больше всех снега",
        en: "Most Snow cleared",
        zh: "清除的雪最多",
      },
      5,
      {
        ru: "+5 ПО, при ничьей — каждому",
        en: "+5 VP, each of the tied players",
        zh: "+5 分，平局时每人各得",
      },
    ),
    createSumField("pointTokens", {
      ru: "Жетоны очков",
      en: "Point tokens",
      zh: "分数标记",
    }),
    createSumField("journey", {
      ru: "ПО путешествия",
      en: "Journey points",
      zh: "旅程得分",
    }),
  ],
} as const satisfies GameScoringDefinition<"everdell-silverfrost">;
