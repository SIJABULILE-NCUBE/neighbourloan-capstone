# Decision Log

Every meaningful engineering decision from this sprint, with real tradeoffs —
not generic justifications. Minimum 8 entries required; this log has 11.

---

## Decision: Replaced the fake "people viewing this" counter with a Trust Score
- **Context:** Thabo explicitly asked for a fabricated urgency counter ("3
  people are looking at this right now!!") on every item, intended to pressure
  users into booking faster.
- **Options I considered:**
  1. Build it exactly as requested — trivial to implement, and it's what the
     founder asked for.
  2. Refuse it outright with no replacement.
  3. Reshape it into something honest that serves the same underlying goal —
     reducing booking hesitation — using data I actually have.
- **What I chose and why:** Option 3. I derived a Trust Score (0–100) from
  fields already present in the data contract — owner tenure, rating, and
  completed booking count — rather than inventing a number with no basis in
  reality. This draws directly on my background as a credit risk analyst,
  where trustworthiness is assessed from real behavioural signals, not
  manufactured urgency.
- **What I gave up:** A flashier, more aggressive "urgency" feeling in the UI
  in the short term. I'm not willing to trade that for a feature that
  fabricates social proof — it's a reputational risk for the product long
  before it's a design one.

---

## Decision: Did not force sign-up before browsing
- **Context:** Thabo wanted users to create an account before seeing any
  items at all, purely to capture emails early ("growth hack lol").
- **Options I considered:**
  1. Force auth on first load, exactly as asked.
  2. No auth anywhere in the flow.
  3. Ask for auth only at the point a user commits to booking something.
- **What I chose and why:** Option 3. People need to see real value before
  they're willing to hand over their details. Gating the entire product
  behind a signup wall before a single item is visible actively damages
  first-time trust and inflates bounce rate before anyone even understands
  what the product does.
- **What I gave up:** Thabo's original goal of capturing an email from every
  visitor regardless of intent. In exchange, the emails I do capture come from
  users who are already motivated to transact — a smaller but higher-intent
  list.

---

## Decision: No router — used in-memory state to switch screens
- **Context:** The starter's `package.json` doesn't include `react-router-dom`,
  and I had a hard time constraint before losing certainty around installing
  and testing a new dependency mid-sprint.
- **Options I considered:**
  1. Add `react-router-dom` for real URL-based routing.
  2. Use a single discriminated-union `View` type in `App.tsx` state to
     control which screen renders.
- **What I chose and why:** Option 2. Zero new dependencies means zero new
  install or config risk on a tight deadline, and the app's scope is small
  enough that a state machine is easy to reason about and type safely.
- **What I gave up:** Real, shareable URLs for individual screens — pasting a
  link to a specific item won't deep-link there; the app always opens on
  Browse. Acceptable for a one-sprint MVP, but the first thing I'd add back
  with more time.

---

## Decision: Isolated booking-duration and pricing math into one module
- **Context:** The presentation guide explicitly warns that founders issue
  late-stage curveballs that change core assumptions — e.g. "actually, rent by
  the hour, not the day."
- **Options I considered:**
  1. Calculate dates and pricing inline, inside the booking component.
  2. Extract all duration and pricing logic into a single `lib/booking.ts`
     module, imported wherever it's needed.
- **What I chose and why:** Option 2. If the pricing model changes, exactly
  one file needs to change — no component needs to be touched or re-tested.
  This is the difference between an architecture that absorbs a pivot cheaply
  and one that doesn't.
- **What I gave up:** A small amount of upfront structure and time versus
  writing the logic directly where it's used — worth it given how likely this
  specific assumption is to change.

---

## Decision: Filtered out "removed" items, but show "paused" items as disabled
- **Context:** The mock data models three listing states —
  `available | paused | removed`. A real API would never return deleted
  listings at all, but paused ones are still legitimate, owner-visible
  inventory.
- **Options I considered:**
  1. Show all items regardless of status.
  2. Hide both paused and removed items from the browse grid.
  3. Hide removed items entirely; show paused items but disable their booking
     action with a clear explanation.
- **What I chose and why:** Option 3. This mirrors how a real API would
  actually behave (removed means gone) while still giving honest, visible
  feedback on paused items instead of silently hiding inventory that exists.
- **What I gave up:** A simpler single-condition filter ("only show
  available") would have taken less code, but would hide real information
  from users without telling them why.

---

## Decision: Normalized "free" items across two different data shapes
- **Context:** The mock data represents a free item two different ways — a
  `null` price object, and a price object with `amountCents: 0`.
- **Options I considered:**
  1. Handle both cases separately, everywhere price is displayed or
     calculated.
  2. Write one `isFree()` helper, used consistently across the codebase.
- **What I chose and why:** Option 2. A real API returning two different
  shapes for the same underlying concept is exactly the kind of inconsistency
  a typed data layer needs to defend against structurally, not patch around
  ad hoc in each component.
- **What I gave up:** Nothing meaningful here — this was a small extra step
  that removed an entire class of potential display bugs for negligible cost.

---

## Decision: Deployed via Netlify connected to GitHub, not drag-and-drop
- **Context:** The brief requires the live deployment to be provably the same
  build as the repo, and to reflect a clean-clone install.
- **Options I considered:**
  1. Netlify's drag-and-drop deploy — fast, but disconnected from source
     control.
  2. Connect Netlify directly to the GitHub repo so every push triggers a
     fresh build from source.
- **What I chose and why:** Option 2, after initially trying option 1 and
  discovering the deployed site didn't reflect my actual repo at all — it was
  a stale, disconnected 4-file upload. Connecting via GitHub means the
  deployed build is provably identical to what's committed, and every future
  commit auto-redeploys without manual steps.
- **What I gave up:** A few extra minutes of setup versus the "fast" path —
  a reasonable cost for a deployment that actually satisfies the brief's
  requirement instead of just appearing to.

---

## Decision: Responsive layout via CSS Grid auto-fill, not fixed breakpoints
- **Context:** The brief requires the app to be "usable on a phone." I needed
  a layout that adapts across screen sizes without hardcoding a handful of
  specific device widths.
- **Options I considered:**
  1. Fixed media query breakpoints targeting a few common screen sizes.
  2. CSS Grid with `auto-fill` and `minmax()`, letting the browser calculate
     column count from available space continuously.
- **What I chose and why:** Option 2. It adapts to any width, not just the
  specific breakpoints I happened to think to test. I verified the result
  using Chrome DevTools' real device emulation (iPhone 12 Pro, Pixel 7
  presets), not just a narrowed desktop browser window, since actual mobile
  viewports behave differently from a resized desktop one.
- **What I gave up:** Slightly less pixel-perfect control at specific
  breakpoints, in exchange for a layout that's far less brittle across the
  real range of devices people actually use.

---

## Decision: Named the product "Neighbourloan" instead of leaving it unnamed
- **Context:** Thabo explicitly deferred naming in his brief ("let's just call
  it the product for now, naming later").
- **Options I considered:**
  1. Leave it as an unnamed placeholder in the UI, since naming wasn't part of
     this sprint's ask.
  2. Pick a real name now so the product feels shippable and demo-ready.
- **What I chose and why:** Option 2. A functioning product with no name reads
  as unfinished in a live demo or investor pitch, and choosing a clear, simple
  name cost minutes, not hours.
- **What I gave up:** A small amount of time that could have gone toward
  features — but this was a two-minute decision, not a distraction from the
  real work.

---

## Decision: Added a "My Bookings" screen backed by localStorage
- **Context:** Confirmed bookings were being saved to localStorage, but there
  was no way to actually see that persistence working without opening browser
  DevTools — not something a real user, or an assessor, should have to do.
- **Options I considered:**
  1. Leave persistence invisible, provable only via DevTools.
  2. Build a small dedicated screen that reads and lists saved bookings.
- **What I chose and why:** Option 2. A visible "My Bookings" view makes the
  persistence feature real and demonstrable, not just a technical detail
  buried in browser storage. It also nudges the app slightly closer to how a
  real product would work — users expect to see their own bookings somewhere.
- **What I gave up:** A small amount of extra time versus leaving it
  invisible — worth it for something this demonstrable in a live demo.

---

## Decision: Replaced the category `<select>` dropdown with chip buttons
- **Context:** The initial category filter used a native `<select>` element,
  which is functional but visually generic and easy to overlook next to the
  price toggle already styled as buttons.
- **Options I considered:**
  1. Keep the native dropdown — fastest, most familiar pattern.
  2. Replace it with a row of toggle-style chip buttons, matching the price
     filter's existing style.
- **What I chose and why:** Option 2. Chips make all category options visible
  at once rather than hidden behind a click, and they're visually consistent
  with the price filter already in the UI. Each chip is a real `<button>`, so
  keyboard and screen-reader behaviour is preserved — this wasn't a purely
  cosmetic swap, I checked it didn't regress accessibility.
- **What I gave up:** A small amount of horizontal space on narrow screens,
  since chips wrap across multiple lines with several categories selected —
  an acceptable tradeoff for the visual and interaction improvement.

---

## Decision: Sourced real photos manually instead of relying on placeholder image APIs
- **Context:** Initial mock photos used keyword-based placeholder services
  (Picsum, then LoremFlickr), which returned images unrelated to their items
  despite specific search terms (e.g. a cat statue for "Pressure Washer").
- **Options I considered:**
  1. Keep iterating on keywords, hoping for a better match.
  2. Accept the mismatches, since the brief doesn't require photo accuracy.
  3. Manually source and link real, correctly-matched photos myself.
- **What I chose and why:** Option 3, after concluding that automated
  keyword-matching services fundamentally can't guarantee accuracy — no
  amount of keyword tuning fixes that. Manually verifying each image before
  using it was the only reliable method, even though it cost more time than
  the brief strictly required.
- **What I gave up:** Time that could have gone toward the Loom or further
  feature work — but a visually accurate product left a stronger impression
  in testing than a faster but mismatched one.