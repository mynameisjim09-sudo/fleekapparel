import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl text-gold">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page Not Found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This drop doesn't exist. Head back to the collection.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-widest text-gold-foreground transition-opacity hover:opacity-90"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl text-foreground">Something Went Wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-widest text-gold-foreground"
          >
            Try Again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center border border-border bg-background px-6 py-3 text-sm font-semibold uppercase tracking-widest text-foreground hover:bg-secondary"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "FLEEK Apparel — Luxury Streetwear. Built Different." },
      { name: "description", content: "Premium luxury streetwear for those who refuse to blend in. Designer hoodies, tees, hats & joggers. Get FLEEK. Get Paid." },
      { name: "author", content: "FLEEK Apparel" },
      { property: "og:title", content: "FLEEK Apparel — Luxury Streetwear. Built Different." },
      { property: "og:description", content: "Premium luxury streetwear for those who refuse to blend in. Designer hoodies, tees, hats & joggers. Get FLEEK. Get Paid." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "FLEEK Apparel — Luxury Streetwear. Built Different." },
      { name: "twitter:description", content: "Premium luxury streetwear for those who refuse to blend in. Designer hoodies, tees, hats & joggers. Get FLEEK. Get Paid." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/7926cfa2-b58b-4e3b-8e0d-3e5aa8ea213d/id-preview-102a0515--f6cfc18d-d07a-4638-9fef-f3ff0ae0680b.lovable.app-1780354508281.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/7926cfa2-b58b-4e3b-8e0d-3e5aa8ea213d/id-preview-102a0515--f6cfc18d-d07a-4638-9fef-f3ff0ae0680b.lovable.app-1780354508281.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
