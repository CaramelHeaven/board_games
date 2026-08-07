"use client";

import {
  useMemo,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import { RuleToken } from "@/components/RuleToken";
import { useLocale } from "@/i18n/LocaleProvider";
import type { Game, GameId } from "@/data/games";
import {
  getServerSnapshot,
  getSnapshot,
  subscribe,
  toggleExpansion,
} from "@/scoring/expansions";
import {
  calculatePlayerTotal,
  createEmptyPlayerScores,
  sanitizeNumericInput,
} from "@/scoring/fields";
import { getScoringDefinition } from "@/scoring/registry";
import { getFieldRule } from "@/scoring/rules/registry";
import type {
  ExpansionDefinition,
  PlayerScoreState,
  ScoreFieldDefinition,
} from "@/scoring/types";

type ScoringPanelProps = {
  game: Game;
};

const PLAYER_ACCENTS = ["#C2410C", "#C79000", "#198754", "#087990", "#6F42C1"];

function createInitialState(
  playerCount: number,
  gameId: GameId,
): PlayerScoreState {
  const definition = getScoringDefinition(gameId);

  return Array.from({ length: playerCount }, () =>
    createEmptyPlayerScores(definition.fields),
  );
}

export function ScoringPanel({ game }: ScoringPanelProps) {
  const { t, ut } = useLocale();
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

  const totals = useMemo(
    () =>
      scores.map((playerScores) =>
        calculatePlayerTotal(activeFields, playerScores),
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

  return (
    <section className="sheet">
      <h2 className="sheet-title">{t(game.name)}</h2>

      {expansions && expansions.length > 0 && (
        <div className="expansions" aria-label={ut("expansions")} role="group">
          {expansions.map((expansion) => {
            const on = enabled.includes(expansion.id);
            return (
              <button
                key={expansion.id}
                type="button"
                className="expansion-chip"
                style={{ "--accent": expansion.accent } as CSSProperties}
                aria-pressed={on}
                onClick={() => toggleExpansion(game.id, expansion.id)}
              >
                <span className="expansion-mark" aria-hidden="true" />
                {t(expansion.name)}
              </button>
            );
          })}
        </div>
      )}

      <div
        className="sheet-paper"
        style={{ "--player-cols": playerCount } as CSSProperties}
      >
        <div className="sheet-head">
          <span className="sheet-gutter" aria-hidden="true" />
          <span className="sheet-label sheet-label-head">
            {ut("parameter")}
          </span>
          <div className="sheet-cells">
            {scores.map((_, playerIndex) => (
              <span key={playerIndex} className="sheet-player">
                <i
                  className="pin"
                  style={
                    {
                      "--pin":
                        PLAYER_ACCENTS[playerIndex % PLAYER_ACCENTS.length],
                    } as CSSProperties
                  }
                  aria-hidden="true"
                />
                {playerIndex + 1}
              </span>
            ))}
          </div>
        </div>

        {activeFields.map((field) => {
          const owner = ownerByFieldId.get(field.id);

          return (
          <div
            key={field.id}
            className={`sheet-row${owner ? " sheet-row-expansion" : ""}`}
            style={
              owner ? ({ "--accent": owner.accent } as CSSProperties) : undefined
            }
          >
            <RuleToken field={field} rule={getFieldRule(game.id, field.id)} />
            <span className="sheet-label">{t(field.label)}</span>
            <div className="sheet-cells">
              {scores.map((playerScores, playerIndex) => {
                const value = playerScores[field.id];

                if (field.kind === "checkbox") {
                  return (
                    <label key={playerIndex} className="sheet-check">
                      <input
                        type="checkbox"
                        checked={value === true}
                        aria-label={ut("fieldForPlayer", {
                          label: t(field.label),
                          n: playerIndex + 1,
                        })}
                        onChange={(event) =>
                          updateValue(
                            playerIndex,
                            field.id,
                            event.target.checked,
                          )
                        }
                      />
                    </label>
                  );
                }

                return (
                  <input
                    key={playerIndex}
                    type="text"
                    inputMode="numeric"
                    className="sheet-input"
                    aria-label={ut("fieldForPlayer", {
                      label: t(field.label),
                      n: playerIndex + 1,
                    })}
                    value={typeof value === "string" ? value : ""}
                    onChange={(event) =>
                      updateValue(
                        playerIndex,
                        field.id,
                        sanitizeNumericInput(event.target.value),
                      )
                    }
                  />
                );
              })}
            </div>
          </div>
          );
        })}

        <div className="sheet-foot">
          <span className="token token-coin" aria-hidden="true">
            Σ
          </span>
          <span className="sheet-label sheet-label-total">{ut("total")}</span>
          <div className="sheet-cells">
            {totals.map((total, playerIndex) => (
              <span
                key={playerIndex}
                className={`sheet-total${
                  hasInput && total === maxTotal ? " sheet-total-lead" : ""
                }`}
              >
                {total}
              </span>
            ))}
          </div>
        </div>
      </div>

      {winners.length > 0 && (
        <p className="sheet-result">
          {winners.length === 1
            ? ut("leader", { n: winners[0] })
            : ut("tie", { list: winners.join(", ") })}
        </p>
      )}
    </section>
  );
}
