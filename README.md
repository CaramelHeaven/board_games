# Board Game Score Calculator

Final scoring sheets for thirteen heavy euro board games — the whole Great
Western Trail trilogy, Everdell and Everdell Silverfrost, Wingspan, Orléans,
Lost Ruins of Arnak, Tzolk'in and more. Type the raw numbers in, get the
totals, tap any row to read the official rulebook wording for it.

**→ [Open the calculator](https://caramelheaven.github.io/board_games/)** ·
no install, no account, works offline.

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

| Game                                     | Players | Expansions                      | BGG                                                  |
| ---------------------------------------- | ------- | ------------------------------- | ---------------------------------------------------- |
| Great Western Trail                      | 2–4     | —                               | [341169](https://boardgamegeek.com/boardgame/341169) |
| Great Western Trail: Argentina           | 2–4     | —                               | [364011](https://boardgamegeek.com/boardgame/364011) |
| Great Western Trail: New Zealand         | 1–4     | —                               | [380607](https://boardgamegeek.com/boardgame/380607) |
| The White Castle                         | 1–4     | Matcha                          | [371942](https://boardgamegeek.com/boardgame/371942) |
| Tzolk'in                                 | 2–4     | —                               | [126163](https://boardgamegeek.com/boardgame/126163) |
| The Castles of Burgundy: Special Edition | 2–4     | —                               | [363622](https://boardgamegeek.com/boardgame/363622) |
| Wingspan                                 | 1–5     | Oceania                         | [266192](https://boardgamegeek.com/boardgame/266192) |
| Everdell                                 | 1–4     | Pearlbrook, Spirecrest, Newleaf | [199792](https://boardgamegeek.com/boardgame/199792) |
| Everdell Silverfrost                     | 1–4     | —                               | [436821](https://boardgamegeek.com/boardgame/436821) |
| Grand Austria Hotel                      | 2–4     | Let's Waltz!                    | [182874](https://boardgamegeek.com/boardgame/182874) |
| Teotihuacan: City of Gods                | 1–4     | —                               | [229853](https://boardgamegeek.com/boardgame/229853) |
| Orléans                                  | 2–4     | Trade & Intrigue, The Plague    | [164928](https://boardgamegeek.com/boardgame/164928) |
| Lost Ruins of Arnak                      | 1–4     | Twisted Paths                   | [312484](https://boardgamegeek.com/boardgame/312484) |

## Features

- **Score sheet per game.** Rows come from the game's own final-scoring section,
  not from a generic template.
- **Real scoring math.** Categories are not always a plain sum — some are
  `floor(n / k)` (GWT money), some are lookup tables, some scale with how many
  of something you have, and the nectar rows in Wingspan's Oceania are scored
  as a majority against the other columns. Each field declares its own
  `score()` function.
- **Expansions on a chip.** Games that have one show a row of chips above the
  sheet; switching one on inserts its extra rows, tinted in that expansion's
  colour. The choice is remembered per game in `localStorage`.
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

Open **http://localhost:3000/board_games/** — not `/`. `next.config.ts` sets
`basePath: "/board_games"` for GitHub Pages, and that applies in dev too.

Other scripts:

```bash
npm run lint        # eslint
npm run typecheck   # next typegen && tsc --noEmit
npm test            # vitest run
npm run build       # static export into out/
npm run format      # prettier --write .
```

CI runs lint → typecheck → test → build, and all four must pass to deploy.
`next build` does **not** run eslint, so `npm run lint` is not optional.

Requires Node 20+ (CI builds on 24).

## Project structure

```
src/
  app/                  root layout, the single page
    styles/             one CSS file per section; globals.css only @imports them
  components/           GameCard, ScoringPanel, SheetRow, RuleToken,
                        ExpansionChips, LocaleSwitcher, useScoreSheet
  data/games.ts         the game catalogue: id, names, BGG id, box art
  i18n/                 locale list, provider, UI strings
  scoring/
    types.ts            ScoreFieldDefinition / GameScoringDefinition
    fields.ts           field factories (sum, floor-div, multiply, lookup,
                        checkbox, majority, scaled-by-counts)
    games/<id>.ts       one file per game: its scoring fields and expansions
    registry.ts         game id -> scoring definition
    expansions.ts       which expansions are on, persisted in localStorage
    rules/<id>.ts       one file per game: rulebook text + icons per field
    rules/registry.ts
    integrity.test.ts   data invariants the types cannot state
  assets/
    games/              box art (200×200)
    rules/<id>/         component icons and illustrations (webp)
```

The split between `scoring/games/` (the math) and `scoring/rules/` (the wording
and the art) is deliberate: a game can be fully playable in the app before anyone
gets around to dressing it with icons, and a field with no rule entry just falls
back to showing its first letter.

`src/scoring/` is plain data and pure functions — it never imports React and
never imports from `components/`. That is what makes the math testable, and
eslint enforces it.

## Adding a game

1. Put the box art in `src/assets/games/<id>.<ext>` and add an entry to
   `src/data/games.ts` (id, name in all three locales, BGG id, image import).
2. Create `src/scoring/games/<id>.ts` exporting a `GameScoringDefinition`.
   Build the fields out of the factories in `src/scoring/fields.ts` rather than
   writing `score()` by hand — most categories are already covered.
3. Register it in `src/scoring/registry.ts`. `tsc` will demand this: `GameId` is
   derived from the catalogue, so a game without a definition fails to compile.
4. Run `npm test`. `integrity.test.ts` checks what the types cannot — duplicate
   field ids, a missing locale on a label, a malformed accent colour.

That is enough to make the game work. Icons and rules text are a separate,
optional pass — see [CLAUDE.md](./CLAUDE.md) for the full procedure (where to
find rulebooks, how to check a PDF's raster before cropping, the EN→RU/ZH
terminology glossary, and what not to do).

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which runs
`next build`, uploads `out/` as a Pages artifact and deploys it.

Because the site lives in a subfolder, `next.config.ts` sets
`basePath: "/board_games"`. That value is baked into the client bundle at build
time — moving the site to a root domain means changing the config and rebuilding,
not just flipping a switch in the GitHub UI.

## Known limitations

- **Scores are not saved.** Reloading the page or switching games clears the
  sheet. Only the language and the expansion toggles persist.
- **Player count is fixed** at each game's maximum; unused columns just stay
  empty.
- **Russian is the source language** for the UI, but the rules text is translated
  from the _English_ rulebooks. So the Russian wording in the app does not always
  match the terminology printed on the components of a Russian edition.
- **Not every field has art.** Some booklets simply do not picture a component
  at a usable resolution; those rows fall back to the token letter and the
  field's own hint rather than shipping an illegible upscale.
