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
  // A game is always selected: the catalogue is a non-empty const tuple, and
  // the panel cannot be closed once open.
  const [selectedGame, setSelectedGame] = useState<Game>(games[0]);

  // Clicking the already selected cover again resets nothing: the panel must
  // not be closable by a misclick, or the entered numbers are lost silently.
  const handleSelectGame = (game: Game) => {
    setSelectedGame(game);
  };

  return (
    <main className="site-main">
      <div className="site-topbar">
        <LocaleSwitcher />
      </div>

      <div className="games-grid">
        {games.map((game, index) => (
          <GameCard
            key={game.id}
            game={game}
            index={index}
            selected={selectedGame.id === game.id}
            onSelect={handleSelectGame}
          />
        ))}
      </div>

      <ScoringPanel key={selectedGame.id} game={selectedGame} />

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
              <p className="about-contact">
                {ut("aboutContact")}{" "}
                <a
                  href="https://t.me/zxc_stepashka"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @zxc_stepashka
                </a>
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
