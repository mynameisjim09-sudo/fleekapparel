import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Plus, ArrowRight, X } from "lucide-react";
import { SectorNav } from "@/components/sector-nav";
import { BuyButton } from "@/components/buy-button";
import { products, HOODIE_ANCHOR_PRICE } from "@/data/products";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FLEEK Apparel // Luxury Digital Archive" },
      {
        name: "description",
        content:
          "Narrative-first apparel. The Ronin. The Architect. A luxury digital archive of heavyweight hoodies and tees.",
      },
      { property: "og:title", content: "FLEEK Apparel // Luxury Digital Archive" },
      {
        property: "og:description",
        content: "The Ronin. The Architect. A luxury digital archive.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

// ── Narratives (hero cinematic carousel) ──────────────────────────────
const NARRATIVES = [
  {
    id: "ronin",
    label: "Chapter I",
    title: "THE ETERNAL RONIN",
    line: "Without a master. Without a name. Bound only to the blade.",
    image:
      "https://images.printify.com/mockup/6a24d3ccac2a0369d80cfad3/111248/105309/the-eternal-ronin-special-edition-archive.jpg?camera_label=front",
  },
  {
    id: "architect",
    label: "Chapter II",
    title: "THE ARCHITECT",
    line: "Builder of silent systems. Engineer of the unseen archive.",
    image:
      "https://images.printify.com/mockup/6a21a640bc4dad924d0a3651/111248/105309/asset-11-the-guardian-special-edition.jpg?camera_label=front",
  },
];

function Hero() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % NARRATIVES.length), 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative h-[92vh] w-full overflow-hidden bg-background">
      {NARRATIVES.map((n, i) => (
        <div
          key={n.id}
          className={`absolute inset-0 transition-opacity duration-[1800ms] ease-in-out ${
            i === idx ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== idx}
        >
          {/* Cinematic still — slow Ken-Burns drift simulates video, ends on the hoodie graphic */}
          <img
            src={n.image}
            alt={n.title}
            className={`absolute inset-0 h-full w-full object-cover ${
              i === idx ? "animate-[kenburns_8s_ease-out_forwards]" : ""
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-background/50" />
        </div>
      ))}

      {/* Foreground copy */}
      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-20 md:px-16 md:pb-28">
        <div className="max-w-3xl">
          <p className="text-[10px] uppercase tracking-[0.5em] text-gold">
            {NARRATIVES[idx].label}
          </p>
          <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-tight text-foreground md:text-8xl">
            {NARRATIVES[idx].title}
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {NARRATIVES[idx].line}
          </p>
        </div>

        {/* Carousel pips */}
        <div className="mt-12 flex items-center gap-3">
          {NARRATIVES.map((n, i) => (
            <button
              key={n.id}
              onClick={() => setIdx(i)}
              aria-label={`Show ${n.title}`}
              className={`h-[2px] transition-all duration-500 ${
                i === idx ? "w-16 bg-gold" : "w-8 bg-foreground/30 hover:bg-foreground/60"
              }`}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes kenburns {
          0% { transform: scale(1.08) translate(0,0); }
          100% { transform: scale(1.0) translate(0,0); }
        }
      `}</style>
    </section>
  );
}

// ── Lifestyle horizontal swipe carousel ───────────────────────────────
function Lifestyle() {
  // Reuse mockups as lifestyle stand-ins until art-directed lifestyle shots arrive
  const lifestyle = products.filter((p) => p.image).slice(0, 8);
  const scroller = useRef<HTMLDivElement>(null);

  return (
    <section className="border-y border-border/40 bg-background py-20 md:py-28">
      <div className="px-6 md:px-16">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.5em] text-gold">In the Field</p>
            <h2 className="mt-3 font-display text-3xl tracking-tight text-foreground md:text-5xl">
              Worn. Lived in.
            </h2>
          </div>
          <p className="hidden max-w-xs text-xs uppercase tracking-[0.25em] text-muted-foreground md:block">
            ← Swipe →
          </p>
        </div>
      </div>

      <div
        ref={scroller}
        className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:gap-6 md:px-16"
        style={{ scrollbarWidth: "none" }}
      >
        {lifestyle.map((p) => (
          <div
            key={p.id}
            className="relative aspect-[3/4] w-[78vw] flex-none snap-start overflow-hidden bg-card md:w-[36vw] lg:w-[28vw]"
          >
            <img src={p.image} alt={p.name} className="h-full w-full object-cover" loading="lazy" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            <p className="absolute bottom-5 left-5 text-[10px] uppercase tracking-[0.35em] text-foreground/80">
              {p.name}
            </p>
          </div>
        ))}
      </div>

      {/* Anchor links */}
      <div className="mt-14 flex flex-col items-center justify-center gap-8 md:flex-row md:gap-16">
        <a
          href="#gallery"
          className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-foreground"
        >
          Shop Hoodies
          <span className="h-px w-10 bg-foreground transition-all group-hover:w-20 group-hover:bg-gold" />
          <ArrowRight className="h-3.5 w-3.5 text-foreground transition-colors group-hover:text-gold" />
        </a>
        <a
          href="#gallery"
          className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-foreground"
        >
          Shop T-Shirts
          <span className="h-px w-10 bg-foreground transition-all group-hover:w-20 group-hover:bg-gold" />
          <ArrowRight className="h-3.5 w-3.5 text-foreground transition-colors group-hover:text-gold" />
        </a>
      </div>
    </section>
  );
}

// ── Gallery grid with Plus → variant overlay ──────────────────────────
function Gallery() {
  const gallery = products.filter((p) => p.image);
  const [active, setActive] = useState<(typeof products)[number] | null>(null);

  return (
    <section id="gallery" className="bg-background px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-gold">The Archive</p>
          <h2 className="mt-4 font-display text-4xl tracking-tight text-foreground md:text-6xl">
            Every Asset. Catalogued.
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {gallery.map((p) => (
            <button
              key={p.id}
              onClick={() => setActive(p)}
              className="group relative aspect-square overflow-hidden bg-card text-left"
            >
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-background/0 transition-colors duration-500 group-hover:bg-background/40" />
              <span
                aria-hidden
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center border border-foreground/20 bg-background/30 text-foreground opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:border-gold group-hover:text-gold group-hover:opacity-100"
              >
                <Plus className="h-4 w-4" />
              </span>
              <div className="absolute bottom-0 left-0 right-0 translate-y-4 px-4 py-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/90">
                  {p.name}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-md border border-gold/30 bg-background p-0 [&>button]:hidden">
          {active && (
            <div className="relative">
              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center text-foreground/70 hover:text-gold"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="aspect-square w-full overflow-hidden bg-card">
                <img src={active.image} alt={active.name} className="h-full w-full object-cover" />
              </div>

              <div className="px-8 py-8">
                <DialogTitle asChild>
                  <h3 className="font-display text-xl tracking-[0.15em] text-foreground">
                    {active.name}
                  </h3>
                </DialogTitle>
                <p className="mt-1 text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
                  Choose your weight
                </p>

                <div className="mt-8 space-y-3">
                  <VariantRow
                    label="Heavyweight Hoodie"
                    price={HOODIE_ANCHOR_PRICE}
                    priceId={active.priceId}
                  />
                  <VariantRow label="Heavyweight Tee" price={65} priceId={active.priceId} />
                </div>

                <p className="mt-6 text-center text-[9px] uppercase tracking-[0.3em] text-muted-foreground/70">
                  Encrypted Checkout · Archive Member Pricing
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

function VariantRow({
  label,
  price,
  priceId,
}: {
  label: string;
  price: number;
  priceId: string;
}) {
  return (
    <div className="flex items-center justify-between border border-border/60 px-5 py-4 transition-colors hover:border-gold/60">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-foreground">{label}</p>
        <p className="mt-1 text-[10px] tracking-widest text-muted-foreground">${price}.00 USD</p>
      </div>
      <BuyButton
        priceId={priceId}
        variant="ghost"
        className="h-9 border border-foreground/30 px-4 text-[10px] uppercase tracking-[0.3em] text-foreground hover:border-gold hover:bg-transparent hover:text-gold"
      >
        Acquire
      </BuyButton>
    </div>
  );
}

// ── Slow-Drift Infinite Carousel (Letterbox film strip) ───────────────
const FILMSTRIP = [
  {
    id: "architect-front",
    label: "STAGE 02 · STRUCTURE",
    title: "THE ARCHITECT",
    src: "https://images.printify.com/mockup/6a21a640bc4dad924d0a3651/111248/105309/asset-11-the-guardian-special-edition.jpg?camera_label=front",
    encrypted: false,
  },
  {
    id: "dragon-front",
    label: "STAGE 03 · POWER",
    title: "THE DRAGON",
    src: "https://images.printify.com/mockup/6a2412ff50a21acce208b01b/117441/127480/dragon-blade-flaming-archive.jpg?camera_label=front",
    encrypted: true,
  },
  {
    id: "skull-front",
    label: "STAGE 04 · LEGACY",
    title: "THE SKULL KING",
    src: "https://images.printify.com/mockup/6a20e7f6de5d2b9583025dc5/117441/127480/sovereign-skull-crowned-in-silence.jpg?camera_label=front",
    encrypted: true,
  },
];

function FilmStrip() {
  // Duplicate the set so the marquee loops seamlessly.
  const reel = [...FILMSTRIP, ...FILMSTRIP];

  return (
    <section
      aria-label="Registry film strip"
      className="relative overflow-hidden border-y border-border/40 bg-background"
    >
      {/* Letterbox bars */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-3 bg-background" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-3 bg-background" />

      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent md:w-40" />

      {/* Label rail */}
      <div className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rotate-180 text-[9px] uppercase tracking-[0.5em] text-gold/60 [writing-mode:vertical-rl]">
        REGISTRY · DRIFT REEL
      </div>
      <div className="absolute right-4 top-1/2 z-20 -translate-y-1/2 text-[9px] uppercase tracking-[0.5em] text-gold/60 [writing-mode:vertical-rl]">
        FLEEK ARCHIVE // LIVE
      </div>

      {/* Reel */}
      <div className="group relative h-[28vh] min-h-[200px] md:h-[34vh] md:min-h-[260px]">
        <div className="filmstrip-track absolute inset-y-0 left-0 flex items-center gap-4 md:gap-6">
          {reel.map((f, i) => (
            <figure
              key={`${f.id}-${i}`}
              className="relative h-full flex-none overflow-hidden bg-card transition-[filter] duration-500 hover:[filter:contrast(1.05)_saturate(1.05)]"
              style={{ aspectRatio: "16/9" }}
            >
              <img
                src={f.src}
                alt={f.title}
                loading="lazy"
                className="h-full w-full object-cover"
                style={{ objectPosition: "center 20%" }}
              />
              {/* Scanline overlay */}
              <div className="filmstrip-scanlines pointer-events-none absolute inset-0 mix-blend-overlay opacity-40" />
              {/* Periodic glitch sweep */}
              <div className="filmstrip-glitch pointer-events-none absolute inset-0" />
              {/* ENCRYPTED watermark (glimpse effect) */}
              {f.encrypted && (
                <div className="pointer-events-none absolute right-2 top-2 z-10 flex items-center gap-1.5 bg-background/40 px-2 py-1 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500/70 animate-pulse" />
                  <span className="text-[7px] uppercase tracking-[0.4em] text-foreground/30 font-mono">
                    ENCRYPTED
                  </span>
                </div>
              )}
              {/* Caption */}
              <figcaption className="absolute bottom-2 left-2 z-10 flex items-center gap-2 bg-background/60 px-2 py-1 backdrop-blur-sm">
                <span className="h-1 w-1 bg-gold" />
                <span className="text-[8px] uppercase tracking-[0.35em] text-gold">
                  {f.label}
                </span>
                <span className="text-[8px] uppercase tracking-[0.3em] text-foreground/70">
                  {f.title}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes filmstrip-drift {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .filmstrip-track {
          animation: filmstrip-drift 90s linear infinite;
          will-change: transform;
        }
        .group:hover .filmstrip-track {
          animation-duration: 180s; /* 50% slower on hover */
        }
        .filmstrip-scanlines {
          background-image: repeating-linear-gradient(
            to bottom,
            rgba(255,255,255,0.06) 0px,
            rgba(255,255,255,0.06) 1px,
            transparent 1px,
            transparent 3px
          );
        }
        @keyframes filmstrip-glitch {
          0%, 92%, 100% { opacity: 0; transform: translateX(0); }
          93%  { opacity: 0.5; transform: translateX(-2px); background: linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.18) 40%, rgba(255,0,80,0.12) 50%, transparent 100%); }
          94%  { opacity: 0.2; transform: translateX(3px); background: linear-gradient(90deg, transparent 0%, rgba(0,255,200,0.15) 60%, transparent 100%); }
          95%  { opacity: 0.6; transform: translateX(-1px); background: repeating-linear-gradient(to bottom, rgba(255,255,255,0.18) 0 2px, transparent 2px 4px); }
          96%  { opacity: 0; transform: translateX(0); }
        }
        .filmstrip-glitch {
          animation: filmstrip-glitch 9s steps(1, end) infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .filmstrip-track { animation: none; }
          .filmstrip-glitch { animation: none; }
        }
      `}</style>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <SectorNav />
      <main className="bg-background text-foreground">
        <Hero />
        <FilmStrip />
        <Lifestyle />
        <Gallery />
      </main>
    </>
  );
}
