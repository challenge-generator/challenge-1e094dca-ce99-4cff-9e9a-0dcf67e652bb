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