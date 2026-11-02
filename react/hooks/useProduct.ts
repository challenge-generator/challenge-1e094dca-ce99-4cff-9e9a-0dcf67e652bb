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