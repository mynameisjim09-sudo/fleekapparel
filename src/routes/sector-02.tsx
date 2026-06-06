import { createFileRoute, Link } from "@tanstack/react-router";
import { SectorNav } from "@/components/sector-nav";
import capsule1 from "@/assets/capsule-1.jpg";
import capsule2 from "@/assets/capsule-2.jpg";
import capsule3 from "@/assets/capsule-3.jpg";
import capsule4 from "@/assets/capsule-4.jpg";
import capsule5 from "@/assets/capsule-5.jpg";

export const Route = createFileRoute("/sector-02")({
  head: () => ({
    meta: [
      { title: "Sector 02 — VOID SERIES | FLEEK Apparel" },
      {
        name: "description",
        content:
          "The VOID SERIES. Five forbidden assets. Status: Restricted. Enter at your own risk.",
      },
      {
        property: "og:title",
        content: "Sector 02 — VOID SERIES | FLEEK Apparel",
      },
      {
        property: "og:description",
        content:
          "The VOID SERIES. Five forbidden assets. Status: Restricted. Enter at your own risk.",
      },
    ],
  }),
  component: Sector02,
});

type VoidAsset = {
  id: string;
  name: string;
  tagline: string;
  image: string;
  censored: boolean;
};

const ASSETS: VoidAsset[] = [
  {
    id: "VOID-001",
    name: "FORBIDDEN HEART // VOID 01",
    tagline: "What beats beneath cannot be unseen.",
    image: capsule1,
    censored: false,
  },
  {
    id: "VOID-002",
    name: "FORBIDDEN HEART // VOID 02",
    tagline: "The second pulse always lies.",
    image: capsule2,
    censored: true,
  },
  {
    id: "VOID-003",
    name: "FORBIDDEN HEART // VOID 03",
    tagline: "Depths that remember your name.",
    image: capsule3,
    censored: false,
  },
  {
    id: "VOID-004",
    name: "FORBIDDEN HEART // VOID 04",
    tagline: "Shadows with teeth.",
    image: capsule4,
    censored: true,
  },
  {
    id: "VOID-005",
    name: "FORBIDDEN HEART // VOID 05",
    tagline: "The final frequency. Do not listen.",
    image: capsule5,
    censored: false,
  },
];

function Sector02() {
  return (
    <>
    <SectorNav />
    <main className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] relative overflow-hidden">
      {/* Scanline overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* Glitch noise background */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Hero */}
      <section className="relative z-10 px-6 pt-24 pb-16 text-center">
        <p className="text-[10px] uppercase tracking-[0.5em] text-[#666]">
          // Sector 02 — Restricted Access
        </p>
        <h1 className="mt-6 font-display text-5xl sm:text-7xl md:text-8xl tracking-tight text-white">
          <span className="relative inline-block">
            VOID
            {/* Glitch layers */}
            <span
              className="absolute left-0 top-0 -ml-[2px] text-[#ff3333] opacity-70 animate-pulse"
              style={{ clipPath: "inset(0 0 50% 0)", animation: "glitch1 2.5s infinite linear alternate-reverse" }}
              aria-hidden
            >
              VOID
            </span>
            <span
              className="absolute left-0 top-0 ml-[2px] text-[#00ffff] opacity-60"
              style={{ clipPath: "inset(50% 0 0 0)", animation: "glitch2 3s infinite linear alternate-reverse" }}
              aria-hidden
            >
              VOID
            </span>
          </span>{" "}
          <span className="text-[#888]">SERIES</span>
        </h1>
        <div className="mx-auto mt-8 max-w-2xl">
          <p className="text-sm md:text-base uppercase tracking-[0.25em] text-[#888] leading-relaxed">
            THE VOID IS FULL OF THINGS EYES WEREN'T BUILT TO WITNESS.
          </p>
        </div>

        {/* Censored warning bar */}
        <div className="mx-auto mt-10 inline-flex items-center gap-3 border border-[#ff3333]/40 bg-[#ff3333]/5 px-5 py-2.5">
          <span className="h-2 w-2 rounded-full bg-[#ff3333] animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#ff3333]">
            Clearance Required // Level 4
          </span>
        </div>
      </section>

      {/* Collection grid */}
      <section className="relative z-10 px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex items-center justify-between border-b border-[#333] pb-4">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#666]">
              Limited Collection — 5 Assets
            </p>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#666]">
              [REDACTED]
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {ASSETS.map((asset, i) => (
              <article
                key={asset.id}
                className="group relative border border-[#222] bg-[#111] transition-all duration-500 hover:border-[#444]"
              >
                {/* Image area */}
                <div className="relative overflow-hidden">
                  <img
                    src={asset.image}
                    alt={asset.name}
                    className="aspect-[4/5] w-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-80"
                    loading="lazy"
                  />

                  {/* Censored overlay for restricted assets */}
                  {asset.censored && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
                      <div className="border-2 border-[#ff3333] bg-black px-4 py-2">
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#ff3333]">
                          [CENSORED]
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Status badge */}
                  <div className="absolute left-3 top-3">
                    <div className="flex items-center gap-2 border border-[#ff3333]/50 bg-black/80 px-3 py-1.5 backdrop-blur-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#ff3333] animate-pulse" />
                      <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#ff3333]">
                        Status: Restricted
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
                  <h2 className="font-display text-lg tracking-[0.1em] text-white">
                    {asset.name}
                  </h2>
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#666]">
                    {asset.tagline}
                  </p>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#444]">
                      Asset {String(i + 1).padStart(2, "0")} / 05
                    </span>
                    <Link
                      to="/"
                      className="inline-flex items-center gap-2 border border-[#333] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#888] transition-all hover:border-[#666] hover:text-white"
                    >
                      View
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                </div>

                {/* Bottom glitch line */}
                <div
                  className="h-[1px] w-full bg-[#ff3333]/20"
                  style={{ animation: "glitchLine 4s infinite" }}
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#222] px-6 py-10 text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-[#444]">
          End of transmission // Sector 02 — VOID
        </p>
        <p className="mt-2 text-[10px] font-mono tracking-wider text-[#333]">
          UNAUTHORIZED DISTRIBUTION IS PUNISHABLE UNDER PROTOCOL 7
        </p>
      </footer>

      {/* Keyframe animations */}
      <style>{`
        @keyframes glitch1 {
          0% { clip-path: inset(0 0 50% 0); transform: translate(-2px, 0); }
          20% { clip-path: inset(30% 0 20% 0); transform: translate(2px, 0); }
          40% { clip-path: inset(10% 0 60% 0); transform: translate(-1px, 0); }
          60% { clip-path: inset(70% 0 5% 0); transform: translate(1px, 0); }
          80% { clip-path: inset(40% 0 30% 0); transform: translate(-3px, 0); }
          100% { clip-path: inset(0 0 50% 0); transform: translate(0, 0); }
        }
        @keyframes glitch2 {
          0% { clip-path: inset(50% 0 0 0); transform: translate(2px, 0); }
          25% { clip-path: inset(20% 0 40% 0); transform: translate(-2px, 0); }
          50% { clip-path: inset(60% 0 10% 0); transform: translate(1px, 0); }
          75% { clip-path: inset(10% 0 50% 0); transform: translate(-1px, 0); }
          100% { clip-path: inset(50% 0 0 0); transform: translate(0, 0); }
        }
        @keyframes glitchLine {
          0%, 90%, 100% { opacity: 0.1; transform: translateX(0); }
          91% { opacity: 0.6; transform: translateX(10px); }
          92% { opacity: 0.1; transform: translateX(-5px); }
          93% { opacity: 0.4; transform: translateX(3px); }
          94% { opacity: 0.1; transform: translateX(0); }
        }
      `}</style>
    </main>
    </>
  );
}
