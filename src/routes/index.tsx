import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FLEEK Apparel // The Registry Is Closed" },
      { name: "description", content: "Asset #11: The Guardian. Prepare for deployment. Enter the Registry for early access." },
      { property: "og:title", content: "FLEEK Apparel // The Registry Is Closed" },
      { property: "og:description", content: "Asset #11: The Guardian. Prepare for deployment." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Blackout,
});

// June 12, 2026, 12:00 PM EST (UTC-5) => 17:00 UTC
const TARGET = new Date("2026-06-12T17:00:00Z").getTime();

function useCountdown() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, TARGET - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="font-display text-5xl md:text-7xl lg:text-8xl text-gradient-gold leading-none tabular-nums">
        {String(value).padStart(2, "0")}
      </div>
      <div className="mt-2 text-[10px] md:text-xs uppercase tracking-[0.35em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function Blackout() {
  const { days, hours, minutes, seconds } = useCountdown();

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-16 md:py-24">
      <div className="w-full max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 border border-gold/40 bg-background/40 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.35em] text-gold">
          ◆ Blackout Protocol
        </div>

        <h1 className="mt-8 font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
          FLEEK APPAREL
          <span className="block text-gold mt-2">// THE REGISTRY IS CLOSED</span>
        </h1>

        <div className="mt-12 md:mt-16 flex items-start justify-center gap-4 md:gap-10">
          <Unit value={days} label="Days" />
          <div className="font-display text-5xl md:text-7xl lg:text-8xl text-gold/40 leading-none">:</div>
          <Unit value={hours} label="Hours" />
          <div className="font-display text-5xl md:text-7xl lg:text-8xl text-gold/40 leading-none">:</div>
          <Unit value={minutes} label="Minutes" />
          <div className="font-display text-5xl md:text-7xl lg:text-8xl text-gold/40 leading-none">:</div>
          <Unit value={seconds} label="Seconds" />
        </div>
        <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Deployment · June 12, 2026 · 12:00 PM EST
        </p>

        <div className="mt-14 md:mt-20 border-y border-gold/30 py-8">
          <p className="font-display text-2xl md:text-4xl tracking-[0.15em] text-foreground">
            ASSET <span className="text-gold">#11</span>: THE GUARDIAN.
          </p>
          <p className="mt-2 font-display text-2xl md:text-4xl tracking-[0.15em] text-muted-foreground">
            PREPARE FOR DEPLOYMENT.
          </p>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-14 md:mt-20 mx-auto max-w-xl"
        >
          <label htmlFor="registry-email" className="block text-[11px] uppercase tracking-[0.35em] text-gold mb-4">
            Enter the Registry for Early Access
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              id="registry-email"
              type="email"
              required
              placeholder="your@email.com"
              className="flex-1 bg-card border border-border px-5 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors text-center sm:text-left"
            />
            <button
              type="submit"
              className="bg-gold px-8 py-4 text-xs font-bold uppercase tracking-[0.3em] text-gold-foreground hover:scale-[1.02] transition-transform"
            >
              Enlist
            </button>
          </div>
          <p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Encrypted · No Spam · Registry Members Only
          </p>
        </form>
      </div>
    </main>
  );
}
