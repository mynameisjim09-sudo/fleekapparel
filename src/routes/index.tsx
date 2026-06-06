import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = now === null ? TARGET - Date.parse("2026-06-06T00:00:00Z") : Math.max(0, TARGET - now);
  const ready = now !== null;
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds, ready };
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
  const { days, hours, minutes, seconds, ready } = useCountdown();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [enlisted, setEnlisted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      toast.error("Enter a valid email address.");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("registry_signups").insert({ email: value });
    setSubmitting(false);
    if (error && error.code !== "23505") {
      toast.error("Transmission failed. Try again.");
      return;
    }
    setEmail("");
    setEnlisted(true);
    toast.success("YOU HAVE BEEN ADDED TO THE REGISTRY. STAND BY FOR DEPLOYMENT.");
  };

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

        <div className="mt-12 md:mt-16 flex items-start justify-center gap-4 md:gap-10" suppressHydrationWarning>
          <Unit value={ready ? days : 0} label="Days" />
          <div className="font-display text-5xl md:text-7xl lg:text-8xl text-gold/40 leading-none">:</div>
          <Unit value={ready ? hours : 0} label="Hours" />
          <div className="font-display text-5xl md:text-7xl lg:text-8xl text-gold/40 leading-none">:</div>
          <Unit value={ready ? minutes : 0} label="Minutes" />
          <div className="font-display text-5xl md:text-7xl lg:text-8xl text-gold/40 leading-none">:</div>
          <Unit value={ready ? seconds : 0} label="Seconds" />
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

        <form onSubmit={handleSubmit} className="mt-14 md:mt-20 mx-auto max-w-xl">
          <label htmlFor="registry-email" className="block text-[11px] uppercase tracking-[0.35em] text-gold mb-4">
            Enter the Registry for Early Access
          </label>
          {enlisted ? (
            <div className="border border-gold/60 bg-gold/5 px-6 py-8 text-gold font-display text-sm md:text-base tracking-[0.2em] leading-relaxed">
              YOU HAVE BEEN ADDED TO THE REGISTRY.
              <br />
              STAND BY FOR DEPLOYMENT.
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="registry-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={submitting}
                placeholder="your@email.com"
                className="flex-1 bg-card border border-border px-5 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors text-center sm:text-left disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={submitting}
                className="bg-gold px-8 py-4 text-xs font-bold uppercase tracking-[0.3em] text-gold-foreground hover:scale-[1.02] transition-transform disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Enlisting…" : "Enlist"}
              </button>
            </div>
          )}
          <p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Encrypted · No Spam · Registry Members Only
          </p>
        </form>
      </div>
    </main>
  );
}
