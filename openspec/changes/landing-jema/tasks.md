# Tasks: Landing JEMA — 8 Sections

## Scope

Implement the full 8-section landing of JEMA per the delta spec at `openspec/changes/landing-jema/specs/landing/spec.md`. The change executes in three batches; this task list consolidates them for traceability. Batches 1 and 2 are already complete. **Batch 3 (the remaining 6 sections + Navigation + WhatsApp Float) is the active work unit for this `sdd-apply` run.**

## Work Units

### Batch 1 — Hero (✅ completed session 2026-09-01)

- [x] 1. Bootstrap Astro project (package.json, astro.config.mjs, tsconfig.json, .gitignore, README.md, .npmrc, pnpm-workspace.yaml)
- [x] 2. Design tokens (`src/styles/global.css` with `@theme` block; original override of `--spacing` was removed later this session)
- [x] 3. Base Layout with Inter (`src/layouts/Layout.astro`)
- [x] 4. CTA configuration module (`src/config/ctas.ts` — initial shape)
- [x] 5. Reusable Button component (`src/components/ui/Button.astro`)
- [x] 6. Brand mark J + orb SVG (`src/sections/hero/BrandMark.astro`)
- [x] 7. Hero section component (`src/sections/hero/Hero.astro`)
- [x] 8. Index page (`src/pages/index.astro` — Hero only at the time)
- [x] 9. Verification pass (`pnpm run build` clean, HTML copy verified)
- [x] 10. (conditional) Commit hygiene — skipped (user had not requested)

### Batch 2 — Servicios (✅ completed session 2026-09-01)

- [x] 11. Update `src/config/ctas.ts` with `whatsappMessages` map
- [x] 12. Create reusable `Card.astro` component
- [x] 13. Create `Servicios.astro` section with 3 cards
- [x] 14. Update `index.astro` to render `<Servicios />`
- [x] 15. Tokens adjustment: remove `--spacing: 0.5rem` override, use Tailwind default

### Batch 3 — Resto de la Landing (active work unit for this `sdd-apply`)

#### 16. Accordion component (reusable for FAQ)

- [x] Create `src/components/ui/Accordion.astro`:
  - Props: `items: { question: string; answer: string }[]`, optional `allowMultiple?: boolean` (default `false`).
  - Vanilla JS client-side for expand/collapse (no framework dependency).
  - Each question rendered as `<button>` with `aria-expanded`, `aria-controls`, `id`.
  - Answer panel with matching `id`, `role="region"`, `aria-labelledby`.
  - Keyboard accessible (Enter/Space toggle).
  - Smooth height transition (CSS `grid-template-rows` 0fr → 1fr trick, or `max-height` with overflow).
  - Visual: question button full-width with chevron indicator that rotates on expand.

**Verification**: TypeScript compiles. Each item toggles independently unless `allowMultiple`. Keyboard navigation works.

**Depends on**: nothing (reusable UI component).

---

#### 17. Navigation component (sticky with anchors)

- [x] Create `src/components/ui/Navigation.astro`:
  - Props: `links: { label: string; href: string }[]`.
  - Renders `<nav>` sticky at top with `aria-label="Navegación principal"`.
  - Desktop (md+): horizontal list of links aligned right.
  - Mobile (<md): hamburger button that toggles a full-screen panel (`<dialog>` or controlled by JS).
  - Sticky behavior: starts transparent over Hero, becomes solid (`bg-white` with subtle shadow) after scroll-past-hero (use `IntersectionObserver` on a sentinel element).
  - Anchor links use `href="#servicios"` etc.; smooth scroll handled by global `html { scroll-behavior: smooth }`.
  - Active link highlighted when its section is in viewport.

**Verification**: TypeScript compiles. Menu is keyboard navigable. Mobile hamburger opens/closes. Sticky transition triggers after scroll-past-hero.

**Depends on**: nothing (reusable UI component).

---

#### 18. WhatsApp Float component

- [x] Create `src/components/ui/WhatsAppFloat.astro`:
  - Fixed positioning `bottom-6 right-6` (or `bottom-4 right-4` on mobile).
  - Circular button, `bg-primary` with white WhatsApp icon (use inline SVG of the WhatsApp glyph).
  - `href={buildWhatsAppLink()}` (default message).
  - `aria-label="Hablar por WhatsApp"`.
  - Hidden when in Contacto section (use IntersectionObserver to toggle a `hidden` class).
  - Hover: scale slightly + shadow.
  - `z-50` to stay above content.

**Verification**: TypeScript compiles. Button visible on all sections except Contacto. Click opens WhatsApp.

**Depends on**: nothing.

---

#### 19. ContactForm component (validation + POST)

- [x] Create `src/components/forms/ContactForm.astro`:
  - Form fields: `nombre` (text, required), `email` (email, required + regex), `mensaje` (textarea, required).
  - Each input has associated `<label>` (use `for`/`id`).
  - Client-side validation: required fields must be non-empty; email must match `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`.
  - Error messages shown inline below each field with `aria-describedby` linkage and `role="alert"`.
  - On submit: prevent default, validate, POST to `ctas.formEndpoint` via `fetch` with `Content-Type: application/json`.
  - On success: replace form with confirmation message (`Mensaje enviado. Te respondemos en menos de 24 horas.`).
  - On error: show inline error message without page reload.
  - Submit button: `<Button variant="primary" type="submit">` with text `Enviar mensaje`.

**Verification**: TypeScript compiles. Validation triggers on empty/invalid input. POST attempt made (mock endpoint OK). Success/error states render correctly.

**Depends on**: nothing.

---

#### 20. Cómo Trabajamos section

- [x] Create `src/sections/como-trabajamos/ComoTrabajamos.astro`:
  - Section `id="como-trabajamos"`, `bg-background`, `py-16 md:py-20 lg:py-24`.
  - Container `mx-auto max-w-7xl px-6 md:px-8`.
  - Header: eyebrow `Cómo trabajamos` + H2 `Tres pasos, sin tecnicismos` + subtitle.
  - Grid `grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12`.
  - For each step, render `<article>` with:
    - Number (`01`, `02`, `03`) styled large, `text-primary/30` (or `text-accent/40`), `text-6xl font-bold`.
    - Title (`text-2xl font-bold text-text`).
    - Description (`text-base leading-relaxed text-text/75`).
    - Step 1 only: CTA `<Button variant="primary" href={ctas.calendlyUrl}>Agendar diagnóstico gratuito →</Button>`.
  - Background alternates from Servicios (`bg-white`): use `bg-background`.

**Verification**: TypeScript compiles. Three steps render with exact copy. Only step 1 has CTA. Grid responsive (3 cols desktop, 1 col mobile).

**Depends on**: nothing.

---

#### 21. Sobre JEMA section

- [x] Create `src/sections/sobre-jema/SobreJema.astro`:
  - Section `id="sobre-jema"`, `bg-white`, `py-16 md:py-20 lg:py-24`.
  - Container `mx-auto max-w-3xl px-6 md:px-8`.
  - Single column with eyebrow + H2 + subtitle + body paragraph (use exact approved copy).
  - Body styled `text-lg leading-relaxed text-text/80` for editorial feel.
  - No CTAs.

**Verification**: Copy matches approved text character-by-character. Layout is centered with max-width.

**Depends on**: nothing.

---

#### 22. Casos section

- [x] Create `src/sections/casos/Casos.astro`:
  - Section `id="casos"`, `bg-background`, `py-16 md:py-20 lg:py-24`.
  - Container `mx-auto max-w-7xl px-6 md:px-8`.
  - Header: eyebrow `Trayectoria` + H2 `Construyendo credibilidad en tiempo real` + subtitle.
  - Grid `grid-cols-1 md:grid-cols-3 gap-8`.
  - **Block 1 — Tipos de proyecto**: title `Tipos de proyecto` + 5 badges (rounded chips with border, padding).
  - **Block 2 — Stack dominado**: title `Stack dominado` + 3 grouped badges by category.
  - **Block 3 — Credenciales**: title `Credenciales` + placeholder text `{/* TODO: agregar credenciales cuando estén disponibles */}`.

**Verification**: All approved badges render. No fabricated testimonials. TODO placeholder visible in credentials block.

**Depends on**: nothing.

---

#### 23. FAQ section

- [x] Create `src/sections/faq/FAQ.astro`:
  - Section `id="faq"`, `bg-white`, `py-16 md:py-20 lg:py-24`.
  - Container `mx-auto max-w-3xl px-6 md:px-8`.
  - Header: eyebrow + H2 + subtitle.
  - Render `<Accordion items={faqItems} />` where `faqItems` is the 5 approved question/answer pairs.

**Verification**: 5 questions render with exact copy. Each toggles independently. Keyboard accessible.

**Depends on**: task 16 (Accordion component).

---

#### 24. Contacto section

- [x] Create `src/sections/contacto/Contacto.astro`:
  - Section `id="contacto"`, `bg-background`, `py-16 md:py-20 lg:py-24`.
  - Container `mx-auto max-w-7xl px-6 md:px-8`.
  - Header: eyebrow + H2 + subtitle.
  - 3-column grid `grid-cols-1 md:grid-cols-3 gap-8`:
    - **Column 1 — Calendly**: title `Agenda una llamada`, `<iframe>` with `src={ctas.calendlyUrl}`, `width="100%"`, `height="600"`, `frameborder="0"`.
    - **Column 2 — WhatsApp**: title `Hablar por WhatsApp`, short description, `<Button variant="primary" href={buildWhatsAppLink(ctas.whatsappMessages.contacto)}>Hablar por WhatsApp →</Button>`.
    - **Column 3 — Form**: title `Envianos un mensaje`, `<ContactForm />`.

**Verification**: Calendly iframe loads. WhatsApp link has correct message. Form renders with validation. Section alternates background from FAQ.

**Depends on**: task 19 (ContactForm).

---

#### 25. Footer section

- [x] Create `src/sections/footer/Footer.astro`:
  - `<footer>` with `bg-text text-background`, `py-12 md:py-16`.
  - Container `mx-auto max-w-7xl px-6 md:px-8`.
  - 3-column grid `grid-cols-1 md:grid-cols-3 gap-8`:
    - **Left**: `<BrandMark class="w-12 h-12 text-background" />` + `<p>` with copy.
    - **Center**: title `Contacto`, mailto link `<a href="mailto:${ctas.emailContact}">{ctas.emailContact}</a>`, WhatsApp link.
    - **Right**: title `Legal`, links to `#privacidad` and `#terminos` (placeholder TODO).
  - Bottom bar with border-top: `<p>© {currentYear} JEMA. Todos los derechos reservados.</p>` where `currentYear = new Date().getFullYear()`.

**Verification**: Copy matches approved text. Year is dynamic (computes at build time). BrandMark visible in inverse color.

**Depends on**: tasks 6 (BrandMark), 18 (WhatsApp Float shares `buildWhatsAppLink`).

---

#### 26. Update CTA config (add new keys)

- [x] Update `src/config/ctas.ts`:
  - Add `whatsappMessages.contacto = 'Hola, quiero arrancar un proyecto con JEMA'`.
  - Add `emailContact: 'hola@jema.com.ar'` (with TODO).
  - Add `legalLinks: { privacidad: '#privacidad', terminos: '#terminos' }`.

**Verification**: TypeScript compiles. All keys present.

**Depends on**: nothing (parallel to other tasks).

---

#### 27. Update index page (compose all 8 sections)

- [x] Update `src/pages/index.astro`:
  - Import all 8 sections + Navigation + WhatsAppFloat.
  - Inside `<Layout>`:
    ```astro
    <Navigation />
    <main>
      <Hero />
      <Servicios />
      <ComoTrabajamos />
      <SobreJema />
      <Casos />
      <FAQ />
      <Contacto />
    </main>
    <Footer />
    <WhatsAppFloat />
    ```

**Verification**: Visiting `/` renders all sections in order. Anchors work. WhatsApp Float visible on scroll except Contacto.

**Depends on**: tasks 16-26.

---

#### 28. Verification pass (Batch 3)

- [x] Run `pnpm exec tsc --noEmit` and confirm exit 0.
- [x] Run `pnpm run build` and confirm clean exit (do NOT run if user has `pnpm dev` running). — Skipped per orchestrator: user has `pnpm dev` running.
- [x] Inspect generated `dist/index.html` for:
  - All 8 sections present in correct order. — Verified via source code review.
  - Literal copy strings character-by-character match approved text. — Verified via source code review.
  - All anchor IDs present (`#servicios`, `#como-trabajamos`, etc.). — Verified via source code review.
  - WhatsApp Float button present. — Verified via source code review.
- [x] Report any deviations or issues found. — See return envelope.

**Verification**: Build clean. HTML output has all sections + literal copy + anchors.

**Depends on**: task 27.

---

## Review Workload Forecast

- **Estimated changed lines for Batch 3**: ~480 lines across ~11 new files + 2 updated files. This EXCEEDS the 400-line review budget, but the user opted into a single `sdd-apply` batch for the remaining 6 sections, accepting the larger scope.
- **400-line budget risk**: **High** (480 estimated vs 400 budget).
- **Chained PRs recommended**: **Yes**, but the user explicitly chose single-batch for traceability in `openspec/`. We proceed with single PR.
- **Decision needed before apply**: **No** — already resolved by user (option 3 from earlier conversation: single batch, all in `openspec/`).

## Execution Order

Batches 1 + 2 are completed. Batch 3 tasks: 16 → 17 → 18 → 19 → 20 → 21 → 22 → 23 (needs 16) → 24 (needs 19) → 25 → 26 → 27 (needs 16-26) → 28.

Tasks 16, 17, 18, 19, 20, 21, 22, 26 are independent of each other (reusable components and standalone sections). Tasks 23, 24, 25, 27 have explicit dependencies.

`apply-progress` will be written at the end of this batch documenting the consolidated state of all 28 tasks across the 3 batches.
