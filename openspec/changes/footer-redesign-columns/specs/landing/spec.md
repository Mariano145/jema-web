# Delta Spec: Footer Columns Redesign

## ADDED Requirements

Ninguno.

## MODIFIED Requirements

### Requirement: Footer Section with Decorative Continuity

La landing MUST render the Footer section on dark background with decorative SVG blobs that mirror the Hero's established decorative language. The footer MUST center its 3 columns (Brand, Contacto, Navegación) within the `max-w-7xl` container, distribute them evenly along the bottom border-t line width with appropriate gap, and the third column MUST be a sitemap-style nav (`Navegación`) with internal section anchors. The footer acts as a quiet structural close; the conversion zone lives in the Contacto section above.

(Previously: 3 columns left-aligned in cells with `gap-8`; third column was `Legal` with 2 placeholder legal links.)

#### Scenario: Footer renders with mirrored decorative blobs

- GIVEN el usuario llega al final de la landing
- WHEN la sección Footer es visible
- THEN el footer contiene 2 SVG blobs decorativos (estilo brand-mark + círculo) en color `text-secondary` con `opacity-20` y `blur-3xl`
- AND un blob está posicionado en la zona superior derecha, otro en la inferior izquierda (espejo del Hero)

#### Scenario: Columnas centradas y distribuidas en el footer

- WHEN el Footer es visible
- THEN las 3 columnas (Brand, Contacto, Navegación) están centradas dentro del ancho del bottom border-t
- AND cada columna es content-width (no se estira al ancho de la celda)
- AND las columnas están separadas con gap apropiado (mayor que el actual `gap-8`)
- AND en mobile las columnas se apilan verticalmente

#### Scenario: Columna Navegación con anchors de sección

- WHEN el Footer es visible
- THEN la tercera columna tiene header `<h4>Navegación</h4>`
- AND contiene 7 anchor links a las secciones de la landing: `Inicio` (`#top`), `Servicios` (`#servicios`), `Cómo trabajamos` (`#como-trabajamos`), `Nosotros` (`#sobre-jema`), `Casos` (`#casos`), `FAQ` (`#faq`), `Contacto` (`#contacto`)
- AND los anchor links usan scroll behavior smooth (ya habilitado globalmente via `html { scroll-behavior: smooth }` en `global.css`)

#### Scenario: Footer accesible (no captura interacción)

- WHEN el usuario interactúa con el footer
- THEN los blobs decorativos no interfieren con clics ni foco (atributo `pointer-events-none`)
- AND los blobs tienen `aria-hidden="true"`

## REMOVED Requirements

Ninguno.

## RENAMED Requirements

Ninguno.
