"use client";

import { useRef, useState } from "react";
import type { FieldRule } from "@/scoring/rules/types";
import type { ScoreFieldDefinition } from "@/scoring/types";

type RuleTokenProps = {
  field: ScoreFieldDefinition;
  rule?: FieldRule;
};

function tokenLetter(label: string): string {
  // «ПО» — общий префикс у большинства параметров, буква от него неинформативна.
  const meaningful = label.trim().replace(/^ПО\s+/i, "");
  const first = (meaningful || label).trim().charAt(0);
  return first ? first.toUpperCase() : "?";
}

export function RuleToken({ field, rule }: RuleTokenProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  // Односторонняя защёлка: иллюстрации монтируются только после первого открытия,
  // чтобы не тянуть их при загрузке страницы. Состояние самого диалога не зеркалим —
  // событие close не всплывает и рассинхронизировало бы его.
  const [artMounted, setArtMounted] = useState(false);
  const letter = tokenLetter(field.label);
  const text = rule?.text ?? field.hint;

  if (!text) {
    return (
      <span className="token token-mute" aria-hidden="true">
        {letter}
      </span>
    );
  }

  // В строке всегда буква — счётный лист остаётся единообразным для всех игр.
  const rowFace = <span aria-hidden="true">{letter}</span>;

  // Арт компонента показывается только в шапке диалога.
  const dialogFace = rule ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={rule.icon.src} alt="" className="token-art" />
  ) : (
    rowFace
  );

  // Состояние держит сам <dialog>: событие close не всплывает,
  // поэтому зеркалить его в useState нельзя — рассинхронизируется.
  return (
    <>
      <button
        type="button"
        className="token"
        onClick={() => {
          setArtMounted(true);
          dialogRef.current?.showModal();
        }}
        aria-label={`Правила: ${field.label}`}
      >
        {rowFace}
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
              {dialogFace}
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

          <div className="rule-dialog-body">
            <p className="rule-dialog-text">{text}</p>
            {artMounted &&
              rule?.art?.map((art, index) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={index}
                  src={art.src}
                  alt=""
                  className="rule-dialog-art"
                  width={art.width}
                  height={art.height}
                />
              ))}
          </div>
        </div>
      </dialog>
    </>
  );
}
