# Apply Progress: Landing JEMA — Hero

## Completed Tasks

- [x] 1. Bootstrap Astro project (package.json, astro.config.mjs, tsconfig.json, .gitignore, README.md)
- [x] 2. Design tokens (src/styles/global.css with @theme block)
- [x] 3. Base Layout with Inter (src/layouts/Layout.astro)
- [x] 4. CTA configuration module (src/config/ctas.ts)
- [x] 5. Reusable Button component (src/components/ui/Button.astro)
- [x] 6. Brand mark J + orb SVG (src/sections/hero/BrandMark.astro)
- [x] 7. Hero section component (src/sections/hero/Hero.astro)
- [x] 8. Index page (src/pages/index.astro)
- [x] 9. Verification pass (pnpm install + pnpm run build clean exit, HTML copy verified)

## Work Unit Evidence

| Evidence | Value |
|---|---|
| Focused test command + result | `pnpm run build` -> exit 0, dist/index.html generated (681ms) |
| Runtime harness + result | N/A (static landing, no runtime boundary) |
| Rollback boundary | Delete `src/`, `package.json`, `pnpm-lock.yaml`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`, `README.md`, `.npmrc`, `pnpm-workspace.yaml`; reverts repo to pre-apply state |

## Estimated Changed Lines

~310 lines (11 files created/modified)

## Deviations from Design

1. **Brand mark sizing**: Design specified `w-72 md:w-96 lg:w-[28rem]` but with `--spacing: 0.5rem` (8px base), `w-72` resolves to 576px and `md:w-96` to 768px, while `lg:w-[28rem]` is 448px — the brand mark would SHRINK at lg breakpoint. Used `w-[18rem] md:w-[24rem] lg:w-[28rem]` instead to match the intended progressive sizing (288px / 384px / 448px). Root cause: `--spacing` in Tailwind v4 affects ALL spacing utilities including `w-*`, not just padding/margin/gap.

2. **Brand mark orb color**: Design said "pick the one with stronger contrast" between primary (#00a897) and accent (#f4a462). Used accent (#f4a462) for stronger contrast against the secondary (#028192) J.

3. **Brand mark animation removed**: Pre-existing scaffold had a CSS pulse animation on the orb. Removed it — design says "pure geometry" with no decoration, and spec says "no gradients, no shadows, no filters".

4. **File structure**: Pre-existing scaffold had Hero/BrandMark at `src/components/sections/`. Moved to `src/sections/hero/` per the screaming architecture in design.md.

5. **`.npmrc` fixed**: Pre-existing `.npmrc` had invalid YAML-style `allowBuilds:` entries (`.npmrc` uses key=value format). Cleaned to `auto-install-peers=true`.

## Issues Found

1. **`--spacing` affects width utilities**: In Tailwind v4, overriding `--spacing` to `0.5rem` changes the base for ALL spacing-related utilities including `w-*`, `h-*`, `gap-*`, `p-*`, `m-*`. The design's spacing scale (1=8px, 2=16px...) works correctly for padding/margin/gap but produces unexpectedly large values for width/height utilities. Future tasks using `w-*` or `h-*` with numeric Tailwind classes should be aware that `w-72` = 576px, not 288px. Consider using arbitrary rem values (`w-[18rem]`) when specific pixel sizes are needed.

## Status

9/9 tasks complete. Ready for verify.
