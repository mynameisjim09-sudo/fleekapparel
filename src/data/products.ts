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
/**
 * Anchor price tier (USD) for Special Edition / Archive hoodies.
 * Any new hoodie in those categories defaults to this price.
 */
export const HOODIE_ANCHOR_PRICE = 120;

export const isAnchorTier = (p: Pick<Product, "description" | "sector">) =>
  p.sector === "archive-void" || /special edition/i.test(p.description);

export const products: Product[] = [
  // ── Archive & Void Sectors ─────────────────────────────────────────
  { id: "eternal-ronin",     name: "ASSET #01: THE ETERNAL RONIN", description: "Archive Sector — Special Edition", image: "https://images.printify.com/mockup/6a24d3ccac2a0369d80cfad3/111248/105309/the-eternal-ronin-special-edition-archive.jpg?camera_label=front", price: HOODIE_ANCHOR_PRICE, priceId: "price_1TfWS1GzB8859BjAhYOjCTLD", sector: "archive-void" },
  { id: "guardian",          name: "ASSET #11: THE GUARDIAN",   description: "Archive Sector — Special Edition", image: "https://images.printify.com/mockup/6a21a640bc4dad924d0a3651/111248/105309/asset-11-the-guardian-special-edition.jpg?camera_label=front", price: HOODIE_ANCHOR_PRICE, priceId: "price_1TfUeeGzB8859BjADPpsOQqE", sector: "archive-void" },
  { id: "void-01",           name: "FORBIDDEN HEART // VOID 01", description: "Void Sector",         image: "https://images.printify.com/mockup/6a1c2a664525ffd57310b268/247319/127573/forbidden-heart-void-01.jpg?camera_label=front", price: 65, priceId: "price_1TfUlbGzB8859BjAqVGDbZpv", sector: "archive-void" },
  { id: "void-02",           name: "FORBIDDEN HEART // VOID 02", description: "Void Sector",         image: "https://images.printify.com/mockup/6a1c27da8e5b9b44da09a1fb/247319/127573/forbidden-heart-void-02.jpg?camera_label=front", price: 65, priceId: "price_1TfUpoGzB8859BjAh7Q2nRBz", sector: "archive-void" },
  { id: "void-03",           name: "FORBIDDEN HEART // VOID 03", description: "Void Sector",         image: "https://images.printify.com/mockup/6a1c2b9fa2f3e94ff40d97bc/247319/127573/forbidden-heart-void-03.jpg?camera_label=front", price: 65, priceId: "price_1TfUqAGzB8859BjAUOYfGUVp", sector: "archive-void" },
  { id: "void-04",           name: "FORBIDDEN HEART // VOID 04", description: "Void Sector",         image: "https://images.printify.com/mockup/6a1c2cc7c2a0d16e2e09a911/247319/127573/forbidden-heart-void-04.jpg?camera_label=front", price: 65, priceId: "price_1TfUqUGzB8859BjAxlOBd5bA", sector: "archive-void" },
  { id: "void-05",           name: "FORBIDDEN HEART // VOID 05", description: "Void Sector",         image: "https://images.printify.com/mockup/6a1c265b142143aa770ac3f8/247319/127573/forbidden-heart-void-05.jpg?camera_label=front", price: 65, priceId: "price_1TfUqoGzB8859BjAU4vKMv45", sector: "archive-void" },
  { id: "bushido-skull",     name: "BUSHIDO SKULL",              description: "Archive Sector",      image: "https://images.printify.com/mockup/6a23e86f38707c982f0f560a/117441/127480/bushido-skull-heavyweight-archive.jpg?camera_label=front", price: 65, priceId: "price_1TfV1lGzB8859BjATrtG2Az0", sector: "archive-void" },
  { id: "apex-predator",     name: "APEX PREDATOR",              description: "Archive Sector",      image: "https://images.printify.com/mockup/6a240c8bebab40861f08a542/117441/127480/apex-predator-golden-panther.jpg?camera_label=front", price: 65, priceId: "price_1TfV2UGzB8859BjAz504bgBX", sector: "archive-void" },
  { id: "dragon-blade",      name: "DRAGON BLADE",               description: "Archive Sector",      image: "https://images.printify.com/mockup/6a2412ff50a21acce208b01b/117441/127480/dragon-blade-flaming-archive.jpg?camera_label=front", price: 65, priceId: "price_1TfV59GzB8859BjAiMpdVA9e", sector: "archive-void" },
  { id: "sovereign-skull",   name: "SOVEREIGN SKULL",            description: "Archive Sector",      image: "https://images.printify.com/mockup/6a20e7f6de5d2b9583025dc5/117441/127480/sovereign-skull-crowned-in-silence.jpg?camera_label=front", price: 65, priceId: "price_1TfV5ZGzB8859BjAHCuBZwy7", sector: "archive-void" },
  { id: "zenith-geometry",   name: "ZENITH GEOMETRY",            description: "Archive Sector",      image: "", price: 60, priceId: "", sector: "archive-void" },
  { id: "stellar-polaris",   name: "STELLAR POLARIS",            description: "Archive Sector",      image: "", price: 60, priceId: "", sector: "archive-void" },
  { id: "memento",           name: "THE MEMENTO",                description: "Archive Sector",      image: "", price: 55, priceId: "", sector: "archive-void" },
  { id: "navigator",         name: "THE NAVIGATOR",              description: "Archive Sector",      image: "", price: 55, priceId: "", sector: "archive-void" },

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
