import { createServerFn } from "@tanstack/react-start";
import { getRequestHost } from "@tanstack/react-start/server";
import Stripe from "stripe";
import { z } from "zod";

const LineItemSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(500).optional(),
  // amount in cents (USD)
  amount: z.number().int().min(50).max(1_000_000),
  quantity: z.number().int().min(1).max(99).default(1),
  image: z.string().url().optional(),
});

const InputSchema = z.object({
  items: z.array(LineItemSchema).min(1).max(20),
  mode: z.enum(["payment", "subscription"]).default("payment"),
  successPath: z.string().startsWith("/").max(255).default("/?checkout=success"),
  cancelPath: z.string().startsWith("/").max(255).default("/?checkout=cancelled"),
});

export const createCheckoutSession = createServerFn({ method: "POST" })
  .inputValidator((data) => InputSchema.parse(data))
  .handler(async ({ data }) => {
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) throw new Error("STRIPE_SECRET_KEY is not configured");

    const stripe = new Stripe(secret);

    const host = getRequestHost();
    const proto = host.includes("localhost") ? "http" : "https";
    const origin = `${proto}://${host}`;

    const session = await stripe.checkout.sessions.create({
      mode: data.mode,
      line_items: data.items.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: "usd",
          unit_amount: item.amount,
          product_data: {
            name: item.name,
            ...(item.description ? { description: item.description } : {}),
            ...(item.image ? { images: [item.image] } : {}),
          },
        },
      })),
      success_url: `${origin}${data.successPath}`,
      cancel_url: `${origin}${data.cancelPath}`,
    });

    if (!session.url) throw new Error("Stripe did not return a checkout URL");
    return { url: session.url };
  });
