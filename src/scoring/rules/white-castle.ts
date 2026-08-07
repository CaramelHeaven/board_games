import castleArt from "@/assets/rules/white-castle/castle-art.webp";
import coinsIcon from "@/assets/rules/white-castle/coins-and-seals.webp";
import courtierIcon from "@/assets/rules/white-castle/courtier.webp";
import gateIcon from "@/assets/rules/white-castle/courtiers-gate.webp";
import gardenersArt from "@/assets/rules/white-castle/gardeners-art.webp";
import gardenersIcon from "@/assets/rules/white-castle/gardeners.webp";
import geishaIcon from "@/assets/rules/white-castle/matcha-geisha.webp";
import pondArt from "@/assets/rules/white-castle/matcha-pond-art.webp";
import pondIcon from "@/assets/rules/white-castle/matcha-pond.webp";
import teaHouseArt from "@/assets/rules/white-castle/matcha-teahouse-art.webp";
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
export const whiteCastleFieldRules: GameFieldRules<"white-castle"> = {
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

  /*
   * Matcha. Source: The White Castle: Matcha (EN), 'End of the Game', p. 11,
   * section 3D 'In the Tea Garden'. The booklet gives the whole category as one
   * bulleted list; each bullet becomes a row here, so each row quotes its own
   * bullet.
   */
  matchaGeishaPond: {
    icon: pondIcon,
    art: [pondArt],
    text: {
      ru: "2 очка клана, если гейша находится у Пруда. От одного клана у Пруда может быть только одна гейша.",
      en: "2 Clan Points if she is at the Pond Overlook. Only 1 Geisha from each Clan can be at the Pond Overlook.",
      zh: "位于池畔观景台的艺伎得 2 家族分。每个家族在池畔观景台只能有 1 位艺伎。",
    },
  },
  matchaGeishaEntrance: {
    icon: geishaIcon,
    text: {
      ru: "1 очко клана, если гейша находится у входа в Чайный сад.",
      en: "1 Clan Point if she is at the entrance to the Tea Garden.",
      zh: "位于茶园入口的艺伎得 1 家族分。",
    },
  },
  matchaGeishaStep1: {
    icon: geishaIcon,
    text: {
      ru: "2 очка клана за каждую гейшу, которая в итоге оказалась на первом шаге Пути чая.",
      en: "2 Clan Points for each Geisha that ends up on the first step of the Path of Tea.",
      zh: "最终位于茶之道第一步的每位艺伎得 2 家族分。",
    },
  },
  matchaGeishaStep2: {
    icon: geishaIcon,
    text: {
      ru: "3 очка клана за каждую гейшу, которая в итоге оказалась на втором шаге Пути чая.",
      en: "3 Clan Points for each Geisha that ends up on the second step of the Path of Tea.",
      zh: "最终位于茶之道第二步的每位艺伎得 3 家族分。",
    },
  },
  /*
   * Not a rule from the booklet — a field the sheet needs. Said plainly, so
   * that nobody looks for this row in the rules and fails to find it.
   */
  matchaGardenersOnBoard: {
    icon: gardenersIcon,
    text: {
      ru: "Строка счётного листа, а не правило из буклета. Сама очков не приносит: приложению нужно число садовников, чтобы посчитать комнату садовников в Чайном доме. Базовая строка «ПО садовников» хранит очки, а не количество.",
      en: "A row of this sheet, not a rule from the booklet. It scores nothing on its own: the app needs the number of Gardeners to score the Gardeners' room in the Tea House, and the base row for Gardeners holds points rather than a count.",
      zh: "这是计分表的一行，并非规则书中的条目。它本身不计分：应用需要园丁的数量来计算茶室中园丁房间的得分，而基础的园丁一行记录的是分数而非数量。",
    },
  },
  matchaGeishaRoomGardeners: {
    icon: gardenersIcon,
    art: [teaHouseArt],
    text: {
      ru: "2 очка клана за каждого садовника, который есть у вас на поле, за каждую вашу гейшу в соответствующей комнате Чайного дома. Гейши у Пруда и на Пути чая при подсчёте комнат не учитываются.",
      en: "2 Clan Points for each Gardener you have on the board for each of your Geishas in the corresponding room of the Tea House. Geishas at the Pond Overlook or on the Path of Tea are not taken into account when scoring the rooms.",
      zh: "茶室对应房间中你的每位艺伎，按你场上每名园丁得 2 家族分。计算房间得分时，不计入池畔观景台或茶之道上的艺伎。",
    },
  },
  matchaGeishaRoomWarriors: {
    icon: warriorsIcon,
    art: [teaHouseArt],
    text: {
      ru: "2 очка клана за каждого воина, который есть у вас на поле, за каждую вашу гейшу в соответствующей комнате Чайного дома. Гейши у Пруда и на Пути чая при подсчёте комнат не учитываются.",
      en: "2 Clan Points for each Warrior you have on the board for each of your Geishas in the corresponding room of the Tea House. Geishas at the Pond Overlook or on the Path of Tea are not taken into account when scoring the rooms.",
      zh: "茶室对应房间中你的每位艺伎，按你场上每名武士得 2 家族分。计算房间得分时，不计入池畔观景台或茶之道上的艺伎。",
    },
  },
  matchaGeishaRoomCourtiers: {
    icon: courtierIcon,
    art: [teaHouseArt],
    text: {
      ru: "2 очка клана за каждого придворного, который есть у вас на поле, включая проходную комнату Чайного дома, за каждую вашу гейшу в соответствующей комнате. Гейши у Пруда и на Пути чая при подсчёте комнат не учитываются.",
      en: "2 Clan Points for each Courtier (including the crossing room of the Tea House) you have on the board for each of your Geishas in the corresponding room of the Tea House. Geishas at the Pond Overlook or on the Path of Tea are not taken into account when scoring the rooms.",
      zh: "茶室对应房间中你的每位艺伎，按你场上每名家臣（含茶室的通行房间）得 2 家族分。计算房间得分时，不计入池畔观景台或茶之道上的艺伎。",
    },
  },
};
