import { createServerFn } from "@tanstack/react-start";

export interface StoreProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
}

interface PrintifyVariant {
  id: number;
  price: number;
  is_enabled: boolean;
  is_default: boolean;
  is_available: boolean;
}

interface PrintifyImage {
  src: string;
  is_default?: boolean;
  variant_ids?: number[];
}

interface PrintifyProduct {
  id: string;
  title: string;
  tags?: string[];
  variants: PrintifyVariant[];
  images: PrintifyImage[];
}

const SHOP_ID = "20533948";

export const getPrintifyProducts = createServerFn({ method: "GET" }).handler(
  async (): Promise<StoreProduct[]> => {
    const apiKey = process.env.PRINTIFY_API_KEY;
    if (!apiKey) {
      console.error("PRINTIFY_API_KEY not set");
      return [];
    }
    try {
      const res = await fetch(
        `https://api.printify.com/v1/shops/${SHOP_ID}/products.json?limit=50`,
        { headers: { Authorization: `Bearer ${apiKey}` } }
      );
      if (!res.ok) {
        console.error("Printify error:", res.status, await res.text());
        return [];
      }
      const json = (await res.json()) as { data: PrintifyProduct[] };
      return json.data.map((p) => {
        const enabled = p.variants.filter((v) => v.is_enabled && v.is_available);
        const def = enabled.find((v) => v.is_default) ?? enabled[0] ?? p.variants[0];
        const defImg =
          p.images.find((i) => i.is_default) ?? p.images[0];
        const tag = p.tags?.find((t) =>
          /hoodie|t-shirt|tee|hat|cap|joggers|sweat|jacket|pants|shorts/i.test(t)
        );
        return {
          id: p.id,
          name: p.title,
          category: tag ?? p.tags?.[0] ?? "Apparel",
          price: def ? Math.round(def.price / 100) : 0,
          rating: 4.9,
          reviews: 0,
          image: defImg?.src ?? "",
        };
      });
    } catch (e) {
      console.error("Printify fetch failed:", e);
      return [];
    }
  }
);
