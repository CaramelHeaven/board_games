import buildingsArt from "@/assets/rules/gwt-argentina/buildings-art.webp";
import buildingsIcon from "@/assets/rules/gwt-argentina/buildings.webp";
import cattleArt from "@/assets/rules/gwt-argentina/cattle-art.webp";
import cattleIcon from "@/assets/rules/gwt-argentina/cattle.webp";
import citiesArt from "@/assets/rules/gwt-argentina/cities-art.webp";
import citiesIcon from "@/assets/rules/gwt-argentina/cities.webp";
import farmersArt from "@/assets/rules/gwt-argentina/farmers-art.webp";
import farmersIcon from "@/assets/rules/gwt-argentina/farmers.webp";
import jobMarketIcon from "@/assets/rules/gwt-argentina/job-market.webp";
import objectivesIcon from "@/assets/rules/gwt-argentina/objectives.webp";
import pesosIcon from "@/assets/rules/gwt-argentina/pesos.webp";
import playerBoardDiscArt from "@/assets/rules/gwt-argentina/player-board-disc-art.webp";
import playerBoardDiscIcon from "@/assets/rules/gwt-argentina/player-board-disc.webp";
import shipsArt from "@/assets/rules/gwt-argentina/ships-art.webp";
import shipsIcon from "@/assets/rules/gwt-argentina/ships.webp";
import stationMastersArt from "@/assets/rules/gwt-argentina/station-masters-art.webp";
import stationMastersIcon from "@/assets/rules/gwt-argentina/station-masters.webp";
import stationsArt from "@/assets/rules/gwt-argentina/stations-art.webp";
import stationsIcon from "@/assets/rules/gwt-argentina/stations.webp";
import workers56Art from "@/assets/rules/gwt-argentina/workers-56-art.webp";
import workers56Icon from "@/assets/rules/gwt-argentina/workers-56.webp";
import type { GameFieldRules } from "./types";

/**
 * Source: official Great Western Trail: Argentina rules (EN),
 * p. 19, the 'The final scoring' block.
 * EN is verbatim; RU/ZH are translated from English.
 */
export const gwtArgentinaFieldRules: GameFieldRules<"gwt-argentina"> = {
  pesos: {
    icon: pesosIcon,
    text: {
      ru: "Игрок получает 1 победное очко за каждые 5 песо, которыми он владеет.",
      en: "Gain 1 victory point for every 5 pesos that you own.",
      zh: "你每拥有 5 比索，即可获得 1 分。",
    },
  },
  buildings: {
    icon: buildingsIcon,
    art: [buildingsArt],
    text: {
      ru: "Игрок получает сумму победных очков, указанных на каждом его тайле частной постройки, размещённом на общем поле.",
      en: "Gain the sum of the victory points printed on each of your private building tiles that is placed on the game board.",
      zh: "你在主图板上放置的每个私人建筑板块，按其上标示的分数计分，取总和。",
    },
  },
  ships: {
    icon: shipsIcon,
    art: [shipsArt],
    text: {
      ru: "Игрок получает сумму победных очков, которые он разблокировал своими дисками на кораблях. Отрицательные победные очки вычитаются из полученной суммы (итог может быть отрицательным). Подробнее на стр. 10.",
      en: "Gain the sum of the victory points that you have unlocked with your discs on the ships. Any negative victory points must be subtracted of course. (Thus even negative sums are possible.) See page 10 for details.",
      zh: "按你用玩家圆片在船上解锁的分数计分，取总和。其中的负分必须扣除（因此总和也可能为负）。详见第 10 页。",
    },
  },
  cities: {
    icon: citiesIcon,
    art: [citiesArt],
    text: {
      ru: "Игрок получает сумму победных очков, которые он разблокировал своими дисками на картах городов. Учтите, что большинство причалов также дают очки за каждый диск на них. Подробнее на стр. 9.",
      en: "Gain the sum of the victory points that you have unlocked with your discs on the city maps. Note that most quays also score you points per disc on them. See page 9 for details.",
      zh: "按你用玩家圆片在城市地图上解锁的分数计分，取总和。注意：大多数码头也会按上面的圆片计分。详见第 9 页。",
    },
  },
  stations: {
    icon: stationsIcon,
    art: [stationsArt],
    text: {
      ru: "Игрок получает сумму победных очков, указанных рядом с каждой ж/д станцией, на которой лежит его диск. (Если на конечной станции у вас больше одного маркера, вы получите её очки соответствующее число раз.)",
      en: "Gain the sum of the victory points printed right next to each train station that has your disc on it. (If you have more than one marker on the final station, you will receive its points multiple times accordingly.)",
      zh: "每座放有你圆片的火车站，按其旁边标示的分数计分，取总和。（若在最后一座车站上有多个标记，则该车站分数按标记数量重复计分。）",
    },
  },
  farmers: {
    icon: farmersIcon,
    art: [farmersArt],
    text: {
      ru: "Игрок получает по 2 победных очка за каждый собранный тайл фермера перед собой (но не за те, что лежат на его планшете).",
      en: "Gain 2 victory points for each of the collected farmer tiles in front of you (but not for those on your player board).",
      zh: "你面前收集的每个农夫板块可得 2 分（玩家板上的不算）。",
    },
  },
  cattle: {
    icon: cattleIcon,
    art: [cattleArt],
    text: {
      ru: "В своей колоде (личной стопке добора, картах на руке и личной стопке сброса) игрок находит все карты истощения и карты скота с победными очками и получает сумму этих очков. Отрицательные победные очки вычитаются (итог может быть отрицательным).",
      en: "From your deck (personal draw stack, hand cards and personal discard pile), seek out all exhaustion cards and cattle cards that have victory points on them. Then gain the sum of those victory points. Any negative victory points must be subtracted (thus even negative sums are also possible).",
      zh: "从你的牌库中（个人抽牌堆、手牌和个人弃牌堆），找出所有带有分数的疲惫卡和牛卡，取这些分数的总和。其中的负分必须扣除（因此总和也可能为负）。",
    },
  },
  objectives: {
    icon: objectivesIcon,
    text: {
      ru: "Игрок должен найти все оставшиеся карты целей в своей колоде. Для каждой он решает, убрать её из игры или положить сейчас в зону персональных целей (без использования мгновенного действия). Затем он проверяет каждую карту целей в этой зоне: выполнены ли все её задачи по отдельности. За полностью выполненные карты суммируются положительные победные очки на них. За неполностью выполненные вычитаются отрицательные очки на них. Итог (он может быть отрицательным) идёт в счёт. Подробнее на стр. 16.",
      en: "You must seek out all objective cards that you still have in your deck. For each of those, you must decide whether you want to remove it from the game or add it to your personal objective area now (without using its immediate action). Afterwards, check each objective card in your personal objective area to see if you have fulfilled each of its tasks individually. For all cards that are entirely fulfilled, sum the positive victory points printed on them. For all cards that you have not fulfilled completely, subtract the negative points printed on them. Then gain the result as your victory points (this can also be a negative result). See page 16 for details.",
      zh: "你必须找出牌库中剩余的所有目标卡。对每一张，你要决定是将它移出游戏，还是立刻放入你的个人目标区（不使用其即时效果）。之后，逐一检查个人目标区中的每张目标卡，看你是否完成了它的全部任务。对于完全完成的卡，累加其上标示的正分；对于未完全完成的卡，扣除其上标示的负分。最后按结果计分（结果也可能为负）。详见第 16 页。",
    },
  },
  stationMasters: {
    icon: stationMastersIcon,
    art: [stationMastersArt],
    text: {
      ru: "Игрок получает сумму победных очков от индивидуальных задач тайлов начальника станции, которые лежат перед ним. Эти индивидуальные задачи (см. таблицу ниже) полностью независимы от задач на картах целей.",
      en: "Gain the sum of victory points generated by the individual tasks of the station master tiles that you have in front of you. These individual tasks (see chart below) are totally independent of the tasks on objective cards.",
      zh: "按你面前站长板块的个人任务所产生的分数计分，取总和。这些个人任务（见下方一览）与目标卡上的任务完全无关。",
    },
  },
  workers56: {
    icon: workers56Icon,
    art: [workers56Art],
    text: {
      ru: "Игрок получает по 4 победных очка за каждого рабочего на пятой или шестой клетке любого ряда в секции рабочих на своём планшете.",
      en: "Gain 4 victory points for each worker that is placed on the fifth or sixth space of any row in your worker section.",
      zh: "你的工人区内，每有一名工人位于任意一排的第 5 或第 6 格，即可获得 4 分。",
    },
  },
  playerBoardDisc: {
    icon: playerBoardDiscIcon,
    art: [playerBoardDiscArt],
    text: {
      ru: "Игрок получает 2 победных очка, если снял диск с этой клетки своего планшета игрока.",
      en: "Gain 2 victory points if you managed to clear this disc space on your player board.",
      zh: "如果你成功移除了玩家板上的这个圆片格，即可获得 2 分。",
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
