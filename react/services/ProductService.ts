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