# Migrating off Lovable → Standalone TanStack Start on Vercel

This project is a **TanStack Start** app currently built with the Lovable
wrapper plugin `@lovable.dev/vite-tanstack-config`. The steps below convert
it into a vanilla TanStack Start + Vite app you can own and deploy directly
from GitHub to Vercel.

Do this work on a local clone, not inside the Lovable editor — once you swap
the wrapper, the Lovable preview will stop working.

---

## 0. Prerequisites

- Node 20+ and `bun` (or `npm`/`pnpm` — examples use `bun`).
- A Vercel account connected to your GitHub org.
- The repo cloned locally:
  ```bash
  git clone <your-repo-url>
  cd <repo>
  bun install
  ```

## 1. Download CDN-hosted images into the repo

All hero / carousel / wolf-instinct images currently live on Lovable's CDN
as `.asset.json` pointers. See `src/assets/carousel/README.md` for the full
file → role map. To bring them in-repo:

```bash
cd src/assets/carousel
for f in architect-front dragon-front skull-front architect-back; do
  url=$(jq -r .url "$f.png.asset.json")
  curl -L "https://lovable.app$url" -o "$f.png"
done
```

Then update the imports in `src/routes/index.tsx`:

```ts
// before
import dragonFrontAsset from "@/assets/carousel/dragon-front.png.asset.json";
<img src={dragonFrontAsset.url} />

// after
import dragonFrontUrl from "@/assets/carousel/dragon-front.png";
<img src={dragonFrontUrl} />
```

Repeat for `architect-front`, `skull-front`, `architect-back`. Delete the
four `.png.asset.json` files once nothing references them.

## 2. Replace the Lovable Vite wrapper

### 2a. Swap dependencies

```bash
bun remove @lovable.dev/vite-tanstack-config
bun add -d @tanstack/react-start vite @vitejs/plugin-react \
  @tailwindcss/vite vite-tsconfig-paths
```

Versions: pin `@tanstack/react-start` and `@tanstack/react-router` to the
same minor your `package.json` already uses.

### 2b. Rewrite `vite.config.ts`

```ts
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    tanstackStart({
      target: "vercel",          // <- Vercel deployment preset
      server: { entry: "src/server.ts" },
    }),
    react(),
  ],
});
```

### 2c. Remove Lovable-only files / hooks

These exist only for the in-Lovable runtime. Safe to delete once you're off
the platform:

- `src/integrations/lovable/*` (if present)
- Any `componentTagger` imports
- The `VITE_LOVABLE_*` env vars in `.env`

Keep everything under `src/integrations/supabase/` — that's standard
Supabase, not Lovable-specific.

## 3. Backend (Supabase) stays as-is

The Supabase project (`nzvtrhejrrcadddknllq`) is a normal Supabase project.
Copy these into Vercel → Project Settings → Environment Variables:

| Name                            | Where to find it                                |
| ------------------------------- | ----------------------------------------------- |
| `VITE_SUPABASE_URL`             | Supabase dashboard → Project Settings → API     |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | same                                            |
| `SUPABASE_URL`                  | same (server runtime)                           |
| `SUPABASE_PUBLISHABLE_KEY`      | same                                            |
| `SUPABASE_SERVICE_ROLE_KEY`     | same — **server only, never expose to client**  |

If you stop using Lovable Cloud entirely, export your data first:
Supabase → Database → Tables → Export CSV, and back up your migrations from
`supabase/migrations/`.

## 4. Verify locally

```bash
bun run dev      # http://localhost:3000
bun run build    # should exit 0
```

Click through `/`, refresh on a sub-route, and confirm the hero carousel,
Crossroads, VS block, and Wolf Instinct render.

## 5. Push & deploy on Vercel

```bash
git add -A
git commit -m "migrate off Lovable wrapper, deploy to Vercel"
git push origin main
```

In Vercel:

1. **Add New → Project → Import** your GitHub repo.
2. Framework preset: **Other** (TanStack Start handles its own output).
3. Build command: `bun run build` (or `npm run build`).
4. Output directory: leave blank — `@tanstack/react-start` with the
   `vercel` target writes to `.vercel/output` automatically.
5. Install command: `bun install` (or `npm install`).
6. Paste the env vars from step 3.
7. Deploy.

Subsequent `git push origin main` will auto-deploy.

## 6. Custom domain (optional)

Vercel → Project → Settings → Domains → Add. Point your DNS at Vercel's
nameservers or add the `A` / `CNAME` records Vercel shows you. SSL is
automatic.

---

## Rollback

If anything goes wrong, `git revert` the migration commit. The Lovable
wrapper, asset pointers, and preview will keep working as long as the
repo is still connected to the Lovable project.
