# board_games

A tiny web app for tallying end-of-game scores in heavy euro board games.

**Live: https://caramelheaven.github.io/board_games/**

## What it is

At the end of a long euro game, everybody stares at the board trying to remember
what exactly scores points and how much. This app puts that on screen: pick a game,
get its official final-scoring sheet with one row per scoring category and one
column per player, type the raw numbers in, and the totals update as you go.

Every row carries a token that opens the wording straight from the official
rulebook, with the component art cropped out of the same booklet — so you can
settle an argument without digging the rules out of the box.

There is no backend, no account, and nothing is sent anywhere. The whole thing is
a static bundle: all the scoring math runs in your browser.

## Supported games

| Game | Players | BGG |
| --- | --- | --- |
| Great Western Trail | 2–4 | [341169](https://boardgamegeek.com/boardgame/341169) |
| Great Western Trail: Argentina | 2–4 | [364011](https://boardgamegeek.com/boardgame/364011) |
| The White Castle | 1–4 | [371942](https://boardgamegeek.com/boardgame/371942) |
| Tzolk'in: The Mayan Calendar | 2–4 | [126163](https://boardgamegeek.com/boardgame/126163) |
| The Castles of Burgundy: Special Edition | 2–4 | [363622](https://boardgamegeek.com/boardgame/363622) |
| Wingspan | 1–5 | [266192](https://boardgamegeek.com/boardgame/266192) |
| Everdell | 1–4 | [199792](https://boardgamegeek.com/boardgame/199792) |
| Grand Austria Hotel | 2–4 | [182874](https://boardgamegeek.com/boardgame/182874) |
| Teotihuacan: City of Gods | 1–4 | [229853](https://boardgamegeek.com/boardgame/229853) |

## Features

- **Score sheet per game.** Rows come from the game's own final-scoring section,
  not from a generic template.
- **Real scoring math.** Categories are not always a plain sum — some are
  `floor(n / k)` (GWT dollars), some are lookup tables, some scale with how many
  of something you have. Each field declares its own `score()` function.
- **Rules on tap.** Tapping a row's token opens the rulebook wording for that
  category plus illustrations cropped from the official PDF.
- **Three languages.** Russian, English and Simplified Chinese. The choice is
  remembered in `localStorage`.
- **Works offline-ish.** Static files only — once loaded, no network needed.

## Tech stack

Next.js 16 (App Router) · React 19 · TypeScript · plain CSS · no runtime
dependencies beyond React.

The whole app is one route (`/`) rendered as a client component, exported to
static HTML via `output: "export"` and hosted on GitHub Pages.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

Other scripts:

```bash
npm run build   # static export into out/
npm run lint    # eslint
```

Requires Node 20+ (CI builds on 24).

## Project structure

```
src/
  app/               root layout, the single page, global CSS
  components/        GameCard, ScoringPanel, RuleToken, LocaleSwitcher
  data/games.ts      the game catalogue: id, names, BGG id, box art
  i18n/              locale list, provider, UI strings
  scoring/
    types.ts         ScoreFieldDefinition / GameScoringDefinition
    fields.ts        field factories (sum, floor-div, multiply, lookup, …)
    games/<id>.ts    one file per game: its scoring fields
    registry.ts      game id -> scoring definition
    rules/<id>.ts    one file per game: rulebook text + icons per field
    rules/registry.ts
  assets/
    games/           box art
    rules/<id>/      component icons and illustrations (webp)
```

The split between `scoring/games/` (the math) and `scoring/rules/` (the wording
and the art) is deliberate: a game can be fully playable in the app before anyone
gets around to dressing it with icons, and a field with no rule entry just falls
back to showing its first letter.

## Adding a game

1. Put the box art in `src/assets/games/<id>.<ext>` and add an entry to
   `src/data/games.ts` (id, name in all three locales, BGG id, image import).
2. Create `src/scoring/games/<id>.ts` exporting a `GameScoringDefinition`.
   Build the fields out of the factories in `src/scoring/fields.ts` rather than
   writing `score()` by hand — most categories are already covered.
3. Register it in `src/scoring/registry.ts`.

That is enough to make the game work. Icons and rules text are a separate,
optional pass — see [CLAUDE.md](./CLAUDE.md) for the full procedure (where to
find rulebooks, how to crop icons out of a PDF, and what not to do).

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which runs
`next build`, uploads `out/` as a Pages artifact and deploys it.

Because the site lives in a subfolder, `next.config.ts` sets
`basePath: "/board_games"`. That value is baked into the client bundle at build
time — moving the site to a root domain means changing the config and rebuilding,
not just flipping a switch in the GitHub UI.

## Known limitations

- **Scores are not saved.** Reloading the page or switching games clears the
  sheet. Only the language choice persists.
- **Player count is fixed** at each game's maximum; unused columns just stay
  empty.
- **Russian is the source language** for the UI, but the rules text is translated
  from the *English* rulebooks. So the Russian wording in the app does not always
  match the terminology printed on the components of a Russian edition.
