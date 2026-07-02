import { useState } from "react";

interface Props {
  onAuthed: (name: string) => void;
  onCancel: () => void;
}

export function AuthScreen({ onAuthed, onCancel }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    onAuthed(name.trim());
  }

  return (
    <div className="auth">
      <button className="back-link" onClick={onCancel}>← Back</button>
      <h1>Sign in to confirm your booking</h1>
      <p className="auth__note">
        We only ask for this when you're ready to book — not before you've even
        seen what's around you.
      </p>
      <form onSubmit={handleSubmit} className="auth__form">
        <label>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <button className="btn btn--primary" type="submit">Continue</button>
      </form>
    </div>
  );
}