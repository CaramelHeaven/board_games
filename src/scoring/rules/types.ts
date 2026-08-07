import type { StaticImageData } from "next/image";
import type { Translated } from "@/i18n/types";

/**
 * Правила и арт параметра подсчёта. Живут отдельно от математики
 * (`ScoreFieldDefinition`), чтобы игры без оформленных правил не менялись.
 */
export type FieldRule = {
  /** Дословная формулировка из официальных правил. */
  text: Translated;
  /**
   * Арт компонента — показывается в жетоне вместо буквы.
   * Необязателен: текст правил и кроп арта заводятся разными проходами,
   * и параметр без иконки просто оставляет в жетоне букву.
   */
  icon?: StaticImageData;
  /** Иллюстрации из правил, показываются в диалоге. */
  art?: StaticImageData[];
};

export type GameFieldRules = Record<string, FieldRule>;
