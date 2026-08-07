"use client";

import type { CSSProperties } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import type { GameId } from "@/data/games";
import { toggleExpansion } from "@/scoring/expansions";
import type { ExpansionDefinition } from "@/scoring/types";

type ExpansionChipsProps = {
  gameId: GameId;
  expansions: readonly ExpansionDefinition[];
  enabled: readonly string[];
};

/** The setup of the game: one chip per box on the table. */
export function ExpansionChips({
  gameId,
  expansions,
  enabled,
}: ExpansionChipsProps) {
  const { t, ut } = useLocale();

  return (
    <div className="expansions" aria-label={ut("expansions")} role="group">
      {expansions.map((expansion) => (
        <button
          key={expansion.id}
          type="button"
          className="expansion-chip"
          style={{ "--accent": expansion.accent } as CSSProperties}
          aria-pressed={enabled.includes(expansion.id)}
          onClick={() => toggleExpansion(gameId, expansion.id)}
        >
          <span className="expansion-mark" aria-hidden="true" />
          {t(expansion.name)}
        </button>
      ))}
    </div>
  );
}
