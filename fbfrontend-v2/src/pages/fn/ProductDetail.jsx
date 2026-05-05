import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../lib/AppContext';
import ProductCard from '../../components/fn/ProductCard';
import StarRating from '../../components/fn/StarRating';

export default function ProductDetail() {
  const { id } = useParams();
    const { products, addToCart, addReview, getProductReviews, currentUser, toggleFavourite, favourites } = useApp();
  const navigate = useNavigate();
    const product = products.find(p => p.id === parseInt(id));
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [review, setReview] = useState({ rating: 5, comment: '' });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!product) return (
    <div className="container py-5 text-center">
      <h4 style={{ color: 'var(--moss)' }}>Product not found</h4>
      <Link to="/shop" className="btn mt-3" style={{ backgroundColor: 'var(--zest)', color: 'var(--surface-card)', border: 'none' }}>Back to Shop</Link>
    </div>
  );

  const reviews = getProductReviews(product.id);
    const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const isFav = favourites.includes(product.id);

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

    const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) return navigate('/signin');
    addReview({ productId: product.id, userId: currentUser.id, userName: currentUser.name.split(' ')[0] + ' ' + currentUser.name.split(' ')[1]?.[0] + '.', ...review });
    setReviewSubmitted(true);
    setReview({ rating: 5, comment: '' });
  };

  return (
    <div style={{ backgroundColor: 'var(--paper)', minHeight: '100vh' }}>
      <div className="container py-5">
        {/* Breadcrumb */}
        <nav className="mb-4">
          <ol className="breadcrumb small">
            <li className="breadcrumb-item"><Link to="/" style={{ color: 'var(--sage)', textDecoration: 'none' }}>Home</Link></li>
            <li className="breadcrumb-item"><Link to="/shop" style={{ color: 'var(--sage)', textDecoration: 'none' }}>Shop</Link></li>
            <li className="breadcrumb-item active" style={{ color: 'var(--moss)' }}>{product.name}</li>
          </ol>
        </nav>

        <div className="row g-5 align-items-start">
          {/* Image */}
          <div className="col-12 col-md-6">
            <div className="rounded-4 overflow-hidden position-relative" style={{ height: 420 }}>
              <img src={product.image} alt={product.name} className="w-100 h-100" style={{ objectFit: 'cover' }} />
              {product.badge && (
                <span className="position-absolute top-0 start-0 m-3 badge" style={{ backgroundColor: product.badge === 'Organic' ? 'var(--status-success-text)' : 'var(--zest)', fontSize: '0.8rem', padding: '6px 12px' }}>
                  {product.badge}
                </span>
              )}
              {currentUser?.role === 'customer' && (
                <button onClick={() => toggleFavourite(product.id)} className="position-absolute top-0 end-0 m-3 btn rounded-circle d-flex align-items-center justify-content-center" style={{ width: 40, height: 40, backgroundColor: 'var(--surface-card)', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                  <i className={`bi bi-heart${isFav ? '-fill' : ''}`} style={{ color: isFav ? 'var(--zest)' : 'var(--moss)' }}></i>
                </button>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="col-12 col-md-6">
            <span className="badge mb-2" style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--sage)', textTransform: 'capitalize' }}>{product.category}</span>
            <h1 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--moss)', fontSize: '2.2rem', marginBottom: 8 }}>{product.name}</h1>
            <div className="d-flex align-items-center gap-2 mb-3">
              <StarRating 
              value={product.rating} readOnly />
              <span className="small" style={{ color: 'var(--sage)' }}>{product.rating} ({product.reviews} reviews)</span>
            </div>
            <div className="d-flex align-items-baseline gap-2 mb-4">
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.4rem', color: 'var(--zest)', fontWeight: 700 }}>₱{product.price.toFixed(2)}</span>
              <span style={{ color: 'var(--sage)', fontSize: '0.9rem' }}>{product.unit}</span>
            </div>
            <p className="mb-4" style={{ color: 'var(--moss)', lineHeight: 1.8, fontSize: '1rem' }}>{product.description}</p>

            {/* Stock */}
            <div className="d-flex align-items-center gap-2 mb-4">
              <span className="badge rounded-pill px-3 py-2" style={{ backgroundColor: product.stock > 50 ? 'var(--status-success-bg)' : product.stock > 0 ? 'var(--status-warning-bg)' : 'var(--status-danger-bg)', color: product.stock > 50 ? 'var(--status-success-text)' : product.stock > 0 ? 'var(--zest)' : 'var(--status-danger-text)', fontSize: '0.78rem' }}>
                <i className={`bi bi-${product.stock > 50 ? 'check-circle' : product.stock > 0 ? 'exclamation-circle' : 'x-circle'} me-1`}></i>
                {product.stock > 50 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
              </span>
            </div>

            {currentUser?.role !== 'admin' && (
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="d-flex align-items-center border rounded-2 overflow-hidden" style={{ borderColor: 'var(--bs-border-color)' }}>
                  <button className="btn btn-sm px-3 py-2" onClick={() => setQty(q => Math.max(1,q-1))} style={{ backgroundColor: 'var(--surface-muted)', border: 'none', color: 'var(--moss)' }}>
                    <i className="bi bi-dash"></i>
                  </button>
                  <span className="px-4 fw-semibold" style={{ color: 'var(--moss)' }}>{qty}</span>
                  <button className="btn btn-sm px-3 py-2" onClick={() => setQty(q => q+1)} style={{ backgroundColor: 'var(--surface-muted)', border: 'none', color: 'var(--moss)' }}>
                    <i className="bi bi-plus"></i>
                  </button>
                </div>
                <button onClick={handleAdd} className="btn fw-bold px-5 py-2 flex-fill" disabled={product.stock === 0}
                  style={{ backgroundColor: added ? 'var(--status-success-text)' : 'var(--zest)', color: 'var(--surface-card)', border: 'none', borderRadius: 0, letterSpacing: '0.5px', transition: 'all 0.3s' }}>
                  {added ? <><i className="bi bi-check2 me-2"></i>Added to Cart!</> : <><i className="bi bi-bag-plus me-2"></i>Add to Cart</>}
                </button>
              </div>
            )}
            {!currentUser && (
              <Link to="/signin" className="btn w-100 fw-bold py-2 mb-4" style={{ backgroundColor: 'var(--zest)', color: 'var(--surface-card)', border: 'none', borderRadius: 0 }}>
                Sign in to Purchase
              </Link>
            )}

            {/* Tags */}
            <div className="d-flex flex-wrap gap-2">
              {product.tags?.map(
              tag => (
                <span key={tag} className="badge rounded-pill" style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--sage)', fontSize: '0.72rem', padding: '5px 12px', textTransform: 'capitalize' }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-5 pt-4" style={{ borderTop: '1px solid #e8e4de' }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--moss)', marginBottom: 24 }}>Customer Reviews</h3>
          <div className="row g-4">
            <div className="col-12 col-md-8">
              {reviews.length === 0 && <p style={{ color: 'var(--sage)' }}>No reviews yet. Be the first!</p>}
              {reviews.map(
              r => (
                <div key={r.id} className="mb-3 p-4 rounded-3" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid #e8e4de' }}>
                  <div className="d-flex justify-content-between mb-2">
                    <div>
                      <span className="fw-semibold small me-2" style={{ color: 'var(--moss)' }}>{r.userName}</span>
                      <StarRating 
                      value={r.rating} readOnly size="0.75rem" />
                    </div>
                    <small style={{ color: 'var(--sage)' }}>{r.date}</small>
                  </div>
                  <p className="mb-0 small" style={{ color: 'var(--moss)', lineHeight: 1.7 }}>{r.comment}</p>
                </div>
              ))}
            </div>
            <div className="col-12 col-md-4">
              {reviewSubmitted ? (
                <div className="p-4 rounded-3 text-center" style={{ backgroundColor: 'var(--status-success-bg)', border: '1px solid #c8e6c9' }}>
                  <i className="bi bi-check-circle-fill d-block mb-2" style={{ color: 'var(--status-success-text)', fontSize: '2rem' }}></i>
                  <p className="mb-0 fw-semibold small" style={{ color: 'var(--status-success-text)' }}>Review submitted! Thank you.</p>
                </div>
              ) : (
                <div className="p-4 rounded-3" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid #e8e4de' }}>
                  <h6 className="fw-bold mb-3" style={{ color: 'var(--moss)' }}>Leave a Review</h6>
                  {!currentUser ? (
                    <p className="small" style={{ color: 'var(--sage)' }}><Link to="/signin" style={{ color: 'var(--zest)' }}>Sign in</Link> to leave a review.</p>
                  ) : (
                    <form onSubmit={handleReviewSubmit}>
                      <div className="mb-3">
                        <label className="form-label small" style={{ color: 'var(--moss)' }}>Your Rating</label>
                        <div><StarRating 
                        value={review.rating} onChange={(v) => setReview(p => ({...p, rating: v}))} size="1.5rem" /></div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label small" style={{ color: 'var(--moss)' }}>Your Review</label>
                        <textarea className="form-control" rows={3} value={review.comment} onChange={e => setReview(p => ({...p, comment: e.target.value}))} placeholder="Share your experience..." required
                          style={{ borderColor: 'var(--bs-border-color)', boxShadow: 'none', resize: 'none', backgroundColor: 'var(--surface-muted)' }}></textarea>
                      </div>
                      <button type="submit" className="btn w-100 fw-semibold" style={{ backgroundColor: 'var(--zest)', color: 'var(--surface-card)', border: 'none' }}>Submit Review</button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-5 pt-4" style={{ borderTop: '1px solid #e8e4de' }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--moss)', marginBottom: 24 }}>You May Also Like</h3>
            <div className="row g-4">
              {related.map(
              p => (
                <div key={p.id} className="col-6 col-md-3">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}