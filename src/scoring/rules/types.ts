import type { StaticImageData } from "next/image";

/**
 * Правила и арт параметра подсчёта. Живут отдельно от математики
 * (`ScoreFieldDefinition`), чтобы игры без оформленных правил не менялись.
 */
export type FieldRule = {
  /** Дословная формулировка из официальных правил. */
  text: string;
  /** Арт компонента — показывается в жетоне вместо буквы. */
  icon: StaticImageData;
  /** Иллюстрации из правил, показываются в диалоге. */
  art?: StaticImageData[];
};

export type GameFieldRules = Record<string, FieldRule>;
