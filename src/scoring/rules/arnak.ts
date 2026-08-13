import cardsArt from "@/assets/rules/arnak/cards-art.webp";
import cardsArt2 from "@/assets/rules/arnak/cards-art2.webp";
import cardsIcon from "@/assets/rules/arnak/cards.webp";
import emptyIdolSlotsArt from "@/assets/rules/arnak/empty-idol-slots-art.webp";
import emptyIdolSlotsIcon from "@/assets/rules/arnak/empty-idol-slots.webp";
import fearCardsArt from "@/assets/rules/arnak/fear-cards-art.webp";
import fearCardsIcon from "@/assets/rules/arnak/fear-cards.webp";
import fearTilesIcon from "@/assets/rules/arnak/fear-tiles.webp";
import guardiansArt from "@/assets/rules/arnak/guardians-art.webp";
import guardiansIcon from "@/assets/rules/arnak/guardians.webp";
import idolsArt from "@/assets/rules/arnak/idols-art.webp";
import idolsIcon from "@/assets/rules/arnak/idols.webp";
import researchArt from "@/assets/rules/arnak/research-art.webp";
import researchGlassIcon from "@/assets/rules/arnak/research-glass.webp";
import researchNotebookIcon from "@/assets/rules/arnak/research-notebook.webp";
import templeTilesIcon from "@/assets/rules/arnak/temple-tiles.webp";
import twistedPathsAltarsArt from "@/assets/rules/arnak/twisted-paths-altars-art.webp";
import twistedPathsDarkTabletsIcon from "@/assets/rules/arnak/twisted-paths-dark-tablets.webp";
import twistedPathsLanternIcon from "@/assets/rules/arnak/twisted-paths-lantern.webp";
import twistedPathsTabletValueArt from "@/assets/rules/arnak/twisted-paths-tablet-value-art.webp";
import twistedPathsTabletValueIcon from "@/assets/rules/arnak/twisted-paths-tablet-value.webp";
import type { GameFieldRules } from "./types";

/**
 * Source: official Lost Ruins of Arnak rules by Czech Games Edition (EN),
 * p. 18, the 'Final Scoring' section, and the Twisted Paths rulebook (EN),
 * pp. 5 and 7. The English texts are verbatim, ru and zh are translated
 * from English.
 *
 * Two rows quote a second sentence from elsewhere in the booklet, because the
 * Final Scoring line alone does not explain them: the idol slots are described
 * on p. 11, and the fear tile — which exists only when the Fear deck runs dry —
 * on p. 23. The notebook row carries the note from p. 13 that keeps it out of
 * the Lost Temple, which is what makes it a different row from the glass.
 *
 * Icons come from CGE's own score pad rather than from the rulebook: the pad
 * holds the same drawings at 300 ppi, where p. 18 has them at 75. The pad puts
 * two icons in a row wherever this sheet splits the row in two, so the glass,
 * the notebook, the idol and the empty slot are each cut out on their own.
 *
 * Twisted Paths is not on any score pad, and the tablet in its booklet is a
 * 31x38 raster at 153 ppi — hopeless at token size — so the lantern and the
 * tablets are cropped from CGE's component photographs instead.
 *
 * `twistedPathsAltars` has no icon on purpose: every altar pictured in either
 * booklet sits under an instructional arrow or circle, and the clean board
 * photograph turns to mush at 100 px. The row keeps its letter and gets the
 * booklet's scoring illustration in the dialog.
 */
export const arnakFieldRules: GameFieldRules<"arnak"> = {
  researchGlass: {
    icon: researchGlassIcon,
    art: [researchArt],
    text: {
      ru: "Каждый жетон исследования приносит победные очки в зависимости от ряда, в котором он стоит. Лупы в ряду Затерянного храма приносят победные очки в зависимости от того, в каком порядке они добрались до Затерянного храма.",
      en: "Each of your research tokens scores points based on its row. Magnifying glasses in the Lost Temple row will score points based on the order in which they reached the Lost Temple.",
      zh: "你的每个研究标记按其所在行得分。位于失落神庙一行的放大镜，按抵达失落神庙的先后顺序得分。",
    },
  },
  researchNotebook: {
    icon: researchNotebookIcon,
    art: [researchArt],
    text: {
      ru: "Каждый жетон исследования приносит победные очки в зависимости от ряда, в котором он стоит. Замечание: жетон блокнота нельзя переместить в ряд Затерянного храма.",
      en: "Each of your research tokens scores points based on its row. Note: It is not possible to move your notebook token to the Lost Temple row.",
      zh: "你的每个研究标记按其所在行得分。注意：笔记本标记无法移动到失落神庙一行。",
    },
  },
  templeTiles: {
    icon: templeTilesIcon,
    art: [researchArt],
    text: {
      ru: "Каждый тайл храма приносит столько победных очков, сколько на нём указано.",
      en: "Each of your temple tiles scores the amount shown on the tile.",
      zh: "你的每块神庙板块得到板块上标示的分数。",
    },
  },
  idols: {
    icon: idolsIcon,
    art: [idolsArt],
    text: {
      ru: "Каждый идол приносит 3 победных очка, даже если он стоит в слоте.",
      en: "Each of your idols scores 3 points, even if it is in a slot.",
      zh: "你的每个神像得 3 分，即使它已放入槽位。",
    },
  },
  emptyIdolSlots: {
    icon: emptyIdolSlotsIcon,
    art: [emptyIdolSlotsArt],
    text: {
      ru: "Также прибавьте очки, показанные в пустых слотах идолов. Но пользуйтесь силой идола с умом! Каждый из четырёх слотов принесёт определённое количество очков, если к концу игры он останется пустым.",
      en: "Also add in the points shown in empty idol slots. But use the idol’s power wisely! Each of the four slots will be worth a certain number of points if it is still empty at the end of the game.",
      zh: "此外，加上空的神像槽位上标示的分数。但要谨慎使用神像的力量！四个槽位中的每一个，若在游戏结束时仍为空，都会带来一定的分数。",
    },
  },
  guardians: {
    icon: guardiansIcon,
    art: [guardiansArt],
    text: {
      ru: "Каждый побеждённый страж приносит 5 победных очков, независимо от того, воспользовались вы его даром или нет.",
      en: "Each guardian you overcame is worth 5 points, whether you used the boon or not.",
      zh: "你击败的每个守卫得 5 分，无论你是否使用了它的恩赐。",
    },
  },
  cards: {
    icon: cardsIcon,
    art: [cardsArt, cardsArt2],
    text: {
      ru: "Каждая карта предмета и артефакта приносит столько победных очков, сколько указано в её правом нижнем углу.",
      en: "Each item and artifact card scores the amount of points shown in the lower right corner.",
      zh: "每张物品卡和神器卡得到其右下角标示的分数。",
    },
  },
  fearCards: {
    icon: fearCardsIcon,
    art: [fearCardsArt],
    text: {
      ru: "Каждая карта страха отнимает 1 победное очко.",
      en: "Fear cards score -1 point each.",
      zh: "每张恐惧卡扣 1 分。",
    },
  },
  fearTiles: {
    // No illustration: the booklet pictures the piece itself and nothing more,
    // and that picture is already the icon.
    icon: fearTilesIcon,
    text: {
      ru: "Если у игрока есть тайлы страха, каждый из них отнимает 2 победных очка. Если игрок должен взять карту страха, когда колода страха пуста, вместо неё он берёт тайл страха.",
      en: "If you have fear tiles (see page 23), they score -2 points each. If you are supposed to take a Fear card when the Fear deck is empty, you take a fear tile instead.",
      zh: "若你拥有恐惧板块，每块扣 2 分。当恐惧牌库已空而你需要拿取恐惧卡时，改为拿取一块恐惧板块。",
    },
  },

  /* Twisted Paths: the Owl Temple 'Scoring' box, p. 7. */
  twistedPathsLantern: {
    icon: twistedPathsLanternIcon,
    text: {
      ru: "В конце игры игрок получает победные очки за положение своей лупы (даже если она в тайном проходе), блокнота и фонаря.",
      en: "At the end of the game, score points based on the position of your magnifying glass (even if it’s in a secret passage), notebook, and lantern.",
      zh: "游戏结束时，根据你的放大镜（即使它位于秘密通道中）、笔记本和提灯的位置得分。",
    },
  },

  /*
   * Twisted Paths: 'Scoring Dark Tablets', p. 5. The section is three numbered
   * steps and each of the three rows below quotes its own step. Where the
   * booklet sets a dark tablet as an inline symbol, the word is written out.
   */
  twistedPathsTabletValue: {
    icon: twistedPathsTabletValueIcon,
    art: [twistedPathsTabletValueArt],
    text: {
      ru: "Возврат неиспользованных скрижалей. Все тёмные скрижали, оставшиеся у игроков к концу игры, возвращаются в запас тёмных скрижалей. Помните, что каждая клетка вмещает столько скрижалей, сколько игроков в партии.",
      en: "Return unused tablets. Any unused dark tablets the players have left at the end of the game are returned to the dark tablet supply. Remember that each space holds as many tablets as there are players.",
      zh: "归还未使用的石板。游戏结束时玩家剩余的黑石板，全部归还到黑石板供应区。请记住，每个格子容纳的石板数量等于玩家人数。",
    },
  },
  twistedPathsDarkTablets: {
    icon: twistedPathsDarkTabletsIcon,
    art: [twistedPathsAltarsArt],
    text: {
      ru: "Подсчёт штрафных очков. Крайняя правая пустая клетка запаса тёмных скрижалей определяет, сколько штрафных очков стоит каждая использованная тёмная скрижаль. Например, если на этой клетке указано −3, игроки теряют по 3 очка за каждую тёмную скрижаль, выложенную на алтари.",
      en: "Score negative points. The rightmost empty space of the dark tablet supply determines how many negative points each used dark tablet is worth. For example, if that space is marked -3, then players lose 3 points for each dark tablet they played on altars.",
      zh: "结算负分。黑石板供应区最右侧的空格决定每块已使用的黑石板值多少负分。例如，若该格标示为 −3，玩家每在祭坛上放置一块黑石板就失去 3 分。",
    },
  },
  twistedPathsAltars: {
    art: [twistedPathsAltarsArt],
    text: {
      ru: "Подсчёт алтарей. Наконец, оцените каждый алтарь с артефактом: определите, кто из игроков выложил на него больше всего тёмных скрижалей. Этот игрок получает очки, указанные над алтарём. При ничьей эти очки получают все игроки, разделившие первенство.",
      en: "Score altars. Finally, evaluate each altar with an artifact: determine which player placed the most dark tablets on each altar. That player gains the points printed above the altar. If there is a tie, all tied players gain these points.",
      zh: "结算祭坛。最后，评估每个放有神器的祭坛：确定哪位玩家在该祭坛上放置了最多的黑石板。该玩家获得祭坛上方标示的分数。若出现平局，所有平局的玩家都获得这些分数。",
    },
  },
};
