export type Game = {
  id: string;
  name: string;
  bggId: number;
};

export const games: Game[] = [
  { id: "gwt", name: "GWT", bggId: 341169 },
  { id: "gwt-argentina", name: "GWT Аргентина", bggId: 364011 },
  { id: "white-castle", name: "Белый замок", bggId: 371942 },
  { id: "tzolkin", name: "Тзолкин", bggId: 126163 },
  { id: "castles-of-burgundy", name: "Замки бургундии", bggId: 84876 },
  { id: "wingspan", name: "Wingspan", bggId: 266192 },
  { id: "wingspan-asia", name: "Wingspan Asia", bggId: 366161 },
  { id: "grand-austria-hotel", name: "Grand Austria Hotel", bggId: 182874 },
];
