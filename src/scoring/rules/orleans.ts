import brocadeIcon from "@/assets/rules/orleans/brocade.webp";
import cheeseIcon from "@/assets/rules/orleans/cheese.webp";
import citizensArt from "@/assets/rules/orleans/citizens-art.webp";
import citizensIcon from "@/assets/rules/orleans/citizens.webp";
import coinsIcon from "@/assets/rules/orleans/coins.webp";
import corpsesIcon from "@/assets/rules/orleans/corpses.webp";
import developmentArt from "@/assets/rules/orleans/development-art.webp";
import developmentIcon from "@/assets/rules/orleans/development.webp";
import goodsArt from "@/assets/rules/orleans/goods-art.webp";
import grainIcon from "@/assets/rules/orleans/grain.webp";
import indulgencesArt from "@/assets/rules/orleans/indulgences-art.webp";
import indulgencesIcon from "@/assets/rules/orleans/indulgences.webp";
import ordersArt from "@/assets/rules/orleans/orders-art.webp";
import ordersIcon from "@/assets/rules/orleans/orders.webp";
import tradingStationsArt from "@/assets/rules/orleans/trading-stations-art.webp";
import tradingStationsIcon from "@/assets/rules/orleans/trading-stations.webp";
import wineIcon from "@/assets/rules/orleans/wine.webp";
import woolIcon from "@/assets/rules/orleans/wool.webp";
import type { GameFieldRules } from "./types";

/**
 * Source: official Orléans rules by dlp games (EN), p. 19,
 * the 'End of the Game and Scoring' section.
 * The English texts are verbatim, ru and zh are translated from English.
 *
 * The booklet lists all five goods under one 'Goods:' heading, and both
 * multiplied categories under one 'Trading Stations and Citizen Tiles:'
 * heading. Each row here quotes its own heading and its own line, the same way
 * the room rows do in grand-austria-hotel.ts.
 *
 * `development` is the one entry that is not part of the final scoring block:
 * the Development Status is not a category, it is the multiplier the last two
 * rows are read against. Its text is the Note printed beside the Development
 * Track on the same page, which is where the booklet explains that role.
 *
 * Icons come from the icon block beside that section, cropped with the goods
 * tile and its blue VP shield together: at token size the shield's number is
 * what makes one brown tile tell itself apart from the next.
 *
 * The illustrations come from the setup and action spreads (pp. 5 and 10), and
 * one of them — `goodsArt`, the row of five goods tiles — serves all five goods
 * rows, the way `castleArt` serves four rows in white-castle.ts. `coins` has no
 * illustration: the booklet pictures coins only on event cards, which is a
 * different thing from the component.
 */
export const orleansFieldRules: GameFieldRules<"orleans"> = {
  coins: {
    icon: coinsIcon,
    text: {
      ru: "Монеты: 1 победное очко за каждую монету.",
      en: "Coins: 1 VP per coin.",
      zh: "钱币：每枚钱币得 1 分。",
    },
  },
  brocade: {
    icon: brocadeIcon,
    art: [goodsArt],
    text: {
      ru: "Товары: парча — 5 победных очков.",
      en: "Goods: Brocade: 5 VP.",
      zh: "货物：织锦得 5 分。",
    },
  },
  wool: {
    icon: woolIcon,
    art: [goodsArt],
    text: {
      ru: "Товары: шерсть — 4 победных очка.",
      en: "Goods: Wool: 4 VP.",
      zh: "货物：羊毛得 4 分。",
    },
  },
  wine: {
    icon: wineIcon,
    art: [goodsArt],
    text: {
      ru: "Товары: вино — 3 победных очка.",
      en: "Goods: Wine: 3 VP.",
      zh: "货物：葡萄酒得 3 分。",
    },
  },
  cheese: {
    icon: cheeseIcon,
    art: [goodsArt],
    text: {
      ru: "Товары: сыр — 2 победных очка.",
      en: "Goods: Cheese: 2 VP.",
      zh: "货物：奶酪得 2 分。",
    },
  },
  grain: {
    icon: grainIcon,
    art: [goodsArt],
    text: {
      ru: "Товары: зерно — 1 победное очко.",
      en: "Goods: Grain: 1 VP.",
      zh: "货物：谷物得 1 分。",
    },
  },
  development: {
    icon: developmentIcon,
    art: [developmentArt],
    text: {
      ru: "Уровень развития влияет на событие «Доходы», на Больницу, а также на стоимость жетонов граждан и торговых станций в победных очках в конце игры. В начале игры он равен 1.",
      en: "Your Development Status affects the “Income” event, the Hospital, as well as the victory point value of your Citizen Tiles and Trading Stations at the end of the game. At the beginning of the game, this value is 1.",
      zh: "你的发展等级会影响“收入”事件、医院，以及游戏结束时市民板块和贸易站的分值。游戏开始时该值为 1。",
    },
  },
  tradingStations: {
    icon: tradingStationsIcon,
    art: [tradingStationsArt],
    text: {
      ru: "Торговые станции и жетоны граждан: каждая построенная торговая станция и каждый собранный жетон гражданина приносят столько победных очков, каков уровень развития игрока. (Пример: Клеменс построил 5 торговых станций и собрал 2 жетона граждан. Его уровень развития — 4 по треку развития. Он получает (5 + 2) × 4 = 28 победных очков.)",
      en: "Trading Stations and Citizen Tiles: Each Trading Station you have built and every Citizen Tile you have collected is worth a number of VP equal to your Development Status. (Example: Klemens has built 5 Trading Stations and collected 2 Citizen Tiles. His current Development Status is 4, as indicated by the Development Track. He receives (5+2) x 4 = 28 VP.)",
      zh: "贸易站与市民板块：你建造的每个贸易站、你收集的每块市民板块，各得与你的发展等级相同的分数。（例：克莱门斯建造了 5 个贸易站，收集了 2 块市民板块。他当前的发展等级为 4，因此得 (5+2) × 4 = 28 分。）",
    },
  },
  citizens: {
    icon: citizensIcon,
    art: [citizensArt],
    text: {
      ru: "Торговые станции и жетоны граждан: каждая построенная торговая станция и каждый собранный жетон гражданина приносят столько победных очков, каков уровень развития игрока.",
      en: "Trading Stations and Citizen Tiles: Each Trading Station you have built and every Citizen Tile you have collected is worth a number of VP equal to your Development Status.",
      zh: "贸易站与市民板块：你建造的每个贸易站、你收集的每块市民板块，各得与你的发展等级相同的分数。",
    },
  },

  /* Trade & Intrigue: the module's 'Game End and Scoring' line, p. 15. */
  orders: {
    icon: ordersIcon,
    art: [ordersArt],
    text: {
      ru: "В конце игры игрок прибавляет к своему счёту победные очки, указанные на выполненных им картах заказов.",
      en: "At the end of the game, add the victory points on your fulfilled Order cards to your score.",
      zh: "游戏结束时，将你已完成订单卡上的分数加入总分。",
    },
  },

  /*
   * The Plague: the module's 'Scoring' paragraph, p. 23. One paragraph, two
   * categories — the Indulgences add, the Corpses subtract — so each row quotes
   * the sentence that belongs to it.
   */
  indulgences: {
    icon: indulgencesIcon,
    art: [indulgencesArt],
    text: {
      ru: "Игрок подсчитывает очки в конце игры как обычно, а затем прибавляет очки, указанные на сыгранных им картах индульгенций (на тех, чьё условие он смог выполнить).",
      en: "Tally your points at the end of the game, as usual. Then add the points shown on the Indulgence cards you have played (on those whose condition you were able to fulfill).",
      zh: "游戏结束时照常结算分数，然后加上你已打出的赎罪券卡上标示的分数（仅限你满足了其条件的那些）。",
    },
  },
  corpses: {
    // No illustration: the booklet pictures the piece itself and nothing more,
    // and that picture is already the icon.
    icon: corpsesIcon,
    text: {
      ru: "Игрок считает свои трупы на рынке и в мешке и вычитает по 1 очку за каждый труп.",
      en: "Now count your Corpses on the Market and in your bag and subtract 1 point for each corpse.",
      zh: "接着数出你市场上和袋中的尸体，每具尸体扣 1 分。",
    },
  },
};
