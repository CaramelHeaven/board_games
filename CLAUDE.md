@AGENTS.md

# Project language

**Code comments, commit messages and documentation are written in English.**
The only Russian in this repository is product content: the `ru:` values of
`Translated` records — UI strings, field labels and rulebook wording shown to
users. Never translate those; never leave a comment in anything but English.

# Dressing a game: component icons and rules text

How to give a game its component art and the rules text shown in token dialogs.
Worked out on Great Western Trail, Tzolk'in and The Castles of Burgundy.

## Source language

**Look for the English rulebook.** It is easier to find, it almost always exists,
and Russian editions are not published for every game. Russian and Chinese texts
are translated from English.

Consequence worth remembering: the Russian text in the dialog is no longer the
official wording of the Russian edition. Translated terminology may not match what
is printed on the components in the box — the Russian edition of Tzolk'in, for
example, calls corn _маис_ and monuments _дворцы_, neither of which a translation
from English would produce. This is a deliberate trade for speed and coverage.

## Where to find rulebooks

**English sources only.** Do not go looking for Russian-language rulebooks —
not on Tesera, not on Hobby World, not on Igroved. The English booklet is the
source of record here (see _Source language_ above), and a Russian PDF would
only reintroduce terminology the app does not use.

Sources that answer automated requests, best quality first:

1. **The publisher's own site** — the original file, always the best raster.
   Many host PDFs at predictable paths with a language code, e.g.
   `filemanager.czechgames.com/storage/files/<game>/rules/<game>-rules-en.pdf`
   (Czech Games Edition) or `stonemaiergames.com/games/<game>/rules/`
   (Stonemaier). If one language resolves, try swapping the code.
   Publishers behind the games in this repo: Stonemaier (Wingspan), Starling
   Games / Tabletop Tycoon (Everdell), Board & Dice (Teotihuacan), Eggertspiele
   / Plan B (Great Western Trail), Czech Games Edition (Tzolk'in).
2. **Tabletopia CDN** — `c.tabletopia.com/games/<slug>/rules/<file>/en` serves
   the PDF the publisher uploaded, and it is worth trying whenever an aggregator
   comes up short. This is how the Newleaf booklet was found.
3. **[1jour-1jeu](https://en.1jour-1jeu.com/)** — aggregator with direct CDN
   links shaped like `cdn.1j1ju.com/medias/xx/yy/zz-<game>-rulebook.pdf`.
   Convenient, but the files are frequently run through a compressor, so treat
   its rasters as suspect and check them (next section).

Two sources worth knowing about that an agent cannot reach — they return 403 to
automated requests, so they are for a human with a browser:

- **BGG → game page → Files tab → Rules** — the most complete index anywhere.
- **Fantasy Flight Product Document Archive** — publishes explicit high-res
  variants, but only for FFG titles.

One trap, hit for real on Everdell: **an aggregator may serve the base game's
rulebook under the expansion's name.** 1jour-1jeu's Newleaf page links
`89-everdell-rulebook.pdf`, which is the base booklet. Always confirm the file
you downloaded is the one you wanted before cropping anything out of it:

```bash
pdftotext -enc UTF-8 -layout rules-en.pdf - | head -20
```

Download into the scratchpad, **never into the repository**: rulebooks run 3–15 MB
and have no business in git history. Only the finished webp files get committed.

## Check the raster before cropping

Crop resolution is capped by the images embedded in the PDF, **not** by the `-r`
flag passed to `pdftocairo`. Rendering a 150 ppi raster at 600 dpi is an upscale,
and that is exactly what produces mushy icons. Look before you crop:

```bash
pdfimages -list rules-en.pdf | head -20
```

Read the `x-ppi` column:

- **≥ 300 ppi** — render at 600 dpi freely.
- **≈ 150 ppi** — around 300 dpi is the honest ceiling. All three Everdell
  expansion booklets are 150 ppi throughout.
- **an element whose raster is under ~200 px on its longest side** — no usable
  100 px icon exists in there. Go find another source instead of turning `-r` up.
  In the Spirecrest booklet the small component images sit at 84 ppi and 85×69 px;
  that is where the blurry crops came from.

Rule of thumb for a 100 px icon: the crop window needs about `100 / (ppi / 72)`
points on its shorter side. At 150 ppi that is roughly 48 pt.

## Mandatory check before cropping

Find the final-scoring section and **reconcile its entries against the game's
fields** in `src/scoring/games/<id>.ts`.

```bash
pdftotext -enc UTF-8 -layout rules-en.pdf - \
  | grep -n -A20 -iE "final scoring|game end|end of the game"
```

If the entries do not line up with our fields, stop and ask. Never change the
scoring model silently. All three games so far matched exactly, but do not count
on that holding.

## Cropping

Do not reach for `pdfimages`: in rulebooks that have been run through online
compressors the rasters are shattered into thousands of fragments — 6022 of them
in the GWT file. Rendering a window works instead.

```bash
# 1. locate the page and render it whole for measuring
pdftocairo -png -r 110 -f 18 -l 18 rules-en.pdf page

# 2. list item coordinates can come straight from the PDF's own structure
pdftotext -bbox -f 18 -l 18 rules-en.pdf - | grep -E '>[0-9]{1,2}</word>'

# 3. render just the window at high DPI (coordinates in points × 600/72)
pdftocairo -png -r 600 -f 18 -l 18 -x X -y Y -W W -H H rules-en.pdf out

# 4. convert to webp
cwebp -q 88 -resize 100 0 out-18.png -o icon.webp
```

Sizes: icons 100 px wide, illustrations 600–700 px. Never distort the aspect ratio —
the token uses `object-fit: contain`.

## Working order

Do not crop one icon at a time and verify each; it is slow. Instead:

1. Estimate boxes for every icon at once and render them all.
2. Build an HTML contact sheet, serve the crops folder with
   `python3 -m http.server`, and review everything in a single screenshot.
   `file://` will not open in the browser tooling — HTTP is required.
3. Fix the misses and repeat. Two rounds were enough on GWT.

Show the contact sheet to the user before wiring anything into the project.

Judge fine textures and grain only via `zoom` at native resolution: a downscaled
JPEG screenshot manufactures moiré that is not present in the actual render.

## Where the icons themselves live

If the rulebook has a final-scoring spread with an icon beside every entry, take
them from there — that is the ideal case (GWT, page 18). If it does not, gather
them across the booklet: the components page gives clean isolated pieces, and the
action spreads carry icons in the right-hand summary column.

## Where things go

- Assets: `src/assets/rules/<game-id>/<field-id>.webp`, illustrations with an
  `-art` suffix. Names in kebab-case derived from the field id.
- Rules: `src/scoring/rules/<game-id>.ts`, exporting a `GameFieldRules` —
  `Record<fieldId, FieldRule>` with `text: Translated`, `icon`, optional `art`.
- Registration: one key in `rulesByGameId` in `src/scoring/rules/registry.ts`.

Touch nothing else. `RuleToken` and `ScoringPanel` already handle rules, and a
field with no rule falls back to its letter and `field.hint`.

## What not to do

- **Never invent rules text.** If the booklet has no wording for a field, do not
  write it yourself. Leave the field out of `GameFieldRules` so it shows its letter
  and its own hint. That is what was done for the score-track field in Tzolk'in and
  Burgundy: the track is not an entry in the final scoring.
- **Never ship an unreadable crop for the sake of completeness.** A clean letter
  beats an illegible smear.
- **Never copy crops from other sites** such as finalscoring.ru. The source is the
  same official booklet either way, so cropping it ourselves costs no more and
  yields one consistent style fitted to our token frame.
