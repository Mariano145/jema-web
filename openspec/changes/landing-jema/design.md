# Design: Landing JEMA

## Technical Approach

Landing one-page con arquitectura de secciones modulares. Cada sección es un componente independiente con su propio objetivo de conversión. La navegación interna usa anclas con scroll suave. CTAs primarios (Calendly) y secundarios (WhatsApp) distribuidos estratégicamente.

El diseño visual se trabaja directamente en código (no en OpenPencil — el MCP de OpenPencil tuvo bug conocido con fills que descartamos). Este documento especifica la arquitectura funcional, patrón de estructura, tokens de diseño, identidad de marca y copy del Hero.

## Architecture Decisions

### Decision: Patrón de Arquitectura

**Choice**: Screaming Architecture con capa de reusables separada.

**Structure**:

```
src/
├── styles/global.css              # tokens (Tailwind v4 @theme) + reset
├── layouts/Layout.astro           # HTML shell, Inter, meta tags, <slot/>
├── components/ui/                 # átomos reutilizables GLOBALES (entre secciones)
│   └── Button.astro
├── sections/                      # screaming: una carpeta por sección
│   └── hero/
│       ├── Hero.astro             # el componente sección
│       └── BrandMark.astro        # SVG inline "J + orb"
├── config/
│   └── ctas.ts                    # URLs Calendly + WhatsApp con placeholders
└── pages/
    └── index.astro                # compone secciones (solo Hero por ahora)
```

**Alternatives considered**:
- Atomic Design (atoms/molecules/organisms): sobre-ingeniería para una landing de 8 secciones, y "molecules" no aporta claridad.
- Layered (ui/domain/infra): aplica a apps con backend. Para una landing estática es ceremony sin valor.
- Flat por tipo técnico (`src/components/` mezclando átomos y secciones): confunde — un átomo y una sección son cosas distintas y no comparten ciclo de vida.

**Rationale**: El dominio (landing de secciones) debe gritar en la estructura. `sections/hero/` comunica inmediatamente qué hace la app, mejor que `components/sections/Hero.tsx` mezclado con `components/ui/Button.tsx`. La capa técnica solo guarda lo realmente reutilizable entre secciones, evitando que átomos y features compartan carpeta. Cada sección puede evolucionar con sus assets específicos sin afectar a las demás.

### Decision: Stack Técnico

**Choice**: Astro 5.x + Tailwind CSS v4 + TypeScript estricto.

**Alternatives considered**:
- Next.js: overkill para una landing estática; agrega runtime React y SSR complexity innecesaria.
- Plain HTML/CSS: viable, pero perderíamos componentización, scope de estilos automático yDX.
- Vite + React: similar a Next pero sin SSR; para una landing no ganamos nada sobre Astro.

**Rationale**: Astro es server-rendered by default con zero JS client-side por defecto, ideal para una landing de marketing donde la performance y SEO importan más que la interactividad. Tailwind v4 con `@tailwindcss/vite` permite definir tokens custom en CSS (`@theme`) sin la fricción del viejo `@astrojs/tailwind` (v3). TypeScript estricto da contratos claros entre componentes y config. Stack cerrado por el usuario en sesión 2026-09-01.

### Decision: Estructura de Secciones

**Choice**: 8 secciones en orden específico: Hero → Servicios → Cómo trabajamos → Sobre JEMA → Casos (slots vacíos) → FAQ → Contacto → Footer

**Alternatives considered**:
- Reordenar secciones (FAQ antes de Casos)
- Eliminar Casos completamente hasta tener prueba social

**Rationale**: El orden sigue el journey del prospecto: impacto inicial (Hero) → qué ofrecemos (Servicios) → cómo lo hacemos (Cómo trabajamos) → quiénes somos (Sobre JEMA) → prueba social futura (Casos) → objeciones (FAQ) → conversión final (Contacto). Casos se mantiene con slots vacíos para no rediseñar cuando haya clientes.

### Decision: Identidad de Marca (Hero)

**Choice**: Marca geométrica "J + orb" renderizada como SVG inline en el componente `BrandMark.astro`.

**Composition**:
- Una "J" sans-serif geométrica grande con líneas gruesas uniformes, sin serif, ángulos rectos en el pie.
- Un círculo (orb) integrado a la J. Composición preferida: el orb reemplaza o se conecta al pie de la J, como si la J se "apoyara" sobre el orb. Alternativa válida: orb separado pero alineado al centro del pie.
- Color principal: `text-secondary` (#028192). El orb puede ser `text-primary` (#00a897) o `text-accent` (#f4a462) — elegir el que contraste mejor.
- Sin gradientes, sin sombras, sin filtros.

**Rationale**: Sin imagen IA (bug conocido de OpenPencil con fills; decisión de marca del usuario). La geometría pura transmite solidez técnica y es render-ready sin assets externos. SVG inline permite escalar sin pérdida, estilar con `currentColor`, y mantener todo en código. Aprobada por el usuario en sesión 2026-09-01.

### Decision: Copy del Hero

**Choice**: Copy literal aprobado por el usuario (sesión 2026-09-01), en español neutral amplio sin modismos regionales.

**Contenido exacto**:

- Eyebrow: `Automatización · Presencia Digital · Software a Medida`
- H1: `Sistemas que hacen el trabajo repetitivo por vos`
- Subtítulo: `Construimos landings, automatizaciones y software a medida para empresas que quieren escalar sin sumar equipo.`
- CTA primario (texto): `Agendar diagnóstico gratuito →`
- CTA secundario (texto): `Hablar por WhatsApp`
- Caption metadata: `Argentina · ES / EN`

**Layout del Hero (split 50/50 desktop, stack vertical mobile)**:

- Columna izquierda: eyebrow, H1, subtítulo, grupo de CTAs (flex col mobile / row desktop), caption metadata al pie.
- Columna derecha: `<BrandMark />` centrado, escala generosa (`w-72 md:w-96 lg:w-[28rem]`).
- Background de la sección: `bg-background`. Padding generoso (`py-16 md:py-20 lg:py-24`).

**Rationale**: Copy aprobado por el usuario tras iteración previa. "ES / EN" indica capacidad bilingüe como diferencial sin prometer landing traducida (fuera de scope inicial). Ubicación "Argentina" refuerza cercanía y zona horaria para mercado hispano.

### Decision: Calendly Embebido vs Modal

**Choice**: Calendly embebido inline en Hero y Contacto, no modal

**Alternatives considered**:
- Modal popup al hacer clic en CTA
- Redirección a página externa de Calendly

**Rationale**: Embebido inline reduce fricción (no hay popup que bloquear), mantiene al usuario en la landing, y permite ver disponibilidad sin cambiar de contexto. Modal puede ser bloqueado por ad-blockers. Redirección externa pierde tracking y contexto.

### Decision: WhatsApp Integration

**Choice**: Botón flotante fijo + CTAs contextuales con mensaje predefinido por sección

**Alternatives considered**:
- Solo botón flotante
- WhatsApp Business API con chatbot

**Rationale**: Botón flotante garantiza acceso rápido desde cualquier sección. CTAs contextuales en cada vertical permiten mensajes predefinidos específicos (ej: "Hola, me interesa Presencia Digital"). API con chatbot es overkill para landing inicial y requiere infraestructura adicional.

### Decision: Formulario Alternativo

**Choice**: Formulario simple (nombre, email, mensaje) con validación client-side y envío a endpoint configurable

**Alternatives considered**:
- Solo Calendly y WhatsApp (sin form)
- Formulario multi-step con más campos

**Rationale**: Form alternativo captura leads que prefieren email sobre llamada/WhatsApp. Validación client-side reduce requests inválidos. Endpoint configurable permite integrar con CRM, email service, o webhook sin cambiar código. Multi-step es overkill para landing inicial.

### Decision: Tokens de Diseño

**Choice**: Paleta del negocio + tipografía Inter + espaciado base 8px.

**Palette (valores exactos)**:

| Token | Hex | Uso |
|-------|-----|-----|
| `text` | `#112222` | Texto principal, headings |
| `background` | `#f5efe5` | Fondo de página y secciones |
| `primary` | `#00a897` | CTA primario, acentos principales |
| `secondary` | `#028192` | CTA secundario, links, eyebrows |
| `accent` | `#f4a462` | Acentos puntuales, highlights |
| `white` | `#FFFFFF` | Texto sobre fondos oscuros/saturados |

**Typography**:

- Familia: `Inter`, fallback `system-ui, sans-serif`.
- Origen: Google Fonts vía `<link>` en el `<head>` del `Layout.astro`, con `display=swap`.
- Pesos cargados: 400, 500, 600, 700.
- Base: `16px`.
- Escala custom: `sm` 14 / `base` 16 / `lg` 18 / `xl` 20 / `2xl` 24 / `3xl` 32 / `4xl` 40 / `5xl` 48 / `6xl` 64.

**Spacing (base 8px)**:

Override del default de Tailwind (4px) con escala en múltiplos de 8:

- `1` = 8px, `2` = 16px, `3` = 24px, `4` = 32px, `5` = 40px, `6` = 48px, `8` = 64px, `10` = 80px, `12` = 96px, `16` = 128px, `20` = 160px.

**Border radius**:

- `sm` 4, `md` 8, `lg` 12, `xl` 16, `2xl` 24, `full` 9999.

**Alternatives considered**:
- Tipografía diferente (Plus Jakarta, Space Grotesk): Inter es más neutral y amplia adopción en tech B2B.
- Sistema de espaciado basado en 4px: demasiado granular, pierde jerarquía visual.

**Rationale**: Inter es neutral, profesional, ampliamente usada en tech B2B. Paleta ya definida por el negocio. Espaciado 8px es estándar moderno (Tailwind, Material Design) y permite jerarquía visual clara sin ser demasiado granular.

**Implementación**: tokens definidos en `src/styles/global.css` con `@theme {}` de Tailwind v4 (no en `tailwind.config.ts`). Esto evita la fricción del sistema viejo y permite que clases como `text-primary`, `bg-background`, `p-4` resuelvan directamente desde los custom properties.

## Data Flow

```
Usuario → CTA (Calendly/WhatsApp/Form)
              │
              ├─→ Calendly: iframe embebido, datos van directo a Calendly
              │
              ├─→ WhatsApp: link con mensaje predefinido, abre app/web
              │
              └─→ Form: validación client-side → POST a endpoint → respuesta → mensaje confirmación
```

## File Changes

### Scope inicial (este change — implementación del Hero)

| File | Action | Description |
|------|--------|-------------|
| `package.json` | Create | Dependencias: astro 5.x, @tailwindcss/vite 4.x, tailwindcss 4.x, typescript |
| `astro.config.mjs` | Create | Config Astro con integración `@tailwindcss/vite` |
| `tsconfig.json` | Create | Extiende `astro/tsconfigs/strict` |
| `src/styles/global.css` | Create | `@import "tailwindcss"` + `@theme {}` con tokens custom |
| `src/layouts/Layout.astro` | Create | HTML shell, `<link>` Inter, meta tags, `<slot />` |
| `src/components/ui/Button.astro` | Create | Botón reutilizable (variant: primary/secondary/ghost) |
| `src/sections/hero/Hero.astro` | Create | Sección Hero completa con copy literal aprobado |
| `src/sections/hero/BrandMark.astro` | Create | SVG inline "J + orb" |
| `src/config/ctas.ts` | Create | Config CTAs con placeholders marcados TODO |
| `src/pages/index.astro` | Create | Renderiza `<Hero />` + comentarios para secciones futuras |
| `README.md` | Create | Instrucciones mínimas de dev/build |

### Scope futuro (changes siguientes — resto de la landing)

| File | Action | Description |
|------|--------|-------------|
| `src/components/ui/Navigation.astro` | Create | Menú sticky con anclas |
| `src/components/ui/WhatsAppFloat.astro` | Create | Botón flotante fijo |
| `src/components/ui/Card.astro` | Create | Card reutilizable para Servicios y Casos |
| `src/components/ui/Accordion.astro` | Create | Componente expandible para FAQ |
| `src/sections/servicios/Servicios.astro` | Create | 3 cards de verticales con CTAs contextuales |
| `src/sections/como-trabajamos/ComoTrabajamos.astro` | Create | 3 pasos macro outcome-focused |
| `src/sections/sobre-jema/SobreJema.astro` | Create | Propósito y diferencial |
| `src/sections/casos/Casos.astro` | Create | Slots vacíos para prueba social futura |
| `src/sections/faq/FAQ.astro` | Create | Preguntas expandibles |
| `src/sections/contacto/Contacto.astro` | Create | Calendly + WhatsApp + form |
| `src/sections/footer/Footer.astro` | Create | Contacto, redes, legal |
| `src/components/forms/ContactForm.astro` | Create | Formulario con validación |

## Interfaces / Contracts

```typescript
// src/config/ctas.ts
export const ctas = {
  calendlyUrl: '#agendar',                          // TODO: reemplazar con URL real
  whatsappNumber: '000000000',                      // TODO: reemplazar (código país + número, sin + ni espacios)
  whatsappDefaultMessage: 'Hola, me interesa conocer más sobre JEMA',
  formEndpoint: '#contact',                         // TODO: endpoint futuro
} as const;

export function buildWhatsAppLink(message: string = ctas.whatsappDefaultMessage): string {
  return `https://wa.me/${ctas.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// src/components/ui/Button.astro
export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface Props {
  variant?: ButtonVariant;  // default 'primary'
  href: string;
  class?: string;           // clases adicionales opcionales
}

// src/styles/global.css (@theme block)
:root {
  /* Color tokens */
  --color-text: #112222;
  --color-background: #f5efe5;
  --color-primary: #00a897;
  --color-secondary: #028192;
  --color-accent: #f4a462;
  --color-white: #ffffff;

  /* Font family */
  --font-sans: 'Inter', system-ui, sans-serif;

  /* Font size scale (rem) */
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 2rem;
  --text-4xl: 2.5rem;
  --text-5xl: 3rem;
  --text-6xl: 4rem;

  /* Spacing (base 8px) */
  --spacing: 0.5rem;  /* 1 unit = 8px */

  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
}
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | Componentes UI (Button, Card, Accordion) | Render tests con props variadas |
| Unit | Validación de formulario | Test de reglas de validación (email, required fields) |
| Integration | Navegación por anclas | Test de scroll suave y URL update |
| Integration | Form submission | Mock endpoint, test de POST y respuesta |
| E2E | CTAs funcionan | Test de clicks en Calendly/WhatsApp/form |
| E2E | Responsive design | Test en mobile/tablet/desktop viewports |
| E2E | Copy neutral amplio | Validación de ausencia de modismos regionales |

**Nota**: Esta primera iteración (solo Hero) no incluye tests. Se agregan en changes futuros cuando haya más secciones y formularios con lógica.

## Migration / Rollout

No migration required. Landing es nueva, no hay datos existentes ni usuarios activos.

Rollout: deploy directo a producción una vez completada implementación y testing.

## Open Questions

- [x] **Stack técnico** → ✅ Astro 5.x + Tailwind CSS v4 + TypeScript estricto
- [x] **Logo de JEMA** → ✅ Marca geométrica "J + orb" en SVG inline
- [ ] **Hosting**: ¿Vercel, Netlify, Cloudflare Pages, o hosting tradicional? (decidir antes del primer deploy)
- [ ] **Analytics**: ¿Google Analytics, Plausible, Fathom, o ninguno inicialmente?
- [ ] **Form endpoint**: ¿Formspree, Netlify Forms, Resend, o backend custom?
- [ ] **Calendly URL real**: usuario debe proveer el link público de su cuenta
- [ ] **WhatsApp number real**: usuario debe proveer número con código de país (ej: `5491123456789`)
