# Proposal: Simplify Service Cards (remove secondary WhatsApp link)

## Why

Each `Card` in the `Servicios` section currently renders TWO action elements:

1. **Primary CTA** — varies per card (e.g., "Solicitar cotización" → Calendly, "Agendar diagnóstico" → Calendly, "Hablar con un arquitecto" → WhatsApp).
2. **Secondary link "Hablar por WhatsApp →"** — added automatically when the `whatsappMessage` prop is passed.

This creates two problems:

- **In Card 3 (Software a Medida):** the primary CTA is already a WhatsApp deep link. The secondary link points to the **same WhatsApp URL** — literally duplicated in the same card.
- **In Cards 1 and 2 (Presencia Digital, Automatización):** the primary goes to Calendly and the secondary adds a WhatsApp escape hatch. The user feedback is that this feels redundant — the primary CTA should be the only call to action per card. The card section is "what we do", not "here are 4 ways to contact us".

User confirmed: keep the primary CTAs as-is, remove the secondary WhatsApp link from the cards.

## What Changes

| # | Change | Detail |
|---|--------|--------|
| 1 | **Remove `whatsappMessage` prop from `Card.astro`** | Drop the prop from the `Props` interface, the destructuring, the `whatsappHref` calculation, and the conditional render block. Also remove the now-unused `buildWhatsAppLink` import. |
| 2 | **Remove `whatsappMessage={...}` from the 3 Cards in `Servicios.astro`** | Three single-line prop removals. |

**What stays unchanged:**
- The `ctas.whatsappMessages` map in `src/config/ctas.ts` — still used by the WhatsApp button in the `Contacto` section (column 2, sub-card "WhatsApp"). Not a UI component, just config.
- The primary CTAs in all 3 service cards (Calendly for Presencia Digital and Automatización, WhatsApp for Software a Medida).
- All other Card props (`title`, `description`, `ctaLabel`, `ctaHref`).
- The Card component's visual design, hover effects, layout.

## Impact

| File | Change |
|------|--------|
| `src/components/ui/Card.astro` | Remove prop + render block + import (~10 LOC removed) |
| `src/sections/servicios/Servicios.astro` | Remove `whatsappMessage={...}` from 3 Cards (3 lines removed) |

- ~13 LOC removed total.
- 0 files added.
- 0 new components.
- 0 design tokens changed.
- The `ctas.whatsappMessages` map stays in `ctas.ts` (still used by Contacto).

## Out of Scope

- No changes to the Card's primary CTA behavior.
- No changes to `ctas.whatsappMessages` (still serves Contacto).
- No changes to other sections.
- No changes to the WhatsApp button in Contacto.

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| User wanted to keep an "alternative" WhatsApp option in some card | Low | The primary CTA on Card 3 IS already a WhatsApp link. If they want an alternative on Cards 1/2, they'd need a different mechanism (e.g., a separate "Other ways to contact" section). |
| Card is used elsewhere with `whatsappMessage` | None | Verified: `Card` is only imported by `Servicios.astro` (3 instances). |
| Removing the secondary link reduces WhatsApp leads | Low | WhatsApp is still the primary CTA on Card 3 and a full sub-card in Contacto. |

## Rollback Plan

Single revert of the 2 files. The `whatsappMessage` prop is restored, all 3 Cards show the secondary link again.

## Dependencies

- None.

## Success Criteria

- [ ] `Card.astro` no longer accepts a `whatsappMessage` prop.
- [ ] Each service card renders exactly one CTA (the primary).
- [ ] The 3 services cards keep their primary destinations (Calendly x2, WhatsApp x1).
- [ ] The `ctas.whatsappMessages` map and `buildWhatsAppLink` helper are still used in `Contacto.astro`.
- [ ] TypeScript clean (`pnpm exec tsc --noEmit`).
