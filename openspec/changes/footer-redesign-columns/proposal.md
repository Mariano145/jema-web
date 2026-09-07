# Proposal: Footer Columns Redesign

## Why

Two user-reported issues with the current Footer layout after the previous `remove-footer-cta-strip` change:

1. **Columns feel left-aligned and cramped.** The 3 columns (`Brand`, `Contacto`, `Legal`) currently use `md:grid-cols-3` with `gap-8`. Each column fills its cell (left-aligned to cell start), so the layout reads as "3 left-aligned blocks across the page" rather than as a centered trio. The bottom border-t line establishes a clear horizontal axis the columns should distribute along, not fight.

2. **Legal column is dead weight.** It contains 2 placeholder legal links (`Privacidad`, `Términos`) that point to `#privacidad` / `#terminos` anchors (still TODO). For visitors who came for the product, the footer offers no navigation utility — only broken promises. Replacing it with a sitemap-style nav column adds real value: visitors can jump to any section from the footer.

## What Changes

| # | Change | Detail |
|---|--------|--------|
| 1 | **Center the 3 columns** | Change grid classes from `grid grid-cols-1 gap-8 md:grid-cols-3` to `grid grid-cols-1 gap-10 md:grid-cols-3 md:items-start md:justify-items-center md:gap-16`. Each column becomes content-width and centered within its 1/3 cell; cells distribute evenly across `max-w-7xl` (matching the bottom border-t line width). |
| 2 | **Rename Legal → Navegación** | Change header from `<h4>Legal</h4>` to `<h4>Navegación</h4>`. Replace the 2 placeholder legal `<a>` links with a `<ul>` of section anchors (decision A — see below). The 2 legal links are removed entirely (they were TODOs pointing to non-existent pages). |

## Decision points flagged

### A. Footer nav link count: 7 (all sections + Inicio) vs 5 (match navbar exactly)

The user said "todas las secciones, igual que el navbar". The navbar omits `Casos` (and `top` — the brand logo serves as back-to-top). Two interpretations:

- **Interpretation A (recommended):** include ALL sections + `Inicio` = 7 links. Honors the explicit "todas las secciones" instruction. The footer is the right place for a full sitemap; the navbar's compact 5-item omission of Casos is a UX choice for a sticky top nav, not a rule for the footer.
- **Interpretation B:** include exactly the navbar's 5 links (no `Casos`, no `Inicio`). Honors the "igual que el navbar" instruction but contradicts "todas".

**This proposal implements A (7 links)** as the default. If the user meant B, the implementation is a 30-second revert (remove 2 `<li>`).

### B. Include `Inicio` (#top) as a footer link

**Recommended: yes** (per "todas las secciones"). The navbar doesn't have it because the JEMA logo serves as back-to-top — but in the footer there's no logo-click-to-top affordance, so an explicit `Inicio` anchor is useful.

### C. Remove legal links entirely

**Recommended: yes.** They were placeholders (`{#privacidad}`, `{#terminos}` pointing to TODO pages). No real legal pages exist in the codebase. Removing them is honest UX.

## Impact

| File | Change |
|------|--------|
| `src/sections/footer/Footer.astro` | Grid classes updated; one column renamed; 2 links replaced with 7-item `<ul>`; 2 legal `<a>` tags deleted; minor import impact (none — `ctas.legalLinks` is no longer referenced in this file after removal). |

- ~15 LOC changed (class additions, header rename, link list replacement)
- 0 files added
- 0 new components
- 0 design token changes

## Out of Scope

- No changes to the decorative blob container in Footer (the 2 SVGs stay).
- No changes to `relative overflow-hidden` on the footer root.
- No changes to `relative z-10` on the 3-column grid and copyright strip.
- No changes to `Contacto.astro`.
- No design token changes.
- No new components or files.
- No creation of real legal pages (`/privacidad`, `/terminos`) — those are a separate concern.
- No new internal nav config file — section list is inline in Footer.astro (matches existing inline pattern for nav links).

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| 7 links too long for mobile | Low | Stack vertically on mobile (`grid-cols-1`); the column only fills 1/3 width on desktop. |
| `justify-items-center` creates uneven cell widths | Low | With content-width children and equal-width grid cells, each child sits centered in its 1/3 — visually balanced. |
| User actually wanted 5 links (navbar match) | Medium | Easy revert; documented as decision A vs B above. |

## Rollback Plan

Single-commit revert. Restoring the previous grid classes and the 2 legal `<a>` tags returns the footer to its pre-change state.

## Dependencies

- None.

## Success Criteria

- [ ] Footer grid uses `md:justify-items-center md:gap-16` (or equivalent centered distribution).
- [ ] Third column header reads `Navegación`.
- [ ] Third column contains exactly 7 anchor links: `Inicio`, `Servicios`, `Cómo trabajamos`, `Nosotros`, `Casos`, `FAQ`, `Contacto` (interpretation A).
- [ ] The 2 placeholder legal links (`Privacidad`, `Términos`) are removed from the footer.
- [ ] Decorative blobs, contact column, and copyright remain visually unchanged.
- [ ] TypeScript clean (`pnpm exec tsc --noEmit`).
