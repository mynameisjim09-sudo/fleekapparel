import { createFileRoute, Link } from "@tanstack/react-router";
import { SectorNav } from "@/components/sector-nav";
import symbolsAsset from "@/assets/fleek-symbols.png.asset.json";
import wanted1 from "@/assets/wanted-1.jpg";
import wanted2 from "@/assets/wanted-2.jpg";
import wanted3 from "@/assets/wanted-3.jpg";
import wanted4 from "@/assets/wanted-4.jpg";

export const Route = createFileRoute("/sector-01")({
  head: () => ({
    meta: [
      { title: "Sector 01 — Fleek Symbols Collection" },
      {
        name: "description",
        content:
          "Decode the Fleek Symbols Collection: Focus, Strength, Balance, and Guidance — four assets forged in gold.",
      },
      { property: "og:title", content: "Sector 01 — Fleek Symbols Collection" },
      {
        property: "og:description",
        content:
          "Four symbols. Four assets. Focus & Direction, Strength & Purpose, Balance & Alignment, Guidance & Reminder.",
      },
      { property: "og:image", content: symbolsAsset.url },
    ],
  }),
  component: Sector01,
});

type SymbolSection = {
  symbol: string;
  tagline: string;
  product: string;
  blurb: string;
  image: string;
};

const SECTIONS: SymbolSection[] = [
  {
    symbol: "Focus & Direction",
    tagline: "Stay locked. Stay driven.",
    product: "The Navigator",
    blurb:
      "A compass for the disciplined. The Navigator anchors every move to true north — your path, your pace, your purpose.",
    image: wanted1,
  },
  {
    symbol: "Strength & Purpose",
    tagline: "Built with purpose. Fueled by discipline.",
    product: "Stellar Polaris",
    blurb:
      "Forged from intent. Stellar Polaris is the eight-point reminder that strength without purpose is just noise.",
    image: wanted2,
  },
  {
    symbol: "Balance & Alignment",
    tagline: "Mind. Body. Mission. Aligned.",
    product: "Zenith Geometry",
    blurb:
      "Where opposing forces meet. Zenith Geometry is the equilibrium piece — sharp, centered, intentional.",
    image: wanted3,
  },
  {
    symbol: "Guidance & Reminder",
    tagline: "Stay focused. Never forget why.",
    product: "The Memento",
    blurb:
      "A pulse of light in the dark. The Memento is the quiet voice that pulls you back to the mission.",
    image: wanted4,
  },
];

function Sector01() {
  return (
    <>
    <SectorNav />
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero header */}
      <section className="border-b border-gold/20 px-6 pt-20 pb-12 text-center">
        <p className="text-[11px] uppercase tracking-[0.4em] text-gold-muted">
          // Sector 01 — Field Manual
        </p>
        <h1 className="mt-4 font-display text-4xl text-gold sm:text-6xl md:text-7xl">
          The Symbols Collection
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
          Four assets. Four frequencies. Decode the marks that define the
          Registry.
        </p>
      </section>

      {/* Main educational graphic */}
      <section className="px-4 py-10 sm:px-8 sm:py-16">
        <div className="relative mx-auto max-w-6xl">
          <div
            className="absolute inset-0 -z-10 blur-3xl opacity-40"
            style={{
              background:
                "radial-gradient(ellipse at center, var(--color-gold) 0%, transparent 65%)",
            }}
          />
          <div className="overflow-hidden border border-gold/30 shadow-gold">
            <img
              src={symbolsAsset.url}
              alt="Fleek Symbols Collection — four golden glyphs representing Focus, Strength, Balance, and Guidance"
              className="h-auto w-full"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* Sub-sections */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl space-y-16">
          {SECTIONS.map((s, i) => (
            <article
              key={s.symbol}
              className="group relative grid items-center gap-8 border-t border-gold/15 pt-12 md:grid-cols-[1fr_1fr] md:gap-16"
            >
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <p className="text-[10px] uppercase tracking-[0.4em] text-gold-muted">
                  Asset 0{i + 1}
                </p>
                <h2 className="mt-3 font-display text-3xl text-gold sm:text-5xl">
                  {s.symbol}
                </h2>
                <p className="mt-3 text-sm uppercase tracking-[0.25em] text-gold-muted">
                  {s.tagline}
                </p>
                <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
                  {s.blurb}
                </p>

                <Link
                  to="/"
                  className="mt-8 inline-flex items-center gap-3 border border-gold bg-transparent px-6 py-3 text-xs font-bold uppercase tracking-[0.3em] text-gold transition-all hover:bg-gold hover:text-gold-foreground hover:shadow-gold"
                >
                  Shop {s.product}
                  <span aria-hidden>→</span>
                </Link>
              </div>

              <div className={i % 2 === 1 ? "md:order-1" : ""}>
                <div className="relative">
                  <div
                    className="absolute -inset-4 -z-10 blur-2xl opacity-50"
                    style={{
                      background:
                        "radial-gradient(circle at center, var(--color-gold) 0%, transparent 70%)",
                    }}
                  />
                  <div className="overflow-hidden border border-gold/30 bg-card">
                    <img
                      src={s.image}
                      alt={`${s.product} — ${s.symbol}`}
                      className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-4 text-center font-display text-2xl text-gold">
                    {s.product}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-gold/20 px-6 py-10 text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-gold-muted">
          End of transmission // Sector 01
        </p>
      </footer>
    </main>
    </>
  );
}
