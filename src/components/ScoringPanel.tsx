"use client";

import { useMemo, useState, type CSSProperties } from "react";
import type { Game } from "@/data/games";
import {
  calculatePlayerTotal,
  createEmptyPlayerScores,
} from "@/scoring/fields";
import { getScoringDefinition } from "@/scoring/registry";
import type { PlayerScoreState } from "@/scoring/types";

type ScoringPanelProps = {
  game: Game;
};

const PLAYER_ACCENTS = [
  { bg: "#c2410c", text: "#fff" },
  { bg: "#ffc107", text: "#212529" },
  { bg: "#198754", text: "#fff" },
  { bg: "#087990", text: "#fff" },
  { bg: "#6f42c1", text: "#fff" },
];

function createInitialState(playerCount: number, gameId: string): PlayerScoreState {
  const definition = getScoringDefinition(gameId);
  if (!definition) {
    return [];
  }

  return Array.from({ length: playerCount }, () =>
    createEmptyPlayerScores(definition.fields),
  );
}

export function ScoringPanel({ game }: ScoringPanelProps) {
  const definition = getScoringDefinition(game.id);
  const playerCount = definition?.maxPlayers ?? 4;

  const [scores, setScores] = useState<PlayerScoreState>(() =>
    createInitialState(playerCount, game.id),
  );

  const totals = useMemo(() => {
    if (!definition) {
      return [];
    }

    return scores.map((playerScores) =>
      calculatePlayerTotal(definition.fields, playerScores),
    );
  }, [definition, scores]);

  const maxTotal = totals.length ? Math.max(...totals) : 0;
  const winners =
    maxTotal > 0
      ? totals
          .map((total, index) => ({ total, index }))
          .filter(({ total }) => total === maxTotal)
          .map(({ index }) => index + 1)
      : [];

  if (!definition) {
    return null;
  }

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
    <section className="scoring-board">
      <h2 className="scoring-board-title">{game.name}</h2>

      <div
        className="scoring-board-grid"
        style={{ "--player-cols": playerCount } as CSSProperties}
      >
        {scores.map((playerScores, playerIndex) => {
          const accent = PLAYER_ACCENTS[playerIndex % PLAYER_ACCENTS.length];

          return (
            <article
              key={playerIndex}
              className="scoring-player-card"
              style={
                {
                  "--player-accent": accent.bg,
                  "--player-accent-text": accent.text,
                } as CSSProperties
              }
            >
              <div className="scoring-player-header">
                <svg
                  className="scoring-player-icon"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
              </div>

              <ul className="scoring-field-list">
                {definition.fields.map((field) => (
                  <li key={field.id} className="scoring-field-row">
                    {field.hint ? (
                      <button
                        type="button"
                        className="scoring-field-help"
                        title={field.hint}
                        aria-label={`Подсказка: ${field.label}`}
                      >
                        i
                      </button>
                    ) : (
                      <span className="scoring-field-help scoring-field-help-empty" />
                    )}

                    {field.kind === "checkbox" ? (
                      <label className="scoring-checkbox-row">
                        <input
                          type="checkbox"
                          checked={playerScores[field.id] === true}
                          onChange={(event) =>
                            updateValue(
                              playerIndex,
                              field.id,
                              event.target.checked,
                            )
                          }
                        />
                        <span>{field.label}</span>
                      </label>
                    ) : (
                      <input
                        type="text"
                        inputMode="decimal"
                        className="scoring-input"
                        placeholder={field.label}
                        value={(() => {
                          const fieldValue = playerScores[field.id];
                          return typeof fieldValue === "string" ? fieldValue : "";
                        })()}
                        onChange={(event) =>
                          updateValue(playerIndex, field.id, event.target.value)
                        }
                      />
                    )}
                  </li>
                ))}
              </ul>

              <div className="scoring-player-footer">
                <span
                  className={`scoring-total-badge${
                    totals[playerIndex] === maxTotal && maxTotal > 0
                      ? " scoring-total-badge-leader"
                      : ""
                  }`}
                >
                  {totals[playerIndex] > 0 ? totals[playerIndex] : "?"}
                </span>
              </div>
            </article>
          );
        })}
      </div>

      {winners.length > 0 && (
        <p className="scoring-result">
          {winners.length === 1
            ? `Лидер: игрок ${winners[0]}`
            : `Ничья: игроки ${winners.join(", ")}`}
        </p>
      )}
    </section>
  );
}
