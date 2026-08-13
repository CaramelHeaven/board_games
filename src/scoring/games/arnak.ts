import {
  createMultiplyField,
  createScaledByCountsField,
  createSumField,
} from "../fields";
import type { ExpansionDefinition, GameScoringDefinition } from "../types";

/** The row the dark tablet penalty is read against. */
const TABLET_VALUE = ["twistedPathsTabletValue"] as const;

/*
 * Twisted Paths. Source: the expansion's rulebook (EN), 'Scoring Dark Tablets'
 * p. 5 and the Owl Temple 'Scoring' box p. 7. Of the four Arnak expansions this
 * is the only one that touches the final scoring at all — Expedition Leaders
 * and The Missing Expedition add leaders, cards and alternative research
 * tracks, none of which is a scoring category, and the Adventure Chest is this
 * same module in a bigger box.
 *
 * The board is double-sided and the two sides score differently, so the rows of
 * this one chip belong to two temples that are never on the table together: the
 * lantern is the Owl Temple's third research token, the tablets and altars are
 * the Spider Temple's. The unused side's rows simply stay empty.
 *
 * The penalty for a dark tablet is not fixed — it is read off the rightmost
 * empty space of the tablet supply once the unused tablets are returned, and it
 * is the same for everyone. `twistedPathsTabletValue` carries it and scores
 * nothing itself, the same arrangement as `development` in orleans.ts.
 *
 * The booklet's own example pins the formula down: with the supply at -3, five
 * tablets on altars score 5 × -3 = -15 and four score -12.
 *
 * The altars are a majority and still not `createMajorityField`: each altar is
 * worth what is printed above it rather than a shared ladder of awards, and a
 * tie there pays every tied player in full — 'If there is a tie, all tied
 * players gain these points' — where the factory splits the pot and rounds
 * down. A plain sum of the altars the player leads is the honest model.
 *
 * Accent: the obsidian of the Spider Temple. Green is the one colour ruled out
 * everywhere in this project — the felt of the sheet is green.
 */
const twistedPaths = {
  id: "twisted-paths",
  name: { ru: "Извилистые тропы", en: "Twisted Paths", zh: "蜿蜒小径" },
  accent: "#3b3f6b",
  fields: [
    createSumField(
      "twistedPathsLantern",
      { ru: "Фонарь", en: "Lantern", zh: "提灯" },
      {
        ru: "Храм совы: ПО ряда, в котором стоит фонарь",
        en: "Owl Temple: VP of the row your lantern is on",
        zh: "猫头鹰神庙：提灯所在行的分数",
      },
    ),
    /*
     * Scores nothing on its own — it is the multiplier for the row below.
     * Every player writes the same number: the supply is shared.
     */
    createMultiplyField(
      "twistedPathsTabletValue",
      {
        ru: "Цена тёмной скрижали",
        en: "Dark tablet value",
        zh: "黑石板的分值",
      },
      0,
      {
        ru: "Очков не даёт: это множитель для строки ниже",
        en: "Scores nothing: it is the multiplier for the row below",
        zh: "本身不计分：用于计算下面一行的得分",
      },
    ),
    createScaledByCountsField(
      "twistedPathsDarkTablets",
      {
        ru: "Тёмные скрижали на алтарях",
        en: "Dark tablets on altars",
        zh: "祭坛上的黑石板",
      },
      TABLET_VALUE,
      { unitValue: -1 },
      {
        ru: "Минус ПО за каждую скрижаль по её цене",
        en: "Minus VP per tablet equal to the dark tablet value",
        zh: "每块石板按其分值扣分",
      },
    ),
    createSumField(
      "twistedPathsAltars",
      { ru: "Алтари", en: "Altars", zh: "祭坛得分" },
      {
        ru: "Очки алтарей, где у вас больше всего скрижалей",
        en: "The points of every altar where you placed the most tablets",
        zh: "你放置石板最多的每个祭坛的分数",
      },
    ),
  ],
} as const satisfies ExpansionDefinition;

/*
 * Source: official Lost Ruins of Arnak rules by Czech Games Edition (EN),
 * p. 18, the 'Final Scoring' section.
 *
 * The booklet lists six sources of points and the official score pad has the
 * same six rows. Two of them are split here, because one row cannot hold two
 * different sums:
 *
 * - the research tokens are one bullet but two tokens standing on two rows of
 *   the track, so the sheet adds them up instead of the player;
 * - idols and empty idol slots share a bullet, but an idol is worth a flat
 *   3 points while a slot is worth whatever is printed in it.
 *
 * `fearTiles` is the last sentence of the Fear bullet. Fear tiles only appear
 * when the Fear deck runs out, which the designers call an extremely rare
 * situation, so the row usually stays empty — but it is an entry of the final
 * scoring, and that is the test this project applies (the score track in
 * tzolkin.ts was left out for failing exactly that test).
 */
export const arnakScoring = {
  id: "arnak",
  minPlayers: 1,
  maxPlayers: 4,
  fields: [
    createSumField(
      "researchGlass",
      { ru: "Лупа", en: "Magnifying glass", zh: "放大镜" },
      {
        ru: "ПО ряда, в котором стоит лупа",
        en: "VP of the row your magnifying glass is on",
        zh: "放大镜所在行的分数",
      },
    ),
    createSumField(
      "researchNotebook",
      { ru: "Блокнот", en: "Notebook", zh: "笔记本" },
      {
        ru: "ПО ряда, в котором стоит блокнот",
        en: "VP of the row your notebook is on",
        zh: "笔记本所在行的分数",
      },
    ),
    createSumField(
      "templeTiles",
      { ru: "Тайлы храма", en: "Temple tiles", zh: "神庙板块" },
      {
        ru: "Сумма ПО на ваших тайлах храма",
        en: "Sum of the VP on your temple tiles",
        zh: "你的神庙板块上的分数总和",
      },
    ),
    createMultiplyField("idols", { ru: "Идолы", en: "Idols", zh: "神像" }, 3, {
      ru: "3 ПО за каждого идола, даже за стоящего в слоте",
      en: "3 VP per idol, even one that sits in a slot",
      zh: "每个神像得 3 分，放入槽位的也算",
    }),
    createSumField(
      "emptyIdolSlots",
      { ru: "Пустые слоты идолов", en: "Empty idol slots", zh: "空的神像槽位" },
      {
        ru: "Сумма ПО, показанных в пустых слотах",
        en: "Sum of the VP shown in your empty idol slots",
        zh: "空槽位上标示的分数总和",
      },
    ),
    createMultiplyField(
      "guardians",
      { ru: "Стражи", en: "Guardians", zh: "守卫" },
      5,
      {
        ru: "5 ПО за каждого побеждённого стража",
        en: "5 VP per guardian you overcame",
        zh: "每击败一个守卫得 5 分",
      },
    ),
    createSumField(
      "cards",
      {
        ru: "Предметы и артефакты",
        en: "Items and artifacts",
        zh: "物品与神器",
      },
      {
        ru: "Сумма ПО в правом нижнем углу карт",
        en: "Sum of the VP in the lower right corner of your cards",
        zh: "卡右下角分数的总和",
      },
    ),
    createMultiplyField(
      "fearCards",
      { ru: "Карты страха", en: "Fear cards", zh: "恐惧卡" },
      -1,
      {
        ru: "−1 ПО за каждую карту страха",
        en: "−1 VP for each Fear card",
        zh: "每张恐惧卡扣 1 分",
      },
    ),
    createMultiplyField(
      "fearTiles",
      { ru: "Тайлы страха", en: "Fear tiles", zh: "恐惧板块" },
      -2,
      {
        ru: "−2 ПО за каждый тайл страха",
        en: "−2 VP for each fear tile",
        zh: "每块恐惧板块扣 2 分",
      },
    ),
  ],
  expansions: [twistedPaths],
} as const satisfies GameScoringDefinition<"arnak">;
