"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { RuleToken } from "@/components/RuleToken";
import { useLocale } from "@/i18n/LocaleProvider";
import type { Game } from "@/data/games";
import {
  calculatePlayerTotal,
  createEmptyPlayerScores,
} from "@/scoring/fields";
import { getScoringDefinition } from "@/scoring/registry";
import { getFieldRule } from "@/scoring/rules/registry";
import type { PlayerScoreState } from "@/scoring/types";

type ScoringPanelProps = {
  game: Game;
};

const PLAYER_ACCENTS = ["#C2410C", "#C79000", "#198754", "#087990", "#6F42C1"];

function createInitialState(
  playerCount: number,
  gameId: string,
): PlayerScoreState {
  const definition = getScoringDefinition(gameId);
  if (!definition) {
    return [];
  }

  return Array.from({ length: playerCount }, () =>
    createEmptyPlayerScores(definition.fields),
  );
}

export function ScoringPanel({ game }: ScoringPanelProps) {
  const { t, ut } = useLocale();
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
    <section className="sheet">
      <h2 className="sheet-title">{t(game.name)}</h2>

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

        {definition.fields.map((field) => (
          <div key={field.id} className="sheet-row">
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
                    inputMode="decimal"
                    className="sheet-input"
                    aria-label={ut("fieldForPlayer", {
                      label: t(field.label),
                      n: playerIndex + 1,
                    })}
                    value={typeof value === "string" ? value : ""}
                    onChange={(event) =>
                      updateValue(playerIndex, field.id, event.target.value)
                    }
                  />
                );
              })}
            </div>
          </div>
        ))}

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
                  total === maxTotal && maxTotal > 0 ? " sheet-total-lead" : ""
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
