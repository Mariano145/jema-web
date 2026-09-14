# Delta Spec: Footer Soft Transition

## ADDED Requirements

### Requirement: Footer Section with Decorative Continuity

La landing MUST render the Footer section on dark background with decorative SVG blobs that mirror the Hero's established decorative language, and MUST include a conversion-focused CTA strip above the 3-column link grid.

#### Scenario: Footer renders with mirrored decorative blobs

- GIVEN el usuario llega al final de la landing
- WHEN la sección Footer es visible
- THEN el footer contiene 2 SVG blobs decorativos (estilo brand-mark + círculo) en color `text-secondary` con `opacity-20` y `blur-3xl`
- AND un blob está posicionado en la zona superior derecha, otro en la inferior izquierda (espejo del Hero)

#### Scenario: CTA strip visible al tope del footer

- WHEN el Footer es visible
- THEN aparece una banda de CTA antes de la grilla de 3 columnas
- AND contiene un headline "¿Listo para dejar de hacer trabajo repetitivo?"
- AND contiene un subhead "Agendá un diagnóstico gratuito. Sin compromiso."
- AND contiene un botón primario "Agendar diagnóstico gratuito" enlazando a `ctas.calendlyUrl`
- AND contiene un botón secundario "Hablar por WhatsApp" enlazando a `buildWhatsAppLink(ctas.whatsappMessages.contacto)`

#### Scenario: CTAs del footer son clickeables

- WHEN el usuario hace clic en "Agendar diagnóstico gratuito"
- THEN se abre Calendly en el mismo contexto
- WHEN hace clic en "Hablar por WhatsApp"
- THEN se abre WhatsApp con el mensaje predefinido de `ctas.whatsappMessages.contacto`

#### Scenario: Footer accesible (no captura interacción)

- WHEN el usuario interactúa con el footer
- THEN los blobs decorativos no interfieren con clics ni foco (atributo `pointer-events-none`)
- AND los blobs tienen `aria-hidden="true"`

---

### Requirement: Contacto Section with Continuity Blob

La sección Contacto MUST render a single decorative SVG blob in the bottom-left area to extend the page's decorative language into the last light section before the footer.

#### Scenario: Blob decorativo en Contacto

- GIVEN el usuario está en la sección Contacto
- WHEN la sección es visible
- THEN Contacto contiene un SVG blob circular decorativo en `text-secondary` con `opacity-15` y `blur-3xl`
- AND está posicionado en la zona inferior izquierda
- AND no interfiere con interacción (`pointer-events-none`, `aria-hidden="true"`)

---

## MODIFIED Requirements

Ninguno.

## REMOVED Requirements

Ninguno.
