import type { Owner } from "../data/types";
import { deriveTrust } from "../lib/trust";

interface Props {
  owner: Owner;
  detailed?: boolean;
}

export function TrustBadge({ owner, detailed = false }: Props) {
  const trust = deriveTrust(owner);

  return (
    <div className={`trust-badge trust-badge--${trust.label.toLowerCase().replace(" ", "-")}`}>
      <span className="trust-score">{trust.score}</span>
      <span className="trust-label">{trust.label}</span>
      {detailed && (
        <dl className="trust-breakdown">
          <div>
            <dt>Completed bookings</dt>
            <dd>{trust.completedBookings}</dd>
          </div>
          <div>
            <dt>Response rate</dt>
            <dd>{trust.responseRatePct > 0 ? `${trust.responseRatePct}%` : "No data yet"}</dd>
          </div>
          <div>
            <dt>Member since</dt>
            <dd>{new Date(owner.joinedISO).toLocaleDateString("en-ZA", { month: "short", year: "numeric" })}</dd>
          </div>
        </dl>
      )}
    </div>
  );
}