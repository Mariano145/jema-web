# Delta Spec: Landing JEMA — Hero

## Purpose

This delta describes the changes introduced by the `landing-jema` change for the **Hero section only**. The other 7 sections of the landing (Servicios, Cómo trabajamos, Sobre JEMA, Casos, FAQ, Contacto, Footer) are deferred to subsequent changes once the Hero is shipped and validated.

This delta builds on the existing `landing` capability spec at `openspec/specs/landing/spec.md`. The base spec defines the contract (Hero above the fold, propuesta de valor, CTA primario Calendly, CTA secundario WhatsApp, español neutral). This delta adds the concrete copy, brand mark, layout, and tokens that realize that contract.

## ADDED Requirements

### Requirement: Hero Copy (Literal)

The Hero MUST render the exact copy approved by the product owner (session 2026-09-01), without paraphrasing, translation, or rearrangement.

#### Scenario: Eyebrow visible

- GIVEN the user lands on the page
- WHEN the Hero section renders
- THEN an eyebrow text is visible above the H1
- AND the eyebrow text is exactly `Automatización · Presencia Digital · Software a Medida`
- AND it is styled uppercase with wide letter-spacing, in `text-secondary`, font-medium, small size

#### Scenario: H1 visible

- GIVEN the Hero section renders
- THEN the main heading is visible
- AND the heading text is exactly `Sistemas que hacen el trabajo repetitivo por vos`
- AND it is styled bold, in `text-text`, with tight tracking and tight line-height
- AND it scales responsively from `text-4xl` (mobile) up to `text-6xl` (desktop)

#### Scenario: Subtitle visible

- GIVEN the Hero section renders
- THEN a subtitle paragraph is visible below the H1
- AND the subtitle text is exactly `Construimos landings, automatizaciones y software a medida para empresas que quieren escalar sin sumar equipo.`
- AND it is rendered in `text-text` at reduced opacity (≈75%), `text-lg`/`text-xl` responsive, max-width `max-w-xl`

#### Scenario: Primary CTA visible and clickeable

- GIVEN the Hero section renders
- THEN a primary CTA button is visible
- AND the button text is exactly `Agendar diagnóstico gratuito →` (with trailing arrow)
- AND it uses the `Button` component with `variant="primary"` (solid `bg-primary`, white text)
- AND its `href` resolves to `ctas.calendlyUrl`

#### Scenario: Secondary CTA visible and clickeable

- GIVEN the Hero section renders
- THEN a secondary CTA button is visible next to the primary CTA
- AND the button text is exactly `Hablar por WhatsApp`
- AND it uses the `Button` component with `variant="secondary"` (outline `border-secondary`)
- AND its `href` resolves to `buildWhatsAppLink()` from `src/config/ctas.ts`

#### Scenario: Location caption visible

- GIVEN the Hero section renders
- THEN a small caption is visible below the CTA group
- AND the caption text is exactly `Argentina · ES / EN`
- AND it is rendered in `text-text` at low opacity (≈50%), small size

---

### Requirement: Brand Mark (J + orb)

The Hero MUST render the JEMA brand mark as inline SVG via the `BrandMark` component, without external image files.

#### Scenario: Brand mark visible in desktop layout

- GIVEN the user views the Hero on a desktop viewport (≥ md breakpoint)
- THEN the brand mark is visible to the right of the copy column
- AND the copy column and brand mark column occupy roughly equal width (split 50/50)

#### Scenario: Brand mark stacked below copy in mobile

- GIVEN the user views the Hero on a mobile viewport (< md breakpoint)
- THEN the brand mark is visible below the copy column
- AND the layout stacks vertically (copy first, brand mark second)

#### Scenario: Brand mark composition

- GIVEN the brand mark renders
- THEN it shows a geometric sans-serif uppercase "J" with uniform thick strokes and squared foot
- AND it shows a circle ("orb") integrated with the foot of the J (either replacing the foot or aligned to it)
- AND the composition uses no gradients, no shadows, no filters, no external images
- AND it is accessible: the SVG has `role="img"` and a `<title>JEMA</title>` element

#### Scenario: Brand mark colors

- GIVEN the brand mark renders
- THEN the "J" stroke/fill uses the `text-secondary` token (#028192)
- AND the orb uses either `text-primary` (#00a897) or `text-accent` (#f4a462) — whichever produces stronger contrast

---

### Requirement: Hero Layout

The Hero MUST use a responsive split layout with generous padding and the page background color.

#### Scenario: Padding on all viewports

- GIVEN the Hero section renders at any viewport
- THEN it applies vertical padding of at least `py-16` (mobile) and up to `py-24` (desktop)
- AND it applies horizontal padding from the page container

#### Scenario: Desktop split

- GIVEN viewport ≥ md breakpoint (768px)
- THEN the Hero uses a two-column layout (flex or grid)
- AND the copy column sits on the left, brand mark column on the right
- AND both columns are vertically centered

#### Scenario: Mobile stack

- GIVEN viewport < md breakpoint
- THEN the Hero uses a single-column stack
- AND the copy renders first, brand mark renders below with `mt-12` and centered

#### Scenario: Background

- GIVEN the Hero section renders
- THEN the section background is `bg-background` (#f5efe5)
- AND no other background color is applied to the section

---

### Requirement: Design Tokens Applied

The Hero MUST consume design tokens defined in `src/styles/global.css` via Tailwind v4 `@theme`. The Hero MUST NOT hardcode any color, font size, or spacing value.

#### Scenario: Color tokens resolve

- GIVEN the Hero CSS is generated
- WHEN a class like `bg-primary` or `text-secondary` is applied
- THEN it resolves to the exact hex values defined in the design: primary #00a897, secondary #028192, text #112222, background #f5efe5, accent #f4a462, white #FFFFFF

#### Scenario: Typography tokens resolve

- GIVEN the Hero CSS is generated
- WHEN a class like `text-4xl` or `text-6xl` is applied
- THEN it resolves to the custom scale: 4xl = 40px, 6xl = 64px (not Tailwind defaults)

#### Scenario: Spacing tokens resolve

- GIVEN the Hero CSS is generated
- WHEN a class like `p-4` or `gap-6` is applied
- THEN it resolves on the 8px base (4 = 32px, 6 = 48px), not the Tailwind default 4px base

---

### Requirement: CTA Configuration via Config Module

The Hero MUST source its CTA URLs from `src/config/ctas.ts`, not from inline literals.

#### Scenario: Calendly URL sourced from config

- GIVEN the Hero renders
- THEN the primary CTA's `href` is `ctas.calendlyUrl`
- AND the current value is `#agendar` as a placeholder, with a `TODO` comment marking it for replacement with the real Calendly URL

#### Scenario: WhatsApp link sourced from config

- GIVEN the Hero renders
- THEN the secondary CTA's `href` is `buildWhatsAppLink()` from `src/config/ctas.ts`
- AND the helper uses `ctas.whatsappNumber` (placeholder `000000000` with `TODO`) and `ctas.whatsappDefaultMessage`
- AND the generated URL follows the `https://wa.me/<number>?text=<encoded message>` format

---

## MODIFIED Requirements

None. The base `Hero Section` requirement in `openspec/specs/landing/spec.md` remains unchanged. This delta adds concrete detail and constraints on top of it.

## REMOVED Requirements

None.

## Out of Scope (deferred to subsequent changes)

The following are explicitly NOT implemented in this change:

- Navigation menu sticky (will live in a change covering `Navigation.astro`).
- WhatsApp floating button (will live in a change covering `WhatsAppFloat.astro`).
- Remaining 7 sections: Servicios, Cómo trabajamos, Sobre JEMA, Casos, FAQ, Contacto, Footer.
- Contact form with validation.
- Analytics integration.
- Deployment / hosting configuration.
- Tests (the testing strategy in `design.md` applies to future changes; this change ships without tests).

## Reference

- Base spec: `openspec/specs/landing/spec.md` (Requirement: Hero Section).
- Design document: `openspec/changes/landing-jema/design.md` (screaming architecture pattern, tokens, copy, brand mark).
