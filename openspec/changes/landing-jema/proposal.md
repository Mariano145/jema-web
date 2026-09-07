# Proposal: Landing JEMA

## Intent

JEMA ofrece tres verticales de servicios tech (Presencia Digital, Automatización, Software a Medida) pero no tiene presencia pública online. Necesita una landing one-page para:

- Validar oferta y propuesta de valor con tráfico real
- Captar leads calificados vía diagnóstico gratuito (Canal 1) y WhatsApp (Canal 2)
- Posicionar a JEMA como partner tecnológico integral en mercado hispano neutral (AR + ES)

## Scope

### In Scope
- Landing one-page con 8 secciones: Hero, Servicios (3 verticales), Cómo trabajamos, Sobre JEMA, FAQ, Contacto, Footer, Casos (slots vacíos)
- Conversión primaria: agendamiento de diagnóstico gratuito (Calendly embebido)
- Conversión secundaria: WhatsApp (botón flotante + CTAs contextuales por vertical)
- Copy en español neutral amplio (Argentina + España, sin modismos regionales)
- Tokens de diseño completos (paleta + tipografía Inter)

### Out of Scope
- Implementación técnica (código) — fase post-OpenPencil
- Diseño visual en OpenPencil — se ejecuta DESPUÉS de cerrar specs
- Metodología detallada (5 fases) — protegida como activo vendible, no se publica
- Lead magnet gated (PDF con metodología) — decisión futura
- Blog, multi-página, i18n — iteraciones posteriores
- CMS, autenticación, integraciones de analytics — se definen en `tasks.md`

## Capabilities

### New Capabilities
- `landing`: sección one-page con hero, 3 verticales, "cómo trabajamos", sobre JEMA, FAQ, contacto y footer. Slots preparados para casos futuros.

### Modified Capabilities
- None

## Approach

Arquitectura de información basada en el modelo de negocio existente (`business-models.md`). Cada sección tiene un objetivo de conversión específico:

1. **Hero**: propuesta de valor + CTA primario (Calendly) + CTA secundario (WhatsApp)
2. **Servicios**: 3 verticales en cards, cada una con CTA contextual
3. **Cómo trabajamos**: 3 pasos macro (outcome-focused, no técnico) — reemplaza metodología detallada
4. **Sobre JEMA**: propósito y diferencial
5. **FAQ**: objeciones típicas (precios, tiempos, qué incluye)
6. **Contacto**: Calendly + WhatsApp + form alternativo
7. **Footer**: contacto, redes, legal
8. **Casos**: slots vacíos, sustituida por credenciales del founder + stack + mini-cases

Prueba social: sección en spec pero con slots vacíos. Mientras no haya clientes, se popula con sustitutos honestos (credenciales, tipos de proyecto, stack dominado, mini-cases sin atribución).

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `openspec/changes/landing-jema/` | New | Carpeta de cambio con proposal, specs, design, tasks |
| `openspec/specs/landing/` | New | Spec de capability `landing` (post-propose) |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Copy genérico sin propuesta de valor clara | Medium | Iterar copy del hero en fase OpenPencil con feedback real |
| Sin prueba social = baja conversión | High | Sustituir con credenciales + stack + mini-cases; priorizar primer cliente |
| Metodología protegida = menos confianza inicial | Low | "Cómo trabajamos" (3 pasos) da suficiente rigor sin revelar playbook |

## Rollback Plan

No hay código todavía. Si el cambio no avanza, eliminar `openspec/changes/landing-jema/` y no hay impacto en producción.

## Dependencies

- Calendly (o alternativa) para agendamiento — se configura en fase de implementación
- WhatsApp Business API o link directo — se configura en fase de implementación
- Logo de JEMA — pendiente (se diseña en OpenPencil o se usa text-mark temporal)

## Success Criteria

- [ ] Landing publicada y accesible públicamente
- [ ] Calendly embebido funcional en hero y sección contacto
- [ ] Botón flotante de WhatsApp visible en todas las secciones
- [ ] CTAs contextuales por vertical (3 variantes)
- [ ] Copy en español neutral amplio (sin modismos AR/ES regionales)
- [ ] Tokens de diseño aplicados (paleta + Inter)
- [ ] Slots de casos preparados para futuro populate
- [ ] Metodología detallada NO publicada (protegida)
