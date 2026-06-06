import { createFileRoute, Link } from "@tanstack/react-router";
import { SectorNav } from "@/components/sector-nav";
import { useEffect, useState } from "react";
import wanted1 from "@/assets/wanted-1.jpg";
import wanted2 from "@/assets/wanted-2.jpg";
import wanted3 from "@/assets/wanted-3.jpg";
import wanted4 from "@/assets/wanted-4.jpg";
import special1 from "@/assets/special-1.jpg";

export const Route = createFileRoute("/sector-03")({
  head: () => ({
    meta: [
      { title: "Sector 03 — DEPLOYMENT ASSETS | FLEEK Apparel" },
      {
        name: "description",
        content:
          "Asset #11: The Guardian. ATL // FW26 Regional Archive. High-priority deployment zone.",
      },
      {
        property: "og:title",
        content: "Sector 03 — DEPLOYMENT ASSETS | FLEEK Apparel",
      },
      {
        property: "og:description",
        content:
          "Asset #11: The Guardian. ATL // FW26 Regional Archive. Prepare for deployment.",
      },
    ],
  }),
  component: Sector03,
});

// June 12, 2026, 12:00 PM EST (UTC-5) => 17:00 UTC
// Same target as blackout page — synced countdown
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

type DeploymentAsset = {
  id: string;
  codename: string;
  name: string;
  image: string;
  priority: string;
  deploymentDate: string;
  classification: string;
};

const ASSETS: DeploymentAsset[] = [
  {
    id: "DEP-001",
    codename: "THE NAVIGATOR",
    name: "Focus & Direction System",
    image: wanted1,
    priority: "HIGH",
    deploymentDate: "June 12, 12:00 PM EST",
    classification: "TACTICAL FIELD WEAR",
  },
  {
    id: "DEP-002",
    codename: "STELLAR POLARIS",
    name: "Strength & Purpose Unit",
    image: wanted2,
    priority: "HIGH",
    deploymentDate: "June 12, 12:00 PM EST",
    classification: "HEAVY DUTY OUTER",
  },
  {
    id: "DEP-003",
    codename: "ZENITH GEOMETRY",
    name: "Balance & Alignment Array",
    image: wanted3,
    priority: "HIGH",
    deploymentDate: "June 12, 12:00 PM EST",
    classification: "PRECISION CUT",
  },
  {
    id: "DEP-004",
    codename: "THE MEMENTO",
    name: "Guidance & Reminder Beacon",
    image: wanted4,
    priority: "HIGH",
    deploymentDate: "June 12, 12:00 PM EST",
    classification: "SPECIAL OPERATIONS",
  },
  {
    id: "DEP-005",
    codename: "THE GUARDIAN",
    name: "Asset #11 — Primary Deployment",
    image: special1,
    priority: "CRITICAL",
    deploymentDate: "June 12, 12:00 PM EST",
    classification: "ARCHIVE PROTOTYPE",
  },
];

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="font-display text-4xl md:text-5xl lg:text-6xl text-gold leading-none tabular-nums">
        {String(value).padStart(2, "0")}
      </div>
      <div className="mt-1 text-[9px] md:text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function Sector03() {
  const { days, hours, minutes, seconds, ready } = useCountdown();

  return (
    <>
    <SectorNav />
    <main className="min-h-screen bg-[#0c0c0c] text-[#e5e5e5] relative overflow-hidden">
      {/* Blueprint grid background */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #d4af37 1px, transparent 1px),
            linear-gradient(to bottom, #d4af37 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Subtle radial glow behind hero */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gold/[0.03] rounded-full blur-[120px] z-0" />

      {/* Top status bar */}
      <div className="relative z-10 border-b border-[#2a2a2a] bg-[#0f0f0f]/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-gold">
              SECTOR 03 — DEPLOYMENT ASSETS
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[10px] font-mono uppercase tracking-wider text-[#555]">
            <span>ATL // FW26</span>
            <span className="text-[#333]">|</span>
            <span className="text-gold">SECURE CONNECTION</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative z-10 px-6 pt-20 pb-16 text-center">
        <div className="mx-auto max-w-4xl">
          <p className="text-[10px] uppercase tracking-[0.5em] text-[#666] font-mono">
            // ATL // FW26 REGIONAL ARCHIVE
          </p>

          <div className="mt-8 inline-flex items-center gap-3 border border-gold/40 bg-gold/5 px-5 py-2.5">
            <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold">
              PRIMARY ASSET
            </span>
          </div>

          <h1 className="mt-8 font-display text-5xl sm:text-7xl md:text-8xl tracking-tight text-white leading-[0.9]">
            ASSET <span className="text-gold">#11</span>
          </h1>
          <h2 className="mt-2 font-display text-3xl sm:text-5xl md:text-6xl tracking-[0.15em] text-gold">
            THE GUARDIAN
          </h2>

          <p className="mt-6 text-sm md:text-base uppercase tracking-[0.25em] text-[#888] leading-relaxed max-w-2xl mx-auto">
            HIGH-PRIORITY DEPLOYMENT ZONE. CLEARANCE REQUIRED FOR ACCESS.
          </p>
        </div>

        {/* Countdown */}
        <div className="mx-auto mt-14 max-w-3xl border border-[#2a2a2a] bg-[#111] p-6 md:p-8">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#666] mb-6 font-mono">
            // T-MINUS TO DEPLOYMENT
          </p>
          <div className="flex items-start justify-center gap-3 md:gap-8" suppressHydrationWarning>
            <CountdownUnit value={ready ? days : 0} label="Days" />
            <div className="font-display text-3xl md:text-5xl text-gold/40 leading-none mt-1">:</div>
            <CountdownUnit value={ready ? hours : 0} label="Hours" />
            <div className="font-display text-3xl md:text-5xl text-gold/40 leading-none mt-1">:</div>
            <CountdownUnit value={ready ? minutes : 0} label="Minutes" />
            <div className="font-display text-3xl md:text-5xl text-gold/40 leading-none mt-1">:</div>
            <CountdownUnit value={ready ? seconds : 0} label="Seconds" />
          </div>
          <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-mono">
            Target: June 12, 2026 · 12:00 PM EST
          </p>
        </div>
      </section>

      {/* Asset grid */}
      <section className="relative z-10 px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex items-center justify-between border-b border-[#2a2a2a] pb-4">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#ff3333] animate-pulse" />
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#666] font-mono">
                DEPLOYMENT MANIFEST — {ASSETS.length} Assets
              </p>
            </div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#444] font-mono">
              [CLASSIFIED]
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ASSETS.map((asset) => (
              <article
                key={asset.id}
                className="group relative border border-[#222] bg-[#111] transition-all duration-500 hover:border-gold/40"
              >
                {/* Image area */}
                <div className="relative overflow-hidden">
                  <img
                    src={asset.image}
                    alt={asset.codename}
                    className="aspect-[4/5] w-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-80"
                    loading="lazy"
                  />

                  {/* Priority badge */}
                  <div className="absolute left-3 top-3">
                    <div className={`flex items-center gap-2 border px-3 py-1.5 backdrop-blur-sm ${asset.priority === "CRITICAL" ? "border-[#ff3333]/60 bg-[#ff3333]/10" : "border-gold/50 bg-black/80"}`}>
                      <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${asset.priority === "CRITICAL" ? "bg-[#ff3333]" : "bg-gold"}`} />
                      <span className={`text-[9px] font-bold uppercase tracking-[0.3em] ${asset.priority === "CRITICAL" ? "text-[#ff3333]" : "text-gold"}`}>
                        Priority: {asset.priority}
                      </span>
                    </div>
                  </div>

                  {/* Asset ID */}
                  <div className="absolute right-3 top-3">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[#555]">
                      {asset.id}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[#555]">
                      {asset.classification}
                    </span>
                  </div>
                  <h2 className="font-display text-lg tracking-[0.1em] text-white">
                    {asset.codename}
                  </h2>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[#666]">
                    {asset.name}
                  </p>

                  {/* Deployment date notice */}
                  <div className="mt-4 border-t border-[#222] pt-3">
                    <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-[#777]">
                      <svg className="w-3 h-3 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Deployment Date: {asset.deploymentDate}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#444]">
                      STATUS: STAGED
                    </span>
                    <Link
                      to="/"
                      className="inline-flex items-center gap-2 border border-[#333] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#888] transition-all hover:border-gold/60 hover:text-gold"
                    >
                      View Spec
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                </div>

                {/* Bottom gold line */}
                <div className="h-[1px] w-full bg-gold/20" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#222] px-6 py-10 text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-[#444] font-mono">
          End of transmission // Sector 03 — DEPLOYMENT
        </p>
        <p className="mt-2 text-[10px] font-mono tracking-wider text-[#333]">
          UNAUTHORIZED EXTRACTION IS PUNISHABLE UNDER PROTOCOL 11
        </p>
      </footer>
    </main>
    </>
  );
}
