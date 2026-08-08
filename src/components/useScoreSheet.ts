"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import type { Game, GameId } from "@/data/games";
import {
  getServerSnapshot,
  getSnapshot,
  subscribe,
} from "@/scoring/expansions";
import {
  calculatePlayerTotal,
  createEmptyPlayerScores,
} from "@/scoring/fields";
import { getScoringDefinition } from "@/scoring/registry";
import type {
  ExpansionDefinition,
  PlayerScoreState,
  ScoreFieldDefinition,
} from "@/scoring/types";

/**
 * Everything the sheet needs to know about one game in progress: which rows are
 * live, what has been typed in, who is winning.
 *
 * It lives next to the components rather than in `src/scoring/` because it uses
 * React — the scoring core has to stay renderer-free to remain testable.
 */

function createInitialState(
  playerCount: number,
  gameId: GameId,
): PlayerScoreState {
  const definition = getScoringDefinition(gameId);

  return Array.from({ length: playerCount }, () =>
    createEmptyPlayerScores(definition.fields),
  );
}

export function useScoreSheet(game: Game) {
  const definition = getScoringDefinition(game.id);
  const playerCount = definition.maxPlayers;
  const expansions = definition.expansions;

  const enabled = useSyncExternalStore(
    subscribe,
    () => getSnapshot(game.id),
    getServerSnapshot,
  );

  const [scores, setScores] = useState<PlayerScoreState>(() =>
    createInitialState(playerCount, game.id),
  );

  /*
   * Base rows first, then the rows of the enabled expansions — in declaration
   * order, not in the order they were switched on: the sheet must not get
   * reshuffled depending on which chip was pressed first.
   */
  const { activeFields, ownerByFieldId } = useMemo(() => {
    const fields: ScoreFieldDefinition[] = [...definition.fields];
    const owners = new Map<string, ExpansionDefinition>();

    for (const expansion of expansions ?? []) {
      if (!enabled.includes(expansion.id)) {
        continue;
      }

      for (const field of expansion.fields) {
        fields.push(field);
        owners.set(field.id, expansion);
      }
    }

    return { activeFields: fields, ownerByFieldId: owners };
  }, [definition, enabled, expansions]);

  /*
   * Every column is passed alongside the player's own: a majority field
   * (Wingspan nectar) decides its points by comparing players with each other.
   */
  const totals = useMemo(
    () =>
      scores.map((playerScores) =>
        calculatePlayerTotal(activeFields, playerScores, scores),
      ),
    [activeFields, scores],
  );

  /*
   * Marks that "the sheet has started being filled in". The total cannot be
   * used to judge this: a 0:0 draw and a game where everyone went negative on
   * penalties are both a result, not an empty sheet.
   */
  const hasInput = scores.some((playerScores) =>
    Object.values(playerScores).some(
      (value) =>
        value === true || (typeof value === "string" && value.trim() !== ""),
    ),
  );

  const maxTotal = totals.length ? Math.max(...totals) : 0;
  const winners = hasInput
    ? totals
        .map((total, index) => ({ total, index }))
        .filter(({ total }) => total === maxTotal)
        .map(({ index }) => index + 1)
    : [];

  const updateValue = (
    playerIndex: number,
    fieldId: string,
    value: string | boolean,
  ) => {
    setScores((current) =>
      current.map((playerScores, index) =>
        index === playerIndex
          ? {
              ...playerScores,
              [fieldId]: value,
            }
          : playerScores,
      ),
    );
  };

  return {
    playerCount,
    expansions,
    enabled,
    scores,
    activeFields,
    ownerByFieldId,
    totals,
    maxTotal,
    hasInput,
    winners,
    updateValue,
  };
}
