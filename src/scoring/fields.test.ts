import { describe, expect, it } from "vitest";
import {
  calculatePlayerTotal,
  createCheckboxField,
  createEmptyPlayerScores,
  createFloorDivField,
  createLookupField,
  createMultiplyField,
  createScaledByCountsField,
  createSumField,
  sanitizeNumericInput,
} from "./fields";
import type { Translated } from "@/i18n/types";

/* Labels are irrelevant to the arithmetic, so every test reuses one. */
const LABEL: Translated = { ru: "тест", en: "test", zh: "测试" };

describe("sanitizeNumericInput", () => {
  it("drops everything that is not a digit", () => {
    expect(sanitizeNumericInput("1a2")).toBe("12");
    expect(sanitizeNumericInput("3 4")).toBe("34");
  });

  it("keeps a leading minus and only a leading one", () => {
    expect(sanitizeNumericInput("-12")).toBe("-12");
    expect(sanitizeNumericInput("-1a2")).toBe("-12");
    // a minus in the middle is not a negation, it is a typo
    expect(sanitizeNumericInput("1-2")).toBe("12");
  });

  it("survives an empty and a minus-only input", () => {
    expect(sanitizeNumericInput("")).toBe("");
    expect(sanitizeNumericInput("-")).toBe("-");
  });
});

describe("createSumField", () => {
  const field = createSumField("plain", LABEL);

  it("returns the number as entered", () => {
    expect(field.score("12")).toBe(12);
    expect(field.score("-3")).toBe(-3);
  });

  it("treats an empty and a garbage input as zero", () => {
    expect(field.score("")).toBe(0);
    expect(field.score("abc")).toBe(0);
  });
});

describe("createFloorDivField", () => {
  // GWT: 1 VP per 5 leftover dollars
  const dollars = createFloorDivField("money", LABEL, 5);

  it("rounds down, it does not round to nearest", () => {
    expect(dollars.score("13")).toBe(2);
    expect(dollars.score("14")).toBe(2);
    expect(dollars.score("15")).toBe(3);
  });

  it("gives nothing below the divisor", () => {
    expect(dollars.score("4")).toBe(0);
    expect(dollars.score("0")).toBe(0);
  });
});

describe("createMultiplyField", () => {
  // Pearlbrook: every leftover pearl is worth 2 points
  const pearls = createMultiplyField("pearls", LABEL, 2);

  it("multiplies by the unit value", () => {
    expect(pearls.score("7")).toBe(14);
    expect(pearls.score("0")).toBe(0);
  });
});

describe("createLookupField", () => {
  // Teotihuacan masks: the table is not linear
  const masks = createLookupField("masks", LABEL, { 5: 10, 6: 18, 7: 28 });

  it("reads the value off the table", () => {
    expect(masks.score("7")).toBe(28);
    expect(masks.score("5")).toBe(10);
  });

  it("gives zero for a count the table does not list", () => {
    expect(masks.score("4")).toBe(0);
    expect(masks.score("99")).toBe(0);
  });
});

describe("createCheckboxField", () => {
  const disc = createCheckboxField("disc", LABEL, 3);

  it("scores only when checked", () => {
    expect(disc.score(true)).toBe(3);
    expect(disc.score(false)).toBe(0);
  });
});

describe("createScaledByCountsField", () => {
  // White Castle: warriors score per courtier placed on the floors
  const warriors = createScaledByCountsField(
    "warriors",
    LABEL,
    ["floor1", "floor2"],
    { unitValue: 2 },
  );

  it("multiplies the input by the sum of the referenced fields", () => {
    expect(warriors.score("3", { floor1: "2", floor2: "1" })).toBe(18);
  });

  it("collapses to zero when the referenced fields are empty", () => {
    expect(warriors.score("3", { floor1: "", floor2: "" })).toBe(0);
  });

  it("defaults the unit value to one", () => {
    const plain = createScaledByCountsField("x", LABEL, ["a"]);
    expect(plain.score("3", { a: "4" })).toBe(12);
  });
});

describe("calculatePlayerTotal", () => {
  const fields = [
    createSumField("a", LABEL),
    createFloorDivField("b", LABEL, 5),
    createCheckboxField("c", LABEL, 3),
  ];

  it("adds number and checkbox fields together", () => {
    expect(calculatePlayerTotal(fields, { a: "10", b: "13", c: true })).toBe(15);
  });

  it("treats missing keys as empty, which is what a fresh sheet is", () => {
    expect(calculatePlayerTotal(fields, {})).toBe(0);
    expect(calculatePlayerTotal(fields, createEmptyPlayerScores(fields))).toBe(
      0,
    );
  });

  it("keeps negative fields negative — penalties are real results", () => {
    expect(calculatePlayerTotal(fields, { a: "-4" })).toBe(-4);
  });
});

describe("createEmptyPlayerScores", () => {
  it("seeds numbers with an empty string and checkboxes with false", () => {
    const fields = [
      createSumField("n", LABEL),
      createCheckboxField("c", LABEL, 1),
    ];
    expect(createEmptyPlayerScores(fields)).toEqual({ n: "", c: false });
  });
});
