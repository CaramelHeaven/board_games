import type { Translated } from "./types";

/**
 * Interface chrome. Placeholders of the form {n} are substituted by the
 * `format` helper — a separate formatting library is not needed for three
 * strings.
 */
export const ui = {
  siteTitle: {
    ru: "Онлайн подсчет очков | Настольные игры",
    en: "Online score calculator | Board games",
    zh: "在线计分器 | 桌游",
  },
  languageNav: {
    ru: "Выбор языка",
    en: "Language",
    zh: "语言选择",
  },
  parameter: {
    ru: "Параметр",
    en: "Category",
    zh: "计分项",
  },
  total: {
    ru: "Итого",
    en: "Total",
    zh: "总分",
  },
  expansions: {
    ru: "Дополнения",
    en: "Expansions",
    zh: "扩展",
  },
  leader: {
    ru: "Лидер: игрок {n}",
    en: "Leader: player {n}",
    zh: "领先：玩家 {n}",
  },
  tie: {
    ru: "Ничья: игроки {list}",
    en: "Tie: players {list}",
    zh: "平局：玩家 {list}",
  },
  about: {
    ru: "О проекте",
    en: "About",
    zh: "关于本站",
  },
  aboutText: {
    ru: "С помощью этого сайта вы сможете быстро и без ошибок определить победителя в популярных настольных играх. Подсчет очков происходит «на лету», поэтому в процессе будут видны промежуточные итоги. Для вашего удобства к каждой игре, к каждому параметру подсчета, добавлены выдержки из правил. Чтобы ознакомиться с ними нажмите на жетон слева от параметра.",
    en: "This site helps you determine the winner of popular board games quickly and without mistakes. Scores are calculated on the fly, so running totals stay visible as you go. For your convenience, every category of every game comes with an excerpt from the rules. Tap the token to the left of a category to read it.",
    zh: "本站帮助你快速无误地算出热门桌游的赢家。分数即时累计，中途总分始终可见。每款游戏的每个计分项都附有规则摘录，点击计分项左侧的标记即可查看。",
  },
  aboutContact: {
    ru: "Связь: Telegram",
    en: "Contact: Telegram",
    zh: "联系方式：Telegram",
  },
  aboutHighlightSpeed: {
    ru: "быстро и без ошибок",
    en: "quickly and without mistakes",
    zh: "快速无误",
  },
  aboutHighlightRules: {
    ru: "выдержки из правил",
    en: "excerpts from the rules",
    zh: "规则摘录",
  },
  close: {
    ru: "Закрыть",
    en: "Close",
    zh: "关闭",
  },
  rulesFor: {
    ru: "Правила: {label}",
    en: "Rules: {label}",
    zh: "规则：{label}",
  },
  fieldForPlayer: {
    ru: "{label}, игрок {n}",
    en: "{label}, player {n}",
    zh: "{label}，玩家 {n}",
  },
  gameCardAlt: {
    ru: "Онлайн подсчет очков {game}",
    en: "Online score calculator for {game}",
    zh: "{game} 在线计分",
  },
} satisfies Record<string, Translated>;

export type UiKey = keyof typeof ui;

export function format(
  template: string,
  values: Record<string, string | number>,
): string {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, String(value)),
    template,
  );
}
