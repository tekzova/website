# website_5 — "Instrument"

Fifth design for tekzova.com. Website 4's storefront structure — sticky bar, drawer menu,
comparison cards, accordion — rebuilt in the **logo's own colours**, with the things website 4
was missing: Windows, the privacy proof, and the 14-day trial.

```
website_5/
├── index.html          home page (complete)
├── assets/
│   ├── tz.css          the whole design system
│   ├── tz.js           drawer, platform filter, scroll reveal
│   ├── logo-tekzova*.svg · icon-tekzova*.svg
│   ├── favicon.png · apple-touch-icon.png
│   └── icon-toptick.png · icon-nre-tracker.png · icon-portfolio-tracker.png
└── README.md
```

Only external request: Google Fonts (Sora + IBM Plex Sans + IBM Plex Mono). All three have real
fallback stacks, so the page is still correct if that fails.

---

## Design tokens

Every colour is a token on bare `:root` in `tz.css`. Nothing is defined only inside a dark-mode
block — that is the bug that renders one theme's text on the other theme's background.

| Token | Light | Role |
|---|---|---|
| `--teal` | `#0C7C77` | buttons, links, ticks — from the logo's T |
| `--teal-bright` | `#2FC7B4` | accent on navy |
| `--navy` | `#16273F` | hero, privacy band, CTA, footer — from the logo's Z |
| `--ink` / `--ink-2` | `#0E1B2A` / `#46596A` | text |
| `--paper` / `--wash` | `#FFFFFF` / `#F1F5F6` | grounds, biased cool toward the teal |
| `--amber` | `#A96A00` | Windows and trial chips, the Pro tier |
| `--coral` | `#C63F26` | the "never do" list |

**Type:** Sora for display, IBM Plex Sans for reading, IBM Plex Mono for spec labels, versions
and the permission sheet.

Both themes are built out. Check any new colour in both.

---

## Page structure

| # | Section | The question it answers |
|---|---|---|
| 1 | Hero (navy) | What is this? — headline, three promises, and a drawn diagram of where data lives |
| 2 | Promise rail | Four mechanisms, not adjectives |
| 3 | Ticker | What people actually use it for |
| 4 | The toolkit | Which app do I need? — cards with platform badges and a platform filter |
| 5 | Cross-platform | One backup file, phone ⇄ PC |
| 6 | Privacy band (navy) | Prove it — the Android permission sheet |
| 7 | Comparison | What's the catch? |
| 8 | Pricing | What does it cost? — Free / Pro / Never |
| 9 | Status | How far along are you really? |
| 10 | FAQ · CTA · footer | Everything left |

---

## Motion

All of it is transform/opacity only, so a phone animates it on the compositor. Everything stops
under `prefers-reduced-motion: reduce`, and the page is complete with JavaScript off.

- The hero phone **ticks its own list off** on a 7.2s loop; the monitor grows a bar chart and
  draws a sparkline on a 5.6s loop.
- Two aurora glows drift slowly behind the navy hero and the closing block (27s / 34s).
- The ticker strip scrolls, and pauses on hover or keyboard focus.
- A dot carries the backup file between phone and PC, both directions.
- Status bars fill themselves when their step scrolls in; cards rise in with a short stagger.

Scroll reveal is applied by `tz.js` only — the `.rv` rules are scoped to `html.js`, which an
inline script in the `<head>` sets. With JS off nothing is ever hidden.

---

## Editing

| Want to change | Where |
|---|---|
| Any colour | `assets/tz.css`, the `:root` token block |
| Menu contents | the `<aside class="drawer">` block |
| App cards | `#apps` on `index.html` — `data-p="android windows"` drives the filter |
| Ticker chips | the `.marqtrack` block — **the chips are duplicated twice**, edit both halves or the loop jumps |
| Pricing | `#pricing` |
| Release status | `#status` — the `<i style="width:…">` inside each `.bar` |
| Any FAQ | the `.faq` block |

### Adding an app

1. Copy an `<article class="app">` block in `#apps`.
2. Set `data-p` to `android`, `windows`, or `android windows` — that is all the filter needs.
3. Add the platform badges in `.plats` to match.
4. Add it to the drawer and the footer.
5. Add a privacy policy page and link it (Play will not accept an app without one).

---

## Still to build

The home page is complete. Not yet written, pending the app names and the page structure:

- `apps/toptick.html`, `apps/nre-tracker.html`, `apps/portfolio-tracker.html`
- the Windows program pages
- `pricing.html`
- `privacy/` — hub plus one policy per app; `privacy/toptick.html` is the URL Google Play needs
- `assets/og-image.png` (1200×630), referenced in the head but not yet created

## Before publishing

- Open `index.html` on a phone: check the drawer, that no section scrolls sideways, and the
  cards at 320px.
- Swap the "Tell me when it lands" buttons for real Play Store links as each app is published.
- Windows installers go in `downloads/`, with version, size and checksum shown beside each.

---

## App pages (added 6 Oct 2026)

```
apps/
├── portfolio-tracker.html            overview: hero, 9-screen tour, feature areas, phone gallery,
│                                     privacy, who it is for, pricing, get it, FAQ
├── portfolio-tracker-track.html      import, holdings, all assets, net worth, family, SIPs, transactions
├── portfolio-tracker-plan.html       Plan Builder, goals, FIRE, SWP, calculators
├── portfolio-tracker-analyse.html    money health, action list, fund health, growth, yearly review, reports
├── portfolio-tracker-tax.html        tax-year card, capital gains, ITR format, 112A, unrealised, tax-saving
├── portfolio-tracker-protect.html    insurance check, ULIP/endowment check, premium reminders, will, nominees
├── portfolio-tracker-learn.html      Investor Guide (39 chapters), glossary (173 terms)
├── portfolio-tracker-start.html      install (Windows from this site, Android from Google Play), first run, backups
├── nre-tracker.html                  NRE Tracker detail page
└── toptick.html                      TopTick detail page
assets/
├── pages.css    detail-page components (window/phone frames, tour, feature rows, gallery, lightbox)
├── pages.js     tour tabs, lightbox, gallery arrows
└── screens/     Portfolio Tracker screenshots (WebP), sample data, build M78
                 pt-d-*  desktop 1440×900 · pt-m-*  phone 390×844 @2x · *-card-*  dashboard cards
```

- The home page has a Portfolio Tracker flagship band, and every app card opens its page.
- Top bar, drawer and footer are shared across all pages (the drawer lists the Portfolio Tracker pages).
- Install buttons stay "Tell me when it lands" until launch. When a store link or download exists,
  replace the `mailto:` on the Get it cards (overview, start page and home cards).
- Tax pages are worded as reports that help you and your CA, with a "not tax advice" note.
- Screenshots are re-made with `scratchpad/web/shots.js` + `cards.js` from the app's sample data.
