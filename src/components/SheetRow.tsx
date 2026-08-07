"use client";

import type { CSSProperties } from "react";
import { RuleToken } from "@/components/RuleToken";
import { useLocale } from "@/i18n/LocaleProvider";
import { sanitizeNumericInput } from "@/scoring/fields";
import type { FieldRule } from "@/scoring/rules/types";
import type {
  ExpansionDefinition,
  PlayerScoreState,
  ScoreFieldDefinition,
} from "@/scoring/types";

type SheetRowProps = {
  field: ScoreFieldDefinition;
  rule?: FieldRule;
  /** Set when the row came from an expansion — it then carries its accent. */
  owner?: ExpansionDefinition;
  scores: PlayerScoreState;
  onChange: (
    playerIndex: number,
    fieldId: string,
    value: string | boolean,
  ) => void;
};

/** One scoring category: its token, its label and one cell per player. */
export function SheetRow({
  field,
  rule,
  owner,
  scores,
  onChange,
}: SheetRowProps) {
  const { t, ut } = useLocale();
  const label = t(field.label);

  return (
    <div
      className={`sheet-row${owner ? " sheet-row-expansion" : ""}`}
      style={
        owner ? ({ "--accent": owner.accent } as CSSProperties) : undefined
      }
    >
      <RuleToken field={field} rule={rule} />
      <span className="sheet-label">{label}</span>
      <div className="sheet-cells">
        {scores.map((playerScores, playerIndex) => {
          const value = playerScores[field.id];
          const cellLabel = ut("fieldForPlayer", {
            label,
            n: playerIndex + 1,
          });

          if (field.kind === "checkbox") {
            return (
              <label key={playerIndex} className="sheet-check">
                <input
                  type="checkbox"
                  checked={value === true}
                  aria-label={cellLabel}
                  onChange={(event) =>
                    onChange(playerIndex, field.id, event.target.checked)
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
              aria-label={cellLabel}
              value={typeof value === "string" ? value : ""}
              onChange={(event) =>
                onChange(
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
}
