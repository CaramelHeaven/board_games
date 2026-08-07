import type { StaticImageData } from "next/image";
import type { Translated } from "@/i18n/types";
import castlesOfBurgundyImage from "@/assets/games/castles-of-burgundy.jpg";
import grandAustriaHotelImage from "@/assets/games/grand-austria-hotel.jpg";
import gwtArgentinaImage from "@/assets/games/gwt-argentina.png";
import gwtImage from "@/assets/games/gwt.jpg";
import tzolkinImage from "@/assets/games/tzolkin.jpg";
import whiteCastleImage from "@/assets/games/white-castle.jpg";
import wingspanImage from "@/assets/games/wingspan.jpg";

export type Game = {
  id: string;
  name: Translated;
  bggId: number;
  image: StaticImageData;
};

export const games: Game[] = [
  {
    id: "gwt",
    name: { ru: "GWT", en: "Great Western Trail", zh: "大西部之路" },
    bggId: 341169,
    image: gwtImage,
  },
  {
    id: "gwt-argentina",
    name: {
      ru: "GWT Аргентина",
      en: "Great Western Trail: Argentina",
      zh: "大西部之路：阿根廷",
    },
    bggId: 364011,
    image: gwtArgentinaImage,
  },
  {
    id: "white-castle",
    name: { ru: "Белый замок", en: "The White Castle", zh: "白色城堡" },
    bggId: 371942,
    image: whiteCastleImage,
  },
  {
    id: "tzolkin",
    name: { ru: "Тзолкин", en: "Tzolk'in", zh: "卓尔金历" },
    bggId: 126163,
    image: tzolkinImage,
  },
  {
    id: "castles-of-burgundy",
    name: {
      ru: "Замки бургундии",
      en: "The Castles of Burgundy: Special Edition",
      zh: "勃艮第城堡",
    },
    bggId: 363622,
    image: castlesOfBurgundyImage,
  },
  {
    id: "wingspan",
    name: { ru: "Wingspan", en: "Wingspan", zh: "展翅翱翔" },
    bggId: 266192,
    image: wingspanImage,
  },
  {
    id: "grand-austria-hotel",
    name: {
      ru: "Grand Austria Hotel",
      en: "Grand Austria Hotel",
      zh: "奥地利大饭店",
    },
    bggId: 182874,
    image: grandAustriaHotelImage,
  },
];
