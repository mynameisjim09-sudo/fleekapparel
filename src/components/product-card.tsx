import { Star, Plus } from "lucide-react";

export interface Product {
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
}

function Hanger() {
  return (
    <div className="relative z-10 mx-auto -mb-3 flex h-10 w-24 items-end justify-center">
      <svg
        viewBox="0 0 96 40"
        className="h-full w-full text-gold drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Hook */}
        <path d="M48 14 C48 8, 52 4, 52 9" />
        {/* Hanger body */}
        <path d="M48 14 L8 34 L88 34 L48 14 Z" />
      </svg>
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative">
      <Hanger />
      <div className="relative aspect-[4/5] overflow-hidden bg-card border-t-2 border-gold/40">
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

      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{product.category}</p>
          <h3 className="mt-0.5 text-sm font-medium text-foreground">{product.name}</h3>
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
    </div>
  );
}
