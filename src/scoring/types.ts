export type FieldInputKind = "number" | "checkbox";

export type ScoreFieldDefinition = {
  id: string;
  label: string;
  hint?: string;
  kind: FieldInputKind;
  score: (raw: string | boolean) => number;
};

export type GameScoringDefinition = {
  id: string;
  minPlayers: number;
  maxPlayers: number;
  fields: ScoreFieldDefinition[];
};

export type PlayerScores = Record<string, string | boolean>;

export type PlayerScoreState = PlayerScores[];
