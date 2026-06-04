import { Star, Plus, Sparkles } from "lucide-react";

export interface Product {
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
}

export type ProductCardVariant = "default" | "ranked" | "vault" | "collector";

interface ProductCardProps {
  product: Product;
  variant?: ProductCardVariant;
  index?: number;
}

export function ProductCard({ product, variant = "default", index = 0 }: ProductCardProps) {
  if (variant === "ranked") return <RankedCard product={product} index={index} />;
  if (variant === "vault") return <VaultCard product={product} index={index} />;
  if (variant === "collector") return <CollectorCard product={product} index={index} />;
  return <DefaultCard product={product} />;
}

/* ---------- HANGER WRAPPER ----------
   Wraps every product so it "hangs" from a rod with a wire hanger.
   Hover gives a subtle sway. */
function Hanger({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "gold";
}) {
  const wire = tone === "gold" ? "stroke-gold" : "stroke-muted-foreground/60";
  const rod = tone === "gold" ? "bg-gradient-to-b from-gold/80 via-gold to-gold/40" : "bg-gradient-to-b from-foreground/30 via-foreground/50 to-foreground/20";
  return (
    <div className="group/hanger relative pt-10">
      {/* Rack rod */}
      <div className={`absolute top-3 left-0 right-0 h-[3px] ${rod} shadow-[0_1px_2px_rgba(0,0,0,0.6)]`} />
      {/* End caps */}
      <span className={`absolute top-1.5 left-0 h-2 w-2 rounded-full ${tone === "gold" ? "bg-gold" : "bg-foreground/50"} shadow`} />
      <span className={`absolute top-1.5 right-0 h-2 w-2 rounded-full ${tone === "gold" ? "bg-gold" : "bg-foreground/50"} shadow`} />

      {/* Hanger + product sway on hover */}
      <div className="origin-top transition-transform duration-700 ease-out group-hover/hanger:rotate-[1.5deg] motion-safe:will-change-transform">
        {/* Wire hanger hook + triangle */}
        <svg
          aria-hidden
          viewBox="0 0 60 36"
          className="mx-auto block h-7 w-14 -mb-1 relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
          fill="none"
          strokeWidth="1.5"
        >
          <path d="M30 4 C 30 1, 33 1, 33 4" className={wire} strokeLinecap="round" />
          <path d="M30 4 V 14" className={wire} strokeLinecap="round" />
          <path d="M30 14 L 6 30 H 54 Z" className={wire} strokeLinejoin="round" />
        </svg>
        {children}
      </div>
    </div>
  );
}

/* ---------- DEFAULT (Featured Drop) ---------- */
function DefaultCard({ product }: { product: Product }) {
  return (
    <div className="group relative">
      <Hanger>
        <div className="relative aspect-[4/5] overflow-hidden bg-card">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-gold-foreground">
              {product.badge}
            </span>
          )}
          <button
            aria-label="Quick add"
            className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center bg-background/90 backdrop-blur text-foreground opacity-0 transition-all group-hover:opacity-100 hover:bg-gold hover:text-gold-foreground"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </Hanger>
      <Meta product={product} />
    </div>
  );
}

/* ---------- RANKED (Most Wanted) ---------- */
function RankedCard({ product, index }: { product: Product; index: number }) {
  const rank = String(index + 1).padStart(2, "0");
  return (
    <div className="group relative">
      <Hanger tone="gold">
        <div className="relative aspect-[4/5] overflow-hidden bg-card border border-border">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/0 to-background/0" />
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-4 -left-2 font-display text-[7rem] md:text-[9rem] leading-none text-gold/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
          >
            {rank}
          </span>
          <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-background/85 backdrop-blur px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-gold border-l-2 border-gold">
            ★ Top Seller
          </div>
          <button
            aria-label="Quick add"
            className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center bg-background/90 backdrop-blur text-foreground opacity-0 transition-all group-hover:opacity-100 hover:bg-gold hover:text-gold-foreground"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </Hanger>
      <Meta product={product} accent />
    </div>
  );
}

/* ---------- VAULT (Special Edition) ---------- */
function VaultCard({ product, index }: { product: Product; index: number }) {
  const drop = String(index + 1).padStart(2, "0");
  return (
    <div className="group relative">
      <Hanger tone="gold">
        <div className="relative aspect-[4/5] overflow-hidden bg-card">
          <div className="absolute inset-0 p-[1px] bg-gradient-to-b from-gold/60 via-gold/10 to-transparent pointer-events-none z-10" />
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/30" />

          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20">
            <span className="inline-flex items-center gap-1 bg-background/85 backdrop-blur border border-gold/40 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.25em] text-gold">
              <Sparkles className="h-2.5 w-2.5" /> Vault
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-gold/80 font-mono">DROP / {drop}</span>
          </div>

          {product.badge && (
            <span className="absolute bottom-3 left-3 bg-background/85 backdrop-blur border-l-2 border-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-foreground z-20">
              {product.badge}
            </span>
          )}
          <button
            aria-label="Reserve"
            className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center bg-gold text-gold-foreground opacity-0 transition-all group-hover:opacity-100 hover:scale-105 z-20"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </Hanger>
      <Meta product={product} accent />
    </div>
  );
}

/* ---------- COLLECTOR (Gold Capsule) ---------- */
function CollectorCard({ product, index }: { product: Product; index: number }) {
  const serial = `№ ${String(index + 1).padStart(3, "0")} / 100`;
  return (
    <div className="group relative">
      <Hanger tone="gold">
        <div className="relative aspect-[4/5] overflow-hidden border border-gold/40 bg-card shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-gold/20 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />

          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span className="inline-flex items-center gap-1 bg-gold px-2 py-1 text-[9px] font-bold uppercase tracking-[0.25em] text-gold-foreground">
              Collector
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-gold font-mono bg-background/70 backdrop-blur px-2 py-1">
              {serial}
            </span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
            <div>
              <p className="text-[9px] uppercase tracking-[0.25em] text-gold/90">Numbered Run</p>
              <p className="font-display text-lg text-foreground leading-tight line-clamp-1">{product.name}</p>
            </div>
            <button
              aria-label="Claim"
              className="shrink-0 inline-flex items-center gap-1 bg-gold px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-gold-foreground hover:scale-105 transition-transform"
            >
              Claim
            </button>
          </div>
        </div>
      </Hanger>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-[0.2em] text-gold">{product.category}</p>
        <span className="text-sm font-semibold text-gold">${product.price}</span>
      </div>
    </div>
  );
}

/* ---------- Shared Meta ---------- */
function Meta({ product, accent = false }: { product: Product; accent?: boolean }) {
  return (
    <div className="mt-3 flex items-start justify-between gap-2">
      <div>
        <p className={`text-[10px] uppercase tracking-[0.2em] ${accent ? "text-gold" : "text-muted-foreground"}`}>{product.category}</p>
        <h3 className="mt-0.5 text-sm font-medium text-foreground line-clamp-1">{product.name}</h3>
        <div className="mt-1 flex items-center gap-1.5">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${i < Math.floor(product.rating) ? "fill-gold text-gold" : "text-muted"}`}
              />
            ))}
          </div>
          <span className="text-[11px] text-muted-foreground">({product.reviews})</span>
        </div>
      </div>
      <span className="text-sm font-semibold text-foreground">${product.price}</span>
    </div>
  );
}
