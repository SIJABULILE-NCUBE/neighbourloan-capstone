# Founder Response — to Thabo

Hi Thabo,

Thanks for the brief — I can tell how much you care about this, and that came
through even in the rambling version. Here's what I built this sprint, what I
cut, and what I pushed back on, and why.

## What I built this sprint (and why these earned their place)
- **Browse screen with search + category + price filters** — this is the core
  of the product. Without it, nothing else matters.
- **Item detail pages** with photos, description, and owner info.
- **A two-step booking flow** (pick dates → confirm) that ends in a clear
  confirmation. This is the actual transaction — the whole point of the app.
- **A lightweight sign-in step**, but only at the point of confirming a
  booking, not before someone's even seen an item.
- **A "My Bookings" screen** — once someone confirms a booking, it's saved
  and they can come back and see it. Small, but it makes the product feel
  real rather than like a one-off demo.
- **A Trust Score** on every item, instead of the fake "3 people are looking
  at this" counter you mentioned loving. More on this below.

## What I cut or deferred (and why)
Offline support, real-time updates, messaging, maps, wishlists, referral
codes, and dark mode are all real, valuable features — but each one is
realistically weeks of its own work, not something that belongs in a first
sprint. Building any of them half-finished would have meant less polish on
the core booking flow, which is the thing that actually proves the product
works. I'd rather hand you three or four things that work properly than ten
things that are half-built.

## What I pushed back on (and why — be honest and kind)
Two things in your brief, I didn't build as asked:

**1. Forcing sign-up before people can see anything.** I get the instinct —
more emails feels like more growth. But in practice, asking someone to commit
before they've seen a single item usually kills trust before it starts, and
most people will just bounce. Instead, I let people browse freely and only
ask for a sign-in once they're ready to actually book something. That's the
moment they're motivated enough to give you their details anyway — and you
get a much higher-intent signup, not just an inflated number.

**2. The fake "3 people are looking at this right now!!" counter.** I didn't
build this, because it isn't true — with no real user activity yet, that
number would just be made up. I don't think that's a good foundation for a
product that's meant to build trust in a community. Instead, I built a Trust
Score on every listing — a score derived from real signals like how long an
owner's been active, their rating, and how many completed bookings they have.
It solves the same problem (giving people confidence to book) without lying
to anyone. This actually draws on my day job as a credit risk analyst —
assessing trustworthiness from real behaviour instead of gut feeling is
something I do professionally, and it felt like the right lens for a
peer-lending product.

## What I'd do next, if we keep going
- Real owner-uploaded photos instead of sourced stock images.
- A router so individual items have shareable links.
- The messaging feature, once the core loop is proven out.
- Moving booking persistence from localStorage to a real backend, so bookings
  aren't tied to one device/browser.

— Sijabulile Ncube