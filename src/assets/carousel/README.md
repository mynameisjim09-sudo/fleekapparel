# Hero / Carousel / Wolf Instinct Assets

These `.asset.json` files are CDN pointers (Cloudflare R2 via Lovable Assets).
Each one resolves to a permanent URL of the form
`/__l5e/assets-v1/<asset_id>/<filename>`. The pointer JSON is the source of
truth — never hand-edit `asset_id` or `url`.

## File → role map

| Pointer file                  | Used as                                      | Component(s) in `src/routes/index.tsx` |
| ----------------------------- | -------------------------------------------- | -------------------------------------- |
| `architect-front.png.asset.json` | Hero frame 1 (FRONT) · Crossroads "Guardian" · FilmStrip stage 02 | `Hero`, `Crossroads`, `FilmStrip`      |
| `dragon-front.png.asset.json`    | Hero frame 2 (SIDE) · **Wolf Instinct full-screen mockup** · FilmStrip stage 03 | `Hero`, `WolfInstinct`, `FilmStrip`    |
| `skull-front.png.asset.json`     | Hero frame 3 (DETAIL) · FilmStrip stage 04   | `Hero`, `FilmStrip`                    |
| `architect-back.png.asset.json`  | Hero frame 4 (BACK) · Crossroads "Architect" · FilmStrip back-piece | `Hero`, `Crossroads`, `FilmStrip`      |

## When you migrate off Lovable

The CDN URLs in these pointer files are public and will keep working after
you leave Lovable, but if you want full ownership:

1. Download each binary from its `url` (open in browser → save).
2. Place the PNGs directly in `src/assets/carousel/` with the same base
   filename (e.g. `dragon-front.png`).
3. In `src/routes/index.tsx`, swap the imports:

   ```ts
   // before
   import dragonFrontAsset from "@/assets/carousel/dragon-front.png.asset.json";
   // ...
   <img src={dragonFrontAsset.url} />

   // after
   import dragonFrontUrl from "@/assets/carousel/dragon-front.png";
   // ...
   <img src={dragonFrontUrl} />
   ```

4. Delete the `.asset.json` pointer files once every reference is migrated.
