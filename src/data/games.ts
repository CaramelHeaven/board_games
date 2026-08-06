import type { StaticImageData } from "next/image";
import castlesOfBurgundyImage from "@/assets/games/castles-of-burgundy.jpg";
import grandAustriaHotelImage from "@/assets/games/grand-austria-hotel.jpg";
import gwtArgentinaImage from "@/assets/games/gwt-argentina.png";
import gwtImage from "@/assets/games/gwt.jpg";
import tzolkinImage from "@/assets/games/tzolkin.jpg";
import whiteCastleImage from "@/assets/games/white-castle.jpg";
import wingspanAsiaImage from "@/assets/games/wingspan-asia.jpg";
import wingspanImage from "@/assets/games/wingspan.jpg";

export type Game = {
  id: string;
  name: string;
  bggId: number;
  image: StaticImageData;
};

export const games: Game[] = [
  { id: "gwt", name: "GWT", bggId: 341169, image: gwtImage },
  {
    id: "gwt-argentina",
    name: "GWT Аргентина",
    bggId: 364011,
    image: gwtArgentinaImage,
  },
  {
    id: "white-castle",
    name: "Белый замок",
    bggId: 371942,
    image: whiteCastleImage,
  },
  { id: "tzolkin", name: "Тзолкин", bggId: 126163, image: tzolkinImage },
  {
    id: "castles-of-burgundy",
    name: "Замки бургундии",
    bggId: 84876,
    image: castlesOfBurgundyImage,
  },
  { id: "wingspan", name: "Wingspan", bggId: 266192, image: wingspanImage },
  {
    id: "wingspan-asia",
    name: "Wingspan Asia",
    bggId: 366161,
    image: wingspanAsiaImage,
  },
  {
    id: "grand-austria-hotel",
    name: "Grand Austria Hotel",
    bggId: 182874,
    image: grandAustriaHotelImage,
  },
];
