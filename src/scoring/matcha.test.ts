import { describe, expect, it } from "vitest";
import { calculatePlayerTotal } from "./fields";
import { getScoringDefinition } from "./registry";
import type { ScoreFieldDefinition } from "./types";

/*
 * The Tea House rooms multiply a Geisha count by a clan-member count, which is
 * the only place in the project where one expansion row depends on the value of
 * another row. Worth pinning down with the publisher's own numbers rather than
 * ones I made up: this is the worked example from p. 11 of the Matcha booklet,
 * scoring the red player's Geishas.
 */

const definition = getScoringDefinition("white-castle");
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

describe("Matcha — worked example from the booklet, p. 11", () => {
  const redPlayer = {
    // "+12 points (as there are 3 Gardeners)" — 2 Geishas × 3 Gardeners × 2
    matchaGardenersOnBoard: "3",
    matchaGeishaRoomGardeners: "2",
    // "+8 points (there are 3 Courtiers in the Castle and 1 at the Gate)"
    courtiersFloor1: "3",
    courtiersGate: "1",
    matchaGeishaRoomCourtiers: "1",
    // "2 points for the Geisha at the Pond Overlook"
    matchaGeishaPond: "1",
    // "+ 2 points for the Geisha on the first step"
    matchaGeishaStep1: "1",
  };

  it("scores the Gardeners' room as 12", () => {
    expect(
      score(["matchaGardenersOnBoard", "matchaGeishaRoomGardeners"], redPlayer),
    ).toBe(12);
  });

  it("scores the Courtiers' room as 8", () => {
    expect(score(["matchaGeishaRoomCourtiers"], redPlayer)).toBe(8);
  });

  it("scores the Pond Overlook and the first step as 2 each", () => {
    expect(score(["matchaGeishaPond"], redPlayer)).toBe(2);
    expect(score(["matchaGeishaStep1"], redPlayer)).toBe(2);
  });

  it("adds the Geishas up to 24", () => {
    expect(
      score(
        [
          "matchaGeishaPond",
          "matchaGeishaStep1",
          "matchaGardenersOnBoard",
          "matchaGeishaRoomGardeners",
          "matchaGeishaRoomCourtiers",
        ],
        redPlayer,
      ),
    ).toBe(24);
  });

  it("keeps the helper row worth nothing on its own", () => {
    // It only exists to be multiplied by; if it ever scores, the sheet lies.
    expect(
      score(["matchaGardenersOnBoard"], { matchaGardenersOnBoard: "3" }),
    ).toBe(0);
  });

  it("scores the second step at 3 a Geisha", () => {
    expect(score(["matchaGeishaStep2"], { matchaGeishaStep2: "3" })).toBe(9);
  });

  it("scores the Warriors' room off both kinds of yard", () => {
    // 2 Warriors in the ×2 yard + 1 in the ×1 yards = 3, with 2 Geishas → 12
    expect(
      score(["matchaGeishaRoomWarriors"], {
        warriors2: "2",
        warriors1: "1",
        matchaGeishaRoomWarriors: "2",
      }),
    ).toBe(12);
  });
});
