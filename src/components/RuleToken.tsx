"use client";

import { useRef, useState } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import { SCORE_LABEL_PREFIX, type Locale } from "@/i18n/types";
import type { FieldRule } from "@/scoring/rules/types";
import type { ScoreFieldDefinition } from "@/scoring/types";

type RuleTokenProps = {
  field: ScoreFieldDefinition;
  rule?: FieldRule;
};

/** The shared prefix is stripped so the letter says something about the row. */
function tokenLetter(label: string, locale: Locale): string {
  const meaningful = label.trim().replace(SCORE_LABEL_PREFIX[locale], "");
  const first = (meaningful || label).trim().charAt(0);
  return first ? first.toUpperCase() : "?";
}

export function RuleToken({ field, rule }: RuleTokenProps) {
  const { t, ut, locale } = useLocale();
  const dialogRef = useRef<HTMLDialogElement>(null);
  // One-way latch: the artwork is mounted only after the first open, so it is
  // not fetched on page load. The dialog's own state is not mirrored here —
  // the close event does not bubble and would leave the mirror out of sync.
  const [artMounted, setArtMounted] = useState(false);
  const label = t(field.label);
  const letter = tokenLetter(label, locale);
  const translatedText = rule?.text ?? field.hint;
  const text = translatedText ? t(translatedText) : undefined;

  if (!text) {
    return (
      <span className="token token-mute" aria-hidden="true">
        {letter}
      </span>
    );
  }

  // The row always shows a letter — the score sheet stays uniform across games.
  const rowFace = <span aria-hidden="true">{letter}</span>;

  // The component art is shown only in the dialog header.
  const dialogFace = rule?.icon ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={rule.icon.src} alt="" className="token-art" />
  ) : (
    rowFace
  );

  // The <dialog> itself owns the open state: the close event does not bubble,
  // so mirroring it into useState is not an option — it would get out of sync.
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
          // A click on ::backdrop lands on the dialog itself, not its content.
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
