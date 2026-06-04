import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, Truck, ShieldCheck, RotateCcw, Sparkles, Flame } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { RegistryPopup } from "@/components/registry-popup";
import { ProductCard, type Product } from "@/components/product-card";
import { getPrintifyProducts, type StoreProduct } from "@/lib/printify.functions";

import hero from "@/assets/hero.jpg";
import productHoodie from "@/assets/product-hoodie.jpg";
import productTee from "@/assets/product-tee.jpg";
import productHat from "@/assets/product-hat.jpg";
import productJoggers from "@/assets/product-joggers.jpg";
import lifestyle1 from "@/assets/lifestyle-1.jpg";
import lifestyle2 from "@/assets/lifestyle-2.png";
import lifestyle3 from "@/assets/lifestyle-3.jpg";

const productsQueryOptions = queryOptions({
  queryKey: ["printify-products"],
  queryFn: () => getPrintifyProducts(),
  staleTime: 1000 * 60 * 5,
});

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FLEEK Apparel — Built Different. Worn Different." },
      { name: "description", content: "Luxury streetwear for those who refuse to blend in. Shop premium hoodies, tees, hats and joggers. Free shipping over $150." },
      { property: "og:title", content: "FLEEK Apparel — Luxury Streetwear" },
      { property: "og:description", content: "Built Different. Worn Different. Get FLEEK. Get Paid." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQueryOptions),
  component: Index,
});

// Fallback (shown only if Printify returns nothing)
const fallback: Product[] = [
  { name: "Royalty Heavyweight Hoodie", category: "Hoodie", price: 189, rating: 5, reviews: 412, image: productHoodie, badge: "New" },
  { name: "Signature Oversized Tee", category: "T-Shirt", price: 79, rating: 4.8, reviews: 638, image: productTee },
  { name: "Monogram Snapback", category: "Hat", price: 65, rating: 4.9, reviews: 287, image: productHat },
  { name: "Hustler Track Joggers", category: "Joggers", price: 149, rating: 4.7, reviews: 195, image: productJoggers, badge: "Hot" },
];

function toProduct(p: StoreProduct, badge?: string): Product {
  return {
    name: p.name,
    category: p.category,
    price: p.price,
    rating: p.rating,
    reviews: p.reviews,
    image: p.image,
    badge,
  };
}

function Index() {
  const { data: all } = useSuspenseQuery(productsQueryOptions);
  const hasLive = all.length > 0;

  const featured: Product[] = hasLive
    ? all.slice(0, 4).map((p, i) => toProduct(p, i === 0 ? "New" : i === 3 ? "Hot" : undefined))
    : fallback;
  const bestsellers: Product[] = hasLive
    ? all.slice(4, 8).map((p, i) => toProduct(p, `#${i + 1}`))
    : fallback.map((p, i) => ({ ...p, badge: `#${i + 1}` }));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <Hero />
      <MarqueeBar />
      <Featured items={featured} />
      <BrandStory />
      <BestSellers items={bestsellers} />
      <SocialProof />
      <EmailCapture />
      <TrustBadges />
      <SiteFooter />
      <RegistryPopup />
    </div>
  );
}



function Hero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden">
      <img
        src={hero}
        alt="FLEEK Apparel hero — luxury streetwear"
        width={1080}
        height={1920}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/20 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/30 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-end px-4 pb-20 pt-32 md:px-8 md:pb-32">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 border border-gold/40 bg-background/40 backdrop-blur px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
            <Sparkles className="h-3 w-3" /> FW26 Drop · Limited Run
          </div>

          <h1 className="mt-6 font-display text-[18vw] leading-[0.85] tracking-tight text-foreground md:text-[8.5rem]">
            Built<br />
            <span className="text-gradient-gold">Different.</span><br />
            Worn Different.
          </h1>

          <p className="mt-6 max-w-md text-base text-muted-foreground md:text-lg">
            Luxury streetwear for those who refuse to blend in. Engineered for hustlers, creators, and the relentless.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#featured" className="group inline-flex items-center justify-center gap-2 bg-gold px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-gold-foreground shadow-gold transition-all hover:scale-[1.02]">
              Shop Now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#featured" className="inline-flex items-center justify-center gap-2 border border-foreground/70 bg-background/30 backdrop-blur px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-foreground hover:bg-foreground hover:text-background transition-colors">
              New Arrivals
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function MarqueeBar() {
  const items = ["Get FLEEK. Get Paid.", "★", "Built Different.", "★", "Worn Different.", "★", "Premium Streetwear.", "★", "Limited Drops.", "★"];
  return (
    <div className="border-y border-border bg-background overflow-hidden py-5">
      <div className="flex whitespace-nowrap marquee">
        {[...items, ...items, ...items, ...items].map((t, i) => (
          <span key={i} className={`mx-6 font-display text-2xl tracking-[0.2em] ${t === "★" ? "text-gold" : "text-foreground/80"}`}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function Featured({ items }: { items: Product[] }) {
  return (
    <section id="featured" className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
      <div className="flex items-end justify-between gap-4 mb-10">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">The Collection</p>
          <h2 className="mt-2 font-display text-5xl md:text-7xl text-foreground">Featured Drop</h2>
        </div>
        <a href="#" className="hidden md:inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground hover:text-gold">
          View All <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
        {items.map((p, i) => <ProductCard key={`${p.name}-${i}`} product={p} />)}
      </div>
    </section>
  );
}

function BrandStory() {
  return (
    <section id="story" className="relative border-y border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-32 grid md:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-square md:aspect-[4/5] overflow-hidden">
          <img src={lifestyle2} alt="FLEEK movement" loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute bottom-4 left-4 right-4 bg-background/85 backdrop-blur px-5 py-4 border-l-2 border-gold">
            <p className="font-display text-2xl text-gold">"Get FLEEK. Get Paid."</p>
          </div>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">Our Story</p>
          <h2 className="mt-3 font-display text-5xl md:text-7xl leading-[0.9] text-foreground">
            More Than<br /><span className="text-gradient-gold">Clothing.</span>
          </h2>
          <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
            FLEEK represents ambition, hustle, confidence, and success. Every piece is designed for those chasing greatness — built from premium fabrics, finished with gold detailing, and made to outlast the trend cycle.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6">
            <Stat n="250K+" l="Customers" />
            <Stat n="4.9★" l="Avg Rating" />
            <Stat n="48hr" l="Shipping" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="font-display text-3xl md:text-4xl text-gold">{n}</div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{l}</div>
    </div>
  );
}

function BestSellers({ items }: { items: Product[] }) {
  return (
    <section id="bestsellers" className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 text-gold mb-3">
          <Flame className="h-4 w-4" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em]">Top Selling</p>
          <Flame className="h-4 w-4" />
        </div>
        <h2 className="font-display text-6xl md:text-8xl text-foreground">Most Wanted</h2>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
        {items.map((p, i) => <ProductCard key={`${p.name}-${i}`} product={p} />)}
      </div>
    </section>
  );
}



function SocialProof() {
  const reviews = [
    { name: "Marcus T.", text: "Quality is insane. The hoodie feels like luxury — getting compliments every day.", stars: 5 },
    { name: "Aisha R.", text: "The fit is unmatched. FLEEK actually delivers on the premium promise.", stars: 5 },
    { name: "Damien K.", text: "Bought 3 pieces, will be buying 30 more. This brand is on another level.", stars: 5 },
  ];
  return (
    <section className="border-y border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <div className="text-center mb-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">The Movement</p>
          <h2 className="mt-2 font-display text-5xl md:text-7xl text-foreground">#WearFLEEK</h2>
        </div>

        <div className="grid grid-cols-3 gap-2 md:gap-4 mb-14">
          {[lifestyle1, lifestyle2, lifestyle3].map((src, i) => (
            <div key={i} className="relative aspect-square overflow-hidden group">
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-colors flex items-center justify-center">
                <span className="text-gold opacity-0 group-hover:opacity-100 transition-opacity text-xs uppercase tracking-widest font-semibold">@fleek.apparel</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div key={r.name} className="border border-border bg-background p-6">
              <div className="flex gap-0.5 text-gold mb-3">
                {Array.from({ length: r.stars }).map((_, i) => <span key={i}>★</span>)}
              </div>
              <p className="text-sm text-foreground leading-relaxed">"{r.text}"</p>
              <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">— {r.name} · Verified Buyer</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function EmailCapture() {
  return (
    <section className="relative overflow-hidden border-y border-border">
      <img src={lifestyle3} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-background/80" />
      <div className="relative mx-auto max-w-3xl px-4 py-20 md:px-8 md:py-28 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">Join The Movement</p>
        <h2 className="mt-3 font-display text-5xl md:text-7xl text-foreground">
          Get <span className="text-gradient-gold">15% Off</span><br />Your First Order
        </h2>
        <p className="mt-5 text-muted-foreground">Early access to drops. VIP-only deals. No spam — just heat.</p>

        <form className="mt-8 mx-auto max-w-md space-y-3" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Your email address"
            className="w-full bg-card border border-border px-5 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
          />
          <input
            type="tel"
            placeholder="Phone (for SMS drops)"
            className="w-full bg-card border border-border px-5 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
          />
          <button className="w-full bg-gold px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-gold-foreground hover:scale-[1.01] transition-transform">
            Unlock 15% Off
          </button>
        </form>
        <p className="mt-4 text-[10px] uppercase tracking-widest text-muted-foreground">By signing up you agree to receive marketing. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}

function TrustBadges() {
  const items = [
    { icon: Truck, t: "Free Shipping", s: "On orders over $150" },
    { icon: RotateCcw, t: "30-Day Returns", s: "No questions asked" },
    { icon: ShieldCheck, t: "Secure Checkout", s: "Encrypted payments" },
    { icon: Sparkles, t: "Premium Quality", s: "Crafted to last" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 md:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map(({ icon: Icon, t, s }) => (
          <div key={t} className="flex items-start gap-3">
            <Icon className="h-6 w-6 text-gold shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground">{t}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
