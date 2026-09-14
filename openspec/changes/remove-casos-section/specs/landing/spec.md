# Delta for Landing: Remove Casos Section

## ADDED Requirements

Ninguno.

## MODIFIED Requirements

Ninguno.

## REMOVED Requirements

### Requirement: Casos / Trayectoria Section (REMOVED from landing)

La landing NO MUST incluir una sección "Casos" o "Trayectoria" hasta que JEMA tenga casos públicos reales para mostrar.

(Previously: la landing debía incluir una sección con 3 bloques — Tipos de proyecto, Stack dominado, Credenciales — como placeholder honesto de los casos reales.)

#### Scenario: Landing no renderiza sección Casos

- WHEN la página carga completamente
- THEN no existe ningún `<section id="casos">` en el DOM
- AND el array de imports en `src/pages/index.astro` no incluye `Casos`
- AND ningún enlace renderizado apunta a `#casos`

#### Scenario: Footer no enlaza a Casos

- WHEN el Footer es visible
- THEN la columna "Navegación" NO contiene un anchor link con `href="#casos"`
- AND la cantidad de items de Navegación es 6 (no 7)

## RENAMED Requirements

Ninguno.
