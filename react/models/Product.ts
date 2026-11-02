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