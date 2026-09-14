# Delta Spec: Remove Footer CTA Strip

## ADDED Requirements

Ninguno.

## MODIFIED Requirements

### Requirement: Footer Section with Decorative Continuity

La landing MUST render the Footer section on dark background with decorative SVG blobs that mirror the Hero's established decorative language. The footer acts as a quiet structural close; the conversion zone lives in the Contacto section above.

(Previously: included a conversion-focused CTA strip above the 3-column link grid with Calendly and WhatsApp buttons.)

#### Scenario: Footer renders with mirrored decorative blobs

- GIVEN el usuario llega al final de la landing
- WHEN la sección Footer es visible
- THEN el footer contiene 2 SVG blobs decorativos (estilo brand-mark + círculo) en color `text-secondary` con `opacity-20` y `blur-3xl`
- AND un blob está posicionado en la zona superior derecha, otro en la inferior izquierda (espejo del Hero)

#### Scenario: Footer accesible (no captura interacción)

- WHEN el usuario interactúa con el footer
- THEN los blobs decorativos no interfieren con clics ni foco (atributo `pointer-events-none`)
- AND los blobs tienen `aria-hidden="true"`

## REMOVED Requirements

Ninguno.

## RENAMED Requirements

Ninguno.
