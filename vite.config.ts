// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
//
// We override the nitro preset to "vercel" so `vite build` emits a `.vercel/output/`
// directory that Vercel deploys directly with zero config. In the Lovable sandbox
// the dev server ignores this preset (it only applies at build time).
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const target =
  (process.env.NITRO_PRESET as "vercel" | "cloudflare-module" | undefined) ??
  (process.env.VERCEL ? "vercel" : undefined);

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    server: { entry: "server" },
    ...(target ? { target } : {}),
  },
});
