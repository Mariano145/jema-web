# Delta for Landing

## ADDED Requirements

Ninguno. El requisito de la sección Sobre JEMA ya existe en la especificación base; este cambio lo modifica.

## MODIFIED Requirements

### Requirement: Sobre JEMA Section

La landing MUST incluir una sección "Sobre JEMA" con propósito y diferencial. La sección MUST renderizarse sobre fondo oscuro (`bg-text`, `#112222`) con texto invertido de la familia `text-background`, manteniendo la legibilidad y las opacidades originales. La sección SHOULD incluir puentes decorativos tipo blob en los bordes superior e inferior para suavizar la transición con las secciones claras adyacentes. El eyebrow "Nosotros" MAY permanecer en `text-secondary` para consistencia de marca, dado que el contraste es aceptable para metadatos decorativos pequeños.
(Previously: sólo exigía la existencia de la sección con propósito y diferencial; no definía tema oscuro ni blobs.)

#### Scenario: Propósito visible

- GIVEN el usuario hace scroll a "Sobre JEMA"
- WHEN la sección es visible
- THEN muestra propósito de JEMA (1-2 párrafos)
- AND destaca diferencial como partner tecnológico integral
- AND copy en español neutral amplio

#### Scenario: SobreJema renders con fondo oscuro

- GIVEN el usuario hace scroll a la sección SobreJema
- WHEN la sección es visible
- THEN el `<section id="sobre-jema">` tiene `bg-text text-background`
- AND todo el texto dentro de la sección es legible con colores de la familia `text-background` (con las mismas opacidades que tenía en su versión clara)

#### Scenario: Blob decorativo en el borde superior

- WHEN la sección SobreJema es visible
- THEN contiene un blob SVG decorativo (círculo grande) en `text-secondary` con `opacity-20` y `blur-3xl`
- AND está posicionado en la zona superior izquierda con offset negativo (`-top-24` o similar) para que "asome" desde arriba
- AND no interfiere con interacción (`pointer-events-none`, `aria-hidden="true"`)

#### Scenario: Blob decorativo en el borde inferior

- WHEN la sección SobreJema es visible
- THEN contiene un blob SVG decorativo espejo del superior, en `text-secondary` con `opacity-20` y `blur-3xl`
- AND está posicionado en la zona inferior derecha con offset negativo
- AND no interfiere con interacción (`pointer-events-none`, `aria-hidden="true"`)

#### Scenario: Contenido del SobreJema sobre los blobs

- WHEN el usuario lee la sección SobreJema
- THEN el texto y la jerarquía visual están sobre los blobs decorativos (no por debajo)
- AND el contenedor interno tiene `relative z-10` para asegurar la capa correcta

## REMOVED Requirements

Ninguno.

## RENAMED Requirements

Ninguno.
