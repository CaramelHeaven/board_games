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

export type GameScoringDefinition = {
  id: string;
  minPlayers: number;
  maxPlayers: number;
  fields: ScoreFieldDefinition[];
};

export type PlayerScores = Record<string, string | boolean>;

export type PlayerScoreState = PlayerScores[];
