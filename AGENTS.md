# AGENTS.md

Instrucciones para el agente de IA que abra este repositorio (Claude Code, Cursor, Codex, Copilot, Gemini). Se cargan solas: no hay que pegar nada en ningun chat.

## Que es este repositorio

Es el codigo base de un reto de aprendizaje de Pragma: **Refactorización de código eCommerce aplicando principios de código limpio**.

| | |
|---|---|
| Tema | Principios de código limpio |
| Nivel | advanced-l2 |
| Chapter | Frontend |
| Especialidad | VTEX IO |
| Stack | TypeScript / VTEX IO Store Framework |
| Patron arquitectonico | patrón contenedor/presentacional con separación de responsabilidades (SOLID) |
| Tiempo estimado | 10 horas |

## Receta del stack

Esqueleto obligatorio:

- `manifest.json en la raiz (declara vendor, name, builders)`
- `store/blocks con la composicion de bloques`
- `store/interfaces.json`
- `react/ con los componentes`
- `styles/configs con los CSS Handles`

Dependencias:

- vtex.store-framework n/a
- @vtex/styleguide n/a
- react 18.2.0
- react-dom 18.2.0
- @testing-library/react 13.4.0
- @testing-library/jest-dom 5.16.5
- jest 29.5.0
- typescript 5.0.4

## Tu tarea

Dejar este proyecto en estado **verificable**: que el comando de verificacion corra sin errores. Escribi los archivos en disco, en este repositorio. No generes ZIPs ni archivos adjuntos.

En orden:

1. Corre `npm install && npx tsc --noEmit` y mira que falla.
2. Completa lo que falte de la lista de abajo: manifiesto de dependencias, punto de entrada, capa de interfaz y las capas del patron declarado.
3. Arregla SOLO los errores que impiden compilar o arrancar.
4. Volve a correr `npm install && npx tsc --noEmit` hasta que pase.
5. Pará ahí.

## Regla dura: las fases son trabajo del humano

**PROHIBIDO implementar los entregables de las fases.** El valor del reto esta en que la persona los resuelva. Tu trabajo es que tenga un proyecto que arranca; el hueco pedagogico se queda como esta.

No resuelvas nada de esto:

- **Fase 1 — Identificación de áreas de mejora**: Documento con áreas de mejora identificadas y propuestas de refactorización.
- **Fase 2 — Refactorización inicial**: Código refactorizado siguiendo los principios de código limpio.
- **Fase 3 — Validación y pruebas**: Pruebas unitarias y de integración que validan el código refactorizado.
- **Fase 4 — Revisión y documentación**: Documento con la revisión del código y la documentación de los cambios.

Distincion operativa:

- **Arreglar** (si): import faltante, tipo que no existe, dependencia sin declarar, error de sintaxis, archivo referenciado que no existe.
- **No tocar** (no): logica de negocio incompleta, validaciones ausentes, secretos hardcodeados, APIs deprecadas que funcionan, concurrencia insegura, patrones mejorables. Eso es lo que la persona tiene que encontrar.

## Lo que falta y tenes que completar

### 1. Referencias colgando (2)

Salieron de un analisis estatico del codigo que SI esta en el repo. Cada una rompe la compilacion:

- [ ] `react/models/Product.ts` — `ProductImage.find`
      Se invoca `find` sobre `ProductImage`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `react/services/ProductService.ts` — `Product.filter`
      Se invoca `filter` sobre `Product`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

### Presentes (15)

- `tsconfig.json`
- `manifest.json`
- `react/models/Product.ts`
- `store/interfaces.json`
- `store/blocks/home.json`
- `store/blocks/product.json`
- `react/components/containers/ProductDetailContainer.tsx`
- `react/components/presentational/ProductGallery.tsx`
- `react/components/presentational/AddToCartButton.tsx`
- `react/services/ProductService.ts`
- `react/hooks/useProduct.ts`
- `react/__tests__/ProductDetailContainer.test.tsx`
- `react/__tests__/ProductService.test.ts`
- `styles/configs/product.css`
- `README.md`

### Capas del patron declarado

Cada una tiene que existir como directorio real con al menos un archivo. Codigo plano en la raiz no satisface el patron.

- `react/`
- `react/components/`
- `react/components/containers/`
- `react/components/presentational/`
- `react/services/`
- `react/models/`
- `react/hooks/`
- `store/blocks/`
- `store/interfaces/`
- `styles/configs/`

## Verificacion

```bash
npm install && npx tsc --noEmit
```

Ese comando pasando es la definicion de "terminado" para vos.

## Convenciones que tenes que respetar

- Un solo ecosistema: no declares librerias de otro lenguaje ni mezcles gestores de paquetes.
- Toda libreria que uses tiene que estar declarada en el manifiesto de dependencias.
- Todo import declarado tiene que usarse; todo tipo usado tiene que existir o venir de una dependencia declarada.
- El patron es **patrón contenedor/presentacional con separación de responsabilidades (SOLID)**: los contratos (interfaces, puertos) los define la capa interna y los implementa la externa, nunca al revés.
- Los archivos que crees llevan implementacion real, no stubs: sin `TODO`, sin cuerpos vacios, sin `// getters y setters`.

## Contexto del candidato

Sirve para calibrar el nivel del codigo, no para resolver las fases.

- Perfil: Chapter Frontend, Especialidad eCommerce, Tecnología Vtex, Advanced
- Brecha que el reto ataca: Aplicando conscientemente conceptos de diferentes principios de código limpio basados en YAGNI, DRY, SOLID y KISS. Debes refactorizar código existente de un proyecto eCommerce para aplicar estos principios y mejorar la mantenibilidad, escalabilidad y legibilidad del código
- Mision: Candidato con experiencia avanzada en desarrollo frontend eCommerce, trabaja en proyectos complejos con equipos distribuidos.

---

*Generado por Challenge Generator — Pragma. `README.md` tiene el enunciado completo del reto para la persona. `PROMPT_MEJORA.md` es la variante para pegar en un chat, si se prefiere ese flujo.*
