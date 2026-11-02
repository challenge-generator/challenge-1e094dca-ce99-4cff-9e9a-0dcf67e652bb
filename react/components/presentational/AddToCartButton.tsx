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