"use client";

import { useState } from "react";
import { GameCard } from "@/components/GameCard";
import { ScoringPanel } from "@/components/ScoringPanel";
import { games, type Game } from "@/data/games";

export default function Home() {
  const [gamesOpen, setGamesOpen] = useState(true);
  const [aboutOpen, setAboutOpen] = useState(true);
  const [selectedGame, setSelectedGame] = useState<Game | null>(games[0] ?? null);

  const handleSelectGame = (game: Game) => {
    setSelectedGame((current) => (current?.id === game.id ? null : game));
  };

  return (
    <main className="site-main">
      <div className="site-container text-center">
        <header className="site-header">
          <span className="site-nav-btn site-nav-btn-active">
            Онлайн подсчет очков
          </span>
          <button
            type="button"
            className="site-nav-btn"
            aria-expanded={gamesOpen}
            onClick={() => setGamesOpen((open) => !open)}
          >
            Настольные игры
          </button>
        </header>
      </div>

      {gamesOpen && (
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
      )}

      {selectedGame && (
        <ScoringPanel key={selectedGame.id} game={selectedGame} />
      )}

      <div className="site-container text-center">
        <section className="about-section">
          <button
            type="button"
            className={`about-toggle${aboutOpen ? " about-toggle-open" : ""}`}
            aria-expanded={aboutOpen}
            onClick={() => setAboutOpen((open) => !open)}
          >
            О проекте
          </button>
          {aboutOpen && (
            <div className="about-body">
              <p>
                С помощью этого сайта вы сможете{" "}
                <span className="text-accent">быстро и без ошибок</span>{" "}
                определить победителя в популярных настольных играх. Подсчет
                очков происходит &ldquo;на лету&rdquo;, поэтому в процессе будут
                видны промежуточные итоги. Для вашего удобства к каждой игре, к
                каждому параметру подсчета, добавлены{" "}
                <span className="text-accent">выдержки из правил</span>.
                Чтобы ознакомиться с ними нажмите на соответствующую иконку
                напротив поля для ввода результата.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
