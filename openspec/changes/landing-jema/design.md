# Design: Landing JEMA

## Technical Approach

Landing one-page con arquitectura de secciones modulares. Cada sección es un componente independiente con su propio objetivo de conversión. La navegación interna usa anclas con scroll suave. CTAs primarios (Calendly) y secundarios (WhatsApp) distribuidos estratégicamente.

El diseño visual se define en OpenPencil. Este documento especifica la arquitectura funcional, tokens de diseño y estructura de componentes.

## Architecture Decisions

### Decision: Estructura de Secciones

**Choice**: 8 secciones en orden específico: Hero → Servicios → Cómo trabajamos → Sobre JEMA → Casos (slots vacíos) → FAQ → Contacto → Footer

**Alternatives considered**:
- Reordenar secciones (FAQ antes de Casos)
- Eliminar Casos completamente hasta tener prueba social

**Rationale**: El orden sigue el journey del prospecto: impacto inicial (Hero) → qué ofrecemos (Servicios) → cómo lo hacemos (Cómo trabajamos) → quiénes somos (Sobre JEMA) → prueba social futura (Casos) → objeciones (FAQ) → conversión final (Contacto). Casos se mantiene con slots vacíos para no rediseñar cuando haya clientes.

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

**Choice**: Paleta definida en `business-models.md` + tipografía Inter + sistema de espaciado basado en 8px

**Alternatives considered**:
- Tipografía diferente (Plus Jakarta, Space Grotesk)
- Sistema de espaciado basado en 4px

**Rationale**: Inter es neutral, profesional, ampliamente usada en tech B2B. Paleta ya definida por el negocio. Espaciado 8px es estándar moderno (Tailwind, Material Design) y permite jerarquía visual clara sin ser demasiado granular.

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

| File | Action | Description |
|------|--------|-------------|
| `src/components/sections/Hero.tsx` | Create | Sección Hero con propuesta de valor y CTAs |
| `src/components/sections/Servicios.tsx` | Create | 3 cards de verticales con CTAs contextuales |
| `src/components/sections/ComoTrabajamos.tsx` | Create | 3 pasos macro outcome-focused |
| `src/components/sections/SobreJema.tsx` | Create | Propósito y diferencial |
| `src/components/sections/Casos.tsx` | Create | Slots vacíos para prueba social futura |
| `src/components/sections/FAQ.tsx` | Create | Preguntas expandibles (accordion) |
| `src/components/sections/Contacto.tsx` | Create | Calendly + WhatsApp + form |
| `src/components/sections/Footer.tsx` | Create | Contacto, redes, legal |
| `src/components/ui/Button.tsx` | Create | Botón reutilizable (primary/secondary/ghost) |
| `src/components/ui/Card.tsx` | Create | Card reutilizable para servicios |
| `src/components/ui/Accordion.tsx` | Create | Componente expandible para FAQ |
| `src/components/ui/WhatsAppFloat.tsx` | Create | Botón flotante fijo |
| `src/components/ui/Navigation.tsx` | Create | Menú sticky con anclas |
| `src/components/forms/ContactForm.tsx` | Create | Formulario de contacto con validación |
| `src/styles/tokens.css` | Create | Tokens de diseño (colores, tipografía, espaciado) |
| `src/pages/index.tsx` | Create | Landing page que compone todas las secciones |
| `src/config/ctas.ts` | Create | Configuración de CTAs (links Calendly, WhatsApp, mensajes) |

## Interfaces / Contracts

```typescript
// src/config/ctas.ts
export interface CTAConfig {
  calendlyUrl: string;
  whatsappNumber: string;
  whatsappMessages: {
    default: string;
    presenciaDigital: string;
    automatizacion: string;
    softwareMedida: string;
  };
  formEndpoint: string;
}

// src/components/forms/ContactForm.tsx
export interface ContactFormData {
  nombre: string;
  email: string;
  mensaje: string;
}

export interface FormResponse {
  success: boolean;
  message: string;
}

// src/styles/tokens.css
:root {
  /* Colors */
  --color-text: #112222;
  --color-background: #f5efe5;
  --color-primary: #00a897;
  --color-secondary: #028192;
  --color-accent: #f4a462;
  
  /* Typography */
  --font-family: 'Inter', sans-serif;
  --font-size-base: 16px;
  --font-size-sm: 14px;
  --font-size-lg: 18px;
  --font-size-xl: 24px;
  --font-size-2xl: 32px;
  --font-size-3xl: 48px;
  
  /* Spacing (8px base) */
  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 32px;
  --space-6: 48px;
  --space-8: 64px;
  --space-12: 96px;
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

## Migration / Rollout

No migration required. Landing es nueva, no hay datos existentes ni usuarios activos.

Rollout: deploy directo a producción una vez completada implementación y testing.

## Open Questions

- [ ] **Stack técnico**: ¿Astro, Next.js, o plain HTML/CSS? Decidir en `tasks.md` después de OpenPencil
- [ ] **Logo de JEMA**: ¿Diseñar en OpenPencil o usar text-mark temporal?
- [ ] **Hosting**: ¿Vercel, Netlify, o hosting tradicional?
- [ ] **Analytics**: ¿Google Analytics, Plausible, o ninguno inicialmente?
- [ ] **Form endpoint**: ¿Formspree, Netlify Forms, o backend custom?
