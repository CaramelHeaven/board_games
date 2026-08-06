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
 * Источник — официальные правила «Великий Западный Путь. Второе издание»,
 * стр. 18, блок «Финальный подсчет очков».
 * Тексты приведены дословно, включая опечатки оригинала.
 */
export const gwtFieldRules: GameFieldRules = {
  money: {
    icon: moneyIcon,
    text: "Игрок получает 1 победное очко за каждые неизрасходованные 5 долларов.",
  },
  buildings: {
    icon: buildingsIcon,
    art: [buildingsArt],
    text: "Игрок получает столько победных очков, сколько указанно на каждом его жетоне частной постройки, размещенном на игровом поле.",
  },
  cities: {
    icon: citiesIcon,
    art: [citiesArt],
    text: "Игрок получает столько победных очков, сколько он разблокировал с помощью своих дисков игрока на городах. Отрицательные победные очки вычитаются из полученной суммы (итоговое значение может быть и отрицательным). Подробнее на стр. 10.",
  },
  stations: {
    icon: stationsIcon,
    art: [stationsArt],
    text: "Игрок получает столько победных очков, сколько указано рядом с каждой ж/д станцией, на которой лежит его диск.",
  },
  hazards: {
    icon: hazardsIcon,
    art: [hazardsArt],
    text: "Игрок получает сумму победных очков, изображенных на жетонах опасности, лежащих перед ним.",
  },
  cattle: {
    icon: cattleIcon,
    art: [cattleArt],
    text: "В своей колоде (своей стопке карточек, карточках на руке и стопке сброса), игрок находит все карточки скота с победными очками и получает сумму этих победных очков.",
  },
  objectives: {
    icon: objectivesIcon,
    text: "Игрок должен найти все оставшиеся карточки целей в своей колоде. Игрок выбирает для каждой карточки, хочет ли он убрать ее из игры или положит ее в зону персональных целей (без использования мгновенных действий). После этого он проверяет все карточки целей в его зоне персональных целей по отдельности, чтобы узнать: где полностью выполнены их задачи. За те карточки целей, задачи которых выполнены полностью, он суммирует победные очки, указанные на них. За те карточки целей, задачи которых выполнены не полностью, он вычитает, указанное на карточек отрицательное количество победных очков (итоговый результат может быть отрицательным. И получает очки. Подробнее на стр. 15.",
  },
  stationMasters: {
    icon: stationMastersIcon,
    art: [stationMastersArt],
    text: "Игрок получает сумму победных очков от индивидуальных задач жетонов начальника станции, которые лежат перед ним (эти индивидуальные задачи полностью независимы от задач на карточках целей).",
  },
  workers56: {
    icon: workers56Icon,
    art: [workers56Art],
    text: "Игрок получает по 4 победных очка за каждого рабочего на пятой и шестой клетке каждого ряда рабочих на своем планшете игрока.",
  },
  playerBoardDisc: {
    icon: playerBoardDiscIcon,
    art: [playerBoardDiscArt],
    text: "Игрок получает 3 победных очка, если он снял диск с этой клетки своего планшета игрока.",
  },
  jobMarket: {
    icon: jobMarketIcon,
    text: "Игрок получает 2 победных очка, если жетон рынка труда лежит перед ним.",
  },
};
