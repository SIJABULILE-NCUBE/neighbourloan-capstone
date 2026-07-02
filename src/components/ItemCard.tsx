import type { Item } from "../data/types";
import { formatCents, isFree } from "../lib/booking";
import { TrustBadge } from "./TrustBadge";

interface Props {
  item: Item;
  onSelect: (id: string) => void;
}

export function ItemCard({ item, onSelect }: Props) {
  const paused = item.status === "paused";

  return (
    <button
      className="item-card"
      onClick={() => onSelect(item.id)}
      aria-label={`View ${item.title}`}
    >
      <div className="item-card__image">
        {item.photoUrls.length > 0 ? (
          <img src={item.photoUrls[0]} alt="" loading="lazy" />
        ) : (
          <div className="item-card__placeholder">No photo yet</div>
        )}
        {paused && <span className="badge badge--paused">Paused</span>}
      </div>
      <div className="item-card__body">
        <h3>{item.title}</h3>
        <p className="item-card__meta">
          {item.distanceKm !== null ? `${item.distanceKm} km away` : "Distance unknown"}
          {" · "}
          {formatCents(isFree(item.price) ? 0 : item.price!.amountCents)}
          {!isFree(item.price) && item.price ? `/${item.price.period}` : ""}
        </p>
        <TrustBadge owner={item.owner} />
      </div>
    </button>
  );
}