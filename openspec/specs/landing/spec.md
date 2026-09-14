# Landing Specification

## Purpose

Especificación de la landing one-page de JEMA. Define las 8 secciones obligatorias, su contenido, CTAs y comportamiento esperado. El spec describe QUÉ debe tener cada sección, no CÓMO se implementa.

## Requirements

### Requirement: Hero Section

La landing MUST incluir una sección Hero visible immediately above the fold con propuesta de valor clara, CTA primario (Calendly) y CTA secundario (WhatsApp).

#### Scenario: Hero visible al cargar

- GIVEN el usuario accede a la landing
- WHEN la página carga completamente
- THEN el Hero es visible sin scroll
- AND contiene propuesta de valor en español neutral amplio
- AND muestra CTA primario "Agendar diagnóstico gratuito" (enlace a Calendly)
- AND muestra CTA secundario "Hablar por WhatsApp" (enlace a WhatsApp)

#### Scenario: CTAs del Hero son clickeables

- GIVEN el usuario ve el Hero
- WHEN hace clic en "Agendar diagnóstico gratuito"
- THEN se abre Calendly embebido o modal
- WHEN hace clic en "Hablar por WhatsApp"
- THEN se abre WhatsApp con mensaje predefinido

---

### Requirement: Servicios Section

La landing MUST incluir una sección con las 3 verticales de servicio, cada una con descripción, CTA contextual y opción de WhatsApp.

#### Scenario: Tres verticales visibles

- GIVEN el usuario hace scroll a la sección Servicios
- WHEN la sección es visible
- THEN muestra 3 cards: "Presencia Digital", "Automatización", "Software a Medida"
- AND cada card tiene descripción breve (1-2 líneas)
- AND cada card tiene CTA contextual específico

#### Scenario: CTAs contextuales por vertical

- GIVEN el usuario ve una card de servicio
- WHEN hace clic en el CTA contextual
- THEN "Presencia Digital" → "Solicitar cotización" (form o Calendly)
- AND "Automatización" → "Agendar diagnóstico gratuito" (Calendly)
- AND "Software a Medida" → "Hablar con un arquitecto" (WhatsApp o form)

#### Scenario: WhatsApp disponible en cada vertical

- GIVEN el usuario ve una card de servicio
- WHEN busca opción de contacto rápido
- THEN cada card muestra enlace secundario a WhatsApp

---

### Requirement: Cómo Trabajamos Section

La landing MUST incluir una sección "Cómo trabajamos" con 3 pasos macro, outcome-focused, sin revelar metodología detallada.

#### Scenario: Tres pasos visibles

- GIVEN el usuario hace scroll a "Cómo trabajamos"
- WHEN la sección es visible
- THEN muestra exactamente 3 pasos numerados
- AND cada paso tiene título breve y descripción outcome-focused
- AND NO revela detalles técnicos de metodología (5 fases protegidas)

#### Scenario: Pasos son outcome-focused

- GIVEN el usuario lee los 3 pasos
- WHEN analiza el contenido
- THEN Paso 1: "Diagnóstico gratuito" (CTA primario)
- AND Paso 2: "Plan a medida" (se define en llamada)
- AND Paso 3: "Implementación y mejora continua" (resultado, no proceso)

---

### Requirement: Sobre JEMA Section

La landing MUST incluir una sección sobre JEMA con propósito y diferencial.

#### Scenario: Propósito visible

- GIVEN el usuario hace scroll a "Sobre JEMA"
- WHEN la sección es visible
- THEN muestra propósito de JEMA (1-2 párrafos)
- AND destaca diferencial como partner tecnológico integral
- AND copy en español neutral amplio

---

### Requirement: FAQ Section

La landing MUST incluir una sección FAQ con objeciones típicas.

#### Scenario: Preguntas frecuentes visibles

- GIVEN el usuario hace scroll a FAQ
- WHEN la sección es visible
- THEN muestra al menos 5 preguntas frecuentes
- AND cada pregunta tiene respuesta clara y concisa
- AND cubre objeciones típicas: precios, tiempos, qué incluye, qué pasa después

#### Scenario: FAQ es expandible

- GIVEN el usuario ve la lista de preguntas
- WHEN hace clic en una pregunta
- THEN se expande para mostrar la respuesta
- AND puede colapsar haciendo clic nuevamente

---

### Requirement: Contacto Section

La landing MUST incluir una sección de contacto final con Calendly, WhatsApp y form alternativo.

#### Scenario: Tres opciones de contacto

- GIVEN el usuario hace scroll a Contacto
- WHEN la sección es visible
- THEN muestra Calendly embebido o enlace directo
- AND muestra botón WhatsApp
- AND muestra formulario alternativo (nombre, email, mensaje)

#### Scenario: Formulario alternativo es funcional

- GIVEN el usuario completa el formulario alternativo
- WHEN hace clic en "Enviar"
- THEN el formulario valida campos obligatorios
- AND envía datos a endpoint configurado
- AND muestra mensaje de confirmación

---

### Requirement: Footer Section

La landing MUST incluir un footer con información de contacto, redes y legal.

#### Scenario: Footer visible al final

- GIVEN el usuario hace scroll al final de la página
- WHEN llega al footer
- THEN muestra información de contacto (email, teléfono si aplica)
- AND muestra enlaces a redes sociales (si existen)
- AND muestra enlaces legales (privacidad, términos si aplican)
- AND muestra copyright con año actual

---

### Requirement: Casos Section (Slots Vacíos)

La landing MUST incluir una sección "Casos" con slots vacíos, preparada para futuro populate con prueba social real.

#### Scenario: Sección existe pero vacía

- GIVEN el usuario hace scroll a la sección Casos
- WHEN la sección es visible
- THEN muestra estructura preparada para casos futuros
- AND NO muestra testimonios inventados
- AND puede mostrar sustitutos honestos: credenciales del founder, stack dominado, mini-cases sin atribución

#### Scenario: Slots preparados para populate futuro

- GIVEN la sección Casos tiene slots vacíos
- WHEN se agregan casos reales en el futuro
- THEN la estructura permite agregar testimonios sin rediseño
- AND cada slot tiene espacio para: logo cliente, testimonio, métrica de resultado

---

### Requirement: WhatsApp Flotante

La landing MUST incluir un botón flotante de WhatsApp visible en todas las secciones.

#### Scenario: Botón flotante siempre visible

- GIVEN el usuario navega la landing
- WHEN hace scroll por cualquier sección
- THEN el botón flotante de WhatsApp permanece visible
- AND está posicionado en esquina inferior derecha
- AND no obstruye contenido principal

#### Scenario: Botón flotante es clickeable

- GIVEN el usuario ve el botón flotante
- WHEN hace clic en el botón
- THEN se abre WhatsApp con mensaje predefinido
- AND el botón tiene tooltip o label "Hablar por WhatsApp"

---

### Requirement: Navegación por Anclas

La landing MUST incluir navegación interna por anclas para saltar entre secciones.

#### Scenario: Menú de navegación visible

- GIVEN el usuario accede a la landing
- WHEN la página carga
- THEN muestra menú de navegación fijo (sticky) en la parte superior
- AND el menú contiene enlaces a: Servicios, Cómo trabajamos, Sobre JEMA, FAQ, Contacto

#### Scenario: Navegación por anclas funciona

- GIVEN el usuario ve el menú de navegación
- WHEN hace clic en un enlace del menú
- THEN la página hace scroll suave a la sección correspondiente
- AND la URL se actualiza con el ancla (#servicios, #como-trabajamos, etc.)

---

### Requirement: Copy en Español Neutral Amplio

Todo el copy de la landing MUST estar en español neutral amplio (Argentina + España), sin modismos regionales.

#### Scenario: Copy sin modismos regionales

- GIVEN el usuario lee cualquier sección de la landing
- WHEN analiza el copy
- THEN NO contiene modismos argentinos (che, boludo, laburo, etc.)
- AND NO contiene modismos españoles (tío, guay, currar, etc.)
- AND usa vocabulario neutral comprensible en ambos mercados

#### Scenario: Tono profesional y directo

- GIVEN el usuario lee el copy
- WHEN analiza el tono
- THEN es profesional pero accesible
- AND evita jerga técnica innecesaria
- AND transmite confianza sin ser arrogante
