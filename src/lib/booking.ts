import type { Price } from "../data/types";

/**
 * Duration + pricing math lives in one place, isolated from any
 * component. If a founder curveball later says "rent by the hour,
 * not the day," this file is the only thing that changes.
 */
export function calcNights(startISO: string, endISO: string): number {
  const start = new Date(startISO);
  const end = new Date(endISO);
  const ms = end.getTime() - start.getTime();
  return Math.max(1, Math.round(ms / 86_400_000));
}

export function isFree(price: Price | null): boolean {
  return price === null || price.amountCents === 0;
}

export function calcTotalCents(price: Price | null, nights: number): number {
  if (isFree(price)) return 0;
  const p = price as Price;
  if (p.period === "week") return Math.ceil(nights / 7) * p.amountCents;
  if (p.period === "hour") return p.amountCents * nights * 24;
  return p.amountCents * nights; // "day"
}

export function formatCents(cents: number): string {
  return cents === 0 ? "Free" : `R${(cents / 100).toFixed(2)}`;
}