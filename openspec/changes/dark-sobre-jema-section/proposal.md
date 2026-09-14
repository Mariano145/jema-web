# Proposal: Dark SobreJEMA Section

## Why

The landing page reads as "very white" overall. Most sections use `bg-background` (cream `#f5efe5`) or inherit white from the `layout-main` gradient. The `SobreJEMA` section is a short, text-only "thesis statement" — perfect for a spotlight moment. A dark background (`bg-text`, `#112222`) breaks visual monotony, gives the eye a rest, and makes the "Por qué existimos" content land with more weight.

## What Changes

| # | Change | Detail |
|---|--------|--------|
| 1 | **Dark background on SobreJema** | Change `<section>` to `bg-text text-background relative overflow-hidden`. This mirrors the footer palette and inverts the section's color context. |
| 2 | **Add decorative blob at top of SobreJema** | Bleed a soft `text-secondary` blob from the top edge into the dark section, bridging the light `ComoTrabajamos` section above. SVG: single large circle, class `absolute -top-24 -left-12 h-80 w-80 text-secondary opacity-20 blur-3xl`, inside `pointer-events-none absolute inset-0 overflow-hidden` with `aria-hidden="true"`. |
| 3 | **Add decorative blob at bottom of SobreJema** | Mirror blob at the bottom edge, bridging the light `Casos` section below. SVG: single large circle, class `absolute -bottom-24 -right-12 h-80 w-80 text-secondary opacity-20 blur-3xl`, same container rules as top blob. |
| 4 | **Invert text colors** | All `text-text*` classes become `text-background*` with same opacity: `text-text` → `text-background`; `text-text/75` → `text-background/75`; `text-text/80` → `text-background/80`. Inner container gains `relative z-10` to sit above blobs. |
| 5 | **Invert the eyebrow color** | Keep `text-secondary` for the "Nosotros" eyebrow. Teal `#028192` on dark `#112222` provides ~4.2:1 contrast — acceptable for small uppercase decorative metadata and maintains brand consistency with every other eyebrow on the page. |
| 6 | **Adjust inner container for visual balance** | Keep `max-w-3xl`. On dark, the narrow column feels intimate and focused — appropriate for a thesis-statement section. No width change for MVP. |

## Capabilities

### New Capabilities
- None

### Modified Capabilities
- `landing`: The **Sobre JEMA Section** requirement is modified — the section MUST now render with a dark background (`bg-text`), inverted text colors (`text-background` family), and decorative blob bridges at top and bottom boundaries. The content (copy, structure, CTAs) remains unchanged.

## Impact

| File | Change |
|------|--------|
| `src/sections/sobre-jema/SobreJema.astro` | Background, text colors, blob container (~10–15 LOC) |

Zero new files, zero new components, zero design token changes.

## Out of Scope

- No changes to other sections (`ComoTrabajamos`, `Casos`, etc.).
- No changes to the page gradient (`.layout-main`).
- No new design tokens or colors.
- No content rewrite of the SobreJema copy.
- No layout restructure (still single column).
- No new components.
- No SVG curves, waves, or gradient transitions between sections.

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Hard edges to light sections still feel abrupt despite blob bridges | Low | Blob bridges are intentionally subtle. If insufficient, a future iteration can add more blobs or a hairline divider (separate change). |
| `text-secondary` eyebrow contrast on dark is borderline (~4.2:1) | Low | Eyebrow is small, uppercase, decorative metadata — perceptually readable. If strict WCAG AA is required, swap to `text-primary` (~6:1) without breaking brand family. |
| Dark section makes the page feel "long" or broken in two | Low | SobreJema is short (text only, ~17 lines). The dark moment is brief — a pause, not a split. |

## Decision Points

1. **Eyebrow color on dark**: Keep `text-secondary` for brand consistency. It is the same teal used in every other section's eyebrow and in the blob decorations. Contrast is borderline but acceptable for decorative metadata.
2. **Width adjustment**: Keep `max-w-3xl`. Narrower is more intimate on dark; no change needed.
3. **Add accent rule (vertical bar) on left**: No for MVP. Clean text-only dark section is strong enough. Add later if user wants more visual weight.

## Rollback Plan

Revert `src/sections/sobre-jema/SobreJema.astro` to its previous 17-line state (remove `bg-text text-background relative overflow-hidden`, remove blob container, revert text colors to `text-text` family).

## Dependencies

- None. Self-contained visual change.

## Success Criteria

- [ ] SobreJema section renders with `bg-text` dark background.
- [ ] All text inside SobreJema is readable with `text-background` family colors.
- [ ] Two decorative blobs are visible at top and bottom boundaries, consistent with the hero/footer blob language.
- [ ] No visual regression in adjacent sections (`ComoTrabajamos`, `Casos`).
- [ ] No new design tokens or components introduced.

---

## Result Contract

- **status**: proposed
- **executive_summary**: Invert the SobreJEMA section to a dark background (`bg-text`) with `text-background` inverted text and two decorative blob bridges (top and bottom) to soften boundaries with adjacent light sections. Zero new files, tokens, or components — a pure visual rhythm change.
- **artifacts**: `openspec/changes/dark-sobre-jema-section/proposal.md`
- **next_recommended**: `sdd-spec` — delta spec for modified `landing` capability (Sobre JEMA Section requirement), or proceed to `sdd-design` since the visual approach is already user-confirmed.
- **risks**: Low. Purely presentational, single-file change. Minor risk: eyebrow contrast is borderline; easily mitigated by swapping to `text-primary` if needed.
- **skill_resolution**: paths-injected
