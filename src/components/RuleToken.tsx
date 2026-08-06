"use client";

import { useRef } from "react";
import type { ScoreFieldDefinition } from "@/scoring/types";

type RuleTokenProps = {
  field: ScoreFieldDefinition;
};

function tokenLetter(label: string): string {
  // «ПО» — общий префикс у большинства параметров, буква от него неинформативна.
  const meaningful = label.trim().replace(/^ПО\s+/i, "");
  const first = (meaningful || label).trim().charAt(0);
  return first ? first.toUpperCase() : "?";
}

export function RuleToken({ field }: RuleTokenProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const letter = tokenLetter(field.label);

  if (!field.hint) {
    return (
      <span className="token token-mute" aria-hidden="true">
        {letter}
      </span>
    );
  }

  // Состояние держит сам <dialog>: событие close не всплывает,
  // поэтому зеркалить его в useState нельзя — рассинхронизируется.
  return (
    <>
      <button
        type="button"
        className="token"
        onClick={() => dialogRef.current?.showModal()}
        aria-label={`Правила: ${field.label}`}
      >
        <span aria-hidden="true">{letter}</span>
      </button>

      <dialog
        ref={dialogRef}
        className="rule-dialog"
        onClick={(event) => {
          // Клик по ::backdrop приходит на сам dialog, а не на его содержимое.
          if (event.target === dialogRef.current) {
            dialogRef.current?.close();
          }
        }}
      >
        <div className="rule-dialog-inner">
          <header className="rule-dialog-head">
            <span className="token" aria-hidden="true">
              {letter}
            </span>
            <h3 className="rule-dialog-title">{field.label}</h3>
            <button
              type="button"
              className="rule-dialog-close"
              onClick={() => dialogRef.current?.close()}
              aria-label="Закрыть"
            >
              &times;
            </button>
          </header>
          <p className="rule-dialog-body">{field.hint}</p>
        </div>
      </dialog>
    </>
  );
}
