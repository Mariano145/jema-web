# Proposal: Footer Soft Transition

## Why

The current transition from `Contacto` (`bg-background` cream) to `Footer` (`bg-text` dark) is an abrupt color jump with no visual bridge. The hero establishes a decorative language (blurred `text-secondary` blobs), but this language stops at the footer, making the bottom of the page feel unfinished. High-trust agency sites soften this boundary with subtle background decoration and a purposeful CTA strip — not curves or gradients, but structural and ornamental continuity.

## What Changes

| # | Change | Detail |
|---|--------|--------|
| 1 | **Footer decorative blobs** | Mirror hero blob pattern on dark footer background. Two SVGs inside `pointer-events-none absolute inset-0 overflow-hidden` (footer gains `relative overflow-hidden`): <br>• Brand-mark blob: `absolute -top-12 -right-24 h-[28rem] w-[28rem] text-secondary opacity-20 blur-3xl` (mirror of hero top-left)<br>• Circle blob: `absolute -bottom-12 -left-24 h-96 w-96 text-secondary opacity-20 blur-3xl` (mirror of hero bottom-right)<br>Opacity reduced to `20` (from hero's `25`) to avoid competing with footer text on dark bg. |
| 2 | **CTA strip at top of footer** | Add a full-width CTA band inside footer, above the 3-column grid:<br>• Headline: "¿Listo para dejar de hacer trabajo repetitivo?"<br>• Subhead: "Agendá un diagnóstico gratuito. Sin compromiso."<br>• Primary: `Button variant="primary"` → `ctas.calendlyUrl` → "Agendar diagnóstico gratuito →"<br>• Secondary: `Button variant="secondary"` → `buildWhatsAppLink(ctas.whatsappMessages.contacto)` → "Hablar por WhatsApp" |
| 3 | **Contacto bottom-left blob** | Add one small decorative blob to `Contacto` to extend the visual language to the last light section before the footer:<br>• `absolute bottom-0 -left-12 h-64 w-64 text-secondary opacity-15 blur-3xl` (circle SVG only; no top-right blob to avoid duplicating hero position) |

## Impact

| File | Change |
|------|--------|
| `src/sections/footer/Footer.astro` | Add blob container, CTA strip markup, import `Button` |
| `src/sections/contacto/Contacto.astro` | Add single bottom-left blob container |
| `src/pages/index.astro` | None — footer already follows contacto |

All site visitors see a softer footer boundary and a clearer final conversion action.

## Out of Scope

- No SVG curves or wave dividers between Contacto and Footer
- No gradient fades or color transitions between sections
- No changes to design tokens
- No rewrite of existing footer columns, legal links, or copyright
- No new pages, routing, or navigation changes
- No changes to `data-nav-dark` behavior or `BrandMark` usage

---

## Result Contract

- **status**: proposed
- **executive_summary**: Add mirrored decorative blobs and a CTA strip to the footer to soften the Contacto→Footer transition while extending the hero's established visual language. Include a small decorative blob in Contacto for continuity. Zero changes to tokens, curves, gradients, or existing footer content.
- **artifacts**: `openspec/changes/footer-soft-transition/proposal.md`
- **next_recommended**: `sdd-spec` — delta specs for modified `landing` capability (footer decoration + CTA strip), or proceed to `sdd-design` since the visual approach is already user-confirmed.
- **risks**: Low. Purely presentational, additive changes. Minor risk: CTA strip increases footer vertical height on mobile — verify `py-12 md:py-16` rhythm remains balanced.
- **skill_resolution**: paths-injected
