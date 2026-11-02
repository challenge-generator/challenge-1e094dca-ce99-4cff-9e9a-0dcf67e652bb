# Refactorización de código eCommerce aplicando principios de código limpio

En un proyecto eCommerce, el equipo de desarrollo ha identificado varias áreas donde el código no cumple con los principios de código limpio basados en YAGNI, DRY, SOLID y KISS. Como desarrollador frontend avanzado, tu misión es refactorizar el código existente para mejorar su mantenibilidad, escalabilidad y legibilidad. Los actores involucrados son el equipo de desarrollo, los clientes del eCommerce y los proveedores de servicios externos. El sistema debe manejar volúmenes de tráfico pico de hasta 10,000 usuarios simultáneos con una latencia máxima de 200ms.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Principios de código limpio |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 10 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y generará un ZIP listo para usar.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Un IDE o editor de código.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y generará un archivo ZIP descargable. Descárgalo y extráelo en la carpeta donde quieras trabajar.
- Verifica que el proyecto arranca sin errores.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no genera el ZIP automáticamente al terminar el análisis, escríbele: "genera el ZIP ahora".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Identificación de áreas de mejora

**Objetivo:** Identificar secciones del código que no cumplen con los principios de código limpio.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Analiza el código existente para identificar áreas que no siguen los principios YAGNI, DRY, SOLID y KISS.
- Documenta las áreas identificadas y propone mejoras.

**Entregable:** Documento con áreas de mejora identificadas y propuestas de refactorización.

<details>
<summary>Pistas de conocimiento</summary>

- Principios de código limpio
- Patrones de diseño comunes en frontend

</details>

### Fase 2: Refactorización inicial

**Objetivo:** Refactorizar el código para aplicar los principios de código limpio.

**Tiempo estimado:** 4 horas

**Instrucciones:**

- Aplica los principios YAGNI, DRY, SOLID y KISS en las áreas identificadas.
- Realiza cambios en el código para mejorar su estructura y legibilidad.

**Entregable:** Código refactorizado siguiendo los principios de código limpio.

<details>
<summary>Pistas de conocimiento</summary>

- Técnicas de refactorización
- Herramientas de análisis de código

</details>

### Fase 3: Validación y pruebas

**Objetivo:** Validar que el código refactorizado cumple con los principios y funciona correctamente.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Escribe pruebas unitarias y de integración para validar el código refactorizado.
- Realiza pruebas de carga para asegurar que el sistema maneja el volumen de tráfico esperado.

**Entregable:** Pruebas unitarias y de integración que validan el código refactorizado.

<details>
<summary>Pistas de conocimiento</summary>

- Técnicas de pruebas en frontend
- Herramientas de pruebas de carga

</details>

### Fase 4: Revisión y documentación

**Objetivo:** Revisar el código refactorizado y documentar los cambios realizados.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Realiza una revisión del código con tus compañeros para asegurar que se sigan los principios de código limpio.
- Documenta los cambios realizados y las razones detrás de cada decisión.

**Entregable:** Documento con la revisión del código y la documentación de los cambios.

<details>
<summary>Pistas de conocimiento</summary>

- Prácticas de revisión de código
- Técnicas de documentación

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué son los principios de código limpio y por qué son importantes?
- **paraQueSirve**: ¿Cómo aplican los principios de código limpio en un proyecto eCommerce?
- **comoSeUsa**: ¿Cómo refactorizarías el código para seguir los principios de código limpio?
- **erroresComunes**: ¿Cuáles son los errores comunes al aplicar los principios de código limpio?
- **queDecisionesImplica**: ¿Qué decisiones debes tomar al refactorizar el código para seguir los principios de código limpio?

## Criterios de Evaluacion

- Identificación correcta de áreas de mejora en el código.
- Aplicación efectiva de los principios de código limpio en la refactorización.
- Escrituras de pruebas unitarias y de integración que validan el código refactorizado.
- Realización de pruebas de carga para asegurar el manejo del volumen de tráfico esperado.
- Revisión del código con compañeros y documentación de los cambios realizados.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT). Devuelve un ZIP con el proyecto. Sirve si no tenes un agente en el IDE.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install && npx tsc --noEmit
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
