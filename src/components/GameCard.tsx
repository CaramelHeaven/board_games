"use client";

import { useEffect, useRef, useState } from "react";
import type { Game } from "@/data/games";

type GameCardProps = {
  game: Game;
  selected: boolean;
  onSelect: (game: Game) => void;
};

export function GameCard({ game, selected, onSelect }: GameCardProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

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
      aria-label={game.name}
      aria-pressed={selected}
      onClick={() => onSelect(game)}
    >
      <div className="game-card-frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imageRef}
          src={game.image.src}
          alt={`Онлайн подсчет очков ${game.name}`}
          width={game.image.width}
          height={game.image.height}
          className={`game-card-image${imageLoaded ? " game-card-image-visible" : ""}`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
    </button>
  );
}
