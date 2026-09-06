# Delta Spec: Landing JEMA — 8 Secciones

## Purpose

This delta describes the changes introduced by the `landing-jema` change for **the full landing** (8 sections: Hero, Servicios, Cómo trabajamos, Sobre JEMA, Casos, FAQ, Contacto, Footer). The change is being executed in two batches:

- **Batch 1 (Hero)**: completed in session 2026-09-01.
- **Batch 2 (Servicios)**: completed in session 2026-09-01.
- **Batch 3 (remaining 6 sections + Navigation + WhatsApp Float)**: this sdd-apply run.

This delta builds on the existing `landing` capability spec at `openspec/specs/landing/spec.md`, which defines the contracts (each section's role, CTAs, copy rules). This delta adds the concrete copy, layout, brand mark, and component contracts that realize each section.

## ADDED Requirements — Batch 1 (Hero, already implemented)

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
- AND it uses the `Button` component with `variant="primary"`
- AND its `href` resolves to `ctas.calendlyUrl`

#### Scenario: Secondary CTA visible and clickeable
- GIVEN the Hero section renders
- THEN a secondary CTA button is visible next to the primary CTA
- AND the button text is exactly `Hablar por WhatsApp`
- AND it uses the `Button` component with `variant="secondary"`
- AND its `href` resolves to `buildWhatsAppLink()` from `src/config/ctas.ts`

#### Scenario: Location caption visible
- GIVEN the Hero section renders
- THEN a small caption is visible below the CTA group
- AND the caption text is exactly `Argentina · ES / EN`

### Requirement: Brand Mark (J + orb)

The Hero MUST render the JEMA brand mark as inline SVG via the `BrandMark` component, without external image files.

#### Scenario: Brand mark composition
- GIVEN the brand mark renders
- THEN it shows a geometric sans-serif uppercase "J" with uniform thick strokes and squared foot
- AND it shows a circle ("orb") integrated with the foot of the J
- AND the composition uses no gradients, no shadows, no filters, no external images
- AND it is accessible: the SVG has `role="img"` and `<title>JEMA</title>`

#### Scenario: Brand mark colors
- GIVEN the brand mark renders
- THEN the "J" fill uses `text-secondary` (#028192)
- AND the orb uses `text-accent` (#f4a462) for strongest contrast

### Requirement: Hero Layout
- The Hero MUST use a responsive split layout (split 50/50 on `md+`, stack vertical on mobile) with `bg-background` and `py-16 md:py-20 lg:py-24`.

---

## ADDED Requirements — Batch 2 (Servicios, already implemented)

### Requirement: Servicios Section

The Servicios section MUST render exactly 3 cards (Presencia Digital, Automatización, Software a Medida), each with title, description (1-2 lines), contextual CTA, and optional WhatsApp secondary link.

#### Scenario: Tres verticales visibles
- GIVEN the user scrolls to Servicios
- WHEN the section renders
- THEN it shows 3 cards with titles `Presencia Digital`, `Automatización`, `Software a Medida`
- AND each card has a description and a primary CTA
- AND each card has a secondary WhatsApp link with section-specific message

#### Scenario: Contextual CTAs
- GIVEN the user views a card
- WHEN clicking the CTA
- THEN `Presencia Digital` CTA `Solicitar cotización` goes to `ctas.calendlyUrl`
- AND `Automatización` CTA `Agendar diagnóstico gratuito` goes to `ctas.calendlyUrl`
- AND `Software a Medida` CTA `Hablar con un arquitecto` goes to `buildWhatsAppLink(ctas.whatsappMessages.softwareMedida)`

### Requirement: Servicios Layout
- The Servicios section MUST use a grid (`grid-cols-1 md:grid-cols-3`) with `gap-6 lg:gap-8`, `bg-white`, and `py-16 md:py-20 lg:py-24`.

---

## ADDED Requirements — Batch 3 (este sdd-apply)

### Requirement: Cómo Trabajamos Section

The Cómo trabajamos section MUST render exactly 3 numbered steps (Diagnóstico gratuito, Plan a medida, Implementación y mejora continua), each with title and outcome-focused description. Only step 1 has a CTA.

#### Scenario: Tres pasos visibles
- GIVEN the user scrolls to Cómo trabajamos
- WHEN the section renders
- THEN it shows 3 numbered steps
- AND step 1 title is exactly `Diagnóstico gratuito`, description: `Una llamada de 30 minutos donde entendemos qué necesitás, qué ya tenés y qué te falta. Sin compromiso y sin jerga de ventas.`
- AND step 2 title is exactly `Plan a medida`, description: `Te llevamos una propuesta con alcance, tiempos y precio. La revisamos juntos y la ajustamos hasta que cierre.`
- AND step 3 title is exactly `Implementación y mejora continua`, description: `Construimos, desplegamos y nos quedamos operando. Las mejoras continuas vienen incluidas, no son un extra.`

#### Scenario: Solo paso 1 tiene CTA
- GIVEN the user views Cómo trabajamos
- WHEN looking for CTAs
- THEN only step 1 has a CTA button
- AND the button text is exactly `Agendar diagnóstico gratuito →`
- AND it links to `ctas.calendlyUrl`

### Requirement: Cómo Trabajamos Layout
- The section MUST use a 3-column grid on `md+` and stack vertical on mobile, with `bg-background`, `py-16 md:py-20 lg:py-24`, and large step numbers above each title.

---

### Requirement: Sobre JEMA Section

The Sobre JEMA section MUST render the company's purpose and differential in an editorial layout, without CTAs.

#### Scenario: Copy literal
- GIVEN the user scrolls to Sobre JEMA
- WHEN the section renders
- THEN the eyebrow is exactly `Sobre JEMA`
- AND the H2 is exactly `Por qué existimos`
- AND the subtitle is exactly `No somos una agencia que entrega y desaparece. Somos un partner tecnológico que se queda.`
- AND the body paragraph matches exactly: `JEMA existe para que empresas que quieren escalar no tengan que sumar equipo para hacerlo. Automatizamos lo repetitivo, construimos lo que no existe y operamos lo que desplegamos. La diferencia es que después del deploy no nos vamos: nos quedamos operando y mejorando tus sistemas en el tiempo.`

### Requirement: Sobre JEMA Layout
- The section MUST be single column with content centered at `max-w-3xl`, `bg-white`, `py-16 md:py-20 lg:py-24`.

---

### Requirement: Casos Section (Slots Vacíos)

The Casos section MUST render honest substitutes (project types, stack) without fabricated testimonials.

#### Scenario: Tres bloques visibles
- GIVEN the user scrolls to Casos
- WHEN the section renders
- THEN it shows the eyebrow `Trayectoria`, H2 `Construyendo credibilidad en tiempo real`, and subtitle about no public cases yet
- AND it shows three blocks: project types, stack mastered, founder credentials (placeholder TODO)

#### Scenario: Project types list
- GIVEN the project types block renders
- THEN it shows badges: `Landing pages de alta conversión`, `CRM + agentes IA 24/7`, `Plataformas SaaS internas`, `Automatización de presupuestos y cobranzas`, `Integraciones con sistemas legacy`

#### Scenario: Stack list
- GIVEN the stack block renders
- THEN it shows badges grouped by category:
  - Web/backend: `Astro · Next.js · Node · TypeScript · Python`
  - Integrations/AI: `WhatsApp Business API · OpenAI · Claude · HubSpot · Pipedrive`
  - Data/infra: `PostgreSQL · Supabase · AWS · Vercel`

#### Scenario: No fabricated testimonials
- GIVEN the section renders
- THEN no fake client logos, no invented testimonials, no attributed quotes appear

### Requirement: Casos Layout
- The section MUST be 3-column grid on `md+`, stack vertical on mobile, `bg-background`, `py-16 md:py-20 lg:py-24`. Badges styled as rounded chips with subtle border.

---

### Requirement: FAQ Section

The FAQ section MUST render 5 expandable questions via the `Accordion` component.

#### Scenario: Five questions visible
- GIVEN the user scrolls to FAQ
- WHEN the section renders
- THEN it shows 5 questions exactly:
  1. `¿Cuánto cuesta un proyecto?`
  2. `¿Cuánto tarda?`
  3. `¿Qué incluye el servicio?`
  4. `¿Qué pasa después del deploy?`
  5. `¿Trabajan con empresas fuera de Argentina?`
- AND each has an expandable answer with the approved copy

#### Scenario: Accordion behavior
- GIVEN the user clicks a question
- WHEN the click registers
- THEN only that question expands (others collapse) unless `allowMultiple` is set
- AND `aria-expanded` updates correctly
- AND keyboard navigation (Enter/Space) works on each question button

### Requirement: FAQ Layout
- The section MUST be single column at `max-w-3xl`, `bg-white`, `py-16 md:py-20 lg:py-24`.

---

### Requirement: Contacto Section

The Contacto section MUST offer 3 conversion paths: Calendly inline, WhatsApp button, and alternative form.

#### Scenario: Tres opciones visibles
- GIVEN the user scrolls to Contacto
- WHEN the section renders
- THEN it shows the eyebrow `Contacto`, H2 `Listos para arrancar`, subtitle `Tres formas de empezar. Elegí la que prefieras.`
- AND it shows 3 options: Calendly iframe (linked to `ctas.calendlyUrl`), WhatsApp button (linked to `buildWhatsAppLink(ctas.whatsappMessages.contacto)`), and a form with Nombre/Email/Mensaje fields

#### Scenario: Calendly embebido inline
- GIVEN the user views Contacto
- WHEN the Calendly iframe loads
- THEN it shows availability inline (not in a popup)
- AND it does not redirect to an external Calendly page

#### Scenario: WhatsApp button
- GIVEN the user clicks the WhatsApp button
- WHEN the click registers
- THEN it opens WhatsApp with the message `Hola, quiero arrancar un proyecto con JEMA`

#### Scenario: Form validation and submission
- GIVEN the user fills the form
- WHEN clicking Enviar
- THEN required fields validate (Nombre, Email, Mensaje)
- AND Email is validated with regex
- AND on success the form POSTs to `ctas.formEndpoint`
- AND on success an inline confirmation message shows
- AND on error an inline error message shows without page reload

### Requirement: Contacto Layout
- The section MUST use a header + 3-column grid on `md+` (stack vertical on mobile), `bg-background`, `py-16 md:py-20 lg:py-24`.

---

### Requirement: Footer Section

The Footer MUST render in a 3-column layout with logo, contact, and legal columns, plus a copyright bar.

#### Scenario: Tres columnas visibles
- GIVEN the user scrolls to Footer
- WHEN the section renders
- THEN it shows 3 columns:
  - Left: small `<BrandMark />` + copy `JEMA — Sistemas que hacen el trabajo repetitivo por vos`
  - Center (Contacto): mailto link to `ctas.emailContact`, WhatsApp link to `buildWhatsAppLink()`
  - Right (Legal): `Privacidad` and `Términos` links (placeholder TODO)

#### Scenario: Copyright dinámico
- GIVEN the Footer renders
- WHEN the page builds
- THEN the copyright reads `© {currentYear} JEMA. Todos los derechos reservados.` where `{currentYear}` is computed at build time via `new Date().getFullYear()`

### Requirement: Footer Layout
- The section MUST use 3-column grid on `md+`, stack vertical on mobile, with `bg-text text-background` (inverse contrast), and a bottom bar separated by a subtle top border.

---

### Requirement: Navigation (Sticky)

The Navigation MUST render a sticky top menu with anchor links to the sections.

#### Scenario: Menú visible
- GIVEN the user scrolls past the Hero
- WHEN the Navigation detects the scroll
- THEN it becomes sticky with a solid background (transition from transparent to solid)
- AND it shows links to: `#servicios`, `#como-trabajamos`, `#sobre-jema`, `#faq`, `#contacto`

#### Scenario: Navegación por anclas
- GIVEN the user clicks a nav link
- WHEN the click registers
- THEN the page smooth-scrolls to the target section
- AND the URL hash updates (#servicios, etc.)

#### Scenario: Mobile hamburger
- GIVEN the viewport is < md
- WHEN the hamburger is clicked
- THEN a full-screen panel opens with the nav links

### Requirement: Navigation Accessibility
- The Navigation MUST be keyboard navigable, with `aria-label` on the `<nav>` and `aria-current` on the active link.

---

### Requirement: WhatsApp Float

The WhatsApp Float MUST be visible on all sections (except Contacto) as a fixed button in the bottom-right corner.

#### Scenario: Visible en todas las secciones excepto Contacto
- GIVEN the user scrolls the page
- WHEN any section except Contacto is in viewport
- THEN the WhatsApp Float button is visible
- AND it is positioned fixed bottom-right with sufficient offset
- AND it does not obstruct main content

#### Scenario: Click abre WhatsApp
- GIVEN the user clicks the float
- WHEN the click registers
- THEN it opens WhatsApp with `ctas.whatsappDefaultMessage`

---

## MODIFIED Requirements

None at the capability level. The base spec sections remain unchanged.

## REMOVED Requirements

None.

## Out of Scope (deferred to subsequent changes)

The following are explicitly NOT in scope of `landing-jema`:

- Analytics integration.
- Deployment / hosting configuration.
- Tests (the testing strategy applies; manual validation only in this change).
- Real Calendly URL, WhatsApp number, email, founder credentials, legal copy — placeholders marked TODO.
- Logo definitivo (current `BrandMark` is a temporary geometric mark).

## Reference

- Base spec: `openspec/specs/landing/spec.md` (8 requirements covering Hero, Servicios, Cómo trabajamos, Sobre JEMA, Casos, FAQ, Contacto, Footer, WhatsApp flotante, Navegación).
- Design document: `openspec/changes/landing-jema/design.md`.
- Tasks: `openspec/changes/landing-jema/tasks.md`.
- Apply progress: `openspec/changes/landing-jema/apply-progress.md`.
