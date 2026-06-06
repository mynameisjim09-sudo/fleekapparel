import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { createCheckoutSession } from "@/lib/checkout.functions";
import { toast } from "sonner";

interface BuyButtonProps {
  name: string;
  description?: string;
  /** Price in USD (e.g. 49.99) */
  price: number;
  image?: string;
  quantity?: number;
  className?: string;
  children?: React.ReactNode;
  variant?: React.ComponentProps<typeof Button>["variant"];
  size?: React.ComponentProps<typeof Button>["size"];
}

export function BuyButton({
  name,
  description,
  price,
  image,
  quantity = 1,
  className,
  children,
  variant = "default",
  size = "default",
}: BuyButtonProps) {
  const [loading, setLoading] = useState(false);
  const checkout = useServerFn(createCheckoutSession);

  const handleClick = async () => {
    setLoading(true);
    try {
      const { url } = await checkout({
        data: {
          items: [
            {
              name,
              description,
              image,
              quantity,
              amount: Math.round(price * 100),
            },
          ],
        },
      });
      window.location.href = url;
    } catch (err) {
      console.error(err);
      toast.error("Checkout failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={loading}
      variant={variant}
      size={size}
      className={className}
    >
      {loading ? "Loading…" : children ?? `Buy — $${price.toFixed(2)}`}
    </Button>
  );
}
