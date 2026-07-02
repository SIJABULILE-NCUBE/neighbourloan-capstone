import { loadBookings } from "../lib/storage";

interface Props {
  onBack: () => void;
}

/**
 * Reads confirmed bookings from localStorage and lists them.
 * This is the visible proof that booking persistence actually works —
 * without this screen, the only way to see it was opening DevTools.
 */
export function MyBookingsScreen({ onBack }: Props) {
  // Read happens on render. Since this is a small MVP with no live
  // updates needed elsewhere, we don't need to sync this with global
  // state — just read fresh from storage each time this screen mounts.
  const bookings = loadBookings();

  return (
    <div className="my-bookings">
      <button className="back-link" onClick={onBack}>← Back to browse</button>
      <h1>My bookings</h1>

      {bookings.length === 0 ? (
        <p className="empty-state-text">
          No bookings yet — confirmed bookings will show up here.
        </p>
      ) : (
        <ul className="booking-list">
          {bookings.map((b) => (
            <li key={b.id} className="booking-list__item">
              <div>
                <strong>{b.itemTitle}</strong>
                <p className="detail__meta">
                  {new Date(b.range.startISO).toLocaleDateString()} →{" "}
                  {new Date(b.range.endISO).toLocaleDateString()}
                </p>
              </div>
              {/* Reuses the existing .badge class from item cards,
                  with a --confirmed variant instead of --paused */}
              <span className="badge badge--confirmed">Confirmed</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}