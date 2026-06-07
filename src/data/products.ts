export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  /** Display price in USD — source of truth for charging is the Stripe priceId */
  price: number;
  /** Stripe Price ID (price_...). Set after creating the product in Stripe. */
  priceId: string;
  sector: "archive-void" | "deployment-legacy";
}

/**
 * FLEEK Apparel — Final Manifest (22 active assets)
 * Image URLs and Stripe Price IDs will be wired in a follow-up pass.
 */
export const products: Product[] = [
  // ── Archive & Void Sectors ─────────────────────────────────────────
  { id: "guardian",          name: "ASSET #11: THE GUARDIAN",   description: "Archive Sector",       image: "", price: 85, priceId: "", sector: "archive-void" },
  { id: "void-01",           name: "FORBIDDEN HEART // VOID 01", description: "Void Sector",         image: "", price: 55, priceId: "", sector: "archive-void" },
  { id: "void-02",           name: "FORBIDDEN HEART // VOID 02", description: "Void Sector",         image: "", price: 55, priceId: "", sector: "archive-void" },
  { id: "void-03",           name: "FORBIDDEN HEART // VOID 03", description: "Void Sector",         image: "", price: 55, priceId: "", sector: "archive-void" },
  { id: "bushido-skull",     name: "BUSHIDO SKULL",              description: "Archive Sector",      image: "", price: 65, priceId: "", sector: "archive-void" },
  { id: "apex-predator",     name: "APEX PREDATOR",              description: "Archive Sector",      image: "", price: 65, priceId: "", sector: "archive-void" },
  { id: "dragon-blade",      name: "DRAGON BLADE",               description: "Archive Sector",      image: "", price: 65, priceId: "", sector: "archive-void" },
  { id: "zenith-geometry",   name: "ZENITH GEOMETRY",            description: "Archive Sector",      image: "", price: 60, priceId: "", sector: "archive-void" },
  { id: "stellar-polaris",   name: "STELLAR POLARIS",            description: "Archive Sector",      image: "", price: 60, priceId: "", sector: "archive-void" },
  { id: "memento",           name: "THE MEMENTO",                description: "Archive Sector",      image: "", price: 55, priceId: "", sector: "archive-void" },
  { id: "navigator",         name: "THE NAVIGATOR",              description: "Archive Sector",      image: "", price: 55, priceId: "", sector: "archive-void" },
  { id: "sovereign-skull",   name: "SOVEREIGN SKULL",            description: "Archive Sector",      image: "", price: 65, priceId: "", sector: "archive-void" },

  // ── Deployment & Legacy Sectors ────────────────────────────────────
  { id: "oni-mask",          name: "THE ONI MASK",               description: "Deployment Sector",   image: "", price: 65, priceId: "", sector: "deployment-legacy" },
  { id: "silence-is-golden", name: "SILENCE IS GOLDEN",          description: "Deployment Sector",   image: "", price: 50, priceId: "", sector: "deployment-legacy" },
  { id: "chronos-dial",      name: "CHRONOS DIAL",               description: "Deployment Sector",   image: "", price: 85, priceId: "", sector: "deployment-legacy" },
  { id: "neo-tokyo-drift",   name: "NEO-TOKYO DRIFT",            description: "Deployment Sector",   image: "", price: 60, priceId: "", sector: "deployment-legacy" },
  { id: "street-samurai",    name: "STREET SAMURAI",             description: "Deployment Sector",   image: "", price: 55, priceId: "", sector: "deployment-legacy" },
  { id: "ghost-in-shell",    name: "GHOST IN THE SHELL",         description: "Deployment Sector",   image: "", price: 65, priceId: "", sector: "deployment-legacy" },
  { id: "ethereal-echo",     name: "ETHEREAL ECHO",              description: "Deployment Sector",   image: "", price: 55, priceId: "", sector: "deployment-legacy" },
  { id: "archive-logo-v1",   name: "ARCHIVE LOGO V1",            description: "Legacy Sector",       image: "", price: 45, priceId: "", sector: "deployment-legacy" },
  { id: "archive-logo-v2",   name: "ARCHIVE LOGO V2",            description: "Legacy Sector",       image: "", price: 45, priceId: "", sector: "deployment-legacy" },
  { id: "fleek-tactical",    name: "FLEEK TACTICAL",             description: "Legacy Sector",       image: "", price: 60, priceId: "", sector: "deployment-legacy" },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const getProductsBySector = (sector: Product["sector"]) =>
  products.filter((p) => p.sector === sector);
