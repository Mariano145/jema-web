# Delta Spec: Contacto Redesign

## ADDED Requirements

### Requirement: Calendly CTA en Contacto

La sección Contacto MUST ofrecer acceso directo a Calendly mediante un CTA button que abre `ctas.calendlyUrl` en el mismo tab. La sección NO MUST embeber Calendly como iframe.

#### Scenario: Calendly CTA reemplaza el iframe

- GIVEN el usuario llega a la sección Contacto
- WHEN la sección es visible
- THEN la columna "Agendar llamada" muestra un `<button>` o `<a>` con texto "Agendar diagnóstico gratuito" apuntando a `ctas.calendlyUrl`
- AND NO hay `<iframe>` apuntando a Calendly en ninguna parte de la página

---

### Requirement: Canales directos paralelos en Contacto

La sección Contacto MUST consolidar WhatsApp y Email en una única columna como canales paralelos, cada uno con su SLA de respuesta visible.

#### Scenario: Sub-card WhatsApp visible

- WHEN el usuario ve la sección Contacto
- THEN existe una sub-card con título "WhatsApp" y subtítulo "Respuesta inmediata"
- AND contiene un botón "Hablar por WhatsApp" que abre `buildWhatsAppLink(ctas.whatsappMessages.contacto)`

#### Scenario: Sub-card Email visible

- WHEN el usuario ve la sección Contacto
- THEN existe una sub-card con título "Email" y subtítulo "Respuesta < 1h"
- AND contiene un mailto a `ctas.emailContact` estilizado como botón secundario

---

### Requirement: Formulario de contacto con campos B2B

El formulario de contacto MUST permitir capturar el nombre de la empresa del lead y categorizar el tema de la consulta, además de los campos existentes.

#### Scenario: Formulario incluye campo Empresa

- WHEN el usuario ve el formulario
- THEN existe un input opcional con label "Empresa" y `id="empresa"`
- AND el valor se incluye en el body del POST

#### Scenario: Formulario incluye dropdown Tema

- WHEN el usuario ve el formulario
- THEN existe un `<select>` opcional con `id="tema"` y opciones: `""` (placeholder), `presenciaDigital`, `automatizacion`, `softwareMedida`, `otro`
- AND el valor seleccionado se incluye en el body del POST

#### Scenario: Formulario envía al endpoint configurado

- WHEN el usuario completa los campos requeridos y hace clic en "Enviar mensaje"
- THEN el botón se deshabilita y muestra "Enviando..."
- AND se hace POST a `ctas.formEndpoint` con `{ nombre, empresa, email, tema, mensaje }` en JSON
- AND si la respuesta es `ok`, se reemplaza el form por un mensaje de éxito on-brand
- AND si la respuesta es error o falla la red, se muestra un mensaje de error con sugerencia de fallback a WhatsApp

---

### Requirement: Botón submit accesible y correcto

El formulario MUST usar un `<button type="submit">` real (no un `<a href="#">`), con estilo coherente al resto de los CTAs del sitio.

#### Scenario: El botón es `<button type="submit">`

- WHEN el HTML del formulario se inspecciona
- THEN el botón "Enviar mensaje" es un `<button>` con `type="submit"`
- AND hereda los variants del componente `SubmitButton.astro` (primary/secondary/ghost)
- AND soporta `disabled` con estilo atenuado

## MODIFIED Requirements

Ninguno.

## REMOVED Requirements

Ninguno.

## RENAMED Requirements

Ninguno.
