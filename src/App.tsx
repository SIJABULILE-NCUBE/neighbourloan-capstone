import { useEffect, useState } from "react";
import type { Item } from "./data/types";
import { fetchItems } from "./data/items";
import { BrowseScreen } from "./screens/BrowseScreen";
import { ItemDetailScreen } from "./screens/ItemDetailScreen";
import { BookingScreen } from "./screens/BookingScreen";
import { AuthScreen } from "./screens/AuthScreen";
import { MyBookingsScreen } from "./screens/MyBookingsScreen";
import "./styles.css";

// Minimal local user shape — we don't need a full AuthUser contract
// since auth here is just a name captured before confirming a booking,
// not a real account system.
type AuthUser2 = { name: string };

// A discriminated union models "which screen is showing" as a single
// piece of state, instead of using a router. Each variant carries only
// the data that screen actually needs (e.g. detail/booking/auth all
// need an itemId, browse and myBookings don't need anything extra).
type View =
  | { name: "browse" }
  | { name: "detail"; itemId: string }
  | { name: "booking"; itemId: string }
  | { name: "auth"; itemId: string }
  | { name: "myBookings" };

export function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<View>({ name: "browse" });
  const [user, setUser] = useState<AuthUser2 | null>(null);

  // Simulates fetching from a real API — fetchItems() already returns
  // a Promise, so this reads the same way a real network call would.
  useEffect(() => {
    fetchItems().then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  // Small helper so screens that need a single item by id don't each
  // repeat the same .find() lookup.
  function findItem(id: string): Item | undefined {
    return items.find((i) => i.id === id);
  }

  if (loading) {
    return <div className="loading-screen">Loading nearby items…</div>;
  }

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__header-row">
          <div>
            <h1 className="app__logo">Neighbourloan</h1>
            <p className="app__tagline">Borrow what you need, from people nearby</p>
          </div>
          {/* Quick nav to the new My Bookings screen */}
          <button className="btn" onClick={() => setView({ name: "myBookings" })}>
            My bookings
          </button>
        </div>
        <p className="app__count">
          {/* "removed" items are hidden everywhere, including this count,
              since a real API would never return deleted listings */}
          {items.filter((i) => i.status !== "removed").length} items available near you
        </p>
      </header>

      <main className="app__main">
        {view.name === "browse" && (
          <BrowseScreen items={items} onSelectItem={(id) => setView({ name: "detail", itemId: id })} />
        )}

        {view.name === "detail" && (() => {
          const item = findItem(view.itemId);
          if (!item) return <p>Item not found.</p>;
          return (
            <ItemDetailScreen
              item={item}
              onBack={() => setView({ name: "browse" })}
              onBookNow={(id) => setView({ name: "booking", itemId: id })}
            />
          );
        })()}

        {view.name === "booking" && (() => {
          const item = findItem(view.itemId);
          if (!item) return <p>Item not found.</p>;
          return (
            <BookingScreen
              item={item}
              isAuthed={user !== null}
              onRequestAuth={() => setView({ name: "auth", itemId: view.itemId })}
              onBack={() => setView({ name: "detail", itemId: view.itemId })}
              onConfirmed={() => setView({ name: "browse" })}
            />
          );
        })()}

        {view.name === "auth" && (
          <AuthScreen
            onAuthed={(name) => {
              setUser({ name });
              // After signing in, return the user straight to the
              // booking flow they were in, not back to browse —
              // avoids losing their progress.
              setView({ name: "booking", itemId: view.itemId });
            }}
            onCancel={() => setView({ name: "detail", itemId: view.itemId })}
          />
        )}

        {view.name === "myBookings" && (
          <MyBookingsScreen onBack={() => setView({ name: "browse" })} />
        )}
      </main>
    </div>
  );
}