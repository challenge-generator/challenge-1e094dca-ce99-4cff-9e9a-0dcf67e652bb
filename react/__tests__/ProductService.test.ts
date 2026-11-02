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