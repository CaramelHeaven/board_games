import castleArt from "@/assets/rules/white-castle/castle-art.webp";
import coinsIcon from "@/assets/rules/white-castle/coins-and-seals.webp";
import courtierIcon from "@/assets/rules/white-castle/courtier.webp";
import gateIcon from "@/assets/rules/white-castle/courtiers-gate.webp";
import gardenersArt from "@/assets/rules/white-castle/gardeners-art.webp";
import gardenersIcon from "@/assets/rules/white-castle/gardeners.webp";
import passageArt from "@/assets/rules/white-castle/passage-of-time-art.webp";
import passageIcon from "@/assets/rules/white-castle/passage-of-time.webp";
import resourcesArt from "@/assets/rules/white-castle/resources-art.webp";
import resourcesIcon from "@/assets/rules/white-castle/resources.webp";
import warriorsArt from "@/assets/rules/white-castle/warriors-art.webp";
import warriorsIcon from "@/assets/rules/white-castle/warriors.webp";
import type { GameFieldRules } from "./types";

/**
 * Source: official The White Castle rules by Devir
 * (English edition, p. 14, 'End of the Game' section).
 * The English texts are verbatim, ru and zh are translated from English.
 *
 * The `duringGame` field is missing here on purpose: points scored during
 * the game are not an entry of the final scoring, and no verbatim wording
 * exists for them in the rules. It keeps its letter and its own hint.
 */
export const whiteCastleFieldRules: GameFieldRules = {
  coinsAndSeals: {
    icon: coinsIcon,
    text: {
      ru: "За каждые 5 монет и/или печатей дайме игрок получает 1 очко клана (с округлением вниз).",
      en: "For every 5 coins and/or Daimyo Seals you have, 1 Clan Point is granted (rounded down).",
      zh: "你每拥有 5 枚钱币和／或大名印章，即可获得 1 点家族分（向下取整）。",
    },
  },
  resources: {
    icon: resourcesIcon,
    art: [resourcesArt],
    text: {
      ru: "За каждый ресурс, которого осталось от 3 до 6 единиц, игрок получает 1 очко клана. Если ресурса осталось 7 единиц, он получает 2 очка клана.",
      en: "For each Resource that you have between 3 and 6 units remaining, 1 Clan Point is granted. If you have 7 units of a Resource left, you get 2 Clan Points.",
      zh: "每种资源若剩余 3 至 6 单位，可获得 1 点家族分；若剩余 7 单位，则获得 2 点家族分。",
    },
  },
  passageOfTime: {
    icon: passageIcon,
    art: [passageArt],
    text: {
      ru: "Если маркер влияния игрока достиг второго сезона, он получает 3 очка клана. Если маркер остановился в третьем сезоне, игрок получает 6 очков клана. Дойдя до четвёртого сезона, игрок получает столько очков, сколько указано на клетке, которую занимает его фишка (от 10 до 15 очков клана).",
      en: "If your Influence marker has reached the second season, you get 3 Clan Points. If it ends up in the third season, then you get 6 Clan Points. Once you reach the fourth season, you are granted the score indicated on the space that your token occupies (which is between 10 and 15 Clan Points).",
      zh: "若你的影响力标记到达第二季，可得 3 点家族分；若停在第三季，则得 6 点家族分；一旦进入第四季，则按你的标记所在格子上标示的分数计分（10 至 15 点家族分）。",
    },
  },
  courtiersGate: {
    icon: gateIcon,
    art: [castleArt],
    text: {
      ru: "Каждый придворный в замке приносит очки клана в зависимости от того, где он находится: 1 очко клана у ворот.",
      en: "Each Courtier that is in the Castle grants Clan Points depending on the location they are in: 1 Clan Point at the Gate.",
      zh: "城中的每位家臣按其所在位置计分：位于城门得 1 点家族分。",
    },
  },
  courtiersFloor1: {
    icon: courtierIcon,
    art: [castleArt],
    text: {
      ru: "Каждый придворный в замке приносит очки клана в зависимости от того, где он находится: 3 очка клана, если он на первом этаже (управляющие).",
      en: "Each Courtier that is in the Castle grants Clan Points depending on the location they are in: 3 Clan Points if they are on the first floor (Stewards).",
      zh: "城中的每位家臣按其所在位置计分：位于第一层（家老）得 3 点家族分。",
    },
  },
  courtiersFloor2: {
    icon: courtierIcon,
    art: [castleArt],
    text: {
      ru: "Каждый придворный в замке приносит очки клана в зависимости от того, где он находится: 6 очков клана, если он на втором этаже (дипломаты).",
      en: "Each Courtier that is in the Castle grants Clan Points depending on the location they are in: 6 Clan Points if they are on the second floor (Diplomats).",
      zh: "城中的每位家臣按其所在位置计分：位于第二层（外交官）得 6 点家族分。",
    },
  },
  courtiersFloor3: {
    icon: courtierIcon,
    art: [castleArt],
    text: {
      ru: "Каждый придворный в замке приносит очки клана в зависимости от того, где он находится: 10 очков клана, если он на третьем этаже (дайме).",
      en: "Each Courtier that is in the Castle grants Clan Points depending on the location they are in: 10 Clan Points if they are on the third floor (Daimyo).",
      zh: "城中的每位家臣按其所在位置计分：位于第三层（大名）得 10 点家族分。",
    },
  },
  warriors2: {
    icon: warriorsIcon,
    art: [warriorsArt],
    text: {
      ru: "Игрок получает очки клана за тренировочный двор, умножая суммарное значение своих воинов в этом месте на число придворных, которые находятся внутри замка (не у ворот). Каждый воин имеет значение, указанное во дворе, который он занимает, согласно этим иконкам.",
      en: "You gain Clan Points for the Yard by multiplying the total value of your Warriors in this location by the number of Courtiers that you have inside the Castle (not at the Gate): Each Warrior has the value indicated in the Yard they occupy based on these icons.",
      zh: "训练场的得分为：你在该处武士的数值总和，乘以你在城内（不含城门）的家臣数量。每位武士的数值依其所在训练场的图示而定。",
    },
  },
  warriors1: {
    icon: warriorsIcon,
    art: [warriorsArt],
    text: {
      ru: "Игрок получает очки клана за тренировочный двор, умножая суммарное значение своих воинов в этом месте на число придворных, которые находятся внутри замка (не у ворот). Каждый воин имеет значение, указанное во дворе, который он занимает, согласно этим иконкам.",
      en: "You gain Clan Points for the Yard by multiplying the total value of your Warriors in this location by the number of Courtiers that you have inside the Castle (not at the Gate): Each Warrior has the value indicated in the Yard they occupy based on these icons.",
      zh: "训练场的得分为：你在该处武士的数值总和，乘以你在城内（不含城门）的家臣数量。每位武士的数值依其所在训练场的图示而定。",
    },
  },

  gardeners: {
    icon: gardenersIcon,
    art: [gardenersArt],
    text: {
      ru: "Каждый садовник приносит своему клану столько очков клана, сколько указано на карте, на которой он находится.",
      en: "Each Gardener grants their Clan as many Clan Points as is shown on the card they are on.",
      zh: "每位园丁按其所在卡牌上标示的分数，为其家族带来相应的家族分。",
    },
  },
};
