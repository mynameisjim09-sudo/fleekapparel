import { createFileRoute } from "@tanstack/react-router";
import { SectorNav } from "@/components/sector-nav";
import { BuyButton } from "@/components/buy-button";
import { products, type Product } from "@/data/products";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop // The Manifest — FLEEK Apparel" },
      {
        name: "description",
        content:
          "The full FLEEK manifest. 22 active assets across the Archive, Void, Deployment, and Legacy sectors.",
      },
      { property: "og:title", content: "Shop // The Manifest — FLEEK Apparel" },
      {
        property: "og:description",
        content:
          "22 active assets. Archive, Void, Deployment, Legacy. Decode the Registry.",
      },
    ],
  }),
  component: Shop,
});

const archiveVoid = products.filter((p) => p.sector === "archive-void");
const deploymentLegacy = products.filter((p) => p.sector === "deployment-legacy");

function ProductTile({ product, index }: { product: Product; index: number }) {
  const idx = String(index + 1).padStart(2, "0");
  return (
    <article className="group relative border border-[#222] bg-[#111] transition-all duration-500 hover:border-gold/40">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#0a0a0a]">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="text-center">
              <div className="font-display text-3xl text-gold/30">{idx}</div>
              <div className="mt-2 text-[9px] font-mono uppercase tracking-[0.35em] text-[#444]">
                Asset Pending
              </div>
            </div>
          </div>
        )}

        <div className="absolute right-3 top-3">
          <span className="text-[9px] font-mono uppercase tracking-wider text-[#666]">
            {idx} / {String(products.length).padStart(2, "0")}
          </span>
        </div>

        {!product.priceId && (
          <div className="absolute left-3 top-3">
            <div className="flex items-center gap-2 border border-gold/40 bg-black/80 px-2.5 py-1 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-gold">
                Staging
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="p-5">
        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#555]">
          {product.description}
        </p>
        <h3 className="mt-2 font-display text-base tracking-[0.1em] text-white">
          {product.name}
        </h3>

        <div className="mt-5 flex items-center justify-between">
          <span className="font-display text-lg text-gold">
            ${product.price.toFixed(2)}
          </span>
          <BuyButton
            priceId={product.priceId}
            className="border border-[#333] bg-transparent px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#888] transition-all hover:border-gold/60 hover:text-gold disabled:opacity-50"
          >
            {product.priceId ? "Acquire →" : "Locked"}
          </BuyButton>
        </div>
      </div>

      <div className="h-[1px] w-full bg-gold/20" />
    </article>
  );
}

function SectorBlock({
  label,
  title,
  items,
  offset,
}: {
  label: string;
  title: string;
  items: Product[];
  offset: number;
}) {
  return (
    <section className="px-6 pb-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-center justify-between border-b border-[#2a2a2a] pb-4">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
            <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-gold">
              {label}
            </p>
          </div>
          <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#444]">
            {items.length} Assets
          </p>
        </div>

        <h2 className="mb-10 font-display text-3xl sm:text-4xl tracking-[0.1em] text-white">
          {title}
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <ProductTile key={p.id} product={p} index={offset + i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Shop() {
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

        {/* Hero */}
        <section className="relative z-10 px-6 pt-20 pb-14 text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-[#666] font-mono">
            // The Manifest — {products.length} Active Assets
          </p>
          <h1 className="mt-6 font-display text-5xl sm:text-7xl md:text-8xl tracking-tight text-white leading-[0.9]">
            THE <span className="text-gold">MANIFEST</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-sm md:text-base uppercase tracking-[0.25em] text-[#888]">
            Every cleared asset. Catalogued, ranked, and ready for acquisition.
          </p>
        </section>

        <div className="relative z-10">
          <SectorBlock
            label="// Sector A — Archive & Void"
            title="Archive & Void Sectors"
            items={archiveVoid}
            offset={0}
          />
          <SectorBlock
            label="// Sector B — Deployment & Legacy"
            title="Deployment & Legacy Sectors"
            items={deploymentLegacy}
            offset={archiveVoid.length}
          />
        </div>

        <footer className="relative z-10 border-t border-[#222] px-6 py-10 text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#444] font-mono">
            End of manifest // {products.length} of {products.length} cleared
          </p>
        </footer>
      </main>
    </>
  );
}
