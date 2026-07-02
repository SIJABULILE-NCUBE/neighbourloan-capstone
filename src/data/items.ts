/* ============================================================
 * Mock data. Pretend this is the JSON a real API would return.
 * Notice the deliberately awkward reality in here:
 *  - some items have no photos
 *  - some have no price (free)
 *  - some owners have no rating yet (null)
 *  - some items are "paused" and must not be bookable
 *  - distanceKm is null for some (viewer hasn't shared location)
 * Your UI has to handle ALL of these gracefully. That is the point.
 *
 * Photo URLs use LoremFlickr (keyword-based placeholder images) instead
 * of the original random Picsum seeds, so images plausibly match their
 * item. Simple, common single-word keywords are used since they return
 * more reliable matches than compound/unusual terms. Two items keep
 * photoUrls: [] deliberately, to preserve the "no photo" empty-state
 * test case the starter data intentionally included.
 *
 * You may reshape how you load/serve this (a fake async fetch, a
 * context, a hook) — that architectural choice is yours to make
 * and to defend in your Decision Log.
 * ============================================================ */

import type { Item } from "./types.ts";

export const ITEMS: Item[] = [
  {
    id: "itm_001",
    title: "Cordless Drill (18V)",
    category: "power-tools",
    description: "Solid drill, two batteries, works for most home jobs.",
    photoUrls: ["https://images.unsplash.com/photo-1622044939413-0b829c342434?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    price: { amountCents: 5000, period: "day" },
    owner: { id: "usr_a", displayName: "Naledi", rating: 4.8, ratingCount: 24, joinedISO: "2025-02-11" },
    distanceKm: 1.2,
    status: "available",
    postedISO: "2026-06-20",
  },
  {
    id: "itm_002",
    title: "Extension Ladder (3m)",
    category: "outdoor",
    description: "Aluminium, light, fits in a hatchback.",
    photoUrls: [],
    price: { amountCents: 0, period: "day" },
    owner: { id: "usr_b", displayName: "Sipho", rating: null, ratingCount: 0, joinedISO: "2026-06-18" },
    distanceKm: null,
    status: "available",
    postedISO: "2026-06-25",
  },
  {
    id: "itm_003",
    title: "Pressure Washer",
    category: "outdoor",
    description: "Great for driveways and walls. Bring your own hose.",
    photoUrls: [
      "https://images.unsplash.com/photo-1627860707689-6eee9f79e38a?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    price: { amountCents: 12000, period: "day" },
    owner: { id: "usr_c", displayName: "Fatima", rating: 4.2, ratingCount: 6, joinedISO: "2025-11-02" },
    distanceKm: 4.7,
    status: "paused",
    postedISO: "2026-05-30",
  },
  {
    id: "itm_004",
    title: "Stand Mixer",
    category: "kitchen",
    description: "For big baking days. Comes with whisk + dough hook.",
    photoUrls: ["https://images.unsplash.com/photo-1578643463396-0997cb5328c1?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    price: { amountCents: 8000, period: "day" },
    owner: { id: "usr_d", displayName: "Grace", rating: 5.0, ratingCount: 2, joinedISO: "2026-01-19" },
    distanceKm: 0.6,
    status: "available",
    postedISO: "2026-06-28",
  },
  {
    id: "itm_005",
    title: "Folding Tables (x4)",
    category: "party",
    description: "Set of four trestle tables. Good for events.",
    photoUrls: ["https://images.unsplash.com/photo-1649039759344-d7e199c870ce?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    price: { amountCents: 15000, period: "day" },
    owner: { id: "usr_e", displayName: "Themba", rating: 3.9, ratingCount: 11, joinedISO: "2024-09-14" },
    distanceKm: 8.1,
    status: "available",
    postedISO: "2026-06-15",
  },
  {
    id: "itm_006",
    title: "Lawn Mower (petrol)",
    category: "garden",
    description: "Self-propelled. A bit loud but cuts fast.",
    photoUrls: [],
    price: null,
    owner: { id: "usr_f", displayName: "Anele", rating: 4.5, ratingCount: 18, joinedISO: "2025-07-07" },
    distanceKm: 2.9,
    status: "available",
    postedISO: "2026-06-22",
  },
  {
    id: "itm_007",
    title: "Tile Cutter",
    category: "hand-tools",
    description: "Manual tile cutter, up to 600mm.",
    photoUrls: ["https://media.istockphoto.com/id/638508844/photo/hnadyman-cutting-ceramic-tiles.jpg?s=1024x1024&w=is&k=20&c=UcvhnGOM-quGpLru0GN9gUMD6FgqwBoVMG0l4WSlF6w="],
    price: { amountCents: 3000, period: "day" },
    owner: { id: "usr_c", displayName: "Fatima", rating: 4.2, ratingCount: 6, joinedISO: "2025-11-02" },
    distanceKm: 4.7,
    status: "available",
    postedISO: "2026-06-11",
  },
  {
    id: "itm_008",
    title: "Gazebo (3x3m)",
    category: "party",
    description: "Pop-up gazebo, white. One pole has tape on it, still fine.",
    photoUrls: ["https://images.unsplash.com/photo-1567520595867-1437d26eb9c2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    price: { amountCents: 0, period: "day" },
    owner: { id: "usr_e", displayName: "Themba", rating: 3.9, ratingCount: 11, joinedISO: "2024-09-14" },
    distanceKm: null,
    status: "removed",
    postedISO: "2026-04-02",
  },
];

/**
 * A fake async loader so you can practise typing data you don't
 * control yet. Use it or replace it — your call, but justify it.
 */
export function fetchItems(): Promise<Item[]> {
  return new Promise((resolve) => setTimeout(() => resolve(ITEMS), 400));
}