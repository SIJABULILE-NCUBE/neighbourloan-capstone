# Neighbourloan

**A neighbourhood tool & equipment lending marketplace — built as a founder
capstone sprint for Melsoft Academy.**

> Read `BRIEF.md` first for full context. This README documents what was
> actually built, the technologies used, and how to run it.

---

## 🔗 Live demo

**[https://neighbourloan.netlify.app/](https://neighbourloan.netlify.app/)**


## 📦 Repository

[github.com/SIJABULILE-NCUBE/neighbourloan-capstone](https://github.com/SIJABULILE-NCUBE)


---

## The brief, in one sentence

A founder named Thabo asked for a tool-lending marketplace built in one sprint,
including several requests that were dishonest, unethical, or unrealistic for
the timeframe. This project is as much about **what I refused to build and why**
as it is about the code — see `FOUNDER-RESPONSE.md` and `DECISION-LOG.md`.

---

## Technologies used

| Layer | Technology |
|---|---|
| Framework | [React 18](https://react.dev/) (function components + hooks) |
| Language | [TypeScript](https://www.typescriptlang.org/) — strict mode, no `any` |
| Build tool | [Vite](https://vitejs.dev/) |
| Styling | Plain CSS with custom properties (CSS variables) — no framework |
| State management | React `useState` / `useMemo` — no external state library |
| Navigation | In-memory state-based view switching — no router (see Decision Log) |
| Deployment | [Netlify](https://www.netlify.com/), connected directly to GitHub for automatic build-and-deploy on every push |
| Data layer | Fully typed mock data (`src/data/`), structured to mirror a real future API contract |

No backend, no database, no external API calls — this is a frontend-only MVP
by design, per the brief.

---

## What's actually built

### Core flow (all working, end to end)
- **Browse screen** — live search by title, filter by category, filter by
  price (free / paid / all)
- **Item detail screen** — photos (or graceful empty state), description,
  owner info, Trust Score breakdown
- **Two-step booking flow** — pick dates → review & confirm → confirmation
  screen
- **Lightweight auth** — requested only at the point of confirming a booking,
  not before browsing (see below)
- Fully responsive (tested at mobile widths) and keyboard-navigable

### The standout feature: Trust Score
Instead of Thabo's requested fake "3 people are looking at this right now!!"
urgency counter, every item shows a **Trust Score** — a 0–100 score derived
from real data already in the contract (owner tenure, rating, number of
completed bookings). This replaces a manufactured pressure tactic with an
honest signal that serves the same goal: giving people confidence to book.
This design draws on real risk-assessment thinking from my background as a
credit risk analyst.

See `src/lib/trust.ts` for the scoring logic.

### What was deliberately cut or reshaped
Full reasoning is in `FOUNDER-RESPONSE.md` and `DECISION-LOG.md`, but in short:
- **Forced sign-up before browsing** → reshaped into sign-in only at booking
  confirmation.
- **Fake urgency counter** → replaced with the Trust Score.
- **Offline support, real-time updates, messaging, maps, wishlists, referral
  codes, dark mode** → deferred. Each is a real multi-week feature on its own;
  building any of them half-finished would have cost polish on the core flow.

---

## Project structure

---

## How to run locally

```bash
git clone https://github.com/SIJABULILE-NCUBE/neighbourloan-capstone.git
cd neighbourloan-capstone
npm install
npm run dev
```

Then open the local URL Vite prints in your terminal (usually
`http://localhost:5173`).

### Other useful commands

```bash
npm run build       # production build (also runs strict type-checking)
npm run typecheck   # type-check only, no build
npm run preview     # preview the production build locally
```

---

## Deployment

Deployed on **Netlify**, connected directly to this GitHub repository:
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- Every push to `main` automatically triggers a new deploy.

---

## Deliverables in this repo

| File | What it is |
|---|---|
| `FOUNDER-RESPONSE.md` | My written pushback and rationale, addressed to Thabo |
| `DECISION-LOG.md` | 8+ real engineering decisions with tradeoffs |
| `AI-USAGE.md` | Documented AI usage, including a moment AI got something wrong |
| `BRIEF.md` | The original assessment brief |
| `PRESENTATION-GUIDE.md` | Guide for the Loom walkthrough |

---

## Known limitations (honestly)

- No router — deep-linking to a specific item isn't possible yet, only
  in-app navigation.
- Photos are mock/stock placeholders (`picsum.photos`), not real uploaded
  images — intentional for this sprint, per the brief's "mock the data"
  instruction.
- No backend — all data is in-memory / typed mock data, structured to be
  API-ready when a real backend exists.