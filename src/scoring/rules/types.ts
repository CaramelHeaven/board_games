import type { StaticImageData } from "next/image";
import type { Translated } from "@/i18n/types";

/**
 * Rules text and art for a scoring field. Kept apart from the maths
 * (`ScoreFieldDefinition`) so that games without dressed rules stay unchanged.
 */
export type FieldRule = {
  /** Verbatim wording from the official rules. */
  text: Translated;
  /**
   * Component art: shown in the token instead of the letter.
   * Optional, because the rules text and the cropped art are added in
   * separate passes, and a field with no icon simply keeps its letter.
   */
  icon?: StaticImageData;
  /** Illustrations from the rules, shown in the dialog. */
  art?: StaticImageData[];
};

export type GameFieldRules = Record<string, FieldRule>;
