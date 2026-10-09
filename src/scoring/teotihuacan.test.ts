import { describe, expect, it } from "vitest";
import { calculatePlayerTotal } from "./fields";
import { getScoringDefinition } from "./registry";

/*
 * Masks go into "one or more sets", each scored on its own (Eclipse scoring).
 * A set holds different masks, so it tops out at 7.
 */
const { fields } = getScoringDefinition("teotihuacan");

describe("Teotihuacan — mask sets", () => {
  it("scores two sets separately: 7 + 2 masks is 28 + 3", () => {
    expect(calculatePlayerTotal(fields, { masks: "7", masks2: "2" })).toBe(31);
  });

  it("gives nothing for a set larger than 7", () => {
    expect(calculatePlayerTotal(fields, { masks: "8" })).toBe(0);
  });
});
