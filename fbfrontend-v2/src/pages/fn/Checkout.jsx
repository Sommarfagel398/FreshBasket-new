import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useApp } from '../../lib/AppContext';

export default function Checkout() {
  const { cart, cartTotal, currentUser, placeOrder, clearCart } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const { discount = 0, appliedPromo = null, finalTotal = cartTotal + 4.99 } = location.state || {};

  const today = new Date();
  const minDate = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const maxDate = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [form, setForm] = useState({
    address: currentUser?.address || '',
    deliveryDate: minDate,
    paymentMethod: 'card',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
  });
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  const set = (key) => (e) => setForm(p => ({ ...p, [key]: e.target.value }));

  const deliveryFee = cartTotal > 500 ? 0 : 50;
  const total = cartTotal - discount + deliveryFee;

  const handlePlaceOrder = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    const order = placeOrder({
      total,
      deliveryDate: form.deliveryDate,
      address: form.address,
      paymentMethod: form.paymentMethod,
      promoCode: appliedPromo?.code || null,
    });
    setCompletedOrder(order);
    setLoading(false);
  };

  if (completedOrder) return (
    <div className="container py-5 text-center" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div className="mb-4 d-flex align-items-center justify-content-center rounded-circle mx-auto" style={{ width: 90, height: 90, backgroundColor: 'var(--status-success-bg)' }}>
        <i className="bi bi-check-lg" style={{ color: 'var(--status-success-text)', fontSize: '2.5rem' }}></i>
      </div>
      <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--moss)', marginBottom: 8 }}>Order Confirmed!</h2>
      <p style={{ color: 'var(--sage)', marginBottom: 4 }}>Your fresh produce is being prepared.</p>
      <p className="fw-semibold mb-4" style={{ color: 'var(--zest)', fontSize: '1.1rem' }}>{completedOrder.
// @ts-ignore
      id}</p>
      <div className="p-4 rounded-3 mb-4" style={{ backgroundColor: 'var(--surface-muted)', border: '1px solid #e8e4de', maxWidth: 360 }}>
        <div className="small d-flex justify-content-between mb-2">
          <span style={{ color: 'var(--sage)' }}>Expected Delivery</span>
          <span style={{ color: 'var(--moss)', fontWeight: 600 }}>{completedOrder.
// @ts-ignore
          deliveryDate}</span>
        </div>
        <div className="small d-flex justify-content-between mb-2">
          <span style={{ color: 'var(--sage)' }}>Delivery Address</span>
          <span style={{ color: 'var(--moss)', fontWeight: 500, maxWidth: 180, textAlign: 'right' }}>{completedOrder.
// @ts-ignore
          address}</span>
        </div>
        <div className="small d-flex justify-content-between">
          <span style={{ color: 'var(--sage)' }}>Total Paid</span>
          <span style={{ color: 'var(--zest)', fontWeight: 700, fontSize: '1rem' }}>₱{completedOrder.
// @ts-ignore
          total.toFixed(2)}</span>
        </div>
      </div>
      <div className="d-flex gap-3">
        <Link to="/account/orders" className="btn fw-semibold px-4" style={{ backgroundColor: 'var(--moss)', color: 'var(--surface-card)', border: 'none', borderRadius: 0 }}>Track Order</Link>
        <Link to="/shop" className="btn fw-semibold px-4" style={{ backgroundColor: 'var(--zest)', color: 'var(--surface-card)', border: 'none', borderRadius: 0 }}>Continue Shopping</Link>
      </div>
    </div>
  );

  return (
    <div style={{ backgroundColor: 'var(--paper)', minHeight: '100vh' }}>
      <div className="container py-5">
        <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--moss)', marginBottom: 8 }}>Checkout</h2>

        {/* Progress */}
        <div className="d-flex align-items-center gap-2 mb-5">
          {['Delivery', 'Payment', 'Review'].map((s, i) => (
            <React.Fragment key={s}>
              <div className="d-flex align-items-center gap-2">
                <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold small" style={{ width: 28, height: 28, backgroundColor: step > i + 1 ? 'var(--status-success-text)' : step === i + 1 ? 'var(--zest)' : 'var(--bs-border-color)', color: step >= i + 1 ? 'var(--surface-card)' : 'var(--sage)', fontSize: '0.8rem' }}>
                  {step > i + 1 ? <i className="bi bi-check2"></i> : i + 1}
                </div>
                <span className="small fw-medium d-none d-sm-inline" style={{ color: step === i + 1 ? 'var(--moss)' : 'var(--sage)' }}>{s}</span>
              </div>
              {i < 2 && <div className="flex-grow-1" style={{ height: 2, backgroundColor: step > i + 1 ? 'var(--status-success-text)' : 'var(--bs-border-color)' }}></div>}
            </React.Fragment>
          ))}
        </div>

        <div className="row g-5">
          <div className="col-12 col-lg-7">
            {/* Step 1: Delivery */}
            {step === 1 && (
              <div className="p-4 rounded-3" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid #e8e4de' }}>
                <h5 className="fw-bold mb-4" style={{ color: 'var(--moss)', fontFamily: "'Playfair Display', serif" }}>Delivery Details</h5>
                <div className="mb-3">
                  <label className="form-label small fw-medium" style={{ color: 'var(--moss)' }}>Delivery Address</label>
                  <div className="input-group">
                    <span className="input-group-text" style={{ backgroundColor: 'var(--surface-muted)', borderColor: 'var(--bs-border-color)' }}><i className="bi bi-geo-alt" style={{ color: 'var(--sage)' }}></i></span>
                    <input type="text" className="form-control" value={form.address} onChange={set('address')} required style={{ borderColor: 'var(--bs-border-color)', boxShadow: 'none', backgroundColor: 'var(--surface-muted)' }} />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="form-label small fw-medium" style={{ color: 'var(--moss)' }}>Delivery Date</label>
                  <div className="input-group">
                    <span className="input-group-text" style={{ backgroundColor: 'var(--surface-muted)', borderColor: 'var(--bs-border-color)' }}><i className="bi bi-calendar" style={{ color: 'var(--sage)' }}></i></span>
                    <input type="date" className="form-control" min={minDate} max={maxDate} value={form.deliveryDate} onChange={set('deliveryDate')} style={{ borderColor: 'var(--bs-border-color)', boxShadow: 'none', backgroundColor: 'var(--surface-muted)' }} />
                  </div>
                </div>
                <button onClick={() => setStep(2)} className="btn fw-bold py-2 px-5" disabled={!form.address || !form.deliveryDate}
                  style={{ backgroundColor: 'var(--zest)', color: 'var(--surface-card)', border: 'none', borderRadius: 0, letterSpacing: '0.5px' }}>
                  Continue to Payment <i className="bi bi-arrow-right ms-2"></i>
                </button>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="p-4 rounded-3" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid #e8e4de' }}>
                <h5 className="fw-bold mb-4" style={{ color: 'var(--moss)', fontFamily: "'Playfair Display', serif" }}>Payment Method</h5>
                <div className="d-flex gap-3 mb-4">
                  {[['card', 'bi-credit-card', 'Credit/Debit Card'], ['cash', 'bi-cash', 'Cash on Delivery']].map(([val, icon, label]) => (
                    <button key={val} onClick={() => setForm(p => ({...p, paymentMethod: val}))} className="btn flex-fill py-3 d-flex flex-column align-items-center gap-1"
                      style={{ backgroundColor: form.paymentMethod === val ? 'var(--status-warning-bg)' : 'var(--surface-muted)', border: `2px solid ${form.paymentMethod === val ? 'var(--zest)' : 'var(--bs-border-color)'}`, borderRadius: 12, transition: 'all 0.2s' }}>
                      <i className={`bi ${icon}`} style={{ fontSize: '1.4rem', color: form.paymentMethod === val ? 'var(--zest)' : 'var(--sage)' }}></i>
                      <span className="small fw-medium" style={{ color: 'var(--moss)' }}>{label}</span>
                    </button>
                  ))}
                </div>

                {form.paymentMethod === 'card' && (
                  <div className="p-3 rounded-3 mb-4" style={{ backgroundColor: 'var(--surface-muted)', border: '1px solid #e0dbd3' }}>
                    <div className="mb-3">
                      <label className="form-label small fw-medium" style={{ color: 'var(--moss)' }}>Card Number</label>
                      <input type="text" className="form-control" placeholder="1234 5678 9012 3456" maxLength={19} value={form.cardNumber} onChange={set('cardNumber')} style={{ borderColor: 'var(--bs-border-color)', boxShadow: 'none' }} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label small fw-medium" style={{ color: 'var(--moss)' }}>Cardholder Name</label>
                      <input type="text" className="form-control" placeholder="John Smith" value={form.cardName} onChange={set('cardName')} style={{ borderColor: 'var(--bs-border-color)', boxShadow: 'none' }} />
                    </div>
                    <div className="row g-2">
                      <div className="col-6">
                        <label className="form-label small fw-medium" style={{ color: 'var(--moss)' }}>Expiry Date</label>
                        <input type="text" className="form-control" placeholder="MM/YY" maxLength={5} value={form.cardExpiry} onChange={set('cardExpiry')} style={{ borderColor: 'var(--bs-border-color)', boxShadow: 'none' }} />
                      </div>
                      <div className="col-6">
                        <label className="form-label small fw-medium" style={{ color: 'var(--moss)' }}>CVV</label>
                        <input type="text" className="form-control" placeholder="123" maxLength={4} value={form.cardCvv} onChange={set('cardCvv')} style={{ borderColor: 'var(--bs-border-color)', boxShadow: 'none' }} />
                      </div>
                    </div>
                  </div>
                )}

                <div className="d-flex gap-2">
                  <button onClick={() => setStep(1)} className="btn px-4 py-2" style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--moss)', border: 'none', borderRadius: 0 }}>
                    <i className="bi bi-arrow-left me-2"></i>Back
                  </button>
                  <button onClick={() => setStep(3)} className="btn fw-bold py-2 px-4 flex-fill"
                    style={{ backgroundColor: 'var(--zest)', color: 'var(--surface-card)', border: 'none', borderRadius: 0 }}>
                    Review Order <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="p-4 rounded-3" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid #e8e4de' }}>
                <h5 className="fw-bold mb-4" style={{ color: 'var(--moss)', fontFamily: "'Playfair Display', serif" }}>Review Your Order</h5>
                <div className="row g-3 mb-4 small">
                  {[
                    ['Delivery Address', form.address, 'bi-geo-alt'],
                    ['Delivery Date', form.deliveryDate, 'bi-calendar'],
                    ['Payment', form.paymentMethod === 'card' ? 'Credit/Debit Card' : 'Cash on Delivery', 'bi-credit-card'],
                  ].map(([label, val, icon]) => (
                    <div key={label} className="col-12">
                      <div className="d-flex align-items-start gap-3 p-3 rounded-2" style={{ backgroundColor: 'var(--surface-muted)' }}>
                        <i className={`bi ${icon}`} style={{ color: 'var(--zest)', marginTop: 2 }}></i>
                        <div>
                          <div style={{ color: 'var(--sage)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
                          <div className="fw-medium" style={{ color: 'var(--moss)' }}>{val}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {cart.map(
// @ts-ignore
                item => (
                  <div key={item.id} className="d-flex align-items-center gap-3 mb-2 p-2 rounded-2" style={{ backgroundColor: 'var(--surface-muted)' }}>
                    <img src={item.image} alt={item.name} className="rounded-2" style={{ width: 44, height: 44, objectFit: 'cover' }} />
                    <span className="small flex-grow-1 fw-medium" style={{ color: 'var(--moss)' }}>{item.name} × {item.qty}</span>
                    <span className="small fw-bold" style={{ color: 'var(--zest)' }}>₱{(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}

                <div className="d-flex gap-2 mt-4">
                  <button onClick={() => setStep(2)} className="btn px-4 py-2" style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--moss)', border: 'none', borderRadius: 0 }}>
                    <i className="bi bi-arrow-left me-2"></i>Back
                  </button>
                  <button onClick={handlePlaceOrder} disabled={loading} className="btn fw-bold py-2 px-4 flex-fill"
                    style={{ backgroundColor: 'var(--zest)', color: 'var(--surface-card)', border: 'none', borderRadius: 0 }}>
                    {loading ? <><span className="spinner-border spinner-border-sm me-2"></span>Placing Order...</> : <>Place Order — ₱{total.toFixed(2)}</>}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="col-12 col-lg-5">
            <div className="p-4 rounded-3 sticky-top" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid #e8e4de', top: 80 }}>
              <h6 className="fw-bold mb-3" style={{ color: 'var(--moss)', fontFamily: "'Playfair Display', serif" }}>Order Summary</h6>
              {cart.map(
// @ts-ignore
              item => (
                <div key={item.id} className="d-flex justify-content-between mb-2 small">
                  <span style={{ color: 'var(--sage)' }}>{item.name} × {item.qty}</span>
                  <span style={{ color: 'var(--moss)', fontWeight: 500 }}>₱{(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
              <hr style={{ borderColor: 'var(--surface-muted)' }} />
              <div className="d-flex justify-content-between mb-1 small">
                <span style={{ color: 'var(--sage)' }}>Subtotal</span><span style={{ color: 'var(--moss)' }}>₱{cartTotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="d-flex justify-content-between mb-1 small">
                  <span style={{ color: 'var(--status-success-text)' }}>Discount</span><span style={{ color: 'var(--status-success-text)', fontWeight: 600 }}>₱{discount.toFixed(2)}</span>
                </div>
              )}
              <div className="d-flex justify-content-between mb-3 small">
                <span style={{ color: 'var(--sage)' }}>Delivery</span>
                <span style={{ color: deliveryFee === 0 ? 'var(--status-success-text)' : 'var(--moss)' }}>{deliveryFee === 0 ? 'FREE' : `₱${deliveryFee.toFixed(2)}`}</span>
              </div>
              <div className="d-flex justify-content-between fw-bold pt-2" style={{ borderTop: '2px solid #f0ede8' }}>
                <span style={{ color: 'var(--moss)' }}>Total</span>
                <span style={{ color: 'var(--zest)', fontSize: '1.2rem', fontFamily: "'Playfair Display', serif" }}>₱{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}