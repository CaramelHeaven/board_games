import { describe, expect, it } from "vitest";
import { calculatePlayerTotal } from "./fields";
import { getScoringDefinition } from "./registry";
import type { PlayerScores, ScoreFieldDefinition } from "./types";

/*
 * Nectar is the only category in the project scored by comparing players with
 * each other, so the arithmetic is worth pinning down with the booklet's own
 * examples (Wingspan: Oceania Expansion, 'Nectar', p. 3) rather than numbers I
 * made up:
 *
 *   "two players tied for most nectar would each receive 3 points"
 *   "two players tied for second most nectar would each receive 1 point"
 */

const definition = getScoringDefinition("wingspan");
const nectarFields: ScoreFieldDefinition[] = (
  definition.expansions ?? []
).flatMap((expansion) => expansion.fields);

/** Points every player gets for one habitat, given the counts around the table. */
function scoreForest(counts: readonly string[]): number[] {
  const players: PlayerScores[] = counts.map((count) => ({
    oceaniaNectarForest: count,
  }));

  return players.map((player) =>
    calculatePlayerTotal(
      nectarFields.filter((field) => field.id === "oceaniaNectarForest"),
      player,
      players,
    ),
  );
}

describe("Oceania nectar — a habitat with a clear winner", () => {
  it("awards 5 to the most and 2 to the second most", () => {
    expect(scoreForest(["6", "3", "1"])).toEqual([5, 2, 0]);
  });

  it("awards nothing from third place down", () => {
    expect(scoreForest(["9", "8", "7", "6"])).toEqual([5, 2, 0, 0]);
  });
});

describe("Oceania nectar — ties, as worked out in the booklet", () => {
  it("splits first place between two players as 3 each", () => {
    // (5 + 2) / 2 = 3.5, rounded down. Second place then goes to nobody.
    expect(scoreForest(["4", "4", "1"])).toEqual([3, 3, 0]);
  });

  it("splits second place between two players as 1 each", () => {
    // 5 for the leader, then (2 + 0) / 2 = 1 for the pair behind.
    expect(scoreForest(["5", "2", "2"])).toEqual([5, 1, 1]);
  });

  it("splits first place between three players as 2 each", () => {
    // (5 + 2 + 0) / 3 = 2.33, rounded down.
    expect(scoreForest(["4", "4", "4"])).toEqual([2, 2, 2]);
  });
});

describe("Oceania nectar — qualifying for a place at all", () => {
  it("gives nothing to a player with no nectar in that habitat", () => {
    expect(scoreForest(["3", "0", ""])).toEqual([5, 0, 0]);
  });

  it("gives nothing to anybody when nobody spent nectar there", () => {
    expect(scoreForest(["", "", ""])).toEqual([0, 0, 0]);
  });

  /*
   * The sheet always shows `maxPlayers` columns and has no notion of how many
   * people are actually playing, so a three-player game leaves two columns
   * empty. They must not affect the places.
   */
  it("ignores the empty columns of a shorter game", () => {
    expect(scoreForest(["4", "4", "1", "", ""])).toEqual([3, 3, 0, 0, 0]);
  });
});

describe("Oceania nectar — all three habitats", () => {
  it("scores each habitat on its own and sums them", () => {
    const players: PlayerScores[] = [
      {
        oceaniaNectarForest: "5",
        oceaniaNectarGrassland: "1",
        oceaniaNectarWetland: "2",
      },
      {
        oceaniaNectarForest: "2",
        oceaniaNectarGrassland: "3",
        oceaniaNectarWetland: "2",
      },
    ];

    // First player: 5 in the forest, 2 in the grassland, and the wetland is a
    // tie for the most — (5 + 2) / 2 = 3 each.
    expect(calculatePlayerTotal(nectarFields, players[0], players)).toBe(
      5 + 2 + 3,
    );
    expect(calculatePlayerTotal(nectarFields, players[1], players)).toBe(
      2 + 5 + 3,
    );
  });
});
