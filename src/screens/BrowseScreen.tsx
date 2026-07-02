import { useMemo, useState } from "react";
import type { Item, Category } from "../data/types";
import { ItemCard } from "../components/ItemCard";
import { isFree } from "../lib/booking";

interface Props {
  items: Item[];
  onSelectItem: (id: string) => void;
}

type PriceFilter = "all" | "free" | "paid";

export function BrowseScreen({ items, onSelectItem }: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | "all">("all");
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("all");

  const visible = useMemo(() => {
    return items
      .filter((i) => i.status !== "removed")
      .filter((i) => i.title.toLowerCase().includes(search.toLowerCase()))
      .filter((i) => category === "all" || i.category === category)
      .filter((i) => {
        if (priceFilter === "all") return true;
        if (priceFilter === "free") return isFree(i.price);
        return !isFree(i.price);
      });
  }, [items, search, category, priceFilter]);

  const categories: (Category | "all")[] = [
    "all", "power-tools", "hand-tools", "garden", "kitchen", "outdoor", "party", "other",
  ];

  return (
    <div className="browse">
      <div className="browse__controls">
        <input
          type="search"
          placeholder="Search for tools, equipment..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search items"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category | "all")}
          aria-label="Filter by category"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c === "all" ? "All categories" : c}</option>
          ))}
        </select>
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

      {visible.length === 0 ? (
        <p className="empty-state">No items match your search yet — try clearing a filter.</p>
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