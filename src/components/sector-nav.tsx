import { Link } from "@tanstack/react-router";

const SECTORS = [
  { to: "/sector-01", label: "01 // ARCHIVE" },
  { to: "/sector-02", label: "02 // VOID" },
  { to: "/sector-03", label: "03 // DEPLOYMENT" },
] as const;

export function SectorNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-gold/20 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8 md:py-4">
        <Link
          to="/vault"
          className="font-display text-lg md:text-xl tracking-[0.25em] text-foreground hover:text-gold transition-colors"
        >
          FLEE<span className="text-gold">K</span>
          <span className="ml-2 text-[10px] tracking-[0.3em] text-muted-foreground hidden sm:inline">
            // VAULT
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          {SECTORS.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="hover:text-gold transition-colors"
              activeProps={{ className: "text-gold" }}
            >
              {s.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/"
          className="border border-gold/50 px-3 py-1.5 md:px-4 md:py-2 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.25em] text-gold hover:bg-gold hover:text-gold-foreground transition-colors"
        >
          ← Registry
        </Link>
      </div>

      {/* Mobile sector links */}
      <nav className="md:hidden flex items-center justify-center gap-4 px-4 pb-3 text-[9px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
        {SECTORS.map((s) => (
          <Link
            key={s.to}
            to={s.to}
            className="hover:text-gold transition-colors"
            activeProps={{ className: "text-gold" }}
          >
            {s.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
