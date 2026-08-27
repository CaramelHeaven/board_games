import bonusTilesMarketTokenArt from "@/assets/rules/gwt-new-zealand/bonus-tiles-market-token-art.webp";
import bonusTilesMarketTokenIcon from "@/assets/rules/gwt-new-zealand/bonus-tiles-market-token.webp";
import buildingsArt from "@/assets/rules/gwt-new-zealand/buildings-art.webp";
import buildingsIcon from "@/assets/rules/gwt-new-zealand/buildings.webp";
import handLimitSpaceArt from "@/assets/rules/gwt-new-zealand/hand-limit-space-art.webp";
import handLimitSpaceIcon from "@/assets/rules/gwt-new-zealand/hand-limit-space.webp";
import harbourmastersArt from "@/assets/rules/gwt-new-zealand/harbourmasters-art.webp";
import harbourmastersIcon from "@/assets/rules/gwt-new-zealand/harbourmasters.webp";
import harboursArt from "@/assets/rules/gwt-new-zealand/harbours-art.webp";
import harboursIcon from "@/assets/rules/gwt-new-zealand/harbours.webp";
import hazardAndBonusTilesArt from "@/assets/rules/gwt-new-zealand/hazard-and-bonus-tiles-art.webp";
import hazardAndBonusTilesIcon from "@/assets/rules/gwt-new-zealand/hazard-and-bonus-tiles.webp";
import objectivesArt from "@/assets/rules/gwt-new-zealand/objectives-art.webp";
import objectivesIcon from "@/assets/rules/gwt-new-zealand/objectives.webp";
import pathfinderArt from "@/assets/rules/gwt-new-zealand/pathfinder-art.webp";
import pathfinderIcon from "@/assets/rules/gwt-new-zealand/pathfinder.webp";
import poundsArt from "@/assets/rules/gwt-new-zealand/pounds-art.webp";
import poundsArt2 from "@/assets/rules/gwt-new-zealand/pounds-art2.webp";
import poundsIcon from "@/assets/rules/gwt-new-zealand/pounds.webp";
import sheepAndBonusCardsArt from "@/assets/rules/gwt-new-zealand/sheep-and-bonus-cards-art.webp";
import sheepAndBonusCardsIcon from "@/assets/rules/gwt-new-zealand/sheep-and-bonus-cards.webp";
import storehousePairsArt from "@/assets/rules/gwt-new-zealand/storehouse-pairs-art.webp";
import storehousePairsIcon from "@/assets/rules/gwt-new-zealand/storehouse-pairs.webp";
import tradingPostsArt from "@/assets/rules/gwt-new-zealand/trading-posts-art.webp";
import tradingPostsIcon from "@/assets/rules/gwt-new-zealand/trading-posts.webp";
import workers5Art from "@/assets/rules/gwt-new-zealand/workers5-art.webp";
import workers5Icon from "@/assets/rules/gwt-new-zealand/workers5.webp";
import type { GameFieldRules } from "./types";

/**
 * Source: official Great Western Trail: New Zealand rules (EN),
 * p. 19, 'The final scoring'.
 * EN is verbatim; RU/ZH are translated from English.
 *
 * The icons beside the 12 categories on that page are only ~50 px in the
 * source raster, so the artwork here comes from the components page (p. 2) and
 * the rules pages instead — the same trap `CLAUDE.md` records for base GWT.
 * Every row carries an illustration; where the booklet pictures a thing only
 * once, the illustration is a wider, higher-resolution view than the icon.
 */
export const gwtNewZealandFieldRules: GameFieldRules<"gwt-new-zealand"> = {
  pounds: {
    icon: poundsIcon,
    art: [poundsArt, poundsArt2],
    text: {
      ru: "Игрок получает 1 победное очко за каждые 5 фунтов, которыми он владеет.",
      en: "Gain 1 victory point for every 5 pounds that you own.",
      zh: "你每拥有 5 英镑，即可获得 1 分。",
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
  tradingPosts: {
    icon: tradingPostsIcon,
    art: [tradingPostsArt],
    text: {
      ru: "Игрок получает сумму победных очков, которые он разблокировал своими дисками на гербах всех торговых постов (включая местные, иностранные и шерстяные). Отрицательные победные очки вычитаются (итог может быть отрицательным). Подробнее на стр. 10.",
      en: "Gain the sum of the victory points that you have unlocked with your discs on all the trading post crests (i.e., including the local, foreign and wool trading posts). Any negative victory points must be subtracted of course. (Thus, even negative sums are possible.) See page 10 for details.",
      zh: "按你用玩家圆片在所有贸易站徽章上解锁的分数计分，取总和（包括本地、外国和羊毛贸易站）。其中的负分必须扣除（因此总和也可能为负）。详见第 10 页。",
    },
  },
  harbours: {
    icon: harboursIcon,
    art: [harboursArt],
    text: {
      ru: "Игрок получает сумму победных очков, которые он разблокировал своими дисками и складами в малых и средних гаванях на поле морских путей. Подробнее на стр. 15.",
      en: "Gain the sum of the victory points that you have unlocked with your discs and storehouses on small and medium harbours on the sea routes board. See page 15 for details.",
      zh: "按你用玩家圆片和仓库在航线板上的小型和中型港口解锁的分数计分，取总和。详见第 15 页。",
    },
  },
  pathfinder: {
    icon: pathfinderIcon,
    art: [pathfinderArt],
    text: {
      ru: "Игрок получает победные очки, которые он разблокировал своим диском на треке первопроходца. (Эти очки указаны либо рядом с диском, либо под ним — на последней разблокированной клетке с очками.)",
      en: "Gain the victory points that you have unlocked with your disc on the pathfinder track. (These points are either depicted next to your disc or below it, at the most recent unlocked victory point space.)",
      zh: "按你用玩家圆片在探路者轨道上解锁的分数计分。（这些分数标示在圆片旁边，或在其下方最近一个已解锁的得分格上。）",
    },
  },
  hazardAndBonusTiles: {
    icon: hazardAndBonusTilesIcon,
    art: [hazardAndBonusTilesArt],
    text: {
      ru: "Игрок получает сумму победных очков, указанных на каждом собранном им тайле опасности и бонусном тайле перед ним.",
      en: "Gain the sum of the victory points printed on each of the collected hazard tiles and bonus tiles in front of you.",
      zh: "你面前收集的每个危险板块和奖励板块，按其上标示的分数计分，取总和。",
    },
  },
  sheepAndBonusCards: {
    icon: sheepAndBonusCardsIcon,
    art: [sheepAndBonusCardsArt],
    text: {
      ru: "Из своей колоды (личной стопки добора, карт на руке и личного сброса) игрок отбирает все бонусные карты (кроме бонусных карт целей) и карты овец, на которых есть победные очки. Затем он получает сумму этих очков.",
      en: "From your deck (personal draw stack, hand cards and personal discard pile), seek out all bonus cards (except bonus objective cards) and sheep cards that have victory points on them. Then gain the sum of those victory points.",
      zh: "从你的牌库（个人抽牌堆、手牌和个人弃牌堆）中，找出所有带有分数的奖励卡（不含奖励目标卡）和绵羊卡，然后按这些分数计分，取总和。",
    },
  },
  objectives: {
    icon: objectivesIcon,
    art: [objectivesArt],
    text: {
      ru: "Игрок отбирает все карты целей (включая бонусные карты целей), оставшиеся в его колоде. Для каждой он решает, убрать её из игры или выложить сейчас в свою личную область целей (без применения её немедленного действия). Затем он проверяет каждую карту целей в своей области: выполнено ли каждое её задание по отдельности. За полностью выполненные карты он суммирует указанные на них положительные победные очки, за невыполненные — вычитает указанные отрицательные. Полученный результат он записывает как победные очки (он может быть отрицательным). Подробнее на стр. 17.",
      en: "Seek out all objective cards (including bonus objective cards) that you still have in your deck. For each of those, you must decide whether you want to remove it from the game or add it to your personal objective area now (without using its immediate action). Afterwards, check each objective card in your personal objective area to see if you have fulfilled each of its tasks individually. For all cards that are entirely fulfilled, sum the positive victory points printed on them. For all cards that you have not fulfilled completely, subtract the negative points printed on them. Then gain the result as your victory points (this can also be a negative result). See page 17 for details.",
      zh: "找出你牌库中剩余的所有目标卡（包括奖励目标卡）。对于每一张，你必须决定是将其移出游戏，还是立刻放入你的个人目标区（不使用其即时行动）。之后，逐一检查你个人目标区中每张目标卡的各项任务是否都已完成。完全完成的卡，将其上标示的正分相加；未完全完成的卡，则扣除其上标示的负分。将结果记为你的得分（也可能为负）。详见第 17 页。",
    },
  },
  harbourmasters: {
    icon: harbourmastersIcon,
    art: [harbourmastersArt],
    text: {
      ru: "Игрок получает сумму победных очков, которые дают отдельные задания тайлов начальников гаваней перед ним. Эти задания никак не связаны с заданиями на картах целей.",
      en: "Gain the sum of victory points generated by the individual tasks of the harbourmaster tiles that you have in front of you. These individual tasks are totally independent of the tasks on objective cards.",
      zh: "按你面前港务长板块各自任务所产生的分数计分，取总和。这些任务与目标卡上的任务完全无关。",
    },
  },
  handLimitSpace: {
    icon: handLimitSpaceIcon,
    art: [handLimitSpaceArt],
    text: {
      ru: "Игрок получает 3 победных очка, если ему удалось освободить эту клетку с диском (лимит руки) на своём планшете.",
      en: "Gain 3 victory points if you managed to clear this disc space (hand limit) on your player board.",
      zh: "如果你成功清空了玩家板上的这个圆片格（手牌上限），则得 3 分。",
    },
  },
  workers5: {
    icon: workers5Icon,
    art: [workers5Art],
    text: {
      ru: "Игрок получает 4 победных очка за каждого рабочего, стоящего на пятой клетке любого ряда в его секции рабочих.",
      en: "Gain 4 victory points for each worker that is placed on the fifth space of any row in your worker section.",
      zh: "你工人区中每行第 5 格上的每名工人得 4 分。",
    },
  },
  /* One sentence in the booklet covers both storehouse pairs, so both rows
   * quote it and the label says which pair is which. */
  storehousePair2: {
    icon: storehousePairsIcon,
    art: [storehousePairsArt],
    text: {
      ru: "Кроме того, игрок получает 2 и/или 4 победных очка, если ему удалось освободить соответствующую пару складов на своём планшете.",
      en: "Additionally, gain 2 and/or 4 victory points if you managed to clear the corresponding pair of storehouses on your player board.",
      zh: "此外，如果你成功清空了玩家板上相应的仓库对，则得 2 分和/或 4 分。",
    },
  },
  storehousePair4: {
    icon: storehousePairsIcon,
    art: [storehousePairsArt],
    text: {
      ru: "Кроме того, игрок получает 2 и/или 4 победных очка, если ему удалось освободить соответствующую пару складов на своём планшете.",
      en: "Additionally, gain 2 and/or 4 victory points if you managed to clear the corresponding pair of storehouses on your player board.",
      zh: "此外，如果你成功清空了玩家板上相应的仓库对，则得 2 分和/或 4 分。",
    },
  },
  bonusTilesMarketToken: {
    icon: bonusTilesMarketTokenIcon,
    art: [bonusTilesMarketTokenArt],
    text: {
      ru: "Игрок получает 5 победных очков, если жетон рынка бонусных тайлов лежит перед ним.",
      en: "Gain 5 victory points if you have the bonus tiles market token in front of you.",
      zh: "如果奖励板块市场标记在你面前，则得 5 分。",
    },
  },
};
