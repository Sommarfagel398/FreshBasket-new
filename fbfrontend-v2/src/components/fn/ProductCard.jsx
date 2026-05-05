import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../lib/AppContext';
import StarRating from './StarRating';

export default function ProductCard({ product }) {
  const { addToCart, toggleFavourite, favourites, currentUser } = useApp();
  const isFav = favourites.includes(product.id);

  return (
    <div className="card h-100 border-0 shadow-sm overflow-hidden" style={{ borderRadius: 12 }}>
      {/* Image */}
      <div className="position-relative overflow-hidden" style={{ height: 200 }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-100 h-100"
          style={{ objectFit: 'cover', transition: 'transform 0.35s ease' }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        />
        <div className="position-absolute top-0 start-0 p-2 d-flex flex-column gap-1">
          {product.organic && (
            <span className="badge text-white" style={{ backgroundColor: 'var(--sage)', fontSize: '0.65rem' }}>Organic</span>
          )}
          {product.stock === 0 && (
            <span className="badge bg-secondary" style={{ fontSize: '0.65rem' }}>Out of Stock</span>
          )}
        </div>
        {currentUser?.role === 'customer' && (
          <button
            className="btn btn-sm position-absolute top-0 end-0 m-2 d-flex align-items-center justify-content-center rounded-circle border-0"
            style={{ width: 32, height: 32, backgroundColor: isFav ? 'rgba(230,126,34,0.15)' : 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)' }}
            onClick={(e) => { e.preventDefault(); toggleFavourite(product.id); }}
            title={isFav ? 'Remove from favourites' : 'Add to favourites'}
          >
            <i className={`bi bi-heart${isFav ? '-fill' : ''}`} style={{ color: 'var(--zest)', fontSize: '0.8rem' }} />
          </button>
        )}
      </div>

      {/* Body */}
      <div className="card-body d-flex flex-column p-3">
        <p className="text-uppercase mb-1" style={{ fontSize: '0.65rem', letterSpacing: '0.08em', color: 'var(--sage)', fontWeight: 600 }}>
          {product.category}
        </p>
        <Link to={`/product/${product.id}`} className="text-decoration-none">
          <h6 className="mb-1 fw-semibold" style={{ color: 'var(--moss)', lineHeight: 1.3 }}>{product.name}</h6>
        </Link>
        <p className="small mb-2" style={{ color: 'var(--text-muted-color)', fontSize: '0.8rem' }}>{product.unit}</p>
        <div className="d-flex align-items-center gap-1 mb-auto">
          <StarRating rating={product.rating} size="sm" />
          <span className="small" style={{ color: 'var(--text-muted-color)', fontSize: '0.75rem' }}>({product.reviews})</span>
        </div>
        <div className="d-flex align-items-center justify-content-between mt-3 pt-2" style={{ borderTop: '1px solid var(--bs-border-color)' }}>
          <span className="fw-bold fs-5" style={{ color: 'var(--zest)' }}>₱{product.price.toFixed(2)}</span>
          {product.stock > 0 ? (
            currentUser ? (
              <button
                className="btn btn-sm fw-medium text-white"
                style={{ backgroundColor: 'var(--zest)', borderColor: 'var(--zest)', borderRadius: 8 }}
                onClick={() => addToCart(product)}
              >
                <i className="bi bi-plus-lg me-1" />Add
              </button>
            ) : (
              <Link to="/signin" className="btn btn-sm fw-medium text-white" style={{ backgroundColor: 'var(--zest)', borderColor: 'var(--zest)', borderRadius: 8 }}>
                Sign In
              </Link>
            )
          ) : (
            <span className="badge bg-secondary">Sold out</span>
          )}
        </div>
      </div>
    </div>
  );
}
