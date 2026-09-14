# Proposal: Contacto Redesign

## Why

The current `Contacto` section has three UX problems discovered after first deployment:

1. **Calendly iframe is broken UX on landing pages.** It is heavy (loads an entire third-party app), slow on mobile (no scroll, fixed 600px height dominates the viewport), and steals attention from the form (the deep-engagement option). User feedback: "la primer columna está muy mal". Replace with a CTA button → opens Calendly in same tab. Standard B2B pattern.

2. **Contact channels are scattered, not parallel.** Today WhatsApp and Email live in different places (WhatsApp in column 2, Email in footer). A user comparing "which is faster" has to mentally re-map. Consolidate them in one column as parallel sub-cards with their own speed SLAs — matches Codeva's pattern and clarifies the choice.

3. **Contact form lacks B2B context fields.** Today it asks for `nombre`, `email`, `mensaje`. For a B2B audience (inmobiliarias, constructoras, concesionarias, etc.), knowing the company upfront is essential to prioritize and tailor the response. Codeva's form has it; JEMA's doesn't. Also, leads arrive uncategorized — JEMA has to ask "what do you need?" in the first reply, wasting a round-trip.

**Bonus discoveries during code review:**

- **🐛 Bug 1 (form submit broken):** `ContactForm.astro` used `<Button variant="primary" href="#" type="submit">`. The `Button.astro` component ALWAYS renders an `<a>` tag. Per HTML spec, only `<button type="submit">` and `<input type="submit">` can submit a form. So "Enviar mensaje" was navigating to `#` and never triggering the JS submit handler. Form has been non-functional since day 1.
- **🐛 Bug 2 (fetch URL broken):** The submit handler called `fetch('${ctas.formEndpoint}', ...)`. Single-quoted strings in JS don't interpolate `${...}` — the literal string `${ctas.formEndpoint}` was being sent as the URL. Fetch has always failed.

Both bugs are fixed in this change.

## What Changes

| # | Change | Detail |
|---|--------|--------|
| 1 | **New `SubmitButton.astro` component** | Renders `<button type="submit">` with the same variants as `Button.astro` (primary / secondary / ghost), plus `disabled` styling. Required because `Button.astro` always renders `<a>` and can't submit forms. |
| 2 | **Replace Calendly iframe with CTA** | In `Contacto.astro` column 1: remove `<iframe src={ctas.calendlyUrl} ...>`. Add a `<Button variant="primary" href={ctas.calendlyUrl}>Agendar diagnóstico gratuito →</Button>`. Keep heading and add descriptive copy. |
| 3 | **Redesign column 2 as channels cards** | Replace single WhatsApp button with two sub-cards (WhatsApp + Email), each with a title, response-time SLA, and primary action. WhatsApp uses `Button` component (deep-link). Email uses inline `<a>` styled as a secondary button (mailto). |
| 4 | **Add `empresa` field to form** | New optional `<input type="text" id="empresa" name="empresa">` between Nombre and Email. Optional — solo/freelance leads aren't forced to fill it. |
| 5 | **Add `tema` dropdown to form** | New optional `<select>` with options: empty (placeholder), `presenciaDigital`, `automatizacion`, `softwareMedida`, `otro`. Keys match `ctas.whatsappMessages` keys so the backend can pre-fill WhatsApp message templates. Optional. |
| 6 | **Replace form Button with SubmitButton** | Fix bug 1: the form submit handler now actually fires. |
| 7 | **Fix fetch URL bug** | Use backtick-less direct value (`fetch(ctas.formEndpoint, ...)`) instead of single-quoted pseudo-template. |
| 8 | **Loading state on submit** | SubmitButton text → "Enviando..." and `disabled` while fetch is in flight. Prevents double-submit. |
| 9 | **Better success/error messages** | Success: green-tinted card "Listo. Te respondemos en menos de 24h hábiles." with cross-links to Servicios and Cómo trabajamos. Error: red text with WhatsApp fallback suggestion. |

## Impact

| File | Change |
|------|--------|
| `src/components/ui/SubmitButton.astro` | **New** — ~30 LOC. Variants mirror `Button.astro`. |
| `src/sections/contacto/Contacto.astro` | Modified — column 1 CTA replaces iframe; column 2 restructured into 2 sub-cards; column 3 unchanged structure (just renders the form). |
| `src/components/forms/ContactForm.astro` | Modified — 2 new fields, 2 bug fixes, loading state, better messages. |

- ~120 LOC changed total (counting new SubmitButton component and form additions)
- 0 design tokens touched
- 0 new pages
- 1 new component (SubmitButton)
- 2 bug fixes (form non-functional since day 1)

## Out of Scope

- No changes to decorative blob in Contacto (stays).
- No changes to other sections.
- No real backend for `ctas.formEndpoint` (still a TODO placeholder — the form is now correctly wired, ready to point at a real endpoint).
- No LFPD/GDPR consent checkbox (premature — JEMA collects email + optional empresa only, no sensitive data; add later if collecting phone or location).
- No phone field in form (user didn't ask, optional in B2B).
- No reCAPTCHA / honeypot spam protection (premature; add when real submissions arrive).
- No analytics events on submit (premature).

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Column 2 sub-cards feel visually heavier than other columns | Low | Sub-cards use `bg-white` with thin border — they read as "card" not "block". Visual weight balances the form column. |
| SubmitButton API drift from Button | Low | SubmitButton variants and base classes are copy-pasted from Button for parity. Future styling changes need to update both. |
| Tema dropdown option values need backend mapping | Low | Values match existing `ctas.whatsappMessages` keys; backend can do `whatsappMessages[tema] ?? whatsappMessages.default`. |
| User prefers WhatsApp/Email as separate columns | Low | Easy to split column 2 into 2 columns (4-col grid) if requested. |

## Rollback Plan

Single revert (3 files: Contacto.astro, ContactForm.astro, delete SubmitButton.astro). Restores prior state exactly.

## Dependencies

- None.

## Success Criteria

- [ ] Calendly iframe is gone from `Contacto.astro`; replaced by a CTA button.
- [ ] Column 2 contains 2 sub-cards (WhatsApp + Email), each with title + response SLA + primary action.
- [ ] `Contacto.astro` still has 3 visible columns (no grid restructure beyond the redesign described).
- [ ] `ContactForm.astro` has 5 fields: Nombre, Empresa (new), Email, Tema (new, dropdown), Mensaje.
- [ ] `SubmitButton.astro` exists and is used by the form.
- [ ] Form submit handler: clicking the button triggers validation → loading state → fetch → success/error UI.
- [ ] Success message includes cross-links to Servicios and Cómo trabajamos.
- [ ] TypeScript clean (`pnpm exec tsc --noEmit`).
