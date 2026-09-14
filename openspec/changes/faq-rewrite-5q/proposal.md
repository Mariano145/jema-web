# Proposal: FAQ Rewrite with 5 New Questions

## Why

The current FAQ questions are purely transactional — they ask "how much, how long, what's included". This is a missed conversion opportunity: B2B leads from JEMA's target market (SMBs in real estate, construction, dealerships — non-technical owners) don't decide based on price and timeline alone. They decide based on **trust and the working relationship**.

The new 5 questions shift the FAQ from "project specs" to "how is it to work with us" — the actual differentiators for JEMA's positioning as a partner, not an agency.

## What Changes

| # | Change | Detail |
|---|--------|--------|
| 1 | **Replace `faqItems` array in `FAQ.astro`** | 5 new question+answer pairs replacing the current transactional ones. Cover: client time investment, technical knowledge barrier, code/IP ownership, process visibility, post-launch flexibility. |

The 5 new Q&A (already user-approved in conversation):

1. **¿Cuánto te toma a vos?** → "Muy poco. La mayor parte la absorbemos nosotros. Dos o tres reuniones al arranque, alguna validación puntual durante el desarrollo, y listo. Después del deploy la operación corre por nuestra cuenta."
2. **¿Necesito saber de tecnología?** → "No. Trabajamos en tu idioma y te explicamos todo lo que necesitás saber para tomar decisiones, sin jerga. Si querés involucrarte a nivel técnico, podemos, pero no es requisito."
3. **¿De quién es el código cuando terminamos?** → "Tuyo. El código, los diseños, las cuentas, todo. Te lo entregamos con acceso completo y sin ataduras. Si querés mudar de proveedor mañana, podés."
4. **¿Cómo sé que el proyecto avanza bien?** → "Ves el avance en tiempo real. Te mostramos demos cortas, te pasamos acceso a un entorno de prueba donde probar lo que vamos construyendo, y tenemos una reunión corta cada una o dos semanas para alinear."
5. **¿Puedo agregar cosas nuevas después?** → "Sí, y es lo más común. Después del lanzamiento arrancamos una etapa de mejora continua: sumás features, ajustás cosas, escalás lo que funciona. Es un sistema vivo, no un entregable único."

## Impact

- 1 file modified: `src/sections/faq/FAQ.astro` (just the `faqItems` array; the heading, subhead, Accordion component, and layout remain unchanged).
- ~20 LOC changed (5 new Q&A objects vs 5 old ones; similar length per item).
- 0 files added, 0 design tokens touched.

## Out of Scope

- No changes to FAQ section structure, h2 ("Lo que nos preguntan antes de arrancar"), or subhead ("Si tu pregunta no está acá, escribinos.").
- No changes to Accordion component.
- No new FAQ items beyond 5.
- No changes to other sections.

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| New Q&A tone mismatches brand voice | Low | Voseo neutral, matches existing subhead ("escribinos"). |
| A new question overlaps with Contacto copy | Low | Contacto is conversion-focused; FAQ is reassurance-focused. Different jobs. |
| User wants to tweak individual answers post-apply | High (expected) | Easy single-array edit. |

## Rollback Plan

Single revert: restore the previous 5 transactional Q&A in `faqItems`. Identical file structure.

## Dependencies

- None.

## Success Criteria

- [ ] `faqItems` array contains exactly 5 entries with the new Q&A above.
- [ ] Section heading and subhead unchanged.
- [ ] Accordion renders the 5 items in order.
- [ ] TypeScript clean (`pnpm exec tsc --noEmit`).
