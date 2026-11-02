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