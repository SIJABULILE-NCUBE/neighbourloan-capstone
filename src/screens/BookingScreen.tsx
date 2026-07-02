import { useState } from "react";
import type { Item } from "../data/types";
import { calcNights, calcTotalCents, formatCents } from "../lib/booking";
import { saveBooking } from "../lib/storage";

interface Props {
  item: Item;
  isAuthed: boolean;
  onRequestAuth: () => void;
  onBack: () => void;
  onConfirmed: () => void;
}

type Step = "dates" | "confirm" | "done";

export function BookingScreen({ item, isAuthed, onRequestAuth, onBack, onConfirmed }: Props) {
  const [step, setStep] = useState<Step>("dates");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const nights = startDate && endDate ? calcNights(startDate, endDate) : 0;
  const total = calcTotalCents(item.price, nights);

  function handleContinue() {
    if (!startDate || !endDate) return;
    setStep("confirm");
  }

  function handleConfirm() {
    if (!isAuthed) {
      onRequestAuth();
      return;
    }
    saveBooking({
      id: `bkg_${Date.now()}`,
      itemId: item.id,
      itemTitle: item.title,
      range: { startISO: startDate, endISO: endDate },
      confirmedAtISO: new Date().toISOString(),
    });
    setStep("done");
  }

  if (step === "done") {
    return (
      <div className="booking booking--done">
        <h1>Booking confirmed 🎉</h1>
        <p>
          Your booking for <strong>{item.title}</strong> from{" "}
          {new Date(startDate).toLocaleDateString()} to {new Date(endDate).toLocaleDateString()} is set.
        </p>
        <p>{item.owner.displayName} will be in touch to arrange pickup.</p>
        <button className="btn" onClick={onConfirmed}>Back to browse</button>
      </div>
    );
  }

  return (
    <div className="booking">
      <button className="back-link" onClick={onBack}>← Back to item</button>
      <h1>Book: {item.title}</h1>

      {step === "dates" && (
        <div className="booking__step">
          <label>
            Start date
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
          </label>
          <label>
            End date
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required min={startDate} />
          </label>
          <button className="btn btn--primary" onClick={handleContinue} disabled={!startDate || !endDate}>
            Continue
          </button>
        </div>
      )}

      {step === "confirm" && (
        <div className="booking__step">
          <dl className="booking__summary">
            <div><dt>Item</dt><dd>{item.title}</dd></div>
            <div><dt>Dates</dt><dd>{startDate} → {endDate} ({nights} night{nights !== 1 ? "s" : ""})</dd></div>
            <div><dt>Total</dt><dd>{formatCents(total)}</dd></div>
          </dl>
          {!isAuthed && (
            <p className="notice">You'll need to sign in to confirm this booking.</p>
          )}
          <button className="btn btn--primary" onClick={handleConfirm}>
            {isAuthed ? "Confirm booking" : "Sign in & confirm"}
          </button>
        </div>
      )}
    </div>
  );
}