# Tasks: Landing JEMA — Hero

## Scope

Implement the Hero section of the JEMA landing per the delta spec at `openspec/changes/landing-jema/specs/landing/spec.md`. No other sections are in scope (deferred to subsequent changes).

This change ships a working Astro + Tailwind v4 project with the Hero rendered, ready to view via `pnpm run dev` and to deploy once hosting is configured.

## Work Units

### 1. Bootstrap Astro project

- [x] Create `package.json` with dependencies: `astro@^5`, `@tailwindcss/vite@^4`, `tailwindcss@^4`, `typescript@^5`, and dev scripts (`dev`, `build`, `preview`, `astro`).
- [x] Create `astro.config.mjs` that integrates `@tailwindcss/vite` as a Vite plugin and sets `site`, `trailingSlash`, and other minimal defaults.
- [x] Create `tsconfig.json` extending `astro/tsconfigs/strict`.
- [x] Create `.gitignore` with `node_modules/`, `dist/`, `.astro/`, `node_modules/`.
- [x] Create `README.md` with dev/build instructions (minimal: install, dev, build).

**Verification**: `pnpm install` completes without errors. `pnpm run build` runs (will fail until global.css exists — that's expected; subsequent tasks add the missing files).

**Depends on**: nothing (first task).

---

### 2. Design tokens (Tailwind v4 `@theme`)

- [x] Create `src/styles/global.css` with:
  - `@import "tailwindcss";`
  - `@theme { ... }` block defining color tokens (`--color-text`, `--color-background`, `--color-primary`, `--color-secondary`, `--color-accent`, `--color-white`), font family (`--font-sans`), font size scale (`--text-sm` through `--text-6xl`), spacing unit (`--spacing: 0.5rem;` for 8px base), border radius (`--radius-sm` through `--radius-2xl`).
  - Base body styles: `html { font-family: var(--font-sans); scroll-behavior: smooth; }` and `body { font-family: var(--font-sans); -webkit-font-smoothing: antialiased; }`.
- [x] Verify in a throwaway index page that classes `bg-primary`, `text-secondary`, `text-4xl`, `p-4` resolve to the expected values (will be deleted once Hero lands).

**Verification**: After wiring `global.css` into Layout (task 3), `pnpm run build` produces CSS containing the custom property values.

**Depends on**: task 1.

---

### 3. Base Layout with Inter

- [x] Create `src/layouts/Layout.astro` with:
  - `<html lang="es">`.
  - `<head>` with charset, viewport, `<title>JEMA — Sistemas que hacen el trabajo repetitivo por vos</title>`, meta description with the subtitle, Open Graph tags (title, description, type=website).
  - Google Fonts `<link>` for Inter (weights 400, 500, 600, 700) with `display=swap`.
  - `import '../styles/global.css';` at the top.
  - `<body class="bg-background text-text antialiased">` with `<slot />`.

**Verification**: Build succeeds. The generated HTML has `<html lang="es">`, the Inter preconnect/link tags, and the body classes.

**Depends on**: tasks 1, 2.

---

### 4. CTA configuration module

- [x] Create `src/config/ctas.ts` with:
  - `ctas` object: `calendlyUrl: '#agendar'` (TODO), `whatsappNumber: '000000000'` (TODO), `whatsappDefaultMessage: 'Hola, me interesa conocer más sobre JEMA'`, `formEndpoint: '#contact'` (TODO).
  - `buildWhatsAppLink(message?: string)` helper that returns `https://wa.me/${number}?text=${encodeURIComponent(message)}`.
  - `as const` to preserve literal types.

**Verification**: TypeScript compiles. Helper generates correct URL format.

**Depends on**: task 1.

---

### 5. Reusable Button component

- [x] Create `src/components/ui/Button.astro` with:
  - Props interface: `variant?: 'primary' | 'secondary' | 'ghost'` (default `'primary'`), `href: string` (required), `class?: string` (optional extra classes).
  - Renders an `<a>` with shared base styles (`inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background`).
  - Variant-specific classes:
    - `primary`: `bg-primary text-white hover:bg-secondary`.
    - `secondary`: `border border-secondary text-secondary hover:bg-secondary hover:text-white bg-transparent`.
    - `ghost`: `text-text hover:text-primary bg-transparent`.
  - Merges extra `class` with variant classes using a simple template.

**Verification**: Built HTML shows the correct classes per variant. Focus ring is visible on keyboard navigation.

**Depends on**: task 2 (tokens must exist for classes to resolve).

---

### 6. Brand mark (J + orb SVG)

- [x] Create `src/sections/hero/BrandMark.astro`:
  - Inline SVG (no external file) inside a container that accepts class for sizing.
  - ViewBox square (e.g. `0 0 200 200`).
  - Geometric sans-serif "J": thick uniform stroke or fill, squared foot, no serifs.
  - Orb (circle) integrated with the J's foot — orb replaces or aligns to the bottom of the J.
  - J uses `currentColor` (or explicit `fill-secondary`); orb uses `fill-primary` or `fill-accent`.
  - Accessibility: `role="img"`, `<title>JEMA</title>`, optional `<desc>`.
  - No gradients, shadows, or filters.

**Verification**: SVG renders in the Hero column. Visual composition reads as "J + orb". `<title>` is present in DOM.

**Depends on**: task 2.

---

### 7. Hero section component

- [x] Create `src/sections/hero/Hero.astro`:
  - Outer `<section>` with `bg-background`, `py-16 md:py-20 lg:py-24`, container padding.
  - Inner two-column layout (flex or grid): copy column (left), brand mark column (right). On mobile: stack with `flex-col`, brand mark gets `mt-12 mx-auto`.
  - Copy column contents, in order:
    1. **Eyebrow**: `<p>` with classes `text-sm font-medium uppercase tracking-widest text-secondary`. Text: `Automatización · Presencia Digital · Software a Medida`.
    2. **H1**: `<h1>` with classes `text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-text mt-6`. Text: `Sistemas que hacen el trabajo repetitivo por vos`.
    3. **Subtitle**: `<p>` with classes `text-lg md:text-xl leading-relaxed text-text/75 mt-6 max-w-xl`. Text: `Construimos landings, automatizaciones y software a medida para empresas que quieren escalar sin sumar equipo.`
    4. **CTA group**: `<div>` with classes `mt-10 flex flex-col sm:flex-row gap-3`:
       - Primary: `<Button variant="primary" href={ctas.calendlyUrl}>Agendar diagnóstico gratuito →</Button>`
       - Secondary: `<Button variant="secondary" href={buildWhatsAppLink()}>Hablar por WhatsApp</Button>`
    5. **Caption**: `<p>` with classes `mt-6 text-sm text-text/50`. Text: `Argentina · ES / EN`.
  - Brand mark column: `<div>` with classes `flex justify-center items-center` containing `<BrandMark class="w-72 md:w-96 lg:w-[28rem] h-auto" />`.

**Verification**: HTML generated by `pnpm run build` contains the literal copy strings exactly. Each element has the expected classes. Layout stacks on mobile, splits on desktop.

**Depends on**: tasks 3, 4, 5, 6.

---

### 8. Index page

- [x] Create `src/pages/index.astro`:
  - Imports `Layout` and `Hero`.
  - `<Layout><main><Hero /></main></Layout>`.
  - Comments for future sections: `{/* TODO: <Servicios /> */}` etc. so the structure is visible without bloat.

**Verification**: Visiting `/` in `pnpm run dev` renders the Hero above the fold. Page source contains the literal copy strings.

**Depends on**: task 7.

---

### 9. Verification pass

- [x] Run `pnpm install` (idempotent if already done).
- [x] Run `pnpm run build` and confirm clean exit.
- [x] Run `pnpm run dev`, open the browser at the printed URL, verify:
  - Hero is visible without scroll on a 1440×900 viewport.
  - H1 reads exactly `Sistemas que hacen el trabajo repetitivo por vos`.
  - Both CTAs are clickeable; primary href is `#agendar`, secondary href is `https://wa.me/000000000?text=...`.
  - Brand mark is visible to the right (or below on a narrow viewport).
  - Resize to a 375×667 viewport: layout stacks, brand mark below copy.
- [x] Stop the dev server.
- [x] Inspect the build output HTML to confirm copy is literal (no encoding issues, no extra whitespace in CTAs).

**Verification**: All checks pass. Build artifact (`dist/index.html`) contains the Hero markup.

**Depends on**: task 8.

---

### 10. Commit hygiene (optional, only if user requests)

- [ ] If the user asks to commit, stage only the new files (not `node_modules/`).
- [ ] Use a conventional commit message such as `feat(landing): implement Hero section per landing-jema delta spec`.

**Verification**: Working tree is clean after commit (excluding untracked `node_modules/`).

**Depends on**: task 9. **Blocked on**: explicit user request.

---

## Review Workload Forecast

- **Estimated changed lines**: ~295 lines (sum of new files: package.json ~20, astro.config.mjs ~10, tsconfig.json ~5, global.css ~50, Layout.astro ~30, Button.astro ~30, ctas.ts ~15, BrandMark.astro ~30, Hero.astro ~70, index.astro ~15, README.md ~20).
- **400-line budget risk**: **Low**. Estimated 295 lines is well under the 400-line review budget.
- **Chained PRs recommended**: **No**. The change fits comfortably in a single PR.
- **Decision needed before apply**: **No**. `sdd-apply` can proceed without further consultation.

## Execution Order

Tasks are sequential: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9. Task 10 is conditional.

`apply-progress` should be written at the end of each task so a continuation batch can resume cleanly. The merge step at task 9 is the natural completion boundary for this change.
