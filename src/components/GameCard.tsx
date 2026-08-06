"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Game } from "@/data/games";
import { useLocale } from "@/i18n/LocaleProvider";

type GameCardProps = {
  game: Game;
  index: number;
  selected: boolean;
  onSelect: (game: Game) => void;
};

/**
 * Угол наклона обложки: величина берётся от id, знак чередуется по позиции —
 * так ряд кренится в обе стороны, а не заваливается целиком.
 * Всё детерминировано: Math.random разошёлся бы между пререндером и гидрацией.
 */
function tilt(id: string, index: number): string {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash * 31 + id.charCodeAt(i)) % 997;
  }
  const magnitude = 1.4 + (hash % 21) * 0.1; // 1,4°…3,4°
  const sign = index % 2 === 0 ? -1 : 1;
  return `${(magnitude * sign).toFixed(2)}deg`;
}

export function GameCard({ game, index, selected, onSelect }: GameCardProps) {
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
      style={{ "--tilt": tilt(game.id, index) } as CSSProperties}
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
