# Delta for Landing: Simplify Service Cards

## ADDED Requirements

Ninguno.

## MODIFIED Requirements

### Requirement: Servicios Section

La landing MUST render la sección Servicios con 3 cards, una por vertical (Presencia Digital, Automatización, Software a Medida). Cada card MUST renderizar exactamente un CTA primario (no links secundarios redundantes). El destination del CTA primario puede variar por card (Calendly o WhatsApp) según el tipo de servicio.

(Previously: cada card renderizaba un CTA primario + un link secundario "Hablar por WhatsApp" cuando se pasaba el prop `whatsappMessage`.)

#### Scenario: Cada card tiene un único CTA

- WHEN el usuario ve la sección Servicios
- THEN cada uno de los 3 cards renderiza exactamente un elemento clickeable de acción
- AND no existe un link secundario "Hablar por WhatsApp" dentro de los cards

#### Scenario: CTAs primarios preservados

- WHEN el usuario ve la sección Servicios
- THEN el card "Presencia Digital" tiene CTA que lleva a `ctas.calendlyUrl`
- AND el card "Automatización" tiene CTA que lleva a `ctas.calendlyUrl`
- AND el card "Software a Medida" tiene CTA que lleva a `buildWhatsAppLink(ctas.whatsappMessages.softwareMedida)` (WhatsApp)

## REMOVED Requirements

Ninguno.

## RENAMED Requirements

Ninguno.
