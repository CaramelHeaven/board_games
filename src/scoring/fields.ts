import type { ScoreFieldDefinition } from "./types";

function parseNumber(raw: string | boolean | undefined): number {
  if (typeof raw === "boolean") {
    return 0;
  }

  const normalized = (raw ?? "")
    .replace(/[^\d,-]/g, "")
    .replace(",", ".");

  const value = Number(normalized);
  return Number.isFinite(value) ? value : 0;
}

export function createSumField(
  id: string,
  label: string,
  hint?: string,
): ScoreFieldDefinition {
  return {
    id,
    label,
    hint,
    kind: "number",
    score: (raw) => parseNumber(raw),
  };
}

export function createFloorDivField(
  id: string,
  label: string,
  divisor: number,
  hint?: string,
): ScoreFieldDefinition {
  return {
    id,
    label,
    hint,
    kind: "number",
    score: (raw) => Math.floor(parseNumber(raw) / divisor),
  };
}

export function createMultiplyField(
  id: string,
  label: string,
  multiplier: number,
  hint?: string,
): ScoreFieldDefinition {
  return {
    id,
    label,
    hint,
    kind: "number",
    score: (raw) => parseNumber(raw) * multiplier,
  };
}

export function createCheckboxField(
  id: string,
  label: string,
  points: number,
  hint?: string,
): ScoreFieldDefinition {
  return {
    id,
    label,
    hint,
    kind: "checkbox",
    score: (raw) => (raw === true ? points : 0),
  };
}

export function calculatePlayerTotal(
  fields: ScoreFieldDefinition[],
  values: Record<string, string | boolean>,
): number {
  return fields.reduce((total, field) => {
    const raw = values[field.id];
    if (field.kind === "checkbox") {
      return total + field.score(raw === true);
    }
    return total + field.score(typeof raw === "string" ? raw : "");
  }, 0);
}

export function createEmptyPlayerScores(
  fields: ScoreFieldDefinition[],
): Record<string, string | boolean> {
  return Object.fromEntries(
    fields.map((field) => [field.id, field.kind === "checkbox" ? false : ""]),
  );
}
