import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { SectorNav } from "@/components/sector-nav";
import { products } from "@/data/products";
import { ArrowRight, Send } from "lucide-react";
import { logConsensusFeedback } from "@/lib/consensus.functions";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Consensus // Mission Briefing — FLEEK Apparel" },
      {
        name: "description",
        content:
          "Two assets enter the Archive Battle. The community decides what we manufacture next. Deploy your vote before June 12.",
      },
      { property: "og:title", content: "Consensus // Mission Briefing — FLEEK" },
      {
        property: "og:description",
        content: "Vote. Deploy feedback. Shape the June 12 manufacturing run.",
      },
    ],
  }),
  component: Consensus,
});

// Seed simulated baseline votes so the bar is never empty
const SEED = [
  [128, 142],
  [201, 187],
  [88, 156],
  [173, 165],
  [220, 199],
];

type Side = "A" | "B";

function Battle({
  pair,
  pairIndex,
  onNext,
  total,
}: {
  pair: [typeof products[number], typeof products[number]];
  pairIndex: number;
  onNext: () => void;
  total: number;
}) {
  const [a, b] = pair;
  const seed = SEED[pairIndex % SEED.length];
  const [votes, setVotes] = useState<{ a: number; b: number }>({ a: seed[0], b: seed[1] });
  const [selected, setSelected] = useState<Side | null>(null);
  const [feedback, setFeedback] = useState("");
  const [user, setUser] = useState(() => {
    if (typeof window === "undefined") return "";
    return window.localStorage.getItem("fleek_operative") ?? "";
  });
  const [submittedUser, setSubmittedUser] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const logFeedback = useServerFn(logConsensusFeedback);

  const sum = votes.a + votes.b;
  const pctA = Math.round((votes.a / sum) * 100);
  const pctB = 100 - pctA;

  // Registry Stage 01–07 (cycles if more pairs exist)
  const registryStage = String((pairIndex % 7) + 1).padStart(2, "0");

  const vote = (side: Side) => {
    if (selected) return;
    setSelected(side);
    setVotes((v) => (side === "A" ? { ...v, a: v.a + 1 } : { ...v, b: v.b + 1 }));
    const winner = side === "A" ? a.name : b.name;
    const loser = side === "A" ? b.name : a.name;
    // Fire-and-forget VOTE event (no PII unless user already saved one)
    logFeedback({
      data: { event: "VOTE", registryStage, winner, loser, feedback: "", user: user.trim() },
    }).catch((err) => console.error("vote log failed", err));
  };

  const reset = () => {
    setSelected(null);
    setFeedback("");
    setSubmittedUser(null);
    setError(null);
    onNext();
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim() || !selected) return;
    setSending(true);
    setError(null);
    const winner = selected === "A" ? a.name : b.name;
    const loser = selected === "A" ? b.name : a.name;
    const note = feedback.trim().slice(0, 280);
    const operative = user.trim().slice(0, 120);
    try {
      await logFeedback({
        data: {
          event: "FEEDBACK",
          registryStage,
          winner,
          loser,
          feedback: note,
          user: operative,
        },
      });
      if (operative && typeof window !== "undefined") {
        window.localStorage.setItem("fleek_operative", operative);
      }
      setSubmittedUser(operative || "OPERATIVE");
    } catch (err) {
      setError("Transmission failed. Retry.");
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  const submitted = submittedUser !== null;

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24">
      {/* Briefing header */}
      <div className="mb-10 grid grid-cols-3 items-center gap-4 border-y border-gold/20 py-4 font-mono text-[10px] uppercase tracking-[0.4em] text-[#777]">
        <span>
          Battle <span className="text-gold">{String(pairIndex + 1).padStart(2, "0")}</span> /{" "}
          {String(total).padStart(2, "0")}
        </span>
        <span className="text-center text-gold">// CONSENSUS LIVE</span>
        <span className="text-right">DEPLOYMENT · 06.12</span>
      </div>

      <div className="grid grid-cols-1 gap-px bg-[#1a1a1a] md:grid-cols-[1fr_auto_1fr]">
        <Card asset={a} side="A" selected={selected} pct={pctA} onVote={() => vote("A")} />

        <div className="hidden items-center justify-center bg-background px-6 md:flex">
          <span className="font-display text-3xl tracking-[0.3em] text-gold">VS</span>
        </div>

        <Card asset={b} side="B" selected={selected} pct={pctB} onVote={() => vote("B")} />
      </div>

      {/* Live percentage bar */}
      <div className="mt-8">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.35em] text-[#666]">
          <span className={selected === "A" ? "text-gold" : ""}>A · {pctA}%</span>
          <span>{sum.toLocaleString()} operatives polled</span>
          <span className={selected === "B" ? "text-gold" : ""}>{pctB}% · B</span>
        </div>
        <div className="relative mt-3 h-[3px] w-full overflow-hidden bg-[#1a1a1a]">
          <div
            className="absolute inset-y-0 left-0 bg-gold transition-[width] duration-700 ease-out"
            style={{ width: selected ? `${pctA}%` : "0%" }}
          />
          <div
            className="absolute inset-y-0 right-0 bg-foreground/60 transition-[width] duration-700 ease-out"
            style={{ width: selected ? `${pctB}%` : "0%" }}
          />
        </div>
      </div>

      {/* Opinions field — reveals after vote */}
      {selected && !submitted && (
        <form
          onSubmit={submit}
          className="mt-10 animate-in fade-in slide-in-from-bottom-2 duration-500"
        >
          <label className="block font-mono text-[10px] uppercase tracking-[0.4em] text-gold">
            Deploy Feedback: Why this asset?
          </label>
          <div className="mt-3 flex items-center border-b border-foreground/30 focus-within:border-gold">
            <input
              autoFocus
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              maxLength={280}
              placeholder="Single-line transmission to the manufacturing desk…"
              className="h-12 w-full bg-transparent text-sm tracking-wide text-foreground placeholder:text-[#444] focus:outline-none"
            />
            <button
              type="submit"
              disabled={!feedback.trim() || sending}
              className="ml-3 flex h-10 items-center gap-2 px-3 font-mono text-[10px] uppercase tracking-[0.35em] text-foreground transition-colors hover:text-gold disabled:opacity-30"
            >
              {sending ? "Transmitting…" : "Transmit"} <Send className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Optional operative identifier */}
          <div className="mt-5 flex items-center border-b border-foreground/15 focus-within:border-gold/60">
            <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#555]">
              Operative ID
            </span>
            <input
              value={user}
              onChange={(e) => setUser(e.target.value)}
              maxLength={120}
              placeholder="callsign or email (optional)"
              className="ml-4 h-10 w-full bg-transparent text-xs tracking-wide text-foreground placeholder:text-[#3a3a3a] focus:outline-none"
            />
          </div>

          <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.3em] text-[#555]">
            {feedback.length}/280 · Registry Stage {registryStage} · secure transmission
          </p>
          {error && (
            <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.3em] text-red-500">
              {error}
            </p>
          )}
        </form>
      )}

      {submitted && (
        <div className="mt-10 flex flex-col items-center gap-5 border border-gold/40 bg-[#0a0a0a] px-6 py-10 text-center shadow-[0_0_40px_-12px_rgba(212,175,55,0.45)] animate-in fade-in duration-500">
          <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-gold/80">
            // Registry · Stage {registryStage}
          </p>
          <p className="font-display text-2xl tracking-[0.18em] text-gold sm:text-3xl">
            DATA LOGGED TO REGISTRY.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-gold">
            Thank you, {submittedUser}.
          </p>
          <button
            onClick={reset}
            className="group mt-2 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em] text-foreground"
          >
            Next Battle
            <span className="h-px w-10 bg-foreground transition-all group-hover:w-20 group-hover:bg-gold" />
            <ArrowRight className="h-3.5 w-3.5 transition-colors group-hover:text-gold" />
          </button>
        </div>
      )}
    </section>
  );
}

function Card({
  asset,
  side,
  selected,
  pct,
  onVote,
}: {
  asset: typeof products[number];
  side: Side;
  selected: Side | null;
  pct: number;
  onVote: () => void;
}) {
  const isMe = selected === side;
  const isLoser = selected && !isMe;
  return (
    <article
      className={`relative flex flex-col bg-background p-6 transition-all duration-500 md:p-10 ${
        isLoser ? "opacity-50" : "opacity-100"
      }`}
    >
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.4em] text-[#666]">
        <span>Side {side}</span>
        {isMe && <span className="text-gold">// Selected</span>}
      </div>

      <div className="relative mt-5 aspect-square w-full overflow-hidden bg-[#0a0a0a]">
        {asset.image ? (
          <img
            src={asset.image}
            alt={asset.name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-display text-5xl text-gold/20">
            {side}
          </div>
        )}
        {selected && (
          <div className="absolute bottom-0 left-0 right-0 bg-background/80 px-4 py-2 text-center font-display text-2xl tracking-[0.2em] text-gold backdrop-blur-sm">
            {pct}%
          </div>
        )}
      </div>

      <h3 className="mt-6 font-display text-xl tracking-[0.12em] text-foreground">{asset.name}</h3>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-[#666]">
        {asset.description}
      </p>

      <button
        onClick={onVote}
        disabled={!!selected}
        className={`mt-6 h-11 border text-[10px] font-bold uppercase tracking-[0.4em] transition-all ${
          isMe
            ? "border-gold bg-gold text-gold-foreground"
            : selected
              ? "border-[#222] text-[#444]"
              : "border-foreground/40 text-foreground hover:border-gold hover:text-gold"
        }`}
      >
        {isMe ? "✓ Selected" : "Select"}
      </button>
    </article>
  );
}

function Consensus() {
  // Build battle pairs from products with imagery
  const pairs = useMemo(() => {
    const pool = products.filter((p) => p.image);
    const out: [typeof products[number], typeof products[number]][] = [];
    for (let i = 0; i + 1 < pool.length; i += 2) out.push([pool[i], pool[i + 1]]);
    return out;
  }, []);
  const [pairIndex, setPairIndex] = useState(0);

  return (
    <>
      <SectorNav />
      <main className="min-h-screen bg-background text-foreground">
        {/* Mission briefing hero */}
        <section className="relative z-10 px-6 pt-20 pb-12 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-gold">
            // Mission Briefing · Consensus Layer
          </p>
          <h1 className="mt-6 font-display text-5xl tracking-tight text-foreground sm:text-7xl md:text-8xl">
            THE <span className="text-gold">BATTLE</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xs uppercase tracking-[0.3em] text-muted-foreground sm:text-sm">
            Two assets. One archive slot. Your vote dictates the June 12 manufacturing run.
          </p>
        </section>

        {pairs.length > 0 && (
          <Battle
            key={pairIndex}
            pair={pairs[pairIndex % pairs.length]}
            pairIndex={pairIndex}
            total={pairs.length}
            onNext={() => setPairIndex((i) => (i + 1) % pairs.length)}
          />
        )}

        <footer className="relative z-10 border-t border-[#222] px-6 py-10 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#444]">
            Consensus closes 06.12 · Operatives only
          </p>
        </footer>
      </main>
    </>
  );
}
