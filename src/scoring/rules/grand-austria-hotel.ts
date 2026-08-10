import cafeGuestsArt from "@/assets/rules/grand-austria-hotel/cafe-guests-art.webp";
import cafeGuestsIcon from "@/assets/rules/grand-austria-hotel/cafe-guests.webp";
import kitchenArt from "@/assets/rules/grand-austria-hotel/kitchen-art.webp";
import kitchenIcon from "@/assets/rules/grand-austria-hotel/kitchen.webp";
import champagneArt from "@/assets/rules/grand-austria-hotel/lets-waltz-champagne-art.webp";
import champagneIcon from "@/assets/rules/grand-austria-hotel/lets-waltz-champagne.webp";
import roomsArt from "@/assets/rules/grand-austria-hotel/rooms-art.webp";
import roomsIcon from "@/assets/rules/grand-austria-hotel/rooms.webp";
import staffArt from "@/assets/rules/grand-austria-hotel/staff-art.webp";
import staffIcon from "@/assets/rules/grand-austria-hotel/staff.webp";
import type { GameFieldRules } from "./types";

/**
 * Source: official Grand Austria Hotel rules by Lookout Games
 * (English edition, p. 12, 'Game End and Final Scoring' section).
 * The English texts are verbatim, ru and zh are translated from English.
 *
 * The `duringGame` field is missing here on purpose: points scored during
 * the game are not an entry of the final scoring, and no verbatim wording
 * exists for them in the rules. It keeps its letter and its own hint.
 */
export const grandAustriaHotelFieldRules: GameFieldRules<"grand-austria-hotel"> =
  {
    staff: {
      icon: staffIcon,
      art: [staffArt],
      text: {
        ru: "Игрок получает победные очки за карты персонала, которые их приносят.",
        en: "You receive Victory Points for your Staff cards that provide them.",
        zh: "能提供分数的员工卡，按其上标示的分数计分。",
      },
    },
    roomsRow1: {
      icon: roomsIcon,
      art: [roomsArt],
      text: {
        ru: "Игрок получает победные очки за занятые номера: 1 победное очко за каждый номер в первом ряду его планшета отеля.",
        en: "You receive Victory Points for your occupied rooms: 1 Victory Point for each room in the first row of your Hotel board.",
        zh: "你的已入住客房可以计分：饭店图板第一排的每间客房得 1 分。",
      },
    },
    roomsRow2: {
      icon: roomsIcon,
      art: [roomsArt],
      text: {
        ru: "Игрок получает победные очки за занятые номера: 2 победных очка за каждый номер во втором ряду его планшета отеля.",
        en: "You receive Victory Points for your occupied rooms: 2 Victory Points each in the second row.",
        zh: "你的已入住客房可以计分：第二排的每间客房得 2 分。",
      },
    },
    roomsRow3: {
      icon: roomsIcon,
      art: [roomsArt],
      text: {
        ru: "Игрок получает победные очки за занятые номера: 3 победных очка за каждый номер в третьем ряду его планшета отеля.",
        en: "You receive Victory Points for your occupied rooms: 3 Victory Points each in the third row.",
        zh: "你的已入住客房可以计分：第三排的每间客房得 3 分。",
      },
    },
    roomsRow4: {
      icon: roomsIcon,
      art: [roomsArt],
      text: {
        ru: "Игрок получает победные очки за занятые номера: 4 победных очка за каждый номер в верхнем ряду его планшета отеля.",
        en: "You receive Victory Points for your occupied rooms: 4 Victory Points each in the top row.",
        zh: "你的已入住客房可以计分：最上排的每间客房得 4 分。",
      },
    },
    kitchen: {
      icon: kitchenIcon,
      art: [kitchenArt],
      text: {
        ru: "Игрок получает 1 победное очко за каждую крону и за каждые оставшиеся блюдо и напиток в его кухне.",
        en: "You receive 1 Victory Point for each krone and leftover dish and drink in your Kitchen.",
        zh: "你厨房中的每枚克朗、每份剩余的菜肴和饮品各得 1 分。",
      },
    },
    cafeGuests: {
      icon: cafeGuestsIcon,
      art: [cafeGuestsArt],
      text: {
        ru: "Игрок теряет 5 победных очков за каждого гостя в его кафе.",
        en: "You lose 5 Victory Points for each guest in your Café.",
        zh: "你咖啡厅中的每位客人使你失去 5 分。",
      },
    },

    /*
     * Let's Waltz! Source: Grand Austria Hotel: Let's Waltz! (EN, Retail
     * Edition), module 1 'Vienna Ballrooms', 'Game End and Final Scoring',
     * p. 7 — the one sentence the whole box adds to the final scoring.
     *
     * The art is the kitchen from the module's setup, p. 4: champagne is the
     * yellow token, kept there beside the dishes and drinks.
     */
    letsWaltzChampagne: {
      icon: champagneIcon,
      art: [champagneArt],
      text: {
        ru: "Каждое шампанское, оставшееся в кухне игрока, приносит 1 победное очко.",
        en: "Each champagne left in your kitchen is worth 1 victory point.",
        zh: "你厨房中剩余的每份香槟得 1 分。",
      },
    },
  };
