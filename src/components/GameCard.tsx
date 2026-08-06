"use client";

import { useEffect, useRef, useState } from "react";
import type { Game } from "@/data/games";
import { useLocale } from "@/i18n/LocaleProvider";

type GameCardProps = {
  game: Game;
  selected: boolean;
  onSelect: (game: Game) => void;
};

export function GameCard({ game, selected, onSelect }: GameCardProps) {
  const { t, ut } = useLocale();
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const name = t(game.name);

  // Картинка локальная и лежит в SSR-разметке, поэтому может догрузиться
  // до гидрации — тогда onLoad уже не сработает.
  useEffect(() => {
    if (imageRef.current?.complete) {
      setImageLoaded(true);
    }
  }, []);

  return (
    <button
      type="button"
      className={`game-card${selected ? " game-card-selected" : ""}`}
      aria-label={name}
      aria-pressed={selected}
      onClick={() => onSelect(game)}
    >
      <div className="game-card-frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imageRef}
          src={game.image.src}
          alt={ut("gameCardAlt", { game: name })}
          width={game.image.width}
          height={game.image.height}
          className={`game-card-image${imageLoaded ? " game-card-image-visible" : ""}`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
    </button>
  );
}
