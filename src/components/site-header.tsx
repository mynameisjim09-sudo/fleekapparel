import { Link } from "@tanstack/react-router";
import { ShoppingBag, Search, Menu } from "lucide-react";

export function SiteHeader() {
  return (
    <>
      {/* Announcement bar */}
      <div className="bg-gold text-gold-foreground py-2 text-center text-[11px] font-semibold uppercase tracking-[0.2em]">
        Free Shipping Over $150 · Get FLEEK. Get Paid.
      </div>

      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <button className="md:hidden text-foreground" aria-label="Menu">
            <Menu className="h-5 w-5" />
          </button>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <Link to="/" className="hover:text-gold transition-colors">Shop</Link>
            <a href="#new" className="hover:text-gold transition-colors">New</a>
            <a href="#bestsellers" className="hover:text-gold transition-colors">Best Sellers</a>
            <a href="#story" className="hover:text-gold transition-colors">About</a>
          </nav>

          <Link to="/" className="font-display text-3xl tracking-[0.15em] text-foreground">
            FLEE<span className="text-gold">K</span>
          </Link>

          <div className="flex items-center gap-4 text-foreground">
            <button aria-label="Search" className="hover:text-gold transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button aria-label="Cart" className="relative hover:text-gold transition-colors">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center bg-gold text-[10px] font-bold text-gold-foreground rounded-full">
                2
              </span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
