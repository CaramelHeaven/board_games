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
 * Дополнение к игре: свои строки подсчёта и свой цвет.
 * Цвет — из мира самого дополнения, приглушён под сукно и бумагу листа.
 */
export type ExpansionDefinition = {
  id: string;
  name: Translated;
  /** Акцент: чип на сукне и подсветка добавленных строк на бумаге. */
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
