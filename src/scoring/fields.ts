import type { Translated } from "@/i18n/types";
import type { ScoreFieldDefinition } from "./types";

function parseNumber(raw: string | boolean | undefined): number {
  if (typeof raw === "boolean") {
    return 0;
  }

  const normalized = (raw ?? "").replace(/[^\d,-]/g, "").replace(",", ".");

  const value = Number(normalized);
  return Number.isFinite(value) ? value : 0;
}

export function createSumField(
  id: string,
  label: Translated,
  hint?: Translated,
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
  label: Translated,
  divisor: number,
  hint?: Translated,
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
  label: Translated,
  multiplier: number,
  hint?: Translated,
): ScoreFieldDefinition {
  return {
    id,
    label,
    hint,
    kind: "number",
    score: (raw) => parseNumber(raw) * multiplier,
  };
}

/** Ввод количества → ПО по таблице (как маски Teotihuacan: 7 → 28). */
export function createLookupField(
  id: string,
  label: Translated,
  table: Record<number, number>,
  hint?: Translated,
): ScoreFieldDefinition {
  return {
    id,
    label,
    hint,
    kind: "number",
    score: (raw) => {
      const n = parseNumber(raw);
      return table[n] ?? 0;
    },
  };
}

export function createCheckboxField(
  id: string,
  label: Translated,
  points: number,
  hint?: Translated,
): ScoreFieldDefinition {
  return {
    id,
    label,
    hint,
    kind: "checkbox",
    score: (raw) => (raw === true ? points : 0),
  };
}

/**
 * Ввод количества × unitValue × сумма других count-полей
 * (воины White Castle: n × 1|2 × придворные на этажах).
 */
export function createScaledByCountsField(
  id: string,
  label: Translated,
  countFieldIds: string[],
  options?: { unitValue?: number },
  hint?: Translated,
): ScoreFieldDefinition {
  const unitValue = options?.unitValue ?? 1;
  return {
    id,
    label,
    hint,
    kind: "number",
    score: (raw, values = {}) => {
      const base = parseNumber(typeof raw === "string" ? raw : "");
      const multiplier = countFieldIds.reduce(
        (sum, fieldId) => sum + parseNumber(values[fieldId]),
        0,
      );
      return base * unitValue * multiplier;
    },
  };
}

export function calculatePlayerTotal(
  fields: ScoreFieldDefinition[],
  values: Record<string, string | boolean>,
): number {
  return fields.reduce((total, field) => {
    const raw = values[field.id];
    if (field.kind === "checkbox") {
      return total + field.score(raw === true, values);
    }
    return total + field.score(typeof raw === "string" ? raw : "", values);
  }, 0);
}

export function createEmptyPlayerScores(
  fields: ScoreFieldDefinition[],
): Record<string, string | boolean> {
  return Object.fromEntries(
    fields.map((field) => [field.id, field.kind === "checkbox" ? false : ""]),
  );
}
