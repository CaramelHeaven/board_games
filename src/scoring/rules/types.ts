import type { StaticImageData } from "next/image";
import type { GameId } from "@/data/games";
import type { Translated } from "@/i18n/types";
import type { FieldIdOf } from "../registry";

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

/*
 * Keyed by the game's own field ids, so a typo in a key is a compile error
 * rather than an orphan found by a test. `Partial` because dressing the rules
 * is a separate pass: a field without an entry falls back to its letter.
 */
export type GameFieldRules<G extends GameId = GameId> = Partial<
  Record<FieldIdOf<G>, FieldRule>
>;
