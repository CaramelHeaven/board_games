import type { Translated } from "@/i18n/types";
import type { ScoreFieldDefinition } from "./types";

/**
 * Keeps digits, and a minus sign only in the first position. One and the
 * same rule for both the input field and the scoring — the total always
 * matches what is visible in the cell. The games have no fractional values,
 * so a decimal separator is not supported.
 */
export function sanitizeNumericInput(raw: string): string {
  const negative = raw.startsWith("-");
  const digits = raw.replace(/\D/g, "");
  return negative ? `-${digits}` : digits;
}

function parseNumber(raw: string | boolean | undefined): number {
  if (typeof raw === "boolean") {
    return 0;
  }

  const value = Number(sanitizeNumericInput(raw ?? ""));
  return Number.isFinite(value) ? value : 0;
}

/*
 * Every factory is generic over its id, and the parameter is `const` so that
 * a call site writing "money" yields `ScoreFieldDefinition<"money">` rather
 * than widening to `string`. That literal is what `FieldIdOf` reads back out
 * in `registry.ts`.
 */
export function createSumField<const Id extends string>(
  id: Id,
  label: Translated,
  hint?: Translated,
): ScoreFieldDefinition<Id> {
  return {
    id,
    label,
    hint,
    kind: "number",
    score: (raw) => parseNumber(raw),
  };
}

export function createFloorDivField<const Id extends string>(
  id: Id,
  label: Translated,
  divisor: number,
  hint?: Translated,
): ScoreFieldDefinition<Id> {
  return {
    id,
    label,
    hint,
    kind: "number",
    score: (raw) => Math.floor(parseNumber(raw) / divisor),
  };
}

export function createMultiplyField<const Id extends string>(
  id: Id,
  label: Translated,
  multiplier: number,
  hint?: Translated,
): ScoreFieldDefinition<Id> {
  return {
    id,
    label,
    hint,
    kind: "number",
    score: (raw) => parseNumber(raw) * multiplier,
  };
}

/** Count input → VP from a table (like Teotihuacan masks: 7 → 28). */
export function createLookupField<const Id extends string>(
  id: Id,
  label: Translated,
  table: Record<number, number>,
  hint?: Translated,
): ScoreFieldDefinition<Id> {
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

export function createCheckboxField<const Id extends string>(
  id: Id,
  label: Translated,
  points: number,
  hint?: Translated,
): ScoreFieldDefinition<Id> {
  return {
    id,
    label,
    hint,
    kind: "checkbox",
    score: (raw) => (raw === true ? points : 0),
  };
}

/**
 * Count input × unitValue × the sum of the other count fields
 * (White Castle warriors: n × 1|2 × courtiers on the floors).
 */
export function createScaledByCountsField<
  const Id extends string,
  const Refs extends readonly string[],
>(
  id: Id,
  label: Translated,
  countFieldIds: Refs,
  options?: { unitValue?: number },
  hint?: Translated,
): ScoreFieldDefinition<Id> & { readonly countFieldIds: Refs } {
  const unitValue = options?.unitValue ?? 1;
  return {
    id,
    label,
    hint,
    kind: "number",
    // Kept on the object, not just captured in the closure, so that the ids
    // survive into the type and `registry.ts` can check them against the
    // game's own fields.
    countFieldIds,
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
  fields: readonly ScoreFieldDefinition[],
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
  fields: readonly ScoreFieldDefinition[],
): Record<string, string | boolean> {
  return Object.fromEntries(
    fields.map((field) => [field.id, field.kind === "checkbox" ? false : ""]),
  );
}
