# Proposal: Remove Casos Section

## Why

The `Casos` section is an honest placeholder without real content:

- The subhead itself admits "Todavía no tenemos casos públicos para mostrarte" (we don't have public cases yet).
- Block 1 ("Tipos de proyecto") duplicates the `Servicios` section content (the 3 verticals: Presencia Digital, Automatización, Software a Medida) presented as tags.
- Block 2 ("Stack dominado") is implementation detail — irrelevant to JEMA's non-technical target audience (real estate, construction, dealership owners).
- Block 3 ("Credenciales") is **empty with a `TODO` comment** — a visual hole in the grid.

The section is doing workaround work, not adding real conversion value. The CTA "Agendar diagnóstico" is preserved in `Contacto` (column 1 of the redesigned section). Removing `Casos` shortens the page, focuses attention on the sections that do real work, and is honest about not having social proof yet.

The `Casos.astro` component file stays in `src/sections/casos/` so it can be restored when real cases exist.

## What Changes

| # | Change | Detail |
|---|--------|--------|
| 1 | **Remove `<Casos />` from page composition** | In `src/pages/index.astro`, remove the `import Casos from '../sections/casos/Casos.astro';` line and the `<Casos />` element inside `<main>`. |
| 2 | **Remove "Casos" link from footer nav** | In `src/sections/footer/Footer.astro`, remove the `<li><a href="#casos" class="hover:text-accent">Casos</a></li>` entry from the Navegación column (otherwise it would point to a non-existent anchor and 404 on click). |
| 3 | **Keep `Casos.astro` component file in `src/sections/casos/`** | Per user instruction: leave the component in code for future restoration when real cases exist. |

## Impact

- 2 files modified: `src/pages/index.astro`, `src/sections/footer/Footer.astro`.
- ~3 LOC removed (1 import line + 1 JSX line in index.astro; 1 `<li>` in Footer.astro).
- 1 component file untouched but unused: `src/sections/casos/Casos.astro`.
- 0 design tokens, 0 new components, 0 new files.

### Page composition after this change

| # | Section | Status |
|---|---------|--------|
| 1 | Hero | unchanged |
| 2 | Servicios | unchanged |
| 3 | Cómo trabajamos | unchanged |
| 4 | SobreJema (dark) | unchanged |
| ~~5~~ | ~~Casos~~ | **REMOVED** |
| 6 | FAQ | (being rewritten in parallel `faq-rewrite-5q` change) |
| 7 | Contacto | unchanged (redesigned previously) |
| 8 | Footer | unchanged structurally, but "Casos" link removed from Navegación column |

## Out of Scope

- No changes to other sections.
- No changes to the `Casos.astro` component file (kept for future restoration).
- No changes to design tokens.
- No creation of placeholder "Casos" content (deferred until real cases exist).
- No changes to the SobreJema → FAQ transition visual treatment (user will evaluate visually post-apply and request a separate change if needed).

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| "Casos" link removed from footer creates empty space | Low | The list goes from 7 → 6 items; minor visual density change, no layout break. |
| User regrets removal later | Low | Component file preserved in `src/sections/casos/`. Restoration is 1 import + 1 JSX line. |
| SobreJema dark → FAQ light transition feels too abrupt | Medium | User will evaluate visually. If needed, a follow-up change can add stronger bottom blob bridge to SobreJema or a top blob to FAQ. Not in scope here. |
| Some anchor `#casos` referenced elsewhere | Low | Search confirms only the Footer link references `#casos`. |

## Rollback Plan

Re-add the import line in `index.astro`, re-add `<Casos />` in `<main>`, re-add the `<li>` in footer Navegación. Three single-line edits, fully reversible.

## Dependencies

- None.

## Success Criteria

- [ ] `index.astro` has no `import Casos` line and no `<Casos />` element.
- [ ] `Footer.astro` Navegación column has 6 items (no "Casos" link).
- [ ] `src/sections/casos/Casos.astro` still exists on disk (untouched).
- [ ] No `#casos` anchor is referenced from any rendered link.
- [ ] TypeScript clean (`pnpm exec tsc --noEmit`).
- [ ] Visual: no visible regression in adjacent sections (Cómo trabajamos above, FAQ below).
