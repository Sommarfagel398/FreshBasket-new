import React, { useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../lib/AppContext';

const initialPromoState = {
  promoInput: '',
  appliedPromo: null,
  promoError: '',
};

function promoReducer(state, action) {
  switch (action.type) {
    case 'SET_INPUT':
      return { ...state, promoInput: action.payload, promoError: '' };
    case 'APPLY_SUCCESS':
      return { ...state, appliedPromo: action.payload, promoError: '' };
    case 'APPLY_FAILURE':
      return { ...state, appliedPromo: null, promoError: action.payload };
    case 'CLEAR_PROMO':
      return initialPromoState;
    default:
      return state;
  }
}

export default function Cart() {
    const { cart, updateCartQty, removeFromCart, cartTotal, currentUser, validatePromo } = useApp();
  const navigate = useNavigate();
  const [promoState, dispatch] = useReducer(promoReducer, initialPromoState);

  const applyPromo = () => {
    const result = validatePromo(promoState.promoInput.toUpperCase(), cartTotal);
    if (result.valid) {
      dispatch({ type: 'APPLY_SUCCESS', payload: result.promo });
    } else {
      dispatch({ type: 'APPLY_FAILURE', payload: result.error });
    }
  };

  const discount = promoState.appliedPromo
        ? promoState.appliedPromo.type === 'percentage'
            ? (cartTotal * promoState.appliedPromo.discount) / 100
            : promoState.appliedPromo.discount
    : 0;

  const delivery = cartTotal > 50 ? 0 : 4.99;
  const finalTotal = cartTotal - discount + delivery;

  if (cart.length === 0) return (
    <div className="container py-5 text-center" style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div className="mb-4" style={{ fontSize: '5rem' }}>🛒</div>
      <h3 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--moss)' }}>Your cart is empty</h3>
      <p style={{ color: 'var(--sage)', marginBottom: 24 }}>Add some fresh produce to get started!</p>
      <Link to="/shop" className="btn fw-bold px-5 py-2" style={{ backgroundColor: 'var(--zest)', color: 'var(--surface-card)', border: 'none', borderRadius: 0, letterSpacing: '1px' }}>
        Browse Products
      </Link>
    </div>
  );

  return (
    <div style={{ backgroundColor: 'var(--paper)', minHeight: '100vh' }}>
      <div className="container py-5">
        <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--moss)', marginBottom: 32 }}>
          Your Cart <span style={{ color: 'var(--sage)', fontSize: '1.2rem', fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>({cart.length} items)</span>
        </h2>

        <div className="row g-4">
          {/* Cart Items */}
          <div className="col-12 col-lg-8">
            <div className="p-0 rounded-3 overflow-hidden" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid #e8e4de' }}>
              {cart.map((
              item, idx) => (
                <div key={item.id} className="d-flex gap-3 p-4 align-items-center" style={{ borderBottom: idx < cart.length - 1 ? '1px solid #f0ede8' : 'none' }}>
                  <Link to={`/product/${item.id}`} className="flex-shrink-0">
                    <img src={item.image} alt={item.name} className="rounded-3" style={{ width: 80, height: 80, objectFit: 'cover' }} />
                  </Link>
                  <div className="flex-grow-1 min-w-0">
                    <Link to={`/product/${item.id}`} className="text-decoration-none">
                      <h6 className="mb-0 fw-semibold text-truncate" style={{ color: 'var(--moss)' }}>{item.name}</h6>
                    </Link>
                    <small style={{ color: 'var(--sage)', textTransform: 'capitalize' }}>{item.category} · {item.unit}</small>
                    <div className="mt-2 d-flex align-items-center gap-3">
                      <div className="d-flex align-items-center border rounded-2 overflow-hidden" style={{ borderColor: 'var(--bs-border-color)' }}>
                        <button className="btn btn-sm px-2 py-1" onClick={() => updateCartQty(item.id, item.qty - 1)} style={{ backgroundColor: 'var(--surface-muted)', border: 'none', color: 'var(--moss)', lineHeight: 1 }}>
                          <i className="bi bi-dash"></i>
                        </button>
                        <span className="px-3 small fw-semibold" style={{ color: 'var(--moss)' }}>{item.qty}</span>
                        <button className="btn btn-sm px-2 py-1" onClick={() => updateCartQty(item.id, item.qty + 1)} style={{ backgroundColor: 'var(--surface-muted)', border: 'none', color: 'var(--moss)', lineHeight: 1 }}>
                          <i className="bi bi-plus"></i>
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="btn btn-sm" style={{ color: 'var(--status-danger-text)', fontSize: '0.78rem', border: 'none', padding: 0, background: 'none' }}>
                        <i className="bi bi-trash me-1"></i>Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-end flex-shrink-0">
                    <div className="fw-bold" style={{ color: 'var(--zest)', fontSize: '1.1rem' }}>₱{(item.price * item.qty).toFixed(2)}</div>
                    <small style={{ color: 'var(--sage)' }}>₱{item.price.toFixed(2)} ea</small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-12 col-lg-4">
            <div className="p-4 rounded-3 sticky-top" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid #e8e4de', top: '80px', zIndex: 1 }}>
              <h5 className="fw-bold mb-4" style={{ color: 'var(--moss)', fontFamily: "'Playfair Display', serif" }}>Order Summary</h5>

              {/* Promo Code */}
              <div className="mb-4">
                <label className="form-label small fw-medium" style={{ color: 'var(--moss)' }}>Promo Code</label>
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Enter code" value={promoState.promoInput} onChange={e => dispatch({ type: 'SET_INPUT', payload: e.target.value.toUpperCase() })}
                    style={{ borderColor: 'var(--bs-border-color)', boxShadow: 'none', fontSize: '0.85rem', borderRadius: '8px 0 0 8px' }} />
                  <button className="btn fw-semibold" onClick={applyPromo} style={{ backgroundColor: 'var(--moss)', color: 'var(--surface-card)', border: 'none', borderRadius: '0 8px 8px 0', fontSize: '0.82rem' }}>Apply</button>
                </div>
                {promoState.promoError && <small className="text-danger d-block mt-1">{promoState.promoError}</small>}
                {promoState.appliedPromo && <small className="d-block mt-1" style={{ color: 'var(--status-success-text)' }}><i className="bi bi-check-circle me-1"></i>"{promoState.appliedPromo.code}" applied!</small>}
              </div>

              <div className="d-flex justify-content-between mb-2 small">
                <span style={{ color: 'var(--sage)' }}>Subtotal</span>
                <span style={{ color: 'var(--moss)', fontWeight: 500 }}>₱{cartTotal.toFixed(2)}</span>
              </div>
              {discount > 0 && promoState.appliedPromo && (
                <div className="d-flex justify-content-between mb-2 small">
                  <span style={{ color: 'var(--status-success-text)' }}>Discount ({promoState.appliedPromo.code})</span>
                  <span style={{ color: 'var(--status-success-text)', fontWeight: 600 }}>-₱{discount.toFixed(2)}</span>
                </div>
              )}
              <div className="d-flex justify-content-between mb-3 small">
                <span style={{ color: 'var(--sage)' }}>Delivery</span>
                <span style={{ color: delivery === 0 ? 'var(--status-success-text)' : 'var(--moss)', fontWeight: 500 }}>{delivery === 0 ? 'FREE' : `₱${delivery.toFixed(2)}`}</span>
              </div>
              {cartTotal < 50 && (
                <div className="mb-3 p-2 rounded-2 small" style={{ backgroundColor: 'var(--status-warning-bg)' }}>
                  <i className="bi bi-truck me-1" style={{ color: 'var(--zest)' }}></i>
                  <span style={{ color: 'var(--zest)' }}>Add ₱{(50 - cartTotal).toFixed(2)} more for free delivery</span>
                </div>
              )}
              <div className="d-flex justify-content-between py-3 mb-4 fw-bold" style={{ borderTop: '2px solid #f0ede8', borderBottom: '2px solid #f0ede8' }}>
                <span style={{ color: 'var(--moss)', fontSize: '1rem' }}>Total</span>
                <span style={{ color: 'var(--zest)', fontSize: '1.2rem', fontFamily: "'Playfair Display', serif" }}>₱{finalTotal.toFixed(2)}</span>
              </div>

              {currentUser ? (
                <button onClick={() => navigate('/checkout', { state: { discount, appliedPromo: promoState.appliedPromo, finalTotal } })} className="btn w-100 fw-bold py-3" style={{ backgroundColor: 'var(--zest)', color: 'var(--surface-card)', border: 'none', borderRadius: 0, letterSpacing: '0.5px' }}>
                  Proceed to Checkout <i className="bi bi-arrow-right ms-2"></i>
                </button>
              ) : (
                <Link to="/signin" className="btn w-100 fw-bold py-3 text-decoration-none" style={{ backgroundColor: 'var(--zest)', color: 'var(--surface-card)', border: 'none', borderRadius: 0 }}>
                  Sign in to Checkout
                </Link>
              )}
              <Link to="/shop" className="btn w-100 mt-2 fw-medium py-2" style={{ backgroundColor: 'transparent', color: 'var(--sage)', border: '1px solid #e0dbd3', borderRadius: 0 }}>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}