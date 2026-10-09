import leftoversArt from "@/assets/rules/red-cathedral/leftovers-art.webp";
import leftoversIcon from "@/assets/rules/red-cathedral/leftovers.webp";
import towersArt from "@/assets/rules/red-cathedral/towers-art.webp";
import towersIcon from "@/assets/rules/red-cathedral/towers.webp";
import trackArt from "@/assets/rules/red-cathedral/track-art.webp";
import trackIcon from "@/assets/rules/red-cathedral/track.webp";
import type { GameFieldRules } from "./types";

/**
 * Source: official The Red Cathedral rules by Devir (ENG V9),
 * the 'Final Scoring' and 'Additional Scoring' sections, page 16.
 * EN is verbatim, with the Prestige Point icon written out in words;
 * RU/ZH are translated from English.
 */
export const redCathedralFieldRules: GameFieldRules<"red-cathedral"> = {
  track: {
    icon: trackIcon,
    art: [trackArt],
    text: {
      ru: "Все игроки должны передвинуть свои маркеры счёта назад, на ближайшее меньшее деление очков престижа. Если игрок уже стоит на делении очков престижа, он не двигается.",
      en: "At this time, all players must move their score counters back to the closest lower Prestige Point space. If the player is already on a Prestige Point space, they do not move.",
      zh: "此时，所有玩家都必须把计分标记退回到最近的较低声望分格。如果玩家已经位于声望分格上，则不移动。",
    },
  },
  leftovers: {
    icon: leftoversIcon,
    art: [leftoversArt],
    text: {
      ru: "1 очко престижа за каждые 5 материалов и рублей, которые игрок возвращает в общий запас в конце игры.",
      en: "1 Prestige Point for every 5 Materials and Rubles that they return to the general reserve at the end of the game.",
      zh: "游戏结束时，每向公共供应区归还 5 个材料和卢布得 1 声望分。",
    },
  },
  towers: {
    icon: towersIcon,
    art: [towersArt],
    text: {
      ru: "Очки престижа за вклад в каждую из башен. Общая ценность башни — 2 очка престижа за каждую завершённую секцию плюс 1 очко престижа за каждое украшение на ней. Незавершённые секции при финальном подсчёте не учитываются. Каждый игрок считает число знамён и украшений своего цвета на завершённых картах собора в этой башне. Игрок с наибольшим итогом получает полную ценность башни. Игрок со вторым итогом получает половину ценности башни (с округлением вниз). Следующий за ним получает половину от этого, и так далее. При ничьей за какое-либо место очки престижа за места игроков с равным итогом складываются и делятся между ними поровну (с округлением вниз). Игрок без знамён и украшений в башне не получает за неё очков.",
      en: "A number of Prestige Points based on their contributions to each of the towers. The total value of a tower is 2 Prestige Points for each section that is completed, plus 1 Prestige Point for each Ornamentation on it. Any sections that are not completed are not counted at all in the final scoring. Each player counts the number of Banners and Ornamentations of their color they have on the completed Cathedral cards in that Tower. The player with the highest total receives the full value of that tower. The player with the second highest total receives half of the total value of the tower (rounding down for half points). The next player after them receives half of that, and so on. If there is a tie for any position, add up the Prestige Points for the positions of the tied players and divide them evenly between them (rounding down). If a player does not have any Banners or Ornamentations in a tower, they receive no points for that tower.",
      zh: "根据对每座塔楼的贡献获得声望分。一座塔楼的总价值为每个已完成的区段 2 声望分，再加上其上每个装饰 1 声望分。未完成的区段在终局计分时完全不计。每位玩家统计自己颜色的旗帜和装饰在该塔楼已完成的大教堂卡上的数量。总数最高的玩家获得该塔楼的全部价值。总数第二的玩家获得塔楼总价值的一半（向下取整）。再下一位玩家获得其一半，依此类推。如果某个名次出现平局，将平局玩家所占名次的声望分相加，并在他们之间平分（向下取整）。如果玩家在某座塔楼中没有任何旗帜或装饰，则该塔楼不为其计分。",
    },
  },
};
