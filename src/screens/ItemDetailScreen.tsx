import type { Item } from "../data/types";
import { TrustBadge } from "../components/TrustBadge";
import { formatCents, isFree } from "../lib/booking";

interface Props {
  item: Item;
  onBack: () => void;
  onBookNow: (itemId: string) => void;
}

export function ItemDetailScreen({ item, onBack, onBookNow }: Props) {
  const paused = item.status === "paused";

  return (
    <div className="detail">
      <button className="back-link" onClick={onBack}>← Back to browse</button>

      <div className="detail__gallery">
        {item.photoUrls.length > 0 ? (
          item.photoUrls.map((url, i) => (
            <img key={url} src={url} alt={`${item.title} photo ${i + 1}`} />
          ))
        ) : (
          <div className="item-card__placeholder detail__placeholder">No photos yet</div>
        )}
      </div>

      <div className="detail__body">
        <h1>{item.title}</h1>
        <p className="detail__meta">
          {item.distanceKm !== null ? `${item.distanceKm} km away` : "Distance unknown"}
          {" · "}
          {formatCents(isFree(item.price) ? 0 : item.price!.amountCents)}
          {!isFree(item.price) && item.price ? `/${item.price.period}` : ""}
        </p>

        <p className="detail__description">{item.description}</p>

        <div className="detail__owner">
          <h2>Owner</h2>
          <p>{item.owner.displayName}</p>
          <TrustBadge owner={item.owner} detailed />
        </div>

        {paused ? (
          <p className="notice notice--paused">
            This item isn't available for booking right now — the owner has paused it.
          </p>
        ) : (
          <button className="btn btn--primary btn--large" onClick={() => onBookNow(item.id)}>
            Book now
          </button>
        )}
      </div>
    </div>
  );
}