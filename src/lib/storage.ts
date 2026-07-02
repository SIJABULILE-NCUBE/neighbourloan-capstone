import type { Booking } from "../data/types";

const STORAGE_KEY = "neighbourloan_bookings";

/**
 * Persists confirmed bookings so they survive a page refresh.
 * This is a deliberately small addition: no backend exists yet, so
 * localStorage is the honest way to prove state persistence works
 * without overstating what this MVP actually does.
 */
export function saveBooking(booking: Booking): void {
  const existing = loadBookings();
  const updated = [...existing, booking];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function loadBookings(): Booking[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Booking[];
  } catch {
    return [];
  }
}
