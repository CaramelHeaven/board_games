import buildingsArt from "@/assets/rules/gwt/buildings-art.webp";
import buildingsIcon from "@/assets/rules/gwt/buildings.webp";
import cattleArt from "@/assets/rules/gwt/cattle-art.webp";
import cattleIcon from "@/assets/rules/gwt/cattle.webp";
import citiesArt from "@/assets/rules/gwt/cities-art.webp";
import citiesIcon from "@/assets/rules/gwt/cities.webp";
import hazardsArt from "@/assets/rules/gwt/hazards-art.webp";
import hazardsIcon from "@/assets/rules/gwt/hazards.webp";
import jobMarketIcon from "@/assets/rules/gwt/job-market.webp";
import moneyIcon from "@/assets/rules/gwt/money.webp";
import objectivesIcon from "@/assets/rules/gwt/objectives.webp";
import playerBoardDiscArt from "@/assets/rules/gwt/player-board-disc-art.webp";
import playerBoardDiscIcon from "@/assets/rules/gwt/player-board-disc.webp";
import stationMastersArt from "@/assets/rules/gwt/station-masters-art.webp";
import stationMastersIcon from "@/assets/rules/gwt/station-masters.webp";
import stationsArt from "@/assets/rules/gwt/stations-art.webp";
import stationsIcon from "@/assets/rules/gwt/stations.webp";
import workers56Art from "@/assets/rules/gwt/workers-56-art.webp";
import workers56Icon from "@/assets/rules/gwt/workers-56.webp";
import type { GameFieldRules } from "./types";

/**
 * Source: official rules of Great Western Trail, Second Edition (RU edition),
 * p. 18, the 'Final scoring' block.
 * The texts are verbatim, including the typos of the original.
 */
export const gwtFieldRules: GameFieldRules<"gwt"> = {
  money: {
    icon: moneyIcon,
    text: {
      ru: "Игрок получает 1 победное очко за каждые неизрасходованные 5 долларов.",
      en: "Gain 1 victory point for every 5 Dollars that you own.",
      zh: "你每拥有 5 元，即可获得 1 分。",
    },
  },
  buildings: {
    icon: buildingsIcon,
    art: [buildingsArt],
    text: {
      ru: "Игрок получает столько победных очков, сколько указанно на каждом его жетоне частной постройки, размещенном на игровом поле.",
      en: "Gain the sum of the victory points printed on each of your private building tiles that is placed on the game board.",
      zh: "你在游戏板上放置的每个私人建筑板块，按其上标示的分数计分，取总和。",
    },
  },
  cities: {
    icon: citiesIcon,
    art: [citiesArt],
    text: {
      ru: "Игрок получает столько победных очков, сколько он разблокировал с помощью своих дисков игрока на городах. Отрицательные победные очки вычитаются из полученной суммы (итоговое значение может быть и отрицательным). Подробнее на стр. 10.",
      en: "Gain the sum of the victory points that you have unlocked with your discs on the city crests. Any negative victory points must be subtracted of course. (Thus even negative sums are possible.) See page 10 for details.",
      zh: "按你用玩家圆片在城市徽章上解锁的分数计分，取总和。其中的负分必须扣除（因此总和也可能为负）。详见第 10 页。",
    },
  },
  stations: {
    icon: stationsIcon,
    art: [stationsArt],
    text: {
      ru: "Игрок получает столько победных очков, сколько указано рядом с каждой ж/д станцией, на которой лежит его диск.",
      en: "Gain the sum of the victory points printed right next to each train station that has your disc on it.",
      zh: "每座放有你圆片的火车站，按其旁边标示的分数计分，取总和。",
    },
  },
  hazards: {
    icon: hazardsIcon,
    art: [hazardsArt],
    text: {
      ru: "Игрок получает сумму победных очков, изображенных на жетонах опасности, лежащих перед ним.",
      en: "Gain the sum of the victory points printed on each of the collected hazard tiles in front of you.",
      zh: "你面前收集的每个危险板块，按其上标示的分数计分，取总和。",
    },
  },
  cattle: {
    icon: cattleIcon,
    art: [cattleArt],
    text: {
      ru: "В своей колоде (своей стопке карточек, карточках на руке и стопке сброса), игрок находит все карточки скота с победными очками и получает сумму этих победных очков.",
      en: "From your deck (personal draw stack, hand cards and personal discard pile), seek out all cattle cards that have victory points on them. Then gain the sum of those victory points.",
      zh: "从你的牌库中（个人抽牌堆、手牌和个人弃牌堆），找出所有带有分数的牛牌，取这些分数的总和。",
    },
  },
  objectives: {
    icon: objectivesIcon,
    text: {
      ru: "Игрок должен найти все оставшиеся карточки целей в своей колоде. Игрок выбирает для каждой карточки, хочет ли он убрать ее из игры или положит ее в зону персональных целей (без использования мгновенных действий). После этого он проверяет все карточки целей в его зоне персональных целей по отдельности, чтобы узнать: где полностью выполнены их задачи. За те карточки целей, задачи которых выполнены полностью, он суммирует победные очки, указанные на них. За те карточки целей, задачи которых выполнены не полностью, он вычитает, указанное на карточек отрицательное количество победных очков (итоговый результат может быть отрицательным. И получает очки. Подробнее на стр. 15.",
      en: "You must seek out all objective cards that you still have in your deck. For each of those, you must decide whether you want to remove it from the game or add it to your personal objective area now (without using its immediate action). Afterwards, check each objective card in your personal objective area to see if you have fulfilled each of its tasks individually. For all cards that are entirely fulfilled, sum the positive victory points printed on them. For all cards that you have not fulfilled completely, subtract the negative points printed on them. Then gain the result as your victory points (this can also be a negative result). See page 15 for details.",
      zh: "你必须找出牌库中剩余的所有目标卡。对每一张，你要决定是将它移出游戏，还是立刻放入你的个人目标区（不使用其即时效果）。之后，逐一检查个人目标区中的每张目标卡，看你是否完成了它的全部任务。对于完全完成的卡牌，累加其上标示的正分；对于未完全完成的卡牌，扣除其上标示的负分。最后按结果计分（结果也可能为负）。详见第 15 页。",
    },
  },
  stationMasters: {
    icon: stationMastersIcon,
    art: [stationMastersArt],
    text: {
      ru: "Игрок получает сумму победных очков от индивидуальных задач жетонов начальника станции, которые лежат перед ним (эти индивидуальные задачи полностью независимы от задач на карточках целей).",
      en: "Gain the sum of victory points generated by the individual tasks of the station master tiles that you have in front of you. These individual tasks are totally independent of the tasks on objective cards.",
      zh: "按你面前站长板块的个人任务所产生的分数计分，取总和。这些个人任务与目标卡上的任务完全无关。",
    },
  },
  workers56: {
    icon: workers56Icon,
    art: [workers56Art],
    text: {
      ru: "Игрок получает по 4 победных очка за каждого рабочего на пятой и шестой клетке каждого ряда рабочих на своем планшете игрока.",
      en: "Gain 4 victory points for each worker that is placed on the fifth or sixth space of any row in your worker section.",
      zh: "你的工人区内，每有一名工人位于任意一排的第 5 或第 6 格，即可获得 4 分。",
    },
  },
  playerBoardDisc: {
    icon: playerBoardDiscIcon,
    art: [playerBoardDiscArt],
    text: {
      ru: "Игрок получает 3 победных очка, если он снял диск с этой клетки своего планшета игрока.",
      en: "Gain 3 victory points if you managed to clear this disc space on your player board.",
      zh: "如果你成功移除了玩家板上的这个圆片格，即可获得 3 分。",
    },
  },
  jobMarket: {
    icon: jobMarketIcon,
    text: {
      ru: "Игрок получает 2 победных очка, если жетон рынка труда лежит перед ним.",
      en: "Gain 2 victory points if you have the job market token in front of you.",
      zh: "如果劳动力市场标记在你面前，即可获得 2 分。",
    },
  },
};
