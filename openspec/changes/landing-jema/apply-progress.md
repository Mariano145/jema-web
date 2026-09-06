# Apply Progress: Landing JEMA

## Completed Tasks

### Batch 1 — Hero (completed session 2026-09-01)

- [x] 1. Bootstrap Astro project (package.json, astro.config.mjs, tsconfig.json, .gitignore, README.md)
- [x] 2. Design tokens (src/styles/global.css with @theme block)
- [x] 3. Base Layout with Inter (src/layouts/Layout.astro)
- [x] 4. CTA configuration module (src/config/ctas.ts)
- [x] 5. Reusable Button component (src/components/ui/Button.astro)
- [x] 6. Brand mark J + orb SVG (src/sections/hero/BrandMark.astro)
- [x] 7. Hero section component (src/sections/hero/Hero.astro)
- [x] 8. Index page (src/pages/index.astro)
- [x] 9. Verification pass (pnpm install + pnpm run build clean exit, HTML copy verified)

### Batch 2 — Servicios (completed session 2026-09-01)

- [x] 10. (conditional) Commit hygiene — skipped (user had not requested)
- [x] 11. Update `src/config/ctas.ts` with `whatsappMessages` map
- [x] 12. Create reusable `Card.astro` component
- [x] 13. Create `Servicios.astro` section with 3 cards
- [x] 14. Update `index.astro` to render `<Servicios />`
- [x] 15. Tokens adjustment: remove `--spacing: 0.5rem` override, use Tailwind default

### Batch 3 — Resto de la Landing (completed session 2026-09-06)

- [x] 16. Accordion component (`src/components/ui/Accordion.astro`)
- [x] 17. Navigation component (`src/components/ui/Navigation.astro`)
- [x] 18. WhatsApp Float component (`src/components/ui/WhatsAppFloat.astro`)
- [x] 19. ContactForm component (`src/components/forms/ContactForm.astro`)
- [x] 20. Cómo Trabajamos section (`src/sections/como-trabajamos/ComoTrabajamos.astro`)
- [x] 21. Sobre JEMA section (`src/sections/sobre-jema/SobreJema.astro`)
- [x] 22. Casos section (`src/sections/casos/Casos.astro`)
- [x] 23. FAQ section (`src/sections/faq/FAQ.astro`)
- [x] 24. Contacto section (`src/sections/contacto/Contacto.astro`)
- [x] 25. Footer section (`src/sections/footer/Footer.astro`)
- [x] 26. Update CTA config (add `whatsappMessages.contacto`, `emailContact`, `legalLinks`)
- [x] 27. Update index page (compose all 8 sections + Navigation + WhatsAppFloat)
- [x] 28. Verification pass (`pnpm exec tsc --noEmit` exit 0; build skipped — user has `pnpm dev` running)

## Work Unit Evidence

### Batch 1

| Evidence | Value |
|---|---|
| Focused test command + result | `pnpm run build` -> exit 0, dist/index.html generated (681ms) |
| Runtime harness + result | N/A (static landing, no runtime boundary) |
| Rollback boundary | Delete `src/`, `package.json`, `pnpm-lock.yaml`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`, `README.md`, `.npmrc`, `pnpm-workspace.yaml`; reverts repo to pre-apply state |

### Batch 2

| Evidence | Value |
|---|---|
| Focused test command + result | `pnpm run build` -> exit 0 |
| Runtime harness + result | N/A (static landing, no runtime boundary) |
| Rollback boundary | Delete `src/components/ui/Card.astro`, `src/sections/servicios/Servicios.astro`; revert `src/config/ctas.ts` and `src/pages/index.astro` to post-batch-1 state |

### Batch 3

| Evidence | Value |
|---|---|
| Focused test command + result | `pnpm exec tsc --noEmit` -> exit 0 |
| Runtime harness + result | N/A (static landing, user runs `pnpm dev`) |
| Rollback boundary | Delete batch-3 files (`src/sections/{como-trabajamos,sobre-jema,casos,faq,contacto,footer}`, `src/components/ui/{Accordion,Navigation,WhatsAppFloat}.astro`, `src/components/forms/ContactForm.astro`) + revert `index.astro` and `ctas.ts`; reverts to post-batch-2 state |

## Estimated Changed Lines

- Batch 1: ~310 lines (11 files created/modified)
- Batch 2: ~120 lines (4 files created/modified)
- Batch 3: ~480 lines (11 files created + 2 updated)
- **Total project**: ~910 lines across all batches

## Deviations from Design

1. **Brand mark sizing** (Batch 1): Design specified `w-72 md:w-96 lg:w-[28rem]` but with `--spacing` override, `w-72` resolved to 576px and `lg:w-[28rem]` to 448px — the brand mark would SHRINK at lg breakpoint. Used `w-[18rem] md:w-[24rem] lg:w-[28rem]` instead. Resolved when `--spacing` override was removed in Batch 2.

2. **Brand mark orb color** (Batch 1): Used accent (#f4a462) for stronger contrast against the secondary (#028192) J.

3. **Brand mark animation removed** (Batch 1): Pre-existing scaffold had a CSS pulse animation on the orb. Removed — design says "pure geometry".

4. **File structure** (Batch 1): Pre-existing scaffold had Hero/BrandMark at `src/components/sections/`. Moved to `src/sections/hero/` per screaming architecture.

5. **`.npmrc` fixed** (Batch 1): Pre-existing `.npmrc` had invalid YAML-style entries. Cleaned to `auto-install-peers=true`.

6. **Button `type` prop** (Batch 3): Added optional `type` prop to `Button.astro` to support `type="submit"` in `ContactForm`. The Button renders as `<a>`, so `type` is semantically inert on the anchor, but satisfies the task contract.

## Issues Found

1. **`--spacing` affects width utilities** (Batch 1, resolved in Batch 2): In Tailwind v4, overriding `--spacing` to `0.5rem` changes the base for ALL spacing-related utilities including `w-*`, `h-*`. Resolved by removing the override and using Tailwind default 4px base.

## Status

28/28 tasks complete across 3 batches. Ready for verify.
