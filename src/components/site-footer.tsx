import { Instagram, Twitter, Youtube } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="font-display text-3xl tracking-[0.15em]">
              FLEE<span className="text-gold">K</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Luxury streetwear for those chasing greatness. Get FLEEK. Get Paid.
            </p>
            <div className="mt-6 flex gap-4 text-muted-foreground">
              <a href="#" aria-label="Instagram" className="hover:text-gold"><Instagram className="h-5 w-5" /></a>
              <a href="#" aria-label="Twitter" className="hover:text-gold"><Twitter className="h-5 w-5" /></a>
              <a href="#" aria-label="YouTube" className="hover:text-gold"><Youtube className="h-5 w-5" /></a>
            </div>
          </div>

          <FooterCol title="Shop" links={["New Arrivals", "Best Sellers", "Hoodies", "T-Shirts", "Hats", "Joggers"]} />
          <FooterCol title="Help" links={["Contact", "Shipping", "Returns", "Size Guide", "FAQ"]} />
          <FooterCol title="Company" links={["About FLEEK", "The Movement", "Press", "Privacy", "Terms"]} />
        </div>

        <div className="mt-14 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-border pt-6 text-xs uppercase tracking-widest text-muted-foreground">
          <span>© {new Date().getFullYear()} FLEEK Apparel. All rights reserved.</span>
          <span>Designed for greatness.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{title}</h4>
      <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
        {links.map((l) => (
          <li key={l}><a href="#" className="hover:text-foreground transition-colors">{l}</a></li>
        ))}
      </ul>
    </div>
  );
}
