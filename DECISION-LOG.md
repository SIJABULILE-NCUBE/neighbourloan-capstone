# Decision Log

## Decision: Replaced the fake "people viewing this" counter with a Trust Score
- Context: Thabo explicitly asked for a fabricated urgency counter ("3 people
  are looking at this right now!!") on every item to pressure bookings.
- Options I considered: (1) Build it exactly as asked — trivial to implement.
  (2) Refuse it outright with no replacement. (3) Reshape it into something
  honest that serves the same underlying goal — reducing booking hesitation.
- What I chose and why: Option 3. I derived a Trust Score from data already in
  the contract (owner tenure, rating, rating count) — real signals, not
  invented numbers. This draws on my day-job experience assessing risk from
  behavioural signals rather than gut feeling.
- What I gave up: A flashier, more "urgent" feeling UI in the short term — but
  I'm not willing to ship a feature that manufactures false social proof.

## Decision: Did not force sign-up before browsing
- Context: Thabo wanted users to sign up before seeing any items, to capture
  emails ("growth hack lol").
- Options I considered: (1) Force auth on first load, as asked. (2) No auth at
  all. (3) Ask for auth only at the point of committing to a booking.
- What I chose and why: Option 3. Real marketplaces let people see value before
  asking for commitment. Gating the entire product behind a signup wall before
  a single item is visible would tank trust and conversion before anyone even
  sees what's on offer.
- What I gave up: Thabo's immediate email capture goal from every visitor —
  but I believe this trades a short-term growth hack for long-term trust, which
  matters more for a marketplace's reputation.

## Decision: No router — used in-memory state to switch screens
- Context: The starter's `package.json` doesn't include react-router-dom, and I
  had limited hours before losing certainty about install/build stability.
- Options I considered: (1) Add react-router-dom as a new dependency. (2) Use a
  single state-based `View` type in App.tsx to control which screen renders.
- What I chose and why: Option 2. Zero new dependencies means zero new install
  risk on a tight deadline, and the app is small enough that a state machine is
  easy to reason about.
- What I gave up: Real, shareable URLs for individual items — pasting a link
  to a specific item won't deep-link there. Acceptable for a one-sprint MVP.

## Decision: Isolated booking-duration and pricing math into one file
- Context: The brief's presentation guide warns that a "founder curveball" often
  changes a pricing/duration assumption late (e.g. "rent by the hour, not the
  day").
- Options I considered: (1) Calculate dates/pricing inline inside the booking
  component. (2) Extract all duration and pricing math into a single
  `lib/booking.ts` module used by any component that needs it.
- What I chose and why: Option 2. If Thabo changes the pricing model later, only
  one file needs to change — components stay untouched.
- What I gave up: A little more upfront structure/time versus just inlining the
  logic quickly.

## Decision: Filtered out "removed" items, but still show "paused" items (disabled)
- Context: The mock data includes `status: "available" | "paused" | "removed"`.
  A real API wouldn't return deleted listings at all, but paused ones are still
  owner-visible inventory.
- Options I considered: (1) Show all items regardless of status. (2) Hide both
  paused and removed items. (3) Hide removed items entirely, show paused items
  but disable booking on them with a clear reason.
- What I chose and why: Option 3. This matches how a real API would behave
  (removed = gone) while giving honest feedback on paused items instead of
  silently hiding inventory that still exists.
- What I gave up: A slightly simpler filter (hide anything not "available")
  would have been faster to write, but would hide real, useful information from
  users.

## Decision: Normalized "free" items (both `null` price and `{amountCents: 0}`)
- Context: The mock data has two different ways of representing a free item —
  a `null` price object and a price object with `amountCents: 0`.
- Options I considered: (1) Handle each case separately wherever price is
  displayed. (2) Write one small `isFree()` helper used everywhere price logic
  appears.
- What I chose and why: Option 2. A real API returning two different shapes for
  the same concept ("free") is exactly the kind of inconsistency you have to
  design defensively against, not assume away.
- What I gave up: Nothing meaningful — this was a small extra step that removed
  a class of bugs.

## Decision: Deployed via Netlify connected to GitHub, not drag-and-drop
- Context: The brief requires the live site to reflect the actual repo, and to
  auto-verify a clean-clone build.
- Options I considered: (1) Netlify's drag-and-drop deploy (fast, but
  disconnected from source control). (2) Connect Netlify directly to the GitHub
  repo so it builds from source on every push.
- What I chose and why: Option 2, after initially trying option 1 and
  discovering it doesn't stay in sync with commits. Connecting to GitHub means
  the deployed build is provably the same as what's in the repo, and every
  future commit auto-redeploys.
- What I gave up: A few extra minutes of setup versus the "fast" drag-and-drop
  path — worth it for a deployment that actually matches the brief's
  requirement.

## Decision: Named the product "Neighbourloan" instead of leaving it unnamed
- Context: Thabo explicitly deferred naming ("let's just call it the product for
  now, naming later").
- Options I considered: (1) Leave it as a placeholder name in the UI since
  naming wasn't asked for this sprint. (2) Pick a real name now so the product
  feels shippable and investor-ready.
- What I chose and why: Option 2. A working product with no name reads as
  unfinished in a demo; a clear, simple name costs almost no time and makes
  the Loom and live demo feel more real.
- What I gave up: A small amount of time better spent on features — but this
  was a two-minute decision, not a rabbit hole.