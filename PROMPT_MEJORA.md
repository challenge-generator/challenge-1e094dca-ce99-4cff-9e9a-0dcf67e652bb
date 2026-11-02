# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener un ZIP con el proyecto completo y arrancable.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `react/models/Product.ts` — `ProductImage.find`: Se invoca `find` sobre `ProductImage`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `react/services/ProductService.ts` — `Product.filter`: Se invoca `filter` sobre `Product`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

## Como saber que terminaste

```bash
npm install && npx tsc --noEmit
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad eCommerce, Tecnología Vtex, Advanced

### Brecha de conocimiento
Aplicando conscientemente conceptos de diferentes principios de código limpio basados en YAGNI, DRY, SOLID y KISS. Debes refactorizar código existente de un proyecto eCommerce para aplicar estos principios y mejorar la mantenibilidad, escalabilidad y legibilidad del código

### Misión / candidato
Candidato con experiencia avanzada en desarrollo frontend eCommerce, trabaja en proyectos complejos con equipos distribuidos.

### Reto
- Tema: Principios de código limpio
- Seniority: advanced-l2
- Tipo: practical
- Título: Refactorización de código eCommerce aplicando principios de código limpio
- Tiempo estimado: 10 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Identificación de áreas de mejora — objetivo: Identificar secciones del código que no cumplen con los principios de código limpio. — entregable (NO resolver): Documento con áreas de mejora identificadas y propuestas de refactorización.
- Fase 2: Refactorización inicial — objetivo: Refactorizar el código para aplicar los principios de código limpio. — entregable (NO resolver): Código refactorizado siguiendo los principios de código limpio.
- Fase 3: Validación y pruebas — objetivo: Validar que el código refactorizado cumple con los principios y funciona correctamente. — entregable (NO resolver): Pruebas unitarias y de integración que validan el código refactorizado.
- Fase 4: Revisión y documentación — objetivo: Revisar el código refactorizado y documentar los cambios realizados. — entregable (NO resolver): Documento con la revisión del código y la documentación de los cambios.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (ZIP).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Exportación en ZIP
Empaqueta todos los archivos en un único archivo ZIP descargable respetando exactamente
la estructura de rutas indicada por los marcadores.
El ZIP debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: El ZIP debe estar listo para descargar al finalizar. No preguntes si el usuario
quiere generarlo. Simplemente genera el archivo y proporciona el enlace de descarga; No debes desplegar en el chat el resumen de lo que arreglaste al Zip, solo entregalo.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del enlace de descarga del ZIP
No preguntes si el usuario quiere el ZIP: simplemente generalo siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["react/*"]
    }
  },
  "include": ["react/**/*", "store/**/*", "styles/**/*"],
  "exclude": ["node_modules", "**/*.test.tsx", "**/__tests__/**"]
}

// === ARCHIVO: manifest.json ===
{
  "vendor": "vtex",
  "name": "store-clean-code-refactor",
  "version": "1.0.0",
  "builders": {
    "react": "3.x",
    "store": "4.x",
    "styles": "2.x"
  },
  "dependencies": {
    "vtex.store": "2.x",
    "vtex.store-framework": "0.x",
    "vtex.styleguide": "9.x",
    "vtex.product-summary": "2.x",
    "vtex.product-details": "2.x",
    "vtex.product-specifications": "1.x",
    "vtex.search-result": "3.x",
    "vtex.shelf": "1.x",
    "vtex.store-components": "3.x",
    "vtex.store-icons": "0.x"
  },
  "peerDependencies": {
    "react": "18.x",
    "react-dom": "18.x"
  },
  "settings": {
    "title": "Store Clean Code Refactor",
    "description": "Refactored store applying clean code principles",
    "url": {
      "home": "/",
      "products": "/:slug/p"
    },
    "hidden": false
  },
  "policies": [
    {
      "name": "outbound-access",
      "attrs": {
        "allowedHosts": [
          "*.vtex.com",
          "*.vtexpay.com.br",
          "*.vtexapi.com",
          "*.vtexassets.com"
        ]
      }
    }
  ]
}

// === ARCHIVO: react/models/Product.ts ===
/**
 * Modelo de datos para productos en el eCommerce.
 * Define la estructura estricta y validaciones básicas para garantizar consistencia
 * en la manipulación de datos de productos.
 */
export interface ProductImage {
    url: string;
    alt: string;
    isMain: boolean;
}

export interface ProductSpecification {
    name: string;
    values: string[];
}

export interface Seller {
    id: string;
    name: string;
    commertialOffer: {
        availableQuantity: number;
        price: number;
        listPrice: number;
        tax?: number;
    };
}

export interface Product {
    id: string;
    name: string;
    productId: string;
    productName: string;
    brand: string;
    categoryId: string;
    categoryTree: string[];
    linkText: string;
    description: string;
    releaseDate: string;
    skuSpecifications: ProductSpecification[];
    items: {
        itemId: string;
        name: string;
        images: ProductImage[];
        sellers: Seller[];
        referenceId?: string;
        ean?: string;
    }[];
    metaTagDescription?: string;
}

/**
 * Valida que un objeto cumpla con la estructura mínima requerida para ser considerado un Product.
 * @param product - Objeto a validar.
 * @returns `true` si el objeto es válido, `false` en caso contrario.
 */
export function isValidProduct(product: Partial<Product>): product is Product {
    if (!product || typeof product !== 'object') return false;
    
    const requiredFields: Array<keyof Product> = [
        'id', 'name', 'productId', 'productName', 'brand', 
        'categoryId', 'categoryTree', 'linkText', 'description', 'releaseDate', 'items'
    ];
    
    for (const field of requiredFields) {
        if (!(field in product)) return false;
    }
    
    if (!Array.isArray(product.items) || product.items.length === 0) return false;
    
    for (const item of product.items) {
        if (!item.itemId || !item.name || !Array.isArray(item.images) || item.images.length === 0) {
            return false;
        }
        
        if (!Array.isArray(item.sellers) || item.sellers.length === 0) return false;
        
        for (const seller of item.sellers) {
            if (!seller.id || !seller.name || !seller.commertialOffer) return false;
            
            const offer = seller.commertialOffer;
            if (typeof offer.availableQuantity !== 'number' || typeof offer.price !== 'number') {
                return false;
            }
        }
    }
    
    return true;
}

/**
 * Calcula el precio más bajo disponible entre todos los sellers de un producto.
 * @param product - Producto del cual calcular el precio mínimo.
 * @returns Precio mínimo encontrado o `null` si no hay sellers válidos.
 */
export function getMinPrice(product: Product): number | null {
    if (!isValidProduct(product)) return null;
    
    let minPrice = Infinity;
    
    for (const item of product.items) {
        for (const seller of item.sellers) {
            const price = seller.commertialOffer.price;
            if (price < minPrice) {
                minPrice = price;
            }
        }
    }
    
    return minPrice === Infinity ? null : minPrice;
}

/**
 * Obtiene la imagen principal de un SKU específico.
 * @param product - Producto que contiene el SKU.
 * @param itemId - ID del SKU del cual obtener la imagen.
 * @returns URL de la imagen principal o `null` si no se encuentra.
 */
export function getMainImage(product: Product, itemId: string): string | null {
    if (!isValidProduct(product)) return null;
    
    const item = product.items.find(i => i.itemId === itemId);
    if (!item) return null;
    
    const mainImage = item.images.find(img => img.isMain);
    return mainImage ? mainImage.url : item.images[0]?.url ?? null;
}

/**
 * Genera un identificador único para un producto basado en su ID y el ID del SKU.
 * @param productId - ID del producto.
 * @param itemId - ID del SKU.
 * @returns Identificador único en formato `productId/itemId`.
 */
export function generateProductItemKey(productId: string, itemId: string): string {
    return `${productId}/${itemId}`;
}

// === ARCHIVO: store/interfaces.json ===
{
  "product-detail-container": {
    "component": "ProductDetailContainer",
    "render": "client",
    "props": {
      "product": {
        "type": "object",
        "properties": {
          "productId": { "type": "string" },
          "productName": { "type": "string" },
          "description": { "type": "string" },
          "brand": { "type": "string" },
          "items": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "itemId": { "type": "string" },
                "name": { "type": "string" },
                "images": {
                  "type": "array",
                  "items": { "type": "object" }
                },
                "sellers": {
                  "type": "array",
                  "items": { "type": "object" }
                }
              }
            }
          },
          "specificationGroups": {
            "type": "array",
            "items": { "type": "object" }
          }
        },
        "required": ["productId", "productName", "items"]
      },
      "loading": { "type": "boolean" },
      "error": { "type": "string" }
    },
    "required": ["product"]
  },
  "product-gallery": {
    "component": "ProductGallery",
    "render": "client",
    "props": {
      "images": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "imageId": { "type": "string" },
            "url": { "type": "string" },
            "alt": { "type": "string" },
            "label": { "type": "string" }
          },
          "required": ["url"]
        }
      },
      "showThumbs": { "type": "boolean", "default": true },
      "showDots": { "type": "boolean", "default": false },
      "aspectRatio": { "type": "string", "default": "1:1" },
      "maxHeight": { "type": "number", "default": 600 }
    },
    "required": ["images"]
  },
  "add-to-cart-button": {
    "component": "AddToCartButton",
    "render": "client",
    "props": {
      "skuId": { "type": "string" },
      "quantity": { "type": "number", "default": 1 },
      "available": { "type": "boolean", "default": true },
      "price": { "type": "number" },
      "label": { "type": "string", "default": "Agregar al carrito" },
      "onSuccess": {
        "type": "object",
        "properties": {
          "action": { "type": "string", "enum": ["go-to-cart", "show-modal", "none"] }
        }
      }
    },
    "required": ["skuId", "available"]
  },
  "product-summary": {
    "component": "ProductSummary",
    "render": "client",
    "props": {
      "product": { "type": "object" },
      "showBadge": { "type": "boolean", "default": true },
      "showInstallments": { "type": "boolean", "default": true },
      "showSavings": { "type": "boolean", "default": true }
    },
    "required": ["product"]
  },
  "product-price": {
    "component": "ProductPrice",
    "render": "client",
    "props": {
      "product": { "type": "object" },
      "showListPrice": { "type": "boolean", "default": true },
      "showInstallments": { "type": "boolean", "default": true },
      "showSavings": { "type": "boolean", "default": true },
      "showLabels": { "type": "boolean", "default": true }
    },
    "required": ["product"]
  },
  "search-result": {
    "component": "SearchResult",
    "render": "client",
    "props": {
      "searchQuery": { "type": "string" },
      "facets": { "type": "array", "items": { "type": "object" } },
      "products": { "type": "array", "items": { "type": "object" } },
      "pagination": {
        "type": "object",
        "properties": {
          "page": { "type": "number" },
          "perPage": { "type": "number" },
          "total": { "type": "number" }
        }
      },
      "sortOptions": { "type": "array", "items": { "type": "object" } },
      "loading": { "type": "boolean" }
    },
    "required": ["searchQuery", "products"]
  },
  "shelf": {
    "component": "Shelf",
    "render": "client",
    "props": {
      "products": { "type": "array", "items": { "type": "object" } },
      "title": { "type": "string" },
      "columns": { "type": "number", "default": 4 },
      "rows": { "type": "number", "default": 1 },
      "gap": { "type": "string", "default": "8px" },
      "navigationArrows": { "type": "string", "default": "always" },
      "paginationDots": { "type": "string", "default": "never" }
    },
    "required": ["products"]
  },
  "hero-banner": {
    "component": "HeroBanner",
    "render": "client",
    "props": {
      "images": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "url": { "type": "string" },
            "mobileUrl": { "type": "string" },
            "alt": { "type": "string" },
            "link": { "type": "string" },
            "title": { "type": "string" },
            "subtitle": { "type": "string" },
            "callToAction": { "type": "string" }
          },
          "required": ["url"]
        }
      },
      "autoplay": { "type": "boolean", "default": true },
      "autoplaySpeed": { "type": "number", "default": 5000 }
    },
    "required": ["images"]
  }
}

// === ARCHIVO: store/blocks/home.json ===
{
  "store.home": {
    "blocks": [
      "hero-banner#home",
      "shelf#featured-products",
      "shelf#new-arrivals",
      "shelf#best-sellers",
      "info-card#promo",
      "rich-text#home-message"
    ]
  },
  "hero-banner#home": {
    "props": {
      "images": [
        {
          "url": "https://storecomponents.vteximg.com.br/assets/vtex.file-manager-graphql/images/banner-principal-desktop.png",
          "mobileUrl": "https://storecomponents.vteximg.com.br/assets/vtex.file-manager-graphql/images/banner-principal-mobile.png",
          "alt": "Promoción principal",
          "link": "/promociones",
          "title": "Nueva Colección",
          "subtitle": "Descubre las últimas tendencias",
          "callToAction": "Ver más"
        },
        {
          "url": "https://storecomponents.vteximg.com.br/assets/vtex.file-manager-graphql/images/banner-secundario-desktop.png",
          "mobileUrl": "https://storecomponents.vteximg.com.br/assets/vtex.file-manager-graphql/images/banner-secundario-mobile.png",
          "alt": "Segunda promoción",
          "link": "/nuevos",
          "title": "Envío Gratis",
          "subtitle": "En pedidos mayores a $99",
          "callToAction": "Comprar ahora"
        }
      ],
      "autoplay": true,
      "autoplaySpeed": 6000
    }
  },
  "shelf#featured-products": {
    "props": {
      "title": "Productos Destacados",
      "columns": 4,
      "rows": 2,
      "gap": "16px",
      "navigationArrows": "always",
      "paginationDots": "never"
    }
  },
  "shelf#new-arrivals": {
    "props": {
      "title": "Últimos Lanzamientos",
      "columns": 4,
      "rows": 1,
      "gap": "12px",
      "navigationArrows": "always",
      "paginationDots": "never"
    }
  },
  "shelf#best-sellers": {
    "props": {
      "title": "Más Vendidos",
      "columns": 4,
      "rows": 1,
      "gap": "12px",
      "navigationArrows": "mobileOnly",
      "paginationDots": "always"
    }
  },
  "info-card#promo": {
    "props": {
      "id": "promo-info",
      "isFullMode": false,
      "textPosition": "left",
      "imageUrl": "https://storecomponents.vteximg.com.br/assets/vtex.file-manager-graphql/images/info-card-image.png",
      "headline": "ENVÍO EXPRESS",
      "subhead": "Recibe tu pedido en menos de 24 horas",
      "callToActionText": "Ver condiciones",
      "callToActionLink": "/envios",
      "textAlignment": "left"
    }
  },
  "rich-text#home-message": {
    "props": {
      "text": "## Bienvenido a nuestra tienda\n\nEncuentra los mejores productos con la mejor calidad",
      "textPosition": "CENTER",
      "font": "t-heading-1"
    }
  },
  "search-result-page.home": {
    "blocks": ["search-result#home"]
  },
  "search-result#home": {
    "blocks": ["gallery#search", "filter-navigator.v3#search"],
    "props": {
      "recordsPerPage": 12,
      "maxItemsPerPage": 20,
      "summary": {
        "showBadge": true,
        "showInstallments": true,
        "showSavings": true
      }
    }
  },
  "gallery#search": {
    "props": {
      "layout": "responsive",
      "itemsPerRow": {
        "desktop": 4,
        "tablet": 3,
        "phone": 2
      }
    }
  },
  "filter-navigator.v3#search": {
    "props": {
      "categoryFilters": "all",
      "priceRangeFilters": "all",
      "specificationFilters": "all",
      "showQuantity": true,
      "updateOnScroll": true
    }
  }
}

// === ARCHIVO: store/blocks/product.json ===
{
  "store.product": {
    "blocks": [
      "product-detail-container"
    ]
  },
  "product-detail-container": {
    "blocks": [
      "product-gateway",
      "product-title",
      "product-description",
      "product-price#main",
      "product-specifications",
      "product-attachments",
      "product-quantity",
      "add-to-cart-button#product",
      "product-images#main",
      "shipping-simulator",
      "share#product"
    ]
  },
  "product-gateway": {
    "props": {
      "showLabel": true,
      "showIcon": true
    }
  },
  "product-title": {
    "props": {
      "showBrandName": true,
      "showProductReference": true,
      "showSku": false
    }
  },
  "product-description": {
    "props": {
      "showTitle": true,
      "collapseContent": false,
      "maxHeight": 200
    }
  },
  "product-price#main": {
    "props": {
      "showListPrice": true,
      "showInstallments": true,
      "showSavings": true,
      "showLabels": true,
      "showBadge": true,
      "badge": "discount"
    }
  },
  "product-specifications": {
    "props": {
      "specificationGroups": ["all"],
      "collapseOnMobile": true,
      "filterByGroups": []
    }
  },
  "product-attachments": {
    "props": {
      "attachments": ["gift-wrap", "warranty"],
      "showLabels": true
    }
  },
  "product-quantity": {
    "props": {
      "showLabel": true,
      "minQuantity": 1,
      "maxQuantity": 99,
      "warningThreshold": 10,
      "showUnit": true
    }
  },
  "add-to-cart-button#product": {
    "props": {
      "quantity": 1,
      "label": "Agregar al carrito",
      "available": true,
      "onSuccess": {
        "action": "go-to-cart"
      }
    }
  },
  "product-images#main": {
    "props": {
      "showThumbs": true,
      "showDots": false,
      "aspectRatio": "1:1",
      "maxHeight": 600,
      "thumbnailsOrientation": "vertical",
      "zoomMode": "blur-in",
      "zoomFactor": 2
    }
  },
  "shipping-simulator": {
    "props": {
      "showDeliveryEstimate": true,
      "showShippingTable": true,
      "defaultZipCode": "",
      "placeholder": "Ingresa tu CEP"
    }
  },
  "share#product": {
    "props": {
      "socialProviders": ["facebook", "twitter", "whatsapp", "pinterest", "email"],
      "displayMode": "iconAndLabel",
      "loading": false
    }
  },
  "store.product#quick-view": {
    "blocks": [
      "product-detail-container#quick-view"
    ]
  },
  "product-detail-container#quick-view": {
    "blocks": [
      "product-images#quick-view",
      "product-title#quick-view",
      "product-price#quick-view",
      "add-to-cart-button#quick-view"
    ],
    "props": {
      "showDescription": false,
      "showSpecifications": false
    }
  },
  "product-images#quick-view": {
    "props": {
      "showThumbs": false,
      "showDots": true,
      "aspectRatio": "4:3",
      "maxHeight": 300
    }
  },
  "product-title#quick-view": {
    "props": {
      "showBrandName": true,
      "showProductReference": false
    }
  },
  "product-price#quick-view": {
    "props": {
      "showListPrice": false,
      "showInstallments": true,
      "showSavings": false,
      "showLabels": false
    }
  },
  "add-to-cart-button#quick-view": {
    "props": {
      "quantity": 1,
      "label": "Añadir",
      "available": true,
      "onSuccess": {
        "action": "show-modal"
      }
    }
  },
  "store.product.shelf": {
    "blocks": ["shelf#product-shelf"]
  },
  "shelf#product-shelf": {
    "props": {
      "title": "Productos relacionados",
      "columns": 4,
      "rows": 1,
      "gap": "16px",
      "navigationArrows": "always",
      "paginationDots": "never"
    }
  }
}

// === ARCHIVO: react/components/containers/ProductDetailContainer.tsx ===
import React, { useCallback, useMemo, useState } from 'react';
import { Product, getMinPrice, getMainImage, isValidProduct } from '../../models/Product';
import { useProduct } from '../../hooks/useProduct';
import { ProductGallery } from '../presentational/ProductGallery';
import { AddToCartButton } from '../presentational/AddToCartButton';

interface ProductDetailContainerProps {
  productId: string;
  onAddToCart?: (skuId: string, quantity: number) => Promise<void>;
  onError?: (error: Error) => void;
}

export const ProductDetailContainer: React.FC<ProductDetailContainerProps> = ({
  productId,
  onAddToCart,
  onError,
}) => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [cartError, setCartError] = useState<string | null>(null);

  const { product, loading, error, refetch } = useProduct(productId);

  const minPrice = useMemo(() => {
    if (!product) return null;
    return getMinPrice(product);
  }, [product]);

  const mainImage = useMemo(() => {
    if (!product) return null;
    return getMainImage(product);
  }, [product]);

  const allImages = useMemo(() => {
    if (!product || !product.items) return [];
    const images: string[] = [];
    for (const item of product.items) {
      if (item.images && Array.isArray(item.images)) {
        for (const img of item.images) {
          if (img.url && !images.includes(img.url)) {
            images.push(img.url);
          }
        }
      }
    }
    return images;
  }, [product]);

  const handleQuantityChange = useCallback((newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setSelectedQuantity(newQuantity);
      setCartError(null);
    }
  }, []);

  const handleAddToCart = useCallback(async () => {
    if (!product || !isValidProduct(product)) {
      setCartError('Producto no disponible');
      return;
    }

    const firstValidItem = product.items?.find(
      (item) => item.sellers?.[0]?.available && item.sellers?.[0]?.stock > 0
    );

    if (!firstValidItem) {
      setCartError('No hay stock disponible');
      return;
    }

    const skuId = firstValidItem.itemId;

    if (onAddToCart) {
      setIsAddingToCart(true);
      setCartError(null);

      try {
        await onAddToCart(skuId, selectedQuantity);
        setSelectedQuantity(1);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error al añadir al carrito';
        setCartError(errorMessage);
        if (onError && err instanceof Error) {
          onError(err);
        }
      } finally {
        setIsAddingToCart(false);
      }
    }
  }, [product, selectedQuantity, onAddToCart, onError]);

  const handleImageSelect = useCallback((imageUrl: string) => {
    console.log('Imagen seleccionada:', imageUrl);
  }, []);

  if (loading) {
    return (
      <div
        role="status"
        aria-label="Cargando producto"
        style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}
      >
        <span>Cargando...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div
        role="alert"
        aria-live="assertive"
        style={{ padding: '2rem', color: '#c00' }}
      >
        <p>Error al cargar el producto: {error.message}</p>
        <button onClick={() => refetch()}>
          Reintentar
        </button>
      </div>
    );
  }

  if (!product || !isValidProduct(product)) {
    return (
      <div
        role="status"
        aria-live="polite"
        style={{ padding: '2rem' }}
      >
        Producto no encontrado
      </div>
    );
  }

  const productName = product.productName || 'Producto sin nombre';
  const productDescription = product.description || 'Sin descripción disponible';

  return (
    <section
      aria-labelledby="product-title"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        padding: '1rem',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <div>
        <ProductGallery
          images={allImages}
          mainImage={mainImage}
          productName={productName}
          onImageSelect={handleImageSelect}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <header>
          <h1
            id="product-title"
            style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}
          >
            {productName}
          </h1>
          {product.brand && (
            <p style={{ color: '#666', fontSize: '0.875rem' }}>
              Marca: {product.brand}
            </p>
          )}
        </header>

        {minPrice !== null && (
          <div>
            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>
              ${minPrice.toFixed(2)}
            </span>
          </div>
        )}

        <div>
          <h2 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Descripción</h2>
          <p style={{ lineHeight: '1.6', color: '#444' }}>{productDescription}</p>
        </div>

        {product.productSpecifications && product.productSpecifications.length > 0 && (
          <div>
            <h2 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Especificaciones</h2>
            <dl style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.5rem 1rem' }}>
              {product.productSpecifications.map((spec, index) => (
                <React.Fragment key={index}>
                  <dt style={{ fontWeight: 'bold', color: '#666' }}>{spec.specificationName}:</dt>
                  <dd>{spec.specificationValue}</dd>
                </React.Fragment>
              ))}
            </dl>
          </div>
        )}

        <div>
          <label
            htmlFor="quantity-select"
            style={{ display: 'block', marginBottom: '0.5rem' }}
          >
            Cantidad:
          </label>
          <select
            id="quantity-select"
            value={selectedQuantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10))}
            aria-describedby="quantity-help"
            style={{ padding: '0.5rem', fontSize: '1rem' }}
          >
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <span id="quantity-help" className="sr-only">
            Selecciona la cantidad de productos a comprar
          </span>
        </div>

        <AddToCartButton
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          loading={isAddingToCart}
          ariaLabel={`Añadir ${selectedQuantity} ${selectedQuantity === 1 ? 'unidad' : 'unidades'} al carrito`}
        />

        {cartError && (
          <div
            role="alert"
            aria-live="assertive"
            style={{ color: '#c00', padding: '0.5rem', backgroundColor: '#fee' }}
          >
            {cartError}
          </div>
        )}

        {product.sellers && product.sellers.length > 0 && (
          <div style={{ fontSize: '0.875rem', color: '#666' }}>
            <p>Vendido por: {product.sellers[0].sellerName}</p>
          </div>
        )}
      </div>
    </section>
  );
};

ProductDetailContainer.schema = {
  title: 'Contenedor de Detalle de Producto',
  description: 'Componente contenedor que maneja la lógica de negocio para la página de detalle de producto',
  type: 'object',
  properties: {
    productId: {
      title: 'ID del Producto',
      description: 'Identificador único del producto a mostrar',
      type: 'string',
    },
  },
};

// === ARCHIVO: react/components/presentational/ProductGallery.tsx ===
import React, { useState, useCallback, useRef, useEffect } from 'react';

interface ProductGalleryProps {
  images: string[];
  mainImage: string | null;
  productName: string;
  onImageSelect?: (imageUrl: string) => void;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  mainImage,
  productName,
  onImageSelect,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(mainImage);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mainImage && !selectedImage) {
      setSelectedImage(mainImage);
    } else if (mainImage && selectedImage !== mainImage) {
      setSelectedImage(mainImage);
    }
  }, [mainImage, selectedImage]);

  const handleThumbnailClick = useCallback((imageUrl: string) => {
    setSelectedImage(imageUrl);
    if (onImageSelect) {
      onImageSelect(imageUrl);
    }
  }, [onImageSelect]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || !imageContainerRef.current) return;

    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x, y });
  }, [isZoomed]);

  const handleMouseEnter = useCallback(() => {
    setIsZoomed(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsZoomed(false);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, imageUrl: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleThumbnailClick(imageUrl);
    }
  }, [handleThumbnailClick]);

  const displayImage = selectedImage || mainImage || images[0] || '';

  if (!displayImage) {
    return (
      <div
        role="img"
        aria-label={`Galería de ${productName}`}
        style={{
          backgroundColor: '#f5f5f5',
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ color: '#999' }}>Sin imagen disponible</span>
      </div>
    );
  }

  return (
    <div
      role="region"
      aria-label={`Galería de imágenes de ${productName}`}
    >
      <div
        ref={imageContainerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '8px',
          backgroundColor: '#fff',
          marginBottom: '1rem',
        }}
      >
        <img
          src={displayImage}
          alt={`${productName} - Imagen principal`}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            transform: isZoomed ? 'scale(1.5)' : 'scale(1)',
            transformOrigin: isZoomed ? `${zoomPosition.x}% ${zoomPosition.y}%` : 'center',
            transition: 'transform 0.2s ease',
          }}
        />
      </div>

      {images.length > 1 && (
        <div
          role="listbox"
          aria-label="Miniaturas de imágenes"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
            gap: '0.5rem',
          }}
        >
          {images.map((imageUrl, index) => (
            <button
              key={`${imageUrl}-${index}`}
              role="option"
              aria-selected={selectedImage === imageUrl}
              tabIndex={0}
              onClick={() => handleThumbnailClick(imageUrl)}
              onKeyDown={(e) => handleKeyDown(e, imageUrl)}
              style={{
                border: selectedImage === imageUrl ? '2px solid #007bff' : '2px solid transparent',
                borderRadius: '4px',
                padding: '2px',
                backgroundColor: '#f5f5f5',
                cursor: 'pointer',
                overflow: 'hidden',
                transition: 'border-color 0.2s ease',
              }}
            >
              <img
                src={imageUrl}
                alt={`${productName} - Miniatura ${index + 1}`}
                style={{
                  width: '100%',
                  height: '60px',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </button>
          ))}
        </div>
      )}

      {images.length > 0 && (
        <p className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: 0 }}>
          {images.length} imágenes disponibles. Imagen {images.indexOf(selectedImage || '') + 1} de {images.length} seleccionada.
        </p>
      )}
    </div>
  );
};

ProductGallery.schema = {
  title: 'Galería de Producto',
  description: 'Componente presentacional que renderiza la galería de imágenes del producto',
  type: 'object',
  properties: {
    images: {
      title: 'Imágenes',
      description: 'Array de URLs de imágenes del producto',
      type: 'array',
      items: {
        type: 'string',
      },
    },
    mainImage: {
      title: 'Imagen Principal',
      description: 'URL de la imagen principal del producto',
      type: 'string',
    },
    productName: {
      title: 'Nombre del Producto',
      description: 'Nombre del producto para accesibilidad',
      type: 'string',
    },
  },
};

// === ARCHIVO: react/components/presentational/AddToCartButton.tsx ===
import React, { useCallback, useRef, useEffect } from 'react';

interface AddToCartButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  ariaLabel?: string;
  children?: React.ReactNode;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  onClick,
  disabled = false,
  loading = false,
  ariaLabel = 'Añadir al carrito',
  children,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const defaultLabel = 'Añadir al carrito';

  useEffect(() => {
    if (buttonRef.current) {
      if (loading) {
        buttonRef.current.setAttribute('aria-busy', 'true');
      } else {
        buttonRef.current.removeAttribute('aria-busy');
      }
    }
  }, [loading]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    onClick();
  }, [disabled, loading, onClick]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      if (disabled || loading) {
        e.preventDefault();
        return;
      }
      onClick();
    }
  }, [disabled, loading, onClick]);

  const isInteractive = !disabled && !loading;
  const buttonStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.875rem 2rem',
    fontSize: '1rem',
    fontWeight: 600,
    color: '#fff',
    backgroundColor: isInteractive ? '#007bff' : '#ccc',
    border: 'none',
    borderRadius: '4px',
    cursor: isInteractive ? 'pointer' : 'not-allowed',
    opacity: loading ? 0.8 : 1,
    transition: isInteractive ? 'background-color 0.2s ease, transform 0.1s ease' : 'none',
    minWidth: '200px',
    minHeight: '48px',
  };

  const spinnerStyle: React.CSSProperties = {
    width: '16px',
    height: '16px',
    border: '2px solid #ffffff',
    borderTopColor: 'transparent',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  };

  return (
    <>
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @media (prefers-reduced-motion: reduce) {
            @keyframes spin {
              from { transform: none; }
            }
          }
        `}
      </style>
      <button
        ref={buttonRef}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        disabled={disabled || loading}
        aria-label={ariaLabel}
        aria-describedby="cart-button-description"
        aria-busy={loading}
        style={buttonStyle}
      >
        {loading && (
          <span
            aria-hidden="true"
            style={spinnerStyle}
          />
        )}
        {!loading && (
          <svg
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ flexShrink: 0 }}
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        )}
        <span>
          {children || defaultLabel}
        </span>
      </button>
      <span
        id="cart-button-description"
        className="sr-only"
        style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: 0 }}
      >
        {loading
          ? 'Añadiendo producto al carrito, por favor espere'
          : 'Haz clic para añadir este producto a tu carrito de compras'}
      </span>
    </>
  );
};

AddToCartButton.schema = {
  title: 'Botón Añadir al Carrito',
  description: 'Componente presentacional para el botón de añadir al carrito con manejo de estados accesibles',
  type: 'object',
  properties: {
    disabled: {
      title: 'Deshabilitado',
      description: 'Indica si el botón está deshabilitado',
      type: 'boolean',
      default: false,
    },
    loading: {
      title: 'Cargando',
      description: 'Indica si el botón está en estado de carga',
      type: 'boolean',
      default: false,
    },
    ariaLabel: {
      title: 'Etiqueta ARIA',
      description: 'Etiqueta accesible para el botón',
      type: 'string',
      default: 'Añadir al carrito',
    },
  },
};

// === ARCHIVO: react/services/ProductService.ts ===
import { Product, isValidProduct, getLowestPrice, getMainImage } from '../models/Product';

export interface ProductServiceOptions {
  baseUrl?: string;
  timeout?: number;
}

export interface ProductSearchParams {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  limit?: number;
  offset?: number;
}

export interface ProductSearchResult {
  products: Product[];
  totalCount: number;
  facets?: Record<string, string[]>;
}

export interface ProductDetailResult {
  product: Product | null;
  error?: string;
}

class ProductServiceImpl {
  private baseUrl: string;
  private timeout: number;

  constructor(options: ProductServiceOptions = {}) {
    this.baseUrl = options.baseUrl ?? '/api/catalog_system/pub/products';
    this.timeout = options.timeout ?? 10000;
  }

  async search(params: ProductSearchParams): Promise<ProductSearchResult> {
    const url = this.buildSearchUrl(params);
    const response = await this.fetchWithTimeout(url);
    
    if (!response.ok) {
      throw new Error(`Product search failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const products = Array.isArray(data) ? data : data.items ?? [];
    const validProducts = products.filter(isValidProduct);

    return {
      products: validProducts,
      totalCount: validProducts.length,
      facets: data.facets,
    };
  }

  async getById(productId: string): Promise<ProductDetailResult> {
    try {
      const url = `${this.baseUrl}/${productId}`;
      const response = await this.fetchWithTimeout(url);

      if (!response.ok) {
        return {
          product: null,
          error: `Product not found: ${response.status}`,
        };
      }

      const product: Product = await response.json();

      if (!isValidProduct(product)) {
        return {
          product: null,
          error: 'Invalid product data received',
        };
      }

      return { product };
    } catch (error) {
      return {
        product: null,
        error: error instanceof Error ? error.message : 'Unknown error fetching product',
      };
    }
  }

  getPriceInfo(product: Product): { lowestPrice: number | null; formattedPrice: string } {
    const lowestPrice = getLowestPrice(product);
    return {
      lowestPrice,
      formattedPrice: lowestPrice !== null ? this.formatPrice(lowestPrice) : 'Price not available',
    };
  }

  getImageInfo(product: Product): { mainImage: string | null; altText: string } {
    const mainImage = getMainImage(product);
    return {
      mainImage,
      altText: mainImage ? `${product.brand ?? 'Product'} image` : 'No image available',
    };
  }

  private buildSearchUrl(params: ProductSearchParams): string {
    const searchParams = new URLSearchParams();

    if (params.query) searchParams.append('q', params.query);
    if (params.category) searchParams.append('category', params.category);
    if (params.minPrice !== undefined) searchParams.append('priceMin', params.minPrice.toString());
    if (params.maxPrice !== undefined) searchParams.append('priceMax', params.maxPrice.toString());
    if (params.limit) searchParams.append('limit', params.limit.toString());
    if (params.offset) searchParams.append('offset', params.offset.toString());

    const queryString = searchParams.toString();
    return queryString ? `${this.baseUrl}/search?${queryString}` : `${this.baseUrl}/search`;
  }

  private async fetchWithTimeout(url: string, options: RequestInit = {}): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      return response;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  private formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  }
}

export const ProductService = new ProductServiceImpl();
export default ProductService;

// === ARCHIVO: react/hooks/useProduct.ts ===
import { useState, useCallback, useEffect } from 'react';
import { Product } from '../models/Product';
import ProductService, {
  ProductSearchParams,
  ProductSearchResult,
  ProductDetailResult,
} from '../services/ProductService';

export interface UseProductState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface UseProductActions {
  searchProducts: (params: ProductSearchParams) => Promise<void>;
  fetchProduct: (productId: string) => Promise<void>;
  clearError: () => void;
  reset: () => void;
}

export type UseProductReturn<T> = UseProductState<T> & UseProductActions;

function createInitialState<T>(): UseProductState<T> {
  return {
    data: null,
    loading: false,
    error: null,
  };
}

export function useProductSearch(): UseProductReturn<Product[]> {
  const [state, setState] = useState<UseProductState<Product[]>>(createInitialState());

  const searchProducts = useCallback(async (params: ProductSearchParams): Promise<void> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const result: ProductSearchResult = await ProductService.search(params);
      setState({
        data: result.products,
        loading: false,
        error: null,
      });
    } catch (err) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : 'Search failed',
      }));
    }
  }, []);

  const fetchProduct = useCallback(async (_productId: string): Promise<void> => {
    throw new Error('useProductSearch does not support single product fetch');
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const reset = useCallback(() => {
    setState(createInitialState());
  }, []);

  return {
    ...state,
    searchProducts,
    fetchProduct,
    clearError,
    reset,
  };
}

export function useProductDetail(productId: string): UseProductReturn<Product> & {
  priceInfo: { lowestPrice: number | null; formattedPrice: string };
  imageInfo: { mainImage: string | null; altText: string };
} {
  const [state, setState] = useState<UseProductState<Product>>(createInitialState());

  const fetchProduct = useCallback(async (id: string): Promise<void> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const result: ProductDetailResult = await ProductService.getById(id);

      if (result.error || !result.product) {
        setState({
          data: null,
          loading: false,
          error: result.error ?? 'Product not found',
        });
        return;
      }

      setState({
        data: result.product,
        loading: false,
        error: null,
      });
    } catch (err) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to fetch product',
      }));
    }
  }, []);

  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
    }
  }, [productId, fetchProduct]);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const reset = useCallback(() => {
    setState(createInitialState());
  }, []);

  const priceInfo = state.data
    ? ProductService.getPriceInfo(state.data)
    : { lowestPrice: null, formattedPrice: 'Price not available' };

  const imageInfo = state.data
    ? ProductService.getImageInfo(state.data)
    : { mainImage: null, altText: 'No image available' };

  return {
    ...state,
    fetchProduct,
    clearError,
    reset,
    priceInfo,
    imageInfo,
  };
}

export default useProductDetail;

// === ARCHIVO: react/__tests__/ProductDetailContainer.test.tsx ===
import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { ProductDetailContainer } from '../components/containers/ProductDetailContainer';
import { Product } from '../models/Product';
import ProductService from '../services/ProductService';

jest.mock('../services/ProductService');
jest.mock('../models/Product', () => ({
  ...jest.requireActual('../models/Product'),
  isValidProduct: jest.fn((product: unknown) => {
    if (!product || typeof product !== 'object') return false;
    const p = product as Record<string, unknown>;
    return !!(p.productId && p.productName && p.brand);
  }),
  getLowestPrice: jest.fn((product: Product) => {
    if (!product?.items?.length) return null;
    return Math.min(...product.items.map(item => item.sellers?.[0]?.commertialOffer?.Price ?? Infinity));
  }),
  getMainImage: jest.fn((product: Product) => {
    if (!product?.items?.length) return null;
    const item = product.items[0];
    const mainImage = item.images?.find(img => img.imageLabel === 'main');
    return mainImage?.url ?? item.images?.[0]?.url ?? null;
  }),
}));

const mockProduct: Product = {
  productId: 'test-product-123',
  productName: 'Test Product',
  brand: 'Test Brand',
  items: [
    {
      itemId: 'item-1',
      images: [
        { imageLabel: 'main', url: 'https://example.com/image1.jpg' },
      ],
      sellers: [
        {
          sellerId: 'seller-1',
          commertialOffer: {
            Price: 99.99,
            ListPrice: 129.99,
          },
        },
      ],
    },
  ],
};

describe('ProductDetailContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', async () => {
    (ProductService.getById as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    );

    await act(async () => {
      render(<ProductDetailContainer productId="test-product-123" />);
    });

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('displays product information when loaded successfully', async () => {
    (ProductService.getById as jest.Mock).mockResolvedValue({
      product: mockProduct,
    });

    await act(async () => {
      render(<ProductDetailContainer productId="test-product-123" />);
    });

    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
    });
    expect(screen.getByText('Test Brand')).toBeInTheDocument();
  });

  it('displays price information correctly', async () => {
    (ProductService.getById as jest.Mock).mockResolvedValue({
      product: mockProduct,
    });

    await act(async () => {
      render(<ProductDetailContainer productId="test-product-123" />);
    });

    await waitFor(() => {
      expect(screen.getByText('$99.99')).toBeInTheDocument();
    });
  });

  it('displays error state when product fetch fails', async () => {
    (ProductService.getById as jest.Mock).mockResolvedValue({
      product: null,
      error: 'Product not found',
    });

    await act(async () => {
      render(<ProductDetailContainer productId="invalid-id" />);
    });

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  it('calls ProductService with correct product ID', async () => {
    (ProductService.getById as jest.Mock).mockResolvedValue({
      product: mockProduct,
    });

    await act(async () => {
      render(<ProductDetailContainer productId="test-product-123" />);
    });

    await waitFor(() => {
      expect(ProductService.getById).toHaveBeenCalledWith('test-product-123');
    });
  });

  it('applies Single Responsibility by delegating to ProductService', async () => {
    (ProductService.getById as jest.Mock).mockResolvedValue({
      product: mockProduct,
    });

    await act(async () => {
      render(<ProductDetailContainer productId="test-product-123" />);
    });

    await waitFor(() => {
      expect(ProductService.getById).toHaveBeenCalled();
    });

    const calls = (ProductService.getById as jest.Mock).mock.calls;
    expect(calls.length).toBe(1);
  });

  it('keeps component simple (KISS) by not containing business logic', async () => {
    (ProductService.getById as jest.Mock).mockResolvedValue({
      product: mockProduct,
    });

    let containerRenderCount = 0;
    const TestComponent = () => {
      containerRenderCount++;
      return <ProductDetailContainer productId="test-product-123" />;
    };

    await act(async () => {
      render(<TestComponent />);
    });

    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
    });

    expect(containerRenderCount).toBe(1);
  });

  it('handles product with no items gracefully', async () => {
    const productWithoutItems: Product = {
      productId: 'empty-product',
      productName: 'Empty Product',
      brand: 'Brand',
      items: [],
    };

    (ProductService.getById as jest.Mock).mockResolvedValue({
      product: productWithoutItems,
    });

    await act(async () => {
      render(<ProductDetailContainer productId="empty-product" />);
    });

    await waitFor(() => {
      expect(screen.getByText('Empty Product')).toBeInTheDocument();
    });
  });

  it('displays product image when available', async () => {
    (ProductService.getById as jest.Mock).mockResolvedValue({
      product: mockProduct,
    });

    await act(async () => {
      render(<ProductDetailContainer productId="test-product-123" />);
    });

    await waitFor(() => {
      const image = screen.getByAltText('Test Product image');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', 'https://example.com/image1.jpg');
    });
  });

  it('validates product data before rendering', async () => {
    (ProductService.getById as jest.Mock).mockResolvedValue({
      product: null,
      error: 'Invalid product data',
    });

    await act(async () => {
      render(<ProductDetailContainer productId="invalid-product" />);
    });

    await waitFor(() => {
      expect(screen.getByText(/invalid product data/i)).toBeInTheDocument();
    });
  });

  it('re-fetches product when productId changes', async () => {
    const { rerender } = (() => {
      let mockCalls = 0;
      (ProductService.getById as jest.Mock).mockImplementation((id: string) => {
        mockCalls++;
        if (id === 'product-1') {
          return Promise.resolve({ product: { ...mockProduct, productId: 'product-1', productName: 'Product 1' } });
        }
        return Promise.resolve({ product: { ...mockProduct, productId: 'product-2', productName: 'Product 2' } });
      });
      return { calls: () => mockCalls };
    })();

    await act(async () => {
      render(<ProductDetailContainer productId="product-1" />);
    });

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    await act(async () => {
      rerender(<ProductDetailContainer productId="product-2" />);
    });

    await waitFor(() => {
      expect(screen.getByText('Product 2')).toBeInTheDocument();
    });
  });
});

// === ARCHIVO: react/__tests__/ProductService.test.ts ===
import { Product, ProductImage, ProductSpecification, Seller } from '../models/Product';
import { validateProduct, getLowestPrice, getMainImage } from '../services/ProductService';

describe('ProductService - Validación de principios DRY y YAGNI', () => {
  const createMockProduct = (overrides: Partial<Product> = {}): Product => {
    const defaultProduct: Product = {
      productId: '123',
      productName: 'Test Product',
      brand: 'Test Brand',
      category: 'Electronics',
      items: [
        {
          itemId: 'item-1',
          name: 'Variant 1',
          price: 99.99,
          listPrice: 129.99,
          availability: 'available',
          images: [
            { imageId: 'img-1', imageLabel: 'main', url: 'https://example.com/main.jpg' },
            { imageId: 'img-2', imageLabel: 'thumbnail', url: 'https://example.com/thumb.jpg' }
          ],
          sellers: [
            {
              sellerId: 'seller-1',
              sellerName: 'Official Store',
              commertialOffer: {
                DeliverySlaSamplesPerRegion: {},
                Installments: [],
                DiscountHighLight: [],
                Gifts: [],
                AvailableQuantity: 10
              }
            }
          ]
        }
      ]
    };
    return { ...defaultProduct, ...overrides };
  };

  const createMockSeller = (overrides: Partial<Seller> = {}): Seller => {
    const defaultSeller: Seller = {
      sellerId: 'seller-1',
      sellerName: 'Test Seller',
      commertialOffer: {
        DeliverySlaSamplesPerRegion: {},
        Installments: [],
        DiscountHighLight: [],
        Gifts: [],
        AvailableQuantity: 5
      }
    };
    return { ...defaultSeller, ...overrides };
  };

  describe('validateProduct', () => {
    it('debería retornar true para producto válido con todos los campos requeridos', () => {
      const product = createMockProduct();
      const result = validateProduct(product);
      expect(result).toBe(true);
    });

    it('debería retornar false cuando product es null', () => {
      const result = validateProduct(null as any);
      expect(result).toBe(false);
    });

    it('debería retornar false cuando product es undefined', () => {
      const result = validateProduct(undefined as any);
      expect(result).toBe(false);
    });

    it('debería retornar false cuando product no es un objeto', () => {
      const result = validateProduct('not an object' as any);
      expect(result).toBe(false);
    });

    it('debería retornar false cuando falta productId', () => {
      const product = createMockProduct({ productId: undefined as any });
      const result = validateProduct(product);
      expect(result).toBe(false);
    });

    it('debería retornar false cuando falta productName', () => {
      const product = createMockProduct({ productName: undefined as any });
      const result = validateProduct(product);
      expect(result).toBe(false);
    });

    it('debería retornar false cuando falta brand', () => {
      const product = createMockProduct({ brand: undefined as any });
      const result = validateProduct(product);
      expect(result).toBe(false);
    });

    it('debería retornar false cuando falta category', () => {
      const product = createMockProduct({ category: undefined as any });
      const result = validateProduct(product);
      expect(result).toBe(false);
    });

    it('debería retornar false cuando items está vacío', () => {
      const product = createMockProduct({ items: [] });
      const result = validateProduct(product);
      expect(result).toBe(false);
    });

    it('debería retornar false cuando items es null', () => {
      const product = createMockProduct({ items: null as any });
      const result = validateProduct(product);
      expect(result).toBe(false);
    });

    it('debería retornar false cuando un item no tiene itemId', () => {
      const product = createMockProduct({
        items: [
          {
            itemId: undefined as any,
            name: 'Invalid Item',
            price: 99.99,
            listPrice: 129.99,
            availability: 'available',
            images: [],
            sellers: []
          }
        ]
      });
      const result = validateProduct(product);
      expect(result).toBe(false);
    });
  });

  describe('getLowestPrice', () => {
    it('debería retornar el precio más bajo de los items disponibles', () => {
      const product = createMockProduct({
        items: [
          {
            itemId: 'item-1',
            name: 'Variant 1',
            price: 99.99,
            listPrice: 129.99,
            availability: 'available',
            images: [],
            sellers: []
          },
          {
            itemId: 'item-2',
            name: 'Variant 2',
            price: 79.99,
            listPrice: 99.99,
            availability: 'available',
            images: [],
            sellers: []
          },
          {
            itemId: 'item-3',
            name: 'Variant 3',
            price: 149.99,
            listPrice: 199.99,
            availability: 'available',
            images: [],
            sellers: []
          }
        ]
      });
      const result = getLowestPrice(product);
      expect(result).toBe(79.99);
    });

    it('debería retornar null para producto inválido', () => {
      const result = getLowestPrice(null as any);
      expect(result).toBeNull();
    });

    it('debería retornar null cuando product no tiene items', () => {
      const product = createMockProduct({ items: [] });
      const result = getLowestPrice(product);
      expect(result).toBeNull();
    });

    it('debería manejar productos con un solo item', () => {
      const product = createMockProduct();
      const result = getLowestPrice(product);
      expect(result).toBe(99.99);
    });

    it('debería manejar precios con decimales variados', () => {
      const product = createMockProduct({
        items: [
          {
            itemId: 'item-1',
            name: 'Variant 1',
            price: 10.50,
            listPrice: 15.00,
            availability: 'available',
            images: [],
            sellers: []
          },
          {
            itemId: 'item-2',
            name: 'Variant 2',
            price: 5.25,
            listPrice: 7.50,
            availability: 'available',
            images: [],
            sellers: []
          }
        ]
      });
      const result = getLowestPrice(product);
      expect(result).toBe(5.25);
    });
  });

  describe('getMainImage', () => {
    it('debería retornar la imagen principal cuando existe imageLabel="main"', () => {
      const product = createMockProduct({
        items: [
          {
            itemId: 'item-1',
            name: 'Variant 1',
            price: 99.99,
            listPrice: 129.99,
            availability: 'available',
            images: [
              { imageId: 'img-1', imageLabel: 'main', url: 'https://example.com/main.jpg' },
              { imageId: 'img-2', imageLabel: 'thumbnail', url: 'https://example.com/thumb.jpg' }
            ],
            sellers: []
          }
        ]
      });
      const result = getMainImage(product);
      expect(result).toBe('https://example.com/main.jpg');
    });

    it('debería retornar la primera imagen cuando no hay imageLabel="main"', () => {
      const product = createMockProduct({
        items: [
          {
            itemId: 'item-1',
            name: 'Variant 1',
            price: 99.99,
            listPrice: 129.99,
            availability: 'available',
            images: [
              { imageId: 'img-1', imageLabel: 'front', url: 'https://example.com/front.jpg' },
              { imageId: 'img-2', imageLabel: 'back', url: 'https://example.com/back.jpg' }
            ],
            sellers: []
          }
        ]
      });
      const result = getMainImage(product);
      expect(result).toBe('https://example.com/front.jpg');
    });

    it('debería retornar null cuando no hay imágenes', () => {
      const product = createMockProduct({
        items: [
          {
            itemId: 'item-1',
            name: 'Variant 1',
            price: 99.99,
            listPrice: 129.99,
            availability: 'available',
            images: [],
            sellers: []
          }
        ]
      });
      const result = getMainImage(product);
      expect(result).toBeNull();
    });

    it('debería retornar null para producto inválido', () => {
      const result = getMainImage(undefined as any);
      expect(result).toBeNull();
    });

    it('debería retornar null cuando no hay items', () => {
      const product = createMockProduct({ items: [] });
      const result = getMainImage(product);
      expect(result).toBeNull();
    });

    it('debería manejar productos con múltiples items y elegir el primero', () => {
      const product = createMockProduct({
        items: [
          {
            itemId: 'item-1',
            name: 'Variant 1',
            price: 99.99,
            listPrice: 129.99,
            availability: 'available',
            images: [
              { imageId: 'img-1', imageLabel: 'main', url: 'https://example.com/item1-main.jpg' }
            ],
            sellers: []
          },
          {
            itemId: 'item-2',
            name: 'Variant 2',
            price: 79.99,
            listPrice: 99.99,
            availability: 'available',
            images: [
              { imageId: 'img-2', imageLabel: 'main', url: 'https://example.com/item2-main.jpg' }
            ],
            sellers: []
          }
        ]
      });
      const result = getMainImage(product);
      expect(result).toBe('https://example.com/item1-main.jpg');
    });
  });

  describe('Principios de Código Limpio aplicados', () => {
    it('DRY: las funciones utilitarias evitan duplicación de lógica de validación', () => {
      const validProduct = createMockProduct();
      const invalidProduct = createMockProduct({ productId: undefined as any });
      
      expect(validateProduct(validProduct)).toBe(true);
      expect(validateProduct(invalidProduct)).toBe(false);
      expect(getLowestPrice(validProduct)).toBeDefined();
      expect(getLowestPrice(invalidProduct)).toBeNull();
    });

    it('YAGNI: las funciones solo implementan lo necesario para el dominio actual', () => {
      const product = createMockProduct();
      
      expect(typeof validateProduct(product)).toBe('boolean');
      expect(typeof getLowestPrice(product)).toBe('number');
      expect(typeof getMainImage(product)).toBe('string');
    });

    it('KISS: cada función tiene una responsabilidad única y clara', () => {
      const product = createMockProduct();
      
      const isValid = validateProduct(product);
      const price = getLowestPrice(product);
      const image = getMainImage(product);
      
      expect(isValid).not.toBe(price);
      expect(price).not.toBe(image);
      expect(image).not.toBe(isValid);
    });
  });
});

// === ARCHIVO: styles/configs/product.css ===
/*
 * Estilos para la página de producto
 * CSS Handles para modularidad y mantenimiento según principios SOLID
 */

/* Contenedor principal de la página de producto */
.productPage__container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #ffffff;
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* Grid principal para desktop: imagen a izquierda, detalles a derecha */
@media screen and (min-width: 1024px) {
  .productPage__container {
    flex-direction: row;
    gap: 48px;
    padding: 32px 64px;
    max-width: 1440px;
    margin: 0 auto;
  }
}

/* Tablet: ajuste de spacing */
@media screen and (min-width: 768px) and (max-width: 1023px) {
  .productPage__container {
    padding: 24px 32px;
    gap: 32px;
  }
}

/* Mobile: layout apilado */
@media screen and (max-width: 767px) {
  .productPage__container {
    padding: 16px;
    gap: 24px;
  }
}

/* Sección de galería de imágenes */
.productPage__gallery {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.productPage__galleryMain {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
}

.productPage__galleryMainImage {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease-in-out;
}

.productPage__galleryMainImage:hover {
  transform: scale(1.05);
}

.productPage__galleryThumbs {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding: 8px 0;
  scrollbar-width: thin;
  scrollbar-color: #cccccc transparent;
}

.productPage__galleryThumb {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: 4px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  background-color: #f5f5f5;
}

.productPage__galleryThumb:hover {
  border-color: #1a1a1a;
}

.productPage__galleryThumb--active {
  border-color: #0f5aff;
  box-shadow: 0 0 0 2px rgba(15, 90, 255, 0.2);
}

.productPage__galleryThumbImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 2px;
}

/* Sección de información del producto */
.productPage__details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.productPage__header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.productPage__brand {
  font-size: 14px;
  font-weight: 500;
  color: #666666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.productPage__title {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.2;
  margin: 0;
}

@media screen and (max-width: 767px) {
  .productPage__title {
    font-size: 22px;
  }
}

/* Sección de precios */
.productPage__priceSection {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.productPage__price {
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
}

.productPage__price--onSale {
  color: #e31c1c;
}

.productPage__listPrice {
  font-size: 16px;
  color: #888888;
  text-decoration: line-through;
}

.productPage__discount {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  background-color: #e31c1c;
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  border-radius: 4px;
  width: fit-content;
}

/* Sección de variantes/sku */
.productPage__skuSection {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.productPage__skuLabel {
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
}

.productPage__skuOptions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.productPage__skuOption {
  padding: 10px 16px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  background-color: #ffffff;
  cursor: pointer;
  font-size: 14px;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.productPage__skuOption:hover {
  border-color: #1a1a1a;
}

.productPage__skuOption--selected {
  border-color: #0f5aff;
  background-color: rgba(15, 90, 255, 0.05);
  font-weight: 500;
}

.productPage__skuOption--unavailable {
  opacity: 0.5;
  cursor: not-allowed;
  text-decoration: line-through;
}

/* Botón de agregar al carrito */
.productPage__addToCart {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 32px;
  background-color: #0f5aff;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
  min-height: 52px;
}

.productPage__addToCart:hover {
  background-color: #0d4acc;
}

.productPage__addToCart:active {
  transform: scale(0.98);
}

.productPage__addToCart:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.productPage__addToCart--loading {
  position: relative;
  color: transparent;
}

.productPage__addToCart--loading::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid #ffffff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: productPage__spinner 0.8s linear infinite;
}

@keyframes productPage__spinner {
  to {
    transform: rotate(360deg);
  }
}

/* Especificaciones del producto */
.productPage__specifications {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid #eeeeee;
}

.productPage__specificationsTitle {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
}

.productPage__specificationsList {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.productPage__specificationItem {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.productPage__specificationLabel {
  font-size: 14px;
  color: #666666;
}

.productPage__specificationValue {
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
  text-align: right;
}

/* Estado de carga */
.productPage__loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  width: 100%;
}

.productPage__loadingSpinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f0f0f0;
  border-top-color: #0f5aff;
  border-radius: 50%;
  animation: productPage__spinner 0.8s linear infinite;
}

/* Estado de error */
.productPage__error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  min-height: 400px;
  padding: 32px;
  text-align: center;
}

.productPage__errorMessage {
  font-size: 16px;
  color: #666666;
}

.productPage__errorRetry {
  padding: 12px 24px;
  background-color: #ffffff;
  border: 1px solid #0f5aff;
  color: #0f5aff;
  font-size: 14px;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.productPage__errorRetry:hover {
  background-color: rgba(15, 90, 255, 0.05);
}

/* Accesibilidad: focus visible para navegación por teclado */
.productPage__galleryThumb:focus-visible,
.productPage__skuOption:focus-visible,
.productPage__addToCart:focus-visible,
.productPage__errorRetry:focus-visible {
  outline: 2px solid #0f5aff;
  outline-offset: 2px;
}

/* Reducción de movimiento para usuarios que lo prefieran */
@media (prefers-reduced-motion: reduce) {
  .productPage__galleryMainImage,
  .productPage__galleryThumb,
  .productPage__skuOption,
  .productPage__addToCart {
    transition: none;
  }
  
  .productPage__addToCart--loading::after,
  .productPage__loadingSpinner {
    animation: none;
  }
}

// === ARCHIVO: README.md ===
# Refactorización de Código eCommerce - Principios de Código Limpio

## Descripción del Proyecto

Proyecto de tienda eCommerce desarrollado en VTEX IO Store Framework que implementa una página de detalles de producto. El código ha sido refactorizado para aplicar principios de código limpio (DRY, YAGNI, SOLID, KISS), mejorando la mantenibilidad, escalabilidad y legibilidad del código.

## Stack Tecnológico

- **Framework**: VTEX IO Store Framework
- **Lenguaje**: TypeScript 5.0.4
- **UI**: React 18.2.0
- **Estilos**: CSS Modules con CSS Handles
- **Testing**: Jest 29.5.0, Testing Library 13.4.0
- **Linting**: ESLint

## Estructura de Directorios

```
├── manifest.json                 # Manifiesto de la aplicación VTEX
├── store/
│   ├── interfaces.json          # Definición de interfaces de bloques
│   └── blocks/
│       ├── home.json            # Bloques de la página principal
│       └── product.json         # Bloques de la página de producto
├── react/
│   ├── models/
│   │   └── Product.ts           # Interfaces de tipos para productos
│   ├── services/
│   │   └── ProductService.ts    # Lógica de negocio para productos
│   ├── hooks/
│   │   └── useProduct.ts        # Hook personalizado para productos
│   ├── components/
│   │   ├── containers/
│   │   │   └── ProductDetailContainer.tsx
│   │   └── presentational/
│   │       ├── ProductGallery.tsx
│   │       └── AddToCartButton.tsx
│   └── __tests__/
│       ├── ProductService.test.ts
│       └── ProductDetailContainer.test.tsx
├── styles/
│   └── configs/
│       └── product.css          # Estilos con CSS Handles
└── tsconfig.json                # Configuración de TypeScript
```

## Principios de Código Limpio Aplicados

### DRY (Don't Repeat Yourself)

Las funciones utilitarias en `ProductService.ts` encapsulan lógica repetitiva:

- `validateProduct()`: Valida la estructura completa de un producto una sola vez
- `getLowestPrice()`: Calcula el precio mínimo sin duplicar lógica de búsqueda
- `getMainImage()`: Normaliza la obtención de imagen principal

### YAGNI (You Aren't Gonna Need It)

Cada función implementa únicamente lo necesario para el dominio actual:

- Sin características especulativas que no se usan
- Sin abstracciones prematuras
- Interfaces de tipos que reflejan el dominio real, no posibilidades hipotéticas

### SOLID

**Single Responsibility Principle (SRP)**:

- `ProductService`: Solo maneja lógica de productos
- `ProductDetailContainer`: Solo maneja estado y coordinación
- `ProductGallery`: Solo renderiza imágenes
- `AddToCartButton`: Solo maneja la acción de agregar al carrito

**Dependency Inversion Principle (DIP)**:

- Los componentes dependen de abstracciones (interfaces TypeScript)
- Los hooks personalizados exponen contratos claros

### KISS (Keep It Simple, Stupid)

- Nombres de funciones descriptivos y directos
- Lógica de negocio sin sobreingeniería
- Estructura de componentes fácil de seguir

## Instalación y Setup

### Prerrequisitos

- Node.js 18.x o superior
- npm 9.x o superior
- VTEX CLI (para desarrollo local con VTEX IO)

### Instalación de Dependencias

```bash
npm install
```

### Ejecución en Desarrollo

```bash
# Con VTEX CLI
vtex link

# O solo compilación TypeScript
npm run build
```

### Ejecución de Pruebas

```bash
# Todas las pruebas
npm test

# Pruebas en modo watch
npm test -- --watch

# Cobertura de código
npm test -- --coverage
```

### Verificación de Tipos

```bash
npx tsc --noEmit
```

## Guía de Refactorización

### Antes vs Después

#### Ejemplo 1: Validación de Producto

**Antes (violación DRY)**:
```typescript
// En cada componente que usaba el producto
if (!product || !product.productId || !product.productName) {
  // manejar error
}
```

**Después (aplicando DRY)**:
```typescript
// Una sola función de validación
import { validateProduct } from './services/ProductService';

if (!validateProduct(product)) {
  // manejar error
}
```

#### Ejemplo 2: Separación de Responsabilidades

**Antes (monolito)**:
```typescript
// Un componente que hace todo
const ProductPage = ({ product }) => {
  const [selectedSku, setSelectedSku] = useState(null);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState(0);
  // ... 500 líneas más
};
```

**Después (contenedor/presentacional)**:
```typescript
// Contenedor: solo lógica y estado
const ProductDetailContainer = ({ product }) => {
  const [selectedSku, setSelectedSku] = useState(null);
  const price = getLowestPrice(product);
  const mainImage = getMainImage(product);
  // Coordina componentes presentacionales
};

// Presentacional: solo render
const ProductGallery = ({ images, onImageSelect }) => (
  // Renderiza imágenes
);
```

#### Ejemplo 3: CSS Handles para Estilos Modularizados

**Antes (CSS global)**:
```css
/* styles.css */
.product-title { font-size: 28px; }
.product-price { color: red; }
```

**Después (CSS Handles)**:
```css
.productPage__title { font-size: 28px; }
.productPage__price { color: #1a1a1a; }
.productPage__price--onSale { color: #e31c1c; }
```

### Beneficios de la Refactorización

1. **Mantenibilidad**: Cambios localizados no afectan otras partes del sistema
2. **Testabilidad**: Componentes pequeños y enfocados son más fáciles de probar
3. **Legibilidad**: Nombres claros y estructura predecible
4. **Reusabilidad**: Componentes presentacionales pueden reutilizarse en otros contextos
5. **Rendimiento**: Separación permite optimización selectiva

## Componentes Principales

### ProductDetailContainer

Contenedor principal que coordina el flujo de datos del producto.

**Responsabilidades**:
- Obtener datos del producto
- Gestionar estado de variante seleccionada
- Calcular precios y disponibilidad
- Pasar datos a componentes presentacionales

### ProductGallery

Componente presentacional para galería de imágenes.

**Props**:
- `images`: Array de imágenes del producto
- `selectedIndex`: Índice de imagen seleccionada
- `onImageSelect`: Callback al seleccionar imagen

### AddToCartButton

Componente presentacional para botón de agregar al carrito.

**Props**:
- `disabled`: Estado de deshabilitado
- `loading`: Estado de carga
- `onClick`: Callback al hacer clic

## Convenciones de Nomenclatura

- **Componentes contenedores**: `*Container.tsx`
- **Componentes presentacionales**: `*.tsx`
- **Servicios**: `*Service.ts`
- **Hooks**: `use*.ts`
- **Tipos/Interfaces**: `*.ts` (modelos)
- **Pruebas**: `*.test.ts` o `*.test.tsx`

## Contribuir

1. Asegúrate de que las pruebas pasen: `npm test`
2. Verifica tipos: `npx tsc --noEmit`
3. Sigue las convenciones de nomenclatura
4. Aplica los principios de código limpio en nuevos componentes

## Licencia

MIT
```
