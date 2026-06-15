"use client";

import { useEffect, useState } from "react";
import type { Game } from "@/data/games";

type GameCardProps = {
  game: Game;
};

export function GameCard({ game }: GameCardProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    setImageUrl(null);
    setImageLoaded(false);
    setError(false);

    fetch(`/api/bgg/${game.bggId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load BGG image");
        }
        return response.json() as Promise<{ imageUrl: string }>;
      })
      .then((data) => {
        if (!cancelled) {
          setImageUrl(data.imageUrl);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [game.bggId]);

  const showLoader = !error && (!imageUrl || !imageLoaded);

  return (
    <button type="button" className="game-card" aria-label={game.name}>
      <div className="game-card-frame">
        {showLoader && <div className="game-card-loader" aria-hidden="true" />}
        {error && (
          <div className="game-card-error" aria-label={`Не удалось загрузить ${game.name}`}>
            ?
          </div>
        )}
        {imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={`Онлайн подсчет очков ${game.name}`}
            width={80}
            height={80}
            className={`game-card-image${imageLoaded ? " game-card-image-visible" : ""}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setError(true)}
          />
        )}
      </div>
    </button>
  );
}
