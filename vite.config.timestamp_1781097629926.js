// vite.config.ts
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
var target = process.env.NITRO_PRESET ?? (process.env.VERCEL ? "vercel" : void 0);
var vite_config_default = defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    server: { entry: "server" },
    ...target ? { target } : {}
  }
});
export {
  vite_config_default as default
};
