import {
  createMultiplyField,
  createScaledByCountsField,
  createSumField,
} from "../fields";
import type { ExpansionDefinition, GameScoringDefinition } from "../types";

/**
 * The single field every multiplied row points at. Orléans is the first game
 * here whose largest category is a product rather than a sum.
 */
const DEVELOPMENT = ["development"] as const;

/*
 * Trade & Intrigue. Source: the module's 'Game End and Scoring' line, p. 15 —
 * the Orders are the only thing the whole module adds to the final scoring.
 *
 * Accent: the deep blue of the trade routes. None of the other six expansion
 * accents in the project is blue, so the chip stays telling apart from them.
 */
const tradeIntrigue = {
  id: "trade-intrigue",
  name: { ru: "Торговля и интриги", en: "Trade & Intrigue", zh: "贸易与阴谋" },
  accent: "#3f5f8c",
  fields: [
    createSumField(
      "orders",
      { ru: "ПО заказов", en: "VP from orders", zh: "订单得分" },
      {
        ru: "Сумма ПО на выполненных картах заказов",
        en: "Sum of the VP on your fulfilled Order cards",
        zh: "已完成订单卡上的分数总和",
      },
    ),
  ],
} as const satisfies ExpansionDefinition;

/*
 * The Plague. Source: the module's 'Scoring' paragraph, p. 23. It is one
 * paragraph but two categories, and the second one is easy to miss because it
 * is tacked onto the end of the same sentence run: the Indulgences add points,
 * the Corpses take one away each.
 *
 * Accent: a dark burgundy. Green would be the obvious colour for a plague and
 * the wrong one — the felt of the table is green and the chip would sink into
 * it, the same trap noted for Matcha in white-castle.ts.
 */
const plague = {
  id: "plague",
  name: { ru: "Чума", en: "The Plague", zh: "瘟疫" },
  accent: "#8c3f3f",
  fields: [
    createSumField(
      "indulgences",
      { ru: "ПО индульгенций", en: "VP from indulgences", zh: "赎罪券得分" },
      {
        ru: "Сумма ПО на сыгранных картах индульгенций",
        en: "Sum of the VP on the Indulgence cards you played",
        zh: "已打出的赎罪券卡上的分数总和",
      },
    ),
    createMultiplyField(
      "corpses",
      { ru: "Трупы", en: "Corpses", zh: "尸体" },
      -1,
      {
        ru: "−1 ПО за каждый труп на рынке и в мешке",
        en: "−1 VP for each corpse on your Market and in your bag",
        zh: "市场上和袋中每具尸体扣 1 分",
      },
    ),
  ],
} as const satisfies ExpansionDefinition;

/*
 * Source: official Orléans rules by dlp games (EN), p. 19,
 * the 'End of the Game and Scoring' section.
 *
 * Coins and goods are flat: 1 VP per coin, and 5/4/3/2/1 VP for brocade, wool,
 * wine, cheese and grain. Trading Stations and Citizen Tiles are not — each is
 * worth as many VP as the player's Development Status, so both rows reference
 * the `development` row and let `createScaledByCountsField` do the product.
 *
 * `development` itself scores nothing; it exists to be that multiplier, the
 * same arrangement as `matchaGardenersOnBoard` in white-castle.ts. Its hint
 * says so outright, otherwise a row that always reads 0 looks broken.
 *
 * The booklet's own example pins the formula down: 5 Trading Stations and
 * 2 Citizen Tiles at a Development Status of 4 score (5 + 2) × 4 = 28 VP.
 */
export const orleansScoring = {
  id: "orleans",
  minPlayers: 2,
  maxPlayers: 4,
  fields: [
    createMultiplyField(
      "coins",
      { ru: "Монеты", en: "Coins", zh: "钱币" },
      1,
      {
        ru: "1 ПО за каждую монету",
        en: "1 VP per coin",
        zh: "每枚钱币得 1 分",
      },
    ),
    createMultiplyField(
      "brocade",
      { ru: "Парча", en: "Brocade", zh: "织锦" },
      5,
      {
        ru: "5 ПО за каждую парчу",
        en: "5 VP per brocade",
        zh: "每个织锦得 5 分",
      },
    ),
    createMultiplyField(
      "wool",
      { ru: "Шерсть", en: "Wool", zh: "羊毛" },
      4,
      { ru: "4 ПО за каждую шерсть", en: "4 VP per wool", zh: "每个羊毛得 4 分" },
    ),
    createMultiplyField(
      "wine",
      { ru: "Вино", en: "Wine", zh: "葡萄酒" },
      3,
      {
        ru: "3 ПО за каждое вино",
        en: "3 VP per wine",
        zh: "每个葡萄酒得 3 分",
      },
    ),
    createMultiplyField(
      "cheese",
      { ru: "Сыр", en: "Cheese", zh: "奶酪" },
      2,
      { ru: "2 ПО за каждый сыр", en: "2 VP per cheese", zh: "每个奶酪得 2 分" },
    ),
    createMultiplyField(
      "grain",
      { ru: "Зерно", en: "Grain", zh: "谷物" },
      1,
      { ru: "1 ПО за каждое зерно", en: "1 VP per grain", zh: "每个谷物得 1 分" },
    ),
    /*
     * Scores nothing on its own — it is the multiplier for the two rows below.
     * The Development Status starts at 1 and is read off the Development Track.
     */
    createMultiplyField(
      "development",
      {
        ru: "Уровень развития",
        en: "Development status",
        zh: "发展等级",
      },
      0,
      {
        ru: "Очков не даёт: это множитель для станций и граждан",
        en: "Scores nothing: it is the multiplier for the two rows below",
        zh: "本身不计分：用于计算下面两行的得分",
      },
    ),
    createScaledByCountsField(
      "tradingStations",
      {
        ru: "Торговые станции",
        en: "Trading stations",
        zh: "贸易站",
      },
      DEVELOPMENT,
      { unitValue: 1 },
      {
        ru: "ПО за каждую станцию по уровню развития",
        en: "VP per station equal to your development status",
        zh: "每个贸易站按发展等级得分",
      },
    ),
    createScaledByCountsField(
      "citizens",
      {
        ru: "Жетоны граждан",
        en: "Citizen tiles",
        zh: "市民板块",
      },
      DEVELOPMENT,
      { unitValue: 1 },
      {
        ru: "ПО за каждый жетон по уровню развития",
        en: "VP per tile equal to your development status",
        zh: "每块市民板块按发展等级得分",
      },
    ),
  ],
  expansions: [tradeIntrigue, plague],
} as const satisfies GameScoringDefinition<"orleans">;
