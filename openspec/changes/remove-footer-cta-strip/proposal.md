# Proposal: Remove Footer CTA Strip

## Why

The CTA strip added by `footer-soft-transition` duplicates the conversion zone already present in `Contacto` (Calendly iframe + WhatsApp button + contact form). Having a second conversion moment immediately below the primary one creates redundancy and dilutes focus. User feedback confirms the footer should act as a quiet structural close, not a secondary pitch. This change applies the "one conversion moment per page" principle: let Contacto own the CTA, let the footer own navigation and trust signals.

## What Changes

| # | Change | Detail |
|---|--------|--------|
| 1 | **Remove CTA strip block** | Delete the `<div class="relative z-10 mb-12 border-b border-background/20 pb-12 md:mb-16">` wrapper and its children (`<h3>`, `<p>`, two `<Button>` elements) from `src/sections/footer/Footer.astro` lines 24–40. |
| 2 | **Remove Button import** | Delete `import Button from '../../components/ui/Button.astro';` from the frontmatter (line 3) — no remaining Button usage in Footer.astro. |
| 3 | **Revert footer root padding** | Change footer class from `pt-16 pb-12 md:pt-24 md:pb-16` back to `py-12 md:py-16` — the extra top space was added to balance the now-removed CTA strip. |

## Capabilities

### New Capabilities
- None

### Modified Capabilities
- None (pure presentational removal; no spec-level behavior changes)

## Approach

Surgical deletion: remove the CTA strip markup and its unused import, then revert the padding class. No logic changes, no new components, no design token modifications.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/sections/footer/Footer.astro` | Modified | Remove CTA strip, Button import, and revert padding. |

## Impact

- **1 file modified**: `src/sections/footer/Footer.astro`
- **~20 LOC removed**, 0 added
- **No other files touched**
- All site visitors see a cleaner, less redundant footer.

## Out of Scope

- No changes to the decorative blob container in Footer (the 2 SVGs stay).
- No changes to `relative overflow-hidden` on the footer root.
- No changes to `relative z-10` on the 3-column grid and copyright strip.
- No changes to `Contacto.astro` (blob and conversion zone stay as-is).
- No design token changes.
- No new elements, pages, or routing changes.

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Removing Button import breaks another usage | Low | Confirmed: no other `<Button>` usage exists in Footer.astro. |
| Padding revert feels too tight | Low | `py-12 md:py-16` is the original, pre-CTA value; already validated. |

## Rollback Plan

Revert the single commit. The change is a pure removal — restoring the deleted lines and the original padding class returns the previous state exactly.

## Dependencies

- None

## Success Criteria

- [ ] Footer renders without the CTA strip block.
- [ ] Footer.astro frontmatter no longer imports `Button`.
- [ ] Footer root uses `py-12 md:py-16` padding.
- [ ] Decorative blobs, grid, and copyright remain visually unchanged.

---

## Result Contract

- **status**: proposed
- **executive_summary**: Remove the redundant CTA strip from Footer.astro because Contacto already provides the same Calendly + WhatsApp conversion actions. Revert footer padding to its original value and remove the now-unused Button import. Zero impact on blobs, Contacto, or design tokens.
- **artifacts**: `openspec/changes/remove-footer-cta-strip/proposal.md`
- **next_recommended**: `sdd-spec` — minimal delta (pure removal, no new spec needed) or skip to `sdd-tasks` / `sdd-apply`.
- **risks**: Very low. Single-file, pure removal, no logic changes.
- **skill_resolution**: paths-injected
