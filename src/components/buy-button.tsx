import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { createCheckoutSession } from "@/lib/checkout.functions";
import { toast } from "sonner";

interface BuyButtonProps {
  priceId: string;
  quantity?: number;
  className?: string;
  children?: React.ReactNode;
  variant?: React.ComponentProps<typeof Button>["variant"];
  size?: React.ComponentProps<typeof Button>["size"];
}

export function BuyButton({
  priceId,
  quantity = 1,
  className,
  children = "Buy Now",
  variant = "default",
  size = "default",
}: BuyButtonProps) {
  const [loading, setLoading] = useState(false);
  const checkout = useServerFn(createCheckoutSession);

  const handleClick = async () => {
    if (!priceId) {
      toast.error("This product is not yet available for purchase.");
      return;
    }
    setLoading(true);
    try {
      const { url } = await checkout({ data: { items: [{ priceId, quantity }] } });
      window.location.href = url;
    } catch (err) {
      console.error(err);
      toast.error("Checkout failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleClick} disabled={loading || !priceId} variant={variant} size={size} className={className}>
      {loading ? "Loading…" : children}
    </Button>
  );
}
