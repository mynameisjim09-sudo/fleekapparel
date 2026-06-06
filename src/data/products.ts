export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  /** Display price in USD — source of truth for charging is the Stripe priceId */
  price: number;
  /** Stripe Price ID (price_...). Set after creating the product in Stripe. */
  priceId: string;
  sector: "01" | "02" | "03";
}

export const products: Product[] = [
  // Fill in after creating products in Stripe.
  // Example:
  // {
  //   id: "guardian",
  //   name: "ASSET #11: THE GUARDIAN",
  //   description: "FW26 Deployment Drop",
  //   image: "/assets/guardian.jpg",
  //   price: 120,
  //   priceId: "price_xxx",
  //   sector: "03",
  // },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
