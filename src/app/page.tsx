"use client";

import { useState } from "react";
import { GameCard } from "@/components/GameCard";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { ScoringPanel } from "@/components/ScoringPanel";
import { games, type Game } from "@/data/games";
import { useLocale } from "@/i18n/LocaleProvider";

export default function Home() {
  const { ut } = useLocale();
  const [aboutOpen, setAboutOpen] = useState(true);
  const [selectedGame, setSelectedGame] = useState<Game | null>(
    games[0] ?? null,
  );

  const handleSelectGame = (game: Game) => {
    setSelectedGame((current) => (current?.id === game.id ? null : game));
  };

  return (
    <main className="site-main">
      <div className="site-topbar">
        <LocaleSwitcher />
      </div>

      <div className="games-grid">
        {games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            selected={selectedGame?.id === game.id}
            onSelect={handleSelectGame}
          />
        ))}
      </div>

      {selectedGame && (
        <ScoringPanel key={selectedGame.id} game={selectedGame} />
      )}

      <div className="site-container">
        <section className="about-section">
          <button
            type="button"
            className={`about-toggle${aboutOpen ? " about-toggle-open" : ""}`}
            aria-expanded={aboutOpen}
            onClick={() => setAboutOpen((open) => !open)}
          >
            {ut("about")}
          </button>
          {aboutOpen && (
            <div className="about-body">
              <p>{ut("aboutText")}</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
