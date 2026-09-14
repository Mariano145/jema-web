# Delta for Landing: FAQ Rewrite 5Q

## ADDED Requirements

Ninguno.

## MODIFIED Requirements

### Requirement: FAQ Section

La landing MUST incluir una sección FAQ con exactamente 5 preguntas que cubran los ejes relacionales del partnership con JEMA: (1) tiempo que le toma al cliente, (2) barrera de entrada técnica, (3) ownership del código y assets, (4) visibilidad del proceso durante el desarrollo, (5) flexibilidad post-launch. Las preguntas MUST escribirse en español con voseo neutro amplio.

(Previously: 5 preguntas transaccionales sobre precio, tiempo, alcance, post-deploy y geografía.)

#### Scenario: FAQ muestra 5 preguntas relacionales

- GIVEN el usuario hace scroll a la sección FAQ
- WHEN la sección es visible
- THEN el array `faqItems` contiene 5 entradas
- AND la primera pregunta es "¿Cuánto te toma a vos?"
- AND la segunda es "¿Necesito saber de tecnología?"
- AND la tercera es "¿De quién es el código cuando terminamos?"
- AND la cuarta es "¿Cómo sé que el proyecto avanza bien?"
- AND la quinta es "¿Puedo agregar cosas nuevas después?"

#### Scenario: Las respuestas son on-brand

- WHEN el usuario expande cualquier pregunta del FAQ
- THEN la respuesta es concisa (1-3 oraciones)
- AND usa voseo (consistente con el subhead "escribinos")
- AND no contiene jerga técnica innecesaria

## REMOVED Requirements

Ninguno.

## RENAMED Requirements

Ninguno.
