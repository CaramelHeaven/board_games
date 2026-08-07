import type { Translated } from "@/i18n/types";

export type FieldInputKind = "number" | "checkbox";

export type ScoreFieldDefinition = {
  id: string;
  label: Translated;
  hint?: Translated;
  kind: FieldInputKind;
  score: (
    raw: string | boolean,
    values?: Record<string, string | boolean>,
  ) => number;
};

/**
 * A game expansion: its own scoring rows and its own color.
 * The color comes from the world of the expansion itself, muted to suit
 * the felt and the paper of the sheet.
 */
export type ExpansionDefinition = {
  id: string;
  name: Translated;
  /** Accent: the chip on the felt and the highlight of added rows on paper. */
  accent: string;
  fields: ScoreFieldDefinition[];
};

export type GameScoringDefinition = {
  id: string;
  minPlayers: number;
  maxPlayers: number;
  fields: ScoreFieldDefinition[];
  expansions?: ExpansionDefinition[];
};

export type PlayerScores = Record<string, string | boolean>;

export type PlayerScoreState = PlayerScores[];
