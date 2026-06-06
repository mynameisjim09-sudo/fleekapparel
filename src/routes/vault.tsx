import { createFileRoute, Link } from "@tanstack/react-router";
import { SectorNav } from "@/components/sector-nav";

export const Route = createFileRoute("/vault")({
  head: () => ({
    meta: [
      { title: "The Vault // FLEEK Apparel" },
      {
        name: "description",
        content:
          "Enter the Vault. Three sectors. Archive, Void, Deployment. Choose your entry point.",
      },
      { property: "og:title", content: "The Vault // FLEEK Apparel" },
      {
        property: "og:description",
        content:
          "Three sectors. Archive, Void, Deployment. Choose your entry point.",
      },
    ],
  }),
  component: VaultPage,
});

type Sector = {
  to: "/sector-01" | "/sector-02" | "/sector-03";
  code: string;
  name: string;
  tagline: string;
  description: string;
  status: string;
  accent: string;
};

const SECTORS: Sector[] = [
  {
    to: "/sector-01",
    code: "01",
    name: "ARCHIVE",
    tagline: "Fleek Symbols Collection",
    description:
      "Four symbols forged in gold. Focus, Strength, Balance, Guidance — the foundation of the registry.",
    status: "Open Access",
    accent: "text-gold",
  },
  {
    to: "/sector-02",
    code: "02",
    name: "VOID",
    tagline: "Forbidden Heart Series",
    description:
      "Five restricted assets. The void is full of things eyes weren't built to witness. Enter at your own risk.",
    status: "Restricted",
    accent: "text-destructive",
  },
  {
    to: "/sector-03",
    code: "03",
    name: "DEPLOYMENT",
    tagline: "ATL // FW26 Regional Archive",
    description:
      "Asset #11: The Guardian. High-priority drop zone. Synced to deployment countdown.",
    status: "Priority: High",
    accent: "text-gold",
  },
];

function VaultPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SectorNav />

      <main className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 border border-gold/40 bg-background/40 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.35em] text-gold">
            ◆ The Vault
          </div>
          <h1 className="mt-8 font-display text-5xl sm:text-6xl md:text-7xl leading-[0.95] tracking-tight">
            CHOOSE YOUR
            <span className="block text-gold mt-2">// SECTOR</span>
          </h1>
          <p className="mt-6 text-sm md:text-base uppercase tracking-[0.2em] text-muted-foreground">
            Three sectors. One registry. Select an entry point to proceed.
          </p>
        </div>

        {/* Sector cards */}
        <div className="mt-16 md:mt-24 grid gap-6 md:grid-cols-3 md:gap-8">
          {SECTORS.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="group relative block border border-border bg-card p-8 transition-all hover:border-gold hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 border-l border-b border-border bg-background px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground group-hover:border-gold group-hover:text-gold transition-colors">
                {s.status}
              </div>

              <div className={`font-display text-7xl md:text-8xl leading-none ${s.accent}`}>
                {s.code}
              </div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
                Sector
              </div>

              <h2 className="mt-8 font-display text-3xl md:text-4xl tracking-[0.15em] text-foreground group-hover:text-gold transition-colors">
                {s.name}
              </h2>
              <p className="mt-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                {s.tagline}
              </p>

              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                {s.description}
              </p>

              <div className="mt-10 flex items-center justify-between border-t border-border pt-4 text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
                <span>Enter Sector</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-20 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-muted-foreground hover:text-gold transition-colors"
          >
            ← Return to Registry
          </Link>
        </div>
      </main>
    </div>
  );
}
