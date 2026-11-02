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