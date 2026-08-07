<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# board_games

Final-scoring sheets for heavy euro board games. One static page, no backend,
no accounts. All scoring runs in the browser.

Write comments, commits and docs in **English**. The only Russian in this repo
is product content: `ru:` values inside `Translated` records. Never translate
those.

## Commands

```bash
npm run dev            # http://localhost:3000/board_games/  (basePath, not /)
npm run lint
npm run typecheck      # next typegen && tsc --noEmit; next build does NOT run eslint
npm test               # vitest run
npm run test:watch
npm run format         # prettier --write .
npm run format:check
npm run build          # static export into out/
```

CI runs lint → typecheck → test → build. All four must pass to deploy.

### Check on a clean tree before you push

Your working tree carries generated files that CI does not have. Passing here
is not the same as passing there. Wipe them and run the gates again:

```bash
rm -rf .next out && rm -f next-env.d.ts
npm run lint && npm run typecheck && npm test && npm run build
```

This is not hypothetical: `typecheck` runs before `build`, and the types for
image imports used to come only from the gitignored `next-env.d.ts` — which
exists locally after the first `npm run dev` and never exists on a fresh clone.
CI failed with 122 `TS2307: Cannot find module '@/assets/…'` while the same
command was green locally.

`types/assets.d.ts` is the fix and is committed: image imports take their type
from it rather than from `next-env.d.ts`. Do not delete it. `npm run typecheck`
also runs `next typegen` first, so the route types exist even when `.next` has
just been wiped.

## Where things live

| I want to change                           | File                                 |
| ------------------------------------------ | ------------------------------------ |
| Which games exist (name, box art, BGG id)  | `src/data/games.ts`                  |
| How a game scores — its rows and maths     | `src/scoring/games/<id>.ts`          |
| An expansion's rows and accent colour      | `expansions:` in the same file       |
| Rulebook wording and art in a token dialog | `src/scoring/rules/<id>.ts`          |
| A new kind of scoring maths                | `src/scoring/fields.ts`              |
| Which expansions are on, and persistence   | `src/scoring/expansions.ts`          |
| How the sheet is assembled                 | `src/components/ScoringPanel.tsx`    |
| One sheet row: token, label, input cells   | `src/components/SheetRow.tsx`        |
| The expansion chips above the sheet        | `src/components/ExpansionChips.tsx`  |
| Sheet state: active rows, totals, winner   | `src/components/useScoreSheet.ts`    |
| The token and its rules dialog             | `src/components/RuleToken.tsx`       |
| Any interface string                       | `src/i18n/ui.ts` (all three locales) |
| A visual style                             | `src/app/styles/<section>.css`       |
| Component art                              | `src/assets/rules/<id>/<field>.webp` |

`src/app/globals.css` declares nothing: it is a table of contents of `@import`s
into `src/app/styles/`, and the order of those imports is what the cascade
depends on. Edit the section file, not the index.

## Architecture — do not renegotiate this

`src/scoring/` is the core: plain data and pure functions. `src/components/`
is the UI. The core never imports React and never imports from `components/`
or `app/`. Keep it that way — it is why the maths is testable.

Hard rules:

- **Do not add new top-level folders or layers.** The five that exist —
  `app`, `components`, `data`, `i18n`, `scoring` — are the whole architecture.
- **Do not add runtime dependencies.** React is the only one; `dependencies`
  in `package.json` stays at three entries. Dev dependencies are fine.
- **Build fields from the factories** in `src/scoring/fields.ts`. Do not write
  a `score()` by hand — if no factory fits, add a factory.
- **Do not invent rulebook text.** It is quoted from the official English
  booklet. See `CLAUDE.md` for the procedure; a field with no rule is fine and
  falls back to its letter.
- **Do not weaken the registry types** to make an error go away.

## Invariants the machine checks

`src/data/games.ts` is the source of truth for which games exist. `GameId` is
derived from it, and `src/scoring/registry.ts` is keyed by `GameId`.

**The compiler catches**, so fix the data and never loosen the type:

- a game in the catalogue with no entry in `src/scoring/registry.ts`;
- an entry holding the wrong game's definition — the key is tied to the
  definition's own id through `GameScoringDefinition<K>`;
- a rules key that matches no field of that game. `GameFieldRules<G>` is keyed
  by `FieldIdOf<G>`, so `tsc` even suggests the intended id.

**`src/scoring/integrity.test.ts` catches** what types cannot state — duplicate
field ids between a base game and its expansions, a missing locale on any label
or rule, a malformed accent colour, an impossible player range. A failure there
is a data mistake; the message names the game and the id.

**ESLint catches** an import of React or of the UI layer from `src/scoring/` or
`src/data/`.

Rules are registered as an optional map on purpose: a game may ship without
dressed rules, and the token then falls back to its letter.

## Adding a game

1. Box art into `src/assets/games/<id>.<ext>`, entry into `src/data/games.ts`.
2. `src/scoring/games/<id>.ts` exporting a `GameScoringDefinition`.
3. Register it in `src/scoring/registry.ts` — `tsc` will demand this.
4. `npm test` — the integrity test checks the rest.

Rules text and icons are a separate pass. See `CLAUDE.md`.
