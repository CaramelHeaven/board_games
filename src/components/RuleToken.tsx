"use client";

import { useRef, useState } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import type { FieldRule } from "@/scoring/rules/types";
import type { ScoreFieldDefinition } from "@/scoring/types";

type RuleTokenProps = {
  field: ScoreFieldDefinition;
  rule?: FieldRule;
};

// «ПО» и «VP from» — общие приставки у большинства параметров,
// буква от них одинакова у всех строк и потому бесполезна.
const SCORE_PREFIXES = /^(ПО|VP\s+from|VP)\s+/i;

function tokenLetter(label: string): string {
  const meaningful = label.trim().replace(SCORE_PREFIXES, "");
  const first = (meaningful || label).trim().charAt(0);
  return first ? first.toUpperCase() : "?";
}

export function RuleToken({ field, rule }: RuleTokenProps) {
  const { t, ut } = useLocale();
  const dialogRef = useRef<HTMLDialogElement>(null);
  // Односторонняя защёлка: иллюстрации монтируются только после первого открытия,
  // чтобы не тянуть их при загрузке страницы. Состояние самого диалога не зеркалим —
  // событие close не всплывает и рассинхронизировало бы его.
  const [artMounted, setArtMounted] = useState(false);
  const label = t(field.label);
  const letter = tokenLetter(label);
  const translatedText = rule?.text ?? field.hint;
  const text = translatedText ? t(translatedText) : undefined;

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
  const dialogFace = rule?.icon ? (
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
        aria-label={ut("rulesFor", { label })}
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
            <h3 className="rule-dialog-title">{label}</h3>
            <button
              type="button"
              className="rule-dialog-close"
              onClick={() => dialogRef.current?.close()}
              aria-label={ut("close")}
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
