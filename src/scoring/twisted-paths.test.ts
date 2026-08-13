import { describe, expect, it } from "vitest";
import { calculatePlayerTotal } from "./fields";
import { getScoringDefinition } from "./registry";
import type { ScoreFieldDefinition } from "./types";

/*
 * The dark tablets are the first row in the project scaled by a *negative*
 * unit value: the penalty per tablet is not printed anywhere on the tile, it is
 * read off the supply once the unused tablets are returned, and it is the same
 * for every player. Worth pinning down with the publisher's own numbers rather
 * than ones I made up: this is the worked example from p. 5 of the Twisted
 * Paths booklet, where returning Yellow's three leftover tablets moves the
 * penalty from -4 to -3 for everyone.
 */

const definition = getScoringDefinition("arnak");
const allFields: ScoreFieldDefinition[] = [
  ...definition.fields,
  ...(definition.expansions ?? []).flatMap((expansion) => expansion.fields),
];

/** Score just the named rows, so each claim of the example is checked alone. */
function score(ids: string[], values: Record<string, string>): number {
  return calculatePlayerTotal(
    allFields.filter((field) => ids.includes(field.id)),
    values,
  );
}

describe("Twisted Paths — worked example from the booklet, p. 5", () => {
  // "Blue will score -15 for 5 tablets, and Yellow will score -12 for 4."
  const blue = {
    twistedPathsTabletValue: "3",
    twistedPathsDarkTablets: "5",
    // "Blue scores 2 points for the first altar" and shares the third at 3.
    twistedPathsAltars: "5",
  };
  const yellow = {
    twistedPathsTabletValue: "3",
    twistedPathsDarkTablets: "4",
    // "Yellow scores 3 points for the fourth altar" and shares the third at 3.
    twistedPathsAltars: "6",
  };

  it("charges Blue -15 for five tablets at a penalty of 3", () => {
    expect(score(["twistedPathsDarkTablets"], blue)).toBe(-15);
  });

  it("charges Yellow -12 for four tablets at the same penalty", () => {
    expect(score(["twistedPathsDarkTablets"], yellow)).toBe(-12);
  });

  it("keeps the penalty row worth nothing on its own", () => {
    // It only exists to be multiplied by; if it ever scores, the sheet lies.
    expect(
      score(["twistedPathsTabletValue"], { twistedPathsTabletValue: "3" }),
    ).toBe(0);
  });

  it("charges nothing while the penalty is still unknown", () => {
    // An empty penalty cell must not silently score the tablets as free.
    expect(
      score(["twistedPathsDarkTablets"], { twistedPathsDarkTablets: "5" }),
    ).toBe(0);
  });

  it("adds the altars in as plain points", () => {
    // A tie pays every tied player in full, so the majority factory would be
    // wrong here — the row is a sum of the altars the player leads.
    expect(score(["twistedPathsAltars"], blue)).toBe(5);
    expect(score(["twistedPathsAltars"], yellow)).toBe(6);
  });

  it("leaves both players ten points apart over the module", () => {
    const ids = [
      "twistedPathsTabletValue",
      "twistedPathsDarkTablets",
      "twistedPathsAltars",
    ];
    expect(score(ids, blue)).toBe(-10);
    expect(score(ids, yellow)).toBe(-6);
  });
});

describe("Arnak — the base rows the booklet gives a multiplier for, p. 18", () => {
  it("scores 3 points an idol and 5 a guardian", () => {
    expect(score(["idols"], { idols: "4" })).toBe(12);
    expect(score(["guardians"], { guardians: "2" })).toBe(10);
  });

  it("scores -1 a Fear card and -2 a fear tile", () => {
    expect(score(["fearCards"], { fearCards: "3" })).toBe(-3);
    expect(score(["fearTiles"], { fearTiles: "2" })).toBe(-4);
  });
});
