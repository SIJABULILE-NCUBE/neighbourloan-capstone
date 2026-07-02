import { useEffect, useState } from "react";
import type { Item } from "./data/types";
import { fetchItems } from "./data/items";
import { BrowseScreen } from "./screens/BrowseScreen";
import { ItemDetailScreen } from "./screens/ItemDetailScreen";
import { BookingScreen } from "./screens/BookingScreen";
import { AuthScreen } from "./screens/AuthScreen";
import "./styles.css";

type AuthUser2 = { name: string };

type View =
  | { name: "browse" }
  | { name: "detail"; itemId: string }
  | { name: "booking"; itemId: string }
  | { name: "auth"; itemId: string };

export function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<View>({ name: "browse" });
  const [user, setUser] = useState<AuthUser2 | null>(null);

  useEffect(() => {
    fetchItems().then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  function findItem(id: string): Item | undefined {
    return items.find((i) => i.id === id);
  }

  if (loading) {
    return <div className="loading-screen">Loading nearby items…</div>;
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__logo">Neighbourloan</h1>
        <p className="app__tagline">Borrow what you need, from people nearby</p>
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
              setView({ name: "booking", itemId: view.itemId });
            }}
            onCancel={() => setView({ name: "detail", itemId: view.itemId })}
          />
        )}
      </main>
    </div>
  );
}