# Design: Landing JEMA

## Technical Approach

Landing one-page con arquitectura de secciones modulares. Cada sección es un componente independiente con su propio objetivo de conversión. La navegación interna usa anclas con scroll suave. CTAs primarios (Calendly) y secundarios (WhatsApp) distribuidos estratégicamente.

El diseño visual se trabaja directamente en código (no en OpenPencil — el MCP de OpenPencil tuvo bug conocido con fills que descartamos). Este documento especifica la arquitectura funcional, patrón de estructura, tokens de diseño, identidad de marca, copy y layout de las 8 secciones.

Este change se ejecuta en dos batches:
- **Batch 1 (Hero)** — completado en sesión 2026-09-01.
- **Batch 2 (resto)** — Cómo trabajamos, Sobre JEMA, Casos, FAQ, Contacto, Footer.

## Architecture Decisions

### Decision: Patrón de Arquitectura

**Choice**: Screaming Architecture con capa de reusables separada.

**Structure**:

```
src/
├── styles/global.css              # tokens (Tailwind v4 @theme) + reset
├── layouts/Layout.astro           # HTML shell, Inter, meta tags, <slot/>
├── components/
│   ├── forms/                     # formularios con lógica
│   │   └── ContactForm.astro
│   └── ui/                        # átomos reutilizables GLOBALES
│       ├── Button.astro
│       ├── Card.astro
│       ├── Accordion.astro
│       ├── Navigation.astro       # sticky con anclas
│       └── WhatsAppFloat.astro    # botón flotante fijo
├── sections/                      # screaming: una carpeta por sección
│   ├── hero/
│   │   ├── Hero.astro
│   │   └── BrandMark.astro
│   ├── servicios/Servicios.astro
│   ├── como-trabajamos/ComoTrabajamos.astro
│   ├── sobre-jema/SobreJema.astro
│   ├── casos/Casos.astro
│   ├── faq/FAQ.astro
│   ├── contacto/Contacto.astro
│   └── footer/Footer.astro
├── config/
│   └── ctas.ts                    # URLs Calendly + WhatsApp con placeholders
└── pages/
    └── index.astro                # compone las 8 secciones
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
- Plain HTML/CSS: viable, pero perderíamos componentización, scope de estilos automático y DX.
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
- Un círculo (orb) integrado a la J. Composición preferida: el orb reemplaza o se conecta al pie de la J, como si la J se "apoyara" sobre el orb.
- Color principal: `text-secondary` (#028192). El orb usa `text-accent` (#f4a462) por mejor contraste.
- Sin gradientes, sin sombras, sin filtros.

**Rationale**: Sin imagen IA (bug conocido de OpenPencil con fills; decisión de marca del usuario). La geometría pura transmite solidez técnica y es render-ready sin assets externos. SVG inline permite escalar sin pérdida, estilar con `currentColor`, y mantener todo en código. Aprobada por el usuario en sesión 2026-09-01. **Pendiente reemplazo** por logo definitivo (marcado como TODO del usuario, fuera de scope de este change).

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
- Columna derecha: `<BrandMark />` centrado, escala generosa (`w-[18rem] md:w-[24rem] lg:w-[28rem]` — arbitrary values para evitar el bug de `--spacing` que escala también width utilities).
- Background de la sección: `bg-background`. Padding generoso (`py-16 md:py-20 lg:py-24`).

**Rationale**: Copy aprobado por el usuario tras iteración previa. "ES / EN" indica capacidad bilingüe como diferencial sin prometer landing traducida (fuera de scope inicial). Ubicación "Argentina" refuerza cercanía y zona horaria para mercado hispano.

### Decision: Copy y Layout de Cómo Trabajamos

**Choice**: 3 pasos numerados en grid horizontal desktop / stack vertical mobile, con número grande arriba del título. Solo el paso 1 lleva CTA (linkea a Calendly). Pasos 2 y 3 son texto puro, más outcome-focused y menos presión comercial.

**Copy exacto** (aprobado por el usuario, sesión 2026-09-01):

- Eyebrow: `Cómo trabajamos`
- H2: `Tres pasos, sin tecnicismos`
- Subtítulo: `Sin revelar el playbook completo. Lo que necesitás saber para decidir si arrancamos.`
- Paso 1 — Título: `Diagnóstico gratuito`
  - Bajada: `Una llamada de 30 minutos donde entendemos qué necesitás, qué ya tenés y qué te falta. Sin compromiso y sin jerga de ventas.`
  - CTA: `Agendar diagnóstico gratuito →` (linkea a `ctas.calendlyUrl`)
- Paso 2 — Título: `Plan a medida`
  - Bajada: `Te llevamos una propuesta con alcance, tiempos y precio. La revisamos juntos y la ajustamos hasta que cierre.`
- Paso 3 — Título: `Implementación y mejora continua`
  - Bajada: `Construimos, desplegamos y nos quedamos operando. Las mejoras continuas vienen incluidas, no son un extra.`

**Layout**: 3 columnas en `md+` con número grande (`text-6xl font-bold text-primary/20` o similar) arriba del título, título bold, bajada debajo. Stack vertical en mobile. Background: `bg-background` (alterna con `bg-white` de Servicios para crear contraste/sección). Padding generoso.

**Rationale**: Pasos outcome-focused (no revelan las 5 fases metodológicas protegidas como activo vendible, según el proposal). Numeración visible ayuda al escaneo rápido. Solo CTA en paso 1 respeta la jerarquía "uno solo llama a la acción" sin saturar.

### Decision: Copy y Layout de Sobre JEMA

**Choice**: Sección editorial con eyebrow, H2, subtítulo y dos párrafos cortos de cuerpo. Sin CTAs (la conversión ya está cubierta por Contacto al final). Background alterno al de Cómo Trabajamos.

**Copy exacto** (aprobado por el usuario, sesión 2026-09-01):

- Eyebrow: `Sobre JEMA`
- H2: `Por qué existimos`
- Subtítulo: `No somos una agencia que entrega y desaparece. Somos un partner tecnológico que se queda.`
- Cuerpo: `JEMA existe para que empresas que quieren escalar no tengan que sumar equipo para hacerlo. Automatizamos lo repetitivo, construimos lo que no existe y operamos lo que desplegamos. La diferencia es que después del deploy no nos vamos: nos quedamos operando y mejorando tus sistemas en el tiempo.`

**Layout**: Single column, contenido centrado con `max-w-3xl`. Background: `bg-white`. Padding generoso.

**Rationale**: Diferencia clave frente a agencias tradicionales ("entrega y desaparece"). Refuerza el posicionamiento como partner operativo, no como proveedor transaccional.

### Decision: Casos (Slots Vacíos con Sustitutos Honestos)

**Choice**: Sección con eyebrow, H2, subtítulo, y tres bloques de sustitutos honestos (tipos de proyecto, stack dominado, credenciales del founder como placeholder TODO). NO se muestran testimonios inventados ni logos de clientes ficticios.

**Copy exacto** (aprobado por el usuario, sesión 2026-09-01):

- Eyebrow: `Trayectoria`
- H2: `Construyendo credibilidad en tiempo real`
- Subtítulo: `Todavía no tenemos casos públicos para mostrarte — los clientes que confían en nosotros están en plena construcción. Lo que sí podemos mostrar:`
- **Tipos de proyecto** (lista de badges):
  - `Landing pages de alta conversión`
  - `CRM + agentes IA 24/7`
  - `Plataformas SaaS internas`
  - `Automatización de presupuestos y cobranzas`
  - `Integraciones con sistemas legacy`
- **Stack dominado** (lista de badges):
  - `Astro · Next.js · Node · TypeScript · Python`
  - `WhatsApp Business API · OpenAI · Claude · HubSpot · Pipedrive`
  - `PostgreSQL · Supabase · AWS · Vercel`
- **Credenciales del founder**: placeholder TODO — usuario decide después si mostrar LinkedIn, certificaciones o proyecto personal.

**Layout**: 3 bloques en grid desktop (1 → 3 columnas en md+), stack vertical en mobile. Cada bloque con título secundario y lista de badges/chips. Background: `bg-background`.

**Rationale**: Slots vacíos honestos protegen la integridad de la marca. Los sustitutos (tipos de proyecto + stack) dan señales de capacidad sin inventar atribución. Las credenciales del founder (cuando estén) agregan confianza personal.

### Decision: Copy y Layout de FAQ

**Choice**: Sección con accordion expandible usando componente `Accordion.astro` reutilizable. 5 preguntas cubriendo objeciones típicas (precio, tiempo, alcance, post-deploy, mercado). Una pregunta abierta al final invitando a escribir.

**Copy exacto** (aprobado por el usuario, sesión 2026-09-01):

- Eyebrow: `Preguntas frecuentes`
- H2: `Lo que nos preguntan antes de arrancar`
- Subtítulo: `Si tu pregunta no está acá, escribinos.`
- Pregunta 1: `¿Cuánto cuesta un proyecto?`
  - Respuesta: `Depende del alcance. Después del diagnóstico gratuito te llevamos una propuesta con precio cerrado. Trabajamos con proyectos desde USD 1.500 (landing) hasta USD 50.000+ (SaaS a medida).`
- Pregunta 2: `¿Cuánto tarda?`
  - Respuesta: `Una landing se entrega en 2 a 3 semanas. Una automatización con CRM, 4 a 6 semanas. Un SaaS a medida, depende del alcance, pero nunca menos de 2 meses.`
- Pregunta 3: `¿Qué incluye el servicio?`
  - Respuesta: `Diseño, desarrollo, despliegue y operación. Las mejoras continuas vienen incluidas, no son un extra.`
- Pregunta 4: `¿Qué pasa después del deploy?`
  - Respuesta: `Nos quedamos operando. Si algo falla, lo arreglamos. Si querés escalar o sumar features, lo planeamos juntos.`
- Pregunta 5: `¿Trabajan con empresas fuera de Argentina?`
  - Respuesta: `Sí. Trabajamos con clientes en toda Latinoamérica y España. El idioma y la zona horaria no son problema.`

**Layout**: Single column, contenido centrado `max-w-3xl`. Cada pregunta es un botón con título + flecha que expande/colapsa la respuesta. Animación suave de altura. Solo una pregunta abierta a la vez. Background: `bg-white`.

**Componente Accordion**: client-side JS mínimo (vanilla, sin dependencias). Accesibilidad: `aria-expanded`, `aria-controls`. Soporte teclado (Enter/Space).

**Rationale**: Cubre las 5 objeciones más comunes antes de conversión. El accordion mantiene la página limpia sin scrollear mucho. La última línea invitando a escribir es un CTA suave hacia Contacto.

### Decision: Copy y Layout de Contacto

**Choice**: Sección final con 3 opciones de conversión en paralelo (Calendly embebido inline, WhatsApp con mensaje, formulario alternativo). El usuario elige la que prefiera.

**Copy exacto** (aprobado por el usuario, sesión 2026-09-01):

- Eyebrow: `Contacto`
- H2: `Listos para arrancar`
- Subtítulo: `Tres formas de empezar. Elegí la que prefieras.`
- **Opción 1**: Calendly embebido inline (`<iframe>` con `ctas.calendlyUrl`, sin modal).
- **Opción 2**: WhatsApp — botón `Hablar por WhatsApp →` con `buildWhatsAppLink('Hola, quiero arrancar un proyecto con JEMA')`.
- **Opción 3**: Form alternativo con campos `Nombre`, `Email`, `Mensaje`, botón `Enviar mensaje`. Validación client-side (required + email regex). POST a `ctas.formEndpoint`. Mensaje de éxito inline.

**Layout**: Single column header + 3 cards o bloques verticales (mobile) / grid 3 columnas desktop. Cada opción con título, descripción breve y su control. Background: `bg-background` (alterna con `bg-white` de FAQ). Padding generoso.

**Componente ContactForm**: client-side JS para validación y POST. Accesibilidad: labels asociadas, mensajes de error con `aria-describedby`. Sin frameworks JS, vanilla.

**Rationale**: Tres caminos cubren las preferencias del prospecto (calendario, chat, email). El form como red de seguridad captura los que no quieren Calendly ni WhatsApp. Validación client-side reduce requests inválidos al endpoint.

### Decision: Copy y Layout de Footer

**Choice**: Footer de 3 columnas + bottom bar. Logo chico a la izquierda, contacto al centro, legal a la derecha. Copyright dinámico con año actual.

**Copy exacto** (aprobado por el usuario, sesión 2026-09-01):

- **Columna izquierda**: `<BrandMark />` chico (ej. `w-12 h-12`) + copy corto `JEMA — Sistemas que hacen el trabajo repetitivo por vos`.
- **Columna central** (Contacto): link mailto a `hola@jema.com.ar` (placeholder, marcado TODO), link WhatsApp a `buildWhatsAppLink()`.
- **Columna derecha** (Legal): links `Privacidad` y `Términos` (placeholders TODO por ahora, el copy legal se arma en un change futuro).
- **Bottom bar**: copyright `© {año actual} JEMA. Todos los derechos reservados.` Centrado o a la izquierda.

**Layout**: 3 columnas en desktop, stack vertical en mobile. Bottom bar separado con borde superior sutil. Background: `bg-text` (inverso) con texto en `text-white` o `text-background` para contraste, o `bg-background` con texto secundario. Decisión visual: `bg-text text-background` para que el footer tenga peso visual y cierre la página con contraste fuerte.

**Rationale**: Footer estándar de 3 columnas + copyright es esperable y predecible. El placeholder de email/legal está marcado TODO para no inventar copy. El año dinámico se computa en build time con `new Date().getFullYear()`.

### Decision: Navigation (Sticky)

**Choice**: Menú sticky superior con anclas a las secciones: Servicios, Cómo trabajamos, Sobre JEMA, FAQ, Contacto. Aparece después de hacer scroll pasado el Hero (transición sutil desde transparente a sólido). Mobile: hamburger que abre panel full-screen.

**Alternatives considered**:
- Menú siempre visible sin transición: distrae del Hero.
- Sin menú: obliga a scrollear y rompe el journey de conversión.

**Rationale**: Sticky con scroll-past-hero es el patrón estándar de landing moderna. Anclas dan navegación rápida sin saturar el viewport. Mobile con hamburger es esperable y no rompe el flujo.

### Decision: WhatsApp Flotante

**Choice**: Botón flotante fijo en esquina inferior derecha, siempre visible, abre WhatsApp con `ctas.whatsappDefaultMessage`. Hidden cuando el usuario está en la sección Contacto (donde ya hay WhatsApp explícito).

**Alternatives considered**:
- Solo CTAs contextuales sin botón flotante: pierde accesibilidad rápida.
- WhatsApp Business API con chatbot: overkill para landing inicial.

**Rationale**: Acceso rápido desde cualquier sección sin scrollear. Ocultarlo en Contacto evita redundancia visual.

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

**Rationale**: Botón flotante garantiza acceso rápido desde cualquier sección. CTAs contextuales en cada vertical permiten mensajes predefinidos específicos. API con chatbot es overkill para landing inicial y requiere infraestructura adicional.

### Decision: Formulario Alternativo

**Choice**: Formulario simple (nombre, email, mensaje) con validación client-side y envío a endpoint configurable

**Alternatives considered**:
- Solo Calendly y WhatsApp (sin form)
- Formulario multi-step con más campos

**Rationale**: Form alternativo captura leads que prefieren email sobre llamada/WhatsApp. Validación client-side reduce requests inválidos. Endpoint configurable permite integrar con CRM, email service, o webhook sin cambiar código. Multi-step es overkill para landing inicial.

### Decision: Tokens de Diseño

**Choice**: Paleta del negocio + tipografía Inter + espaciado default de Tailwind.

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

**Spacing**:

Se usa el **default de Tailwind (base 4px)**. El override `--spacing: 0.5rem` se descartó en sesión 2026-09-01 porque escalaba también width utilities (`w-72` pasaba de 288px a 576px), rompiendo la semántica standard de Tailwind. Para mantener "múltiplos de 8px" se usan valores pares en las utilities (`p-4`, `gap-6`, `py-16`) — todos los valores del proyecto ya cumplen esta convención.

**Border radius**:

- `sm` 4, `md` 8, `lg` 12, `xl` 16, `2xl` 24, `full` 9999.

**Alternatives considered**:
- Tipografía diferente (Plus Jakarta, Space Grotesk): Inter es más neutral y amplia adopción en tech B2B.
- Override de `--spacing` a `0.5rem`: roto, ver arriba.

**Rationale**: Inter es neutral, profesional, ampliamente usada en tech B2B. Paleta ya definida por el negocio. Espaciado default de Tailwind es la práctica standard del ecosistema.

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

### Batch 1 — Hero (completado en sesión 2026-09-01)

| File | Action | Status |
|------|--------|--------|
| `package.json` | Create | ✅ |
| `astro.config.mjs` | Create | ✅ |
| `tsconfig.json` | Create | ✅ |
| `.gitignore` | Create | ✅ |
| `README.md` | Create | ✅ |
| `.npmrc` | Create | ✅ |
| `pnpm-workspace.yaml` | Create | ✅ |
| `pnpm-lock.yaml` | Create | ✅ |
| `src/styles/global.css` | Create | ✅ |
| `src/layouts/Layout.astro` | Create | ✅ |
| `src/components/ui/Button.astro` | Create | ✅ |
| `src/sections/hero/Hero.astro` | Create | ✅ |
| `src/sections/hero/BrandMark.astro` | Create | ✅ |
| `src/config/ctas.ts` | Create | ✅ |
| `src/pages/index.astro` | Create | ✅ |

### Batch 2 — Resto de la Landing (este change, en implementación)

**Servicios** (completado en sesión 2026-09-01):

| File | Action | Status |
|------|--------|--------|
| `src/components/ui/Card.astro` | Create | ✅ |
| `src/sections/servicios/Servicios.astro` | Create | ✅ |
| `src/config/ctas.ts` | Update | ✅ (agregado `whatsappMessages`) |
| `src/pages/index.astro` | Update | ✅ |

**Cómo trabajamos, Sobre JEMA, Casos, FAQ, Contacto, Footer + Navigation + WhatsApp Float** (este sdd-apply):

| File | Action | Description |
|------|--------|-------------|
| `src/components/ui/Accordion.astro` | Create | Accordion expandible client-side (vanilla JS) |
| `src/components/ui/Navigation.astro` | Create | Menú sticky con anclas + hamburger mobile |
| `src/components/ui/WhatsAppFloat.astro` | Create | Botón flotante fijo esquina inferior derecha |
| `src/components/forms/ContactForm.astro` | Create | Form con validación client-side |
| `src/sections/como-trabajamos/ComoTrabajamos.astro` | Create | 3 pasos numerados con CTA solo en paso 1 |
| `src/sections/sobre-jema/SobreJema.astro` | Create | Sección editorial con propósito y diferencial |
| `src/sections/casos/Casos.astro` | Create | Slots vacíos con tipos de proyecto + stack |
| `src/sections/faq/FAQ.astro` | Create | 5 preguntas en accordion |
| `src/sections/contacto/Contacto.astro` | Create | Calendly + WhatsApp + form |
| `src/sections/footer/Footer.astro` | Create | 3 columnas + copyright dinámico |
| `src/pages/index.astro` | Update | Componer todas las 8 secciones |
| `src/config/ctas.ts` | Update | Agregar `formEndpoint`, `emailContact`, `currentYear` |

## Interfaces / Contracts

```typescript
// src/config/ctas.ts
export const ctas = {
  calendlyUrl: '#agendar',                         // TODO: replace with real Calendly URL
  whatsappNumber: '000000000',                     // TODO: replace (country code + number)
  whatsappDefaultMessage: 'Hola, me interesa conocer más sobre JEMA',
  whatsappMessages: {
    default: 'Hola, me interesa conocer más sobre JEMA',
    presenciaDigital: 'Hola, me interesa Presencia Digital',
    automatizacion: 'Hola, me interesa Automatización',
    softwareMedida: 'Hola, me interesa Software a Medida',
    contacto: 'Hola, quiero arrancar un proyecto con JEMA',
  },
  formEndpoint: '#contact',                        // TODO: real endpoint
  emailContact: 'hola@jema.com.ar',                // TODO: real email
} as const;

export function buildWhatsAppLink(message?: string): string {
  const m = message ?? ctas.whatsappDefaultMessage;
  return `https://wa.me/${ctas.whatsappNumber}?text=${encodeURIComponent(m)}`;
}

// src/components/ui/Button.astro
export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps {
  variant?: ButtonVariant;
  href: string;
  class?: string;
}

// src/components/ui/Card.astro
interface CardProps {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  whatsappMessage?: string;
}

// src/components/ui/Accordion.astro
interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;  // default false
}

// src/components/ui/Navigation.astro
interface NavLink {
  label: string;
  href: string;  // anchor like "#servicios"
}

interface NavigationProps {
  links: NavLink[];
}

// src/components/forms/ContactForm.astro
interface ContactFormData {
  nombre: string;
  email: string;
  mensaje: string;
}

interface ContactFormResponse {
  success: boolean;
  message: string;
}
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | Componentes UI (Button, Card, Accordion) | Render tests con props variadas |
| Unit | Validación de formulario | Test de reglas de validación (email, required fields) |
| Integration | Navegación por anclas | Test de scroll suave y URL update |
| Integration | Accordion expand/collapse | Test de estado y accesibilidad |
| Integration | Form submission | Mock endpoint, test de POST y respuesta |
| E2E | CTAs funcionan | Test de clicks en Calendly/WhatsApp/form |
| E2E | Responsive design | Test en mobile/tablet/desktop viewports |
| E2E | Copy neutral amplio | Validación de ausencia de modismos regionales |

**Nota**: Esta iteración completa (8 secciones) sigue sin incluir tests automatizados. La validación es manual visual en `pnpm run dev` + type check con `tsc --noEmit`. Tests automatizados entran en un change futuro.

## Migration / Rollout

No migration required. Landing es nueva, no hay datos existentes ni usuarios activos.

Rollout: deploy directo a producción una vez completada implementación y validación visual.

## Open Questions

- [x] **Stack técnico** → ✅ Astro 5.x + Tailwind CSS v4 + TypeScript estricto
- [x] **Logo de JEMA** → ✅ Marca geométrica "J + orb" en SVG inline (pendiente reemplazo por logo definitivo, fuera de scope de este change)
- [x] **Espaciado base 8px** → ✅ Resuelto: default de Tailwind + valores pares (no override de `--spacing`)
- [ ] **Hosting**: ¿Vercel, Netlify, Cloudflare Pages, o hosting tradicional? (decidir antes del primer deploy)
- [ ] **Analytics**: ¿Google Analytics, Plausible, Fathom, o ninguno inicialmente?
- [ ] **Form endpoint**: ¿Formspree, Netlify Forms, Resend, o backend custom?
- [ ] **Calendly URL real**: usuario debe proveer el link público de su cuenta
- [ ] **WhatsApp number real**: usuario debe proveer número con código de país (ej: `5491123456789`)
- [ ] **Email real de contacto**: usuario debe proveer el email real (placeholder actual: `hola@jema.com.ar`)
- [ ] **Credenciales del founder** (sección Casos): ¿mostrar LinkedIn, certificación, proyecto personal, o dejar TODO?
- [ ] **Copy legal** (Privacidad, Términos): ¿se redacta en este change o se difiere a uno legal?
