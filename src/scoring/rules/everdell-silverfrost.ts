import cardsArt from "@/assets/rules/everdell-silverfrost/cards-art.webp";
import cardsIcon from "@/assets/rules/everdell-silverfrost/cards.webp";
import journeyArt from "@/assets/rules/everdell-silverfrost/journey-art.webp";
import journeyIcon from "@/assets/rules/everdell-silverfrost/journey.webp";
import pointTokensArt from "@/assets/rules/everdell-silverfrost/point-tokens-art.webp";
import pointTokensIcon from "@/assets/rules/everdell-silverfrost/point-tokens.webp";
import questsArt from "@/assets/rules/everdell-silverfrost/quests-art.webp";
import questsIcon from "@/assets/rules/everdell-silverfrost/quests.webp";
import snowArt from "@/assets/rules/everdell-silverfrost/snow-art.webp";
import snowMostArt from "@/assets/rules/everdell-silverfrost/snow-most-art.webp";
import snowMostIcon from "@/assets/rules/everdell-silverfrost/snow-most.webp";
import snowIcon from "@/assets/rules/everdell-silverfrost/snow.webp";
import type { GameFieldRules } from "./types";

/**
 * Source: Everdell Silverfrost, Collector's Edition rules of play (EN),
 * 'End of Game' and 'Rewards' (printed p. 16), 'Guild' (p. 9), 'Journey'
 * (p. 10) and 'Card Types and Keywords' (p. 13).
 * EN follows the booklet wording; RU/ZH are translated from English.
 *
 * Illustrations come from the 'Quest Requirements' example on p. 9 — the only
 * place in the booklet that pictures cards standing in a city and Snow sitting
 * on them; this booklet has no final-scoring spread. Where the only picture of
 * a thing is the component shot on p. 3, the illustration is that same shot at
 * the source's own resolution rather than a second picture: the printed numbers
 * on the Journey strip and on the reward tile are what the rule is about, and
 * at 100 px they cannot be read.
 */
export const everdellSilverfrostFieldRules: GameFieldRules<"everdell-silverfrost"> =
  {
    cards: {
      icon: cardsIcon,
      art: [cardsArt],
      text: {
        ru: "Базовая стоимость карт в вашем городе.",
        en: "Base point value of cards in your city.",
        zh: "你城市中卡的基础分。",
      },
    },
    prosperity: {
      /* No icon and no illustration: the only purple Prosperity artwork in this
       * booklet is the card-type circle in the p. 13 legend, and its raster is
       * 70×77 px — a letter beats an illegible upscale (CLAUDE.md). */
      text: {
        ru: "Процветание (фиолетовые): в конце игры приносят указанные на них очки и бонусные очки, описанные на карте, за разные аспекты вашего города.",
        en: "Prosperity (Purple): At the end of the game, worth their listed points and the bonus points described on the card based on different aspects in your city.",
        zh: "繁荣（紫色）：游戏结束时，按卡上标示的分数计分，并根据你城市的不同方面获得卡上说明的额外分。",
      },
    },
    quests: {
      icon: questsIcon,
      art: [questsArt],
      text: {
        ru: "Выполненные задания в конце игры приносят указанные на них очки. Невыполненные задания очков не приносят.",
        en: "Achieved Quests are worth their listed points at the end of the game. Quests you did not achieve are not scored.",
        zh: "已完成的任务在游戏结束时按其标示的分数计分。未完成的任务不计分。",
      },
    },
    snow: {
      icon: snowIcon,
      art: [snowArt],
      text: {
        ru: "Flurries: в конце игры каждый игрок получает 1 победное очко за каждый расчищенный им жетон снега.",
        en: "Flurries: At the end of the game, each player scores 1 point for every Snow they have cleared.",
        zh: "Flurries：游戏结束时，每位玩家每清除 1 个雪标记得 1 分。",
      },
    },
    snowMost: {
      icon: snowMostIcon,
      art: [snowMostArt],
      text: {
        ru: "Кроме того, игрок (или игроки при ничьей), расчистивший больше всего снега, получает ещё 5 очков.",
        en: "Also, the player (or tied players) who cleared the most also scores 5 more points.",
        zh: "此外，清除雪最多的玩家（平局时为所有并列的玩家）额外得 5 分。",
      },
    },
    pointTokens: {
      icon: pointTokensIcon,
      art: [pointTokensArt],
      text: {
        ru: "Каждый заработанный вами жетон очков.",
        en: "Each point token you earned.",
        zh: "你获得的每个分数标记。",
      },
    },
    journey: {
      icon: journeyIcon,
      art: [journeyArt],
      text: {
        ru: "Рабочие, стоящие в конце игры на локации путешествия, приносят очки, указанные на этой локации.",
        en: "Workers on a Journey Location at the end of the game are worth the points shown on that Location.",
        zh: "游戏结束时位于旅程位置上的工人，按该位置标示的分数计分。",
      },
    },
  };
