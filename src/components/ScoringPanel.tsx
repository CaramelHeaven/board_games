"use client";

import type { CSSProperties } from "react";
import { ExpansionChips } from "@/components/ExpansionChips";
import { SheetRow } from "@/components/SheetRow";
import { useScoreSheet } from "@/components/useScoreSheet";
import { useLocale } from "@/i18n/LocaleProvider";
import type { Game } from "@/data/games";
import { getFieldRule } from "@/scoring/rules/registry";

type ScoringPanelProps = {
  game: Game;
};

const PLAYER_ACCENTS = ["#C2410C", "#C79000", "#198754", "#087990", "#6F42C1"];

/** The score sheet: setup chips on top, one row per category, totals below. */
export function ScoringPanel({ game }: ScoringPanelProps) {
  const { t, ut } = useLocale();
  const {
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
  } = useScoreSheet(game);

  return (
    <section className="sheet">
      <h2 className="sheet-title">{t(game.name)}</h2>

      {expansions && expansions.length > 0 && (
        <ExpansionChips
          gameId={game.id}
          expansions={expansions}
          enabled={enabled}
        />
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

        {activeFields.map((field) => (
          <SheetRow
            key={field.id}
            field={field}
            rule={getFieldRule(game.id, field.id)}
            owner={ownerByFieldId.get(field.id)}
            scores={scores}
            onChange={updateValue}
          />
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
