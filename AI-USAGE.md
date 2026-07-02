# AI Usage Log

## AI moment 1 — Designing the trust score instead of Thabo's fake urgency counter
- What I was trying to do: Thabo asked for a fake "3 people are looking at this
  right now!!" counter on every item to create urgency. I knew this was a dark
  pattern, but I wanted a replacement that still solved his real problem —
  giving people confidence to book.
- The prompt I wrote: I explained I work as a credit risk analyst and asked if
  we could build something that uses that background — a trust/risk-style score
  instead of fake urgency, using only real fields already in the data contract.
- What the AI gave back: A `deriveTrust()` function that scores an owner from
  0–100 based on tenure, rating, and rating count, plus a labelled badge
  component.
- What was wrong / weak / risky about it: The first version I was given didn't
  cap the tenure contribution, so an owner who'd been on the platform for years
  with zero bookings could still score unrealistically high just for existing —
  which defeats the purpose of a *trust* score. I made sure the scoring weighted
  actual completed bookings and ratings more heavily than tenure alone before
  accepting it.
- What I changed and why: I checked the score outputs against my mock data by
  hand — e.g. a brand-new owner with 0 ratings correctly landed at "New" (15),
  while an established owner with 24 ratings landed at "Highly trusted" (98).
  That spread felt honest rather than arbitrary, so I kept it.

## AI moment 2 — Choosing not to add a router
- What I was trying to do: Decide how to handle navigation between browse,
  detail, and booking screens without React Router in `package.json`.
- The prompt I wrote: I asked whether to add react-router-dom or find another
  approach, given I have limited time tonight and didn't want to risk a new
  dependency breaking the build.
- What the AI gave back: A recommendation to skip the router entirely and use a
  single `View` union type in `App.tsx` state to switch screens.
- What was wrong / weak / risky about it: This works for a single-sprint MVP,
  but it means there are no real URLs — if I paste a link to a specific item's
  detail page, it won't open there; it always lands on the browse screen. I
  decided this was an acceptable tradeoff for time saved, but it's a real
  limitation I'm naming rather than hiding.
- What I changed and why: I kept the state-based approach but made sure it was
  documented as a deliberate scope decision in DECISION-LOG.md, not an oversight.

## AI moment 3 (the one where AI was wrong) — Netlify deployment method
- What I was trying to do: Deploy the app to a live URL as required by the brief.
- The prompt I wrote: I asked how to deploy to Netlify and followed the
  suggested steps.
- What the AI gave back: General Netlify deployment guidance, assuming I'd
  connect via GitHub from the start.
- What was wrong / weak / risky about it: I'd actually used Netlify's drag-and-
  drop "deploy" option first, which created a tiny, disconnected deployment (4
  files, 156KB) that had nothing to do with my real app and wouldn't update when
  I pushed new commits. The AI didn't catch this until I sent a screenshot
  showing the deploy summary — it had assumed a GitHub-connected deploy without
  confirming which method I'd actually used.
- What I changed and why: I deleted the drop-deployment, ran `npm run build`
  locally first to confirm the app compiled cleanly (it did — 40 modules, no
  type errors), then reconnected properly via "Import an existing project" →
  "Deploy with GitHub," set the build command to `npm run build` and publish
  directory to `dist`. This is now connected so every push auto-redeploys,
  which is what the brief actually requires.