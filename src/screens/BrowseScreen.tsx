import { useMemo, useState } from "react";
import type { Item, Category } from "../data/types";
import { ItemCard } from "../components/ItemCard";
import { isFree } from "../lib/booking";

interface Props {
  items: Item[];
  onSelectItem: (id: string) => void;
}

// Price filter is a small closed set of options, so a union type
// keeps it type-safe without needing a full enum.
type PriceFilter = "all" | "free" | "paid";

export function BrowseScreen({ items, onSelectItem }: Props) {
  // Each filter gets its own piece of state rather than one combined
  // "filters" object — keeps each control simple to reason about and
  // update independently.
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | "all">("all");
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("all");

  // useMemo avoids recalculating the filtered list on every render —
  // only recomputes when items or one of the filter values changes.
  const visible = useMemo(() => {
    return items
      // "removed" items should never appear in Browse — a real API
      // wouldn't return deleted listings at all.
      .filter((i) => i.status !== "removed")
      // Case-insensitive title search.
      .filter((i) => i.title.toLowerCase().includes(search.toLowerCase()))
      // "all" means no category filter applied.
      .filter((i) => category === "all" || i.category === category)
      // Free/paid filter uses the shared isFree() helper so the
      // "null price OR amountCents: 0 both mean free" logic lives
      // in one place, not duplicated here.
      .filter((i) => {
        if (priceFilter === "all") return true;
        if (priceFilter === "free") return isFree(i.price);
        return !isFree(i.price);
      });
  }, [items, search, category, priceFilter]);

  // Static list of all categories from the domain model, plus "all"
  // as a UI-only option (not part of the actual Category type).
  const categories: (Category | "all")[] = [
    "all", "power-tools", "hand-tools", "garden", "kitchen", "outdoor", "party", "other",
  ];

  return (
    <div className="browse">
      <div className="browse__controls">
        {/* Live search — no submit button, filters as you type */}
        <input
          type="search"
          placeholder="Search for tools, equipment..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search items"
        />

        {/* Category filter as chip buttons instead of a <select> —
            more visually distinctive and easier to scan at a glance
            than a dropdown, while still being keyboard-accessible
            since each chip is a real <button>. */}
        <div className="browse__category-chips" role="group" aria-label="Filter by category">
          {categories.map((c) => (
            <button
              key={c}
              className={category === c ? "chip chip--active" : "chip"}
              onClick={() => setCategory(c)}
            >
              {c === "all" ? "All" : c.replace("-", " ")}
            </button>
          ))}
        </div>

        {/* Price filter toggle */}
        <div className="browse__price-toggle" role="group" aria-label="Filter by price">
          {(["all", "free", "paid"] as PriceFilter[]).map((f) => (
            <button
              key={f}
              className={priceFilter === f ? "toggle toggle--active" : "toggle"}
              onClick={() => setPriceFilter(f)}
            >
              {f === "all" ? "All" : f === "free" ? "Free" : "Paid"}
            </button>
          ))}
        </div>
      </div>

      {/* Empty state includes a small icon rather than plain text only —
          quick visual polish so an empty result doesn't feel broken. */}
      {visible.length === 0 ? (
        <div className="empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <p>No items match your search yet — try clearing a filter.</p>
        </div>
      ) : (
        <div className="item-grid">
          {visible.map((item) => (
            <ItemCard key={item.id} item={item} onSelect={onSelectItem} />
          ))}
        </div>
      )}
    </div>
  );
}