import { useEffect, useState } from "react";
import { X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const STORAGE_KEY = "fleek-registry-popup-dismissed";

export function RegistryPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const t = setTimeout(() => setOpen(true), 5000);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setOpen(false);
    try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch {}
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(close, 1800);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-labelledby="registry-popup-title"
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-lg border border-gold/30 bg-card shadow-lux animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gold top accent */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold to-transparent" />

        <button
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 text-muted-foreground hover:text-gold transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="px-8 pt-10 pb-8 text-center">
          {submitted ? (
            <div className="py-6 space-y-3">
              <Sparkles className="h-10 w-10 text-gold mx-auto" />
              <h3 className="font-display text-3xl text-foreground tracking-wide">
                You're In.
              </h3>
              <p className="text-sm text-muted-foreground">
                Welcome to the Registry. Check your inbox.
              </p>
            </div>
          ) : (
            <>
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 border border-gold/40 rounded-full">
                <Sparkles className="h-3 w-3 text-gold" />
                <span className="text-[10px] tracking-[0.25em] uppercase text-gold font-medium">
                  Invitation Only
                </span>
              </div>

              <h2
                id="registry-popup-title"
                className="font-display text-4xl md:text-5xl text-foreground tracking-wide mb-3"
              >
                Join The <span className="text-gradient-gold">Registry</span>
              </h2>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs mx-auto">
                Early access to drops, members-only pieces, and 15% off your first order.
              </p>

              <form onSubmit={onSubmit} className="space-y-3">
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="h-12 bg-background/60 border-border focus-visible:border-gold focus-visible:ring-gold/30 text-center"
                />
                <Button
                  type="submit"
                  className="w-full h-12 bg-gold text-gold-foreground hover:bg-gold/90 font-medium tracking-[0.15em] uppercase text-xs shadow-gold"
                >
                  Claim My Access
                </Button>
              </form>

              <p className="mt-4 text-[10px] tracking-widest uppercase text-muted-foreground/70">
                No spam. Unsubscribe anytime.
              </p>
            </>
          )}
        </div>

        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      </div>
    </div>
  );
}
