
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../lib/AppContext';
import ProductCard from '../../components/fn/ProductCard';

const STATUS_COLORS = {
  confirmed: { bg: 'var(--status-warning-bg)', text: 'var(--zest)' },
  packing: { bg: 'var(--status-info-bg)', text: 'var(--status-info-text)' },
  delivering: { bg: 'var(--status-success-bg)', text: 'var(--status-success-text)' },
  delivered: { bg: 'var(--status-purple-bg)', text: 'var(--status-purple-text)' },
  cancelled: { bg: 'var(--status-danger-bg)', text: 'var(--status-danger-text)' },
};

export default function Account() {
  
  const { currentUser, getUserOrders, products, favourites, updateUserProfile, logout } = useApp();
  const navigate = useNavigate();
  
  const urlParams = new URLSearchParams(window.location.search);
  const [tab, setTab] = useState(window.location.pathname.includes('orders') ? 'orders' : window.location.pathname.includes('favourites') ? 'favourites' : 'profile');
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: currentUser?.name || '', phone: currentUser?.phone || '', address: currentUser?.address || '' });
  
  // Loading and error states for profile update operations
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false); // Shows loading state while API request is pending
  const [error, setError] = useState(null);      // Displays error messages if save fails

  const orders = getUserOrders(currentUser?.id);
  
  const favProducts = products.filter(p => favourites.includes(p.id));

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    
    // Validate phone format (11 digits max, numbers only)
    if (form.phone && !/^\d{1,11}$/.test(form.phone.replace(/\D/g, ''))) {
      setError('Phone must contain numbers only and max 11 digits');
      setLoading(false);
      return;
    }
    
    const result = await updateUserProfile(form);
    
    if (result.success) {
      setEditMode(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  if (!currentUser) return (
    <div className="container py-5 text-center">
      <p style={{ color: 'var(--sage)' }}>Please <Link to="/signin" style={{ color: 'var(--zest)' }}>sign in</Link> to view your account.</p>
    </div>
  );

  return (
    <div style={{ backgroundColor: 'var(--paper)', minHeight: '100vh' }}>
      <div className="container py-5">
        <div className="row g-4">
          {/* Sidebar */}
          <div className="col-12 col-md-3">
            <div className="p-4 rounded-3 text-center mb-3" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid #e8e4de' }}>
              <img src={currentUser.avatar} alt="" className="rounded-circle mb-3" style={{ width: 72, height: 72, objectFit: 'cover', border: '3px solid #E67E22' }} />
              <h6 className="fw-bold mb-0" style={{ color: 'var(--moss)' }}>{currentUser.name}</h6>
              <small style={{ color: 'var(--sage)' }}>{currentUser.email}</small>
              <div className="mt-2">
                <span className="badge rounded-pill" style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--sage)', fontSize: '0.7rem' }}>
                  <i className="bi bi-person-check me-1"></i>Customer
                </span>
              </div>
            </div>
            <div className="p-2 rounded-3" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid #e8e4de' }}>
              {[['profile', 'bi-person', 'My Profile'], ['orders', 'bi-bag-check', 'My Orders'], ['favourites', 'bi-heart', 'Favourites']].map(([t, icon, label]) => (
                <button key={t} onClick={() => setTab(t)} className="btn btn-sm d-flex align-items-center gap-2 w-100 text-start mb-1 px-3 py-2 rounded-2"
                  style={{ backgroundColor: tab === t ? 'var(--status-warning-bg)' : 'transparent', color: tab === t ? 'var(--zest)' : 'var(--moss)', border: 'none', fontWeight: tab === t ? 600 : 400 }}>
                  <i className={`bi ${icon}`}></i>{label}
                  {t === 'favourites' && favourites.length > 0 && (
                    <span className="ms-auto badge rounded-pill" style={{ backgroundColor: 'var(--zest)', color: 'var(--surface-card)', fontSize: '0.65rem' }}>{favourites.length}</span>
                  )}
                </button>
              ))}
              <hr style={{ borderColor: 'var(--surface-muted)' }} />
              <button onClick={() => { logout(); navigate('/'); }} className="btn btn-sm d-flex align-items-center gap-2 w-100 text-start px-3 py-2 rounded-2 text-danger" style={{ backgroundColor: 'transparent', border: 'none' }}>
                <i className="bi bi-box-arrow-right"></i>Sign Out
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="col-12 col-md-9">
            {/* Profile Tab */}
            {tab === 'profile' && (
              <div className="p-4 rounded-3" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid #e8e4de' }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-bold mb-0" style={{ color: 'var(--moss)', fontFamily: "'Playfair Display', serif" }}>My Profile</h5>
                  <button onClick={() => editMode ? handleSave() : setEditMode(true)} className="btn btn-sm fw-semibold" disabled={loading}
                    style={{ backgroundColor: editMode ? (loading ? 'var(--sage)' : 'var(--zest)') : 'var(--surface-muted)', color: editMode ? 'var(--surface-card)' : 'var(--moss)', border: 'none', borderRadius: 8, opacity: loading ? 0.7 : 1 }}>
                    {loading ? <><i className="bi bi-hourglass-split me-1"></i>Saving...</> : editMode ? <><i className="bi bi-check2 me-1"></i>Save</> : <><i className="bi bi-pencil me-1"></i>Edit</>}
                  </button>
                </div>
                {saved && <div className="alert py-2 small mb-3" style={{ backgroundColor: 'var(--status-success-bg)', border: 'none', color: 'var(--status-success-text)', borderRadius: 8 }}><i className="bi bi-check-circle me-2"></i>Profile updated successfully!</div>}
                {error && <div className="alert py-2 small mb-3" style={{ backgroundColor: 'var(--status-danger-bg)', border: 'none', color: 'var(--status-danger-text)', borderRadius: 8 }}><i className="bi bi-exclamation-circle me-2"></i>{error}</div>}
                <div className="row g-3">
                  {[['Full Name', 'name', 'bi-person'], ['Phone', 'phone', 'bi-telephone'], ['Email', 'email', 'bi-envelope'], ['Delivery Address', 'address', 'bi-geo-alt']].map(([label, key, icon]) => (
                    <div key={key} className="col-12 col-sm-6">
                      <label className="form-label small fw-medium" style={{ color: 'var(--moss)' }}>{label}</label>
                      <div className="input-group">
                        <span className="input-group-text" style={{ backgroundColor: 'var(--surface-muted)', borderColor: 'var(--bs-border-color)' }}>
                          <i className={`bi ${icon}`} style={{ color: 'var(--sage)' }}></i>
                        </span>
                        
                        <input 
                          type="text" 
                          className="form-control" 
                          value={key === 'email' ? currentUser.email : form[key]} 
                          onChange={e => {
                            // Phone validation: only digits, max 11 characters (matching SignUp form)
                            if (key === 'phone') {
                              const numericValue = e.target.value.replace(/\D/g, '');
                              if (numericValue.length <= 11) {
                                setForm(p => ({...p, [key]: numericValue}));
                              }
                            } else {
                              setForm(p => ({...p, [key]: e.target.value}));
                            }
                          }}
                          disabled={!editMode || key === 'email'} 
                          style={{ borderColor: 'var(--bs-border-color)', boxShadow: 'none', backgroundColor: editMode && key !== 'email' ? 'var(--surface-card)' : 'var(--surface-muted)' }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {tab === 'orders' && (
              <div>
                <h5 className="fw-bold mb-4" style={{ color: 'var(--moss)', fontFamily: "'Playfair Display', serif" }}>My Orders</h5>
                {orders.length === 0 ? (
                  <div className="text-center py-5 rounded-3" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid #e8e4de' }}>
                    <i className="bi bi-bag d-block mb-3" style={{ fontSize: '3rem', color: 'var(--sage)' }}></i>
                    <h6 style={{ color: 'var(--moss)' }}>No orders yet</h6>
                    <Link to="/shop" className="btn btn-sm mt-2" style={{ backgroundColor: 'var(--zest)', color: 'var(--surface-card)', border: 'none' }}>Start Shopping</Link>
                  </div>
                ) : (
                  
                  orders.map(order => {
                    
                    const statusStyle = STATUS_COLORS[order.status] || STATUS_COLORS.confirmed;
                    return (
                      <div key={order.id} className="mb-3 p-4 rounded-3" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid #e8e4de' }}>
                        <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-3">
                          <div>
                            <h6 className="fw-bold mb-0" style={{ color: 'var(--moss)' }}>{order.id}</h6>
                            <small style={{ color: 'var(--sage)' }}>Ordered: {order.date} · Delivery: {order.deliveryDate}</small>
                          </div>
                          <span className="badge rounded-pill px-3 py-2" style={{ backgroundColor: statusStyle.bg, color: statusStyle.text, fontSize: '0.75rem', textTransform: 'capitalize' }}>
                            {order.status === 'delivering' ? <><i className="bi bi-truck me-1"></i>Out for Delivery</> : order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                        <div className="d-flex flex-wrap gap-2 mb-3">
                          
                          {order.items.map(

                          item => (
                            <span key={item.productId} className="badge rounded-pill small" style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--moss)', fontWeight: 400, fontSize: '0.78rem', padding: '4px 10px' }}>
                              {item.name} × {item.qty}
                            </span>
                          ))}
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="small" style={{ color: 'var(--sage)' }}>
                            <i className="bi bi-geo-alt me-1"></i>{order.address}
                          </div>
                          <span className="fw-bold" style={{ color: 'var(--zest)' }}>₱{order.total.toFixed(2)}</span>
                        </div>

                        {/* Progress bar */}
                        <div className="mt-3">
                          <div className="d-flex gap-1">
                            {['confirmed', 'packing', 'delivering', 'delivered'].map((s, i) => {
                              const steps = ['confirmed', 'packing', 'delivering', 'delivered'];
                              const current = steps.indexOf(order.status);
                              const active = i <= current && order.status !== 'cancelled';
                              return <div key={s} className="flex-fill rounded-pill" style={{ height: 4, backgroundColor: active ? 'var(--zest)' : 'var(--surface-muted)', transition: 'all 0.3s' }}></div>;
                            })}
                          </div>
                          <div className="d-flex justify-content-between mt-1">
                            {['Confirmed', 'Packing', 'Delivering', 'Delivered'].map(s => (
                              <small key={s} style={{ color: 'var(--sage)', fontSize: '0.65rem' }}>{s}</small>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* Favourites Tab */}
            {tab === 'favourites' && (
              <div>
                <h5 className="fw-bold mb-4" style={{ color: 'var(--moss)', fontFamily: "'Playfair Display', serif" }}>My Favourites</h5>
                {favProducts.length === 0 ? (
                  <div className="text-center py-5 rounded-3" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid #e8e4de' }}>
                    <i className="bi bi-heart d-block mb-3" style={{ fontSize: '3rem', color: 'var(--sage)' }}></i>
                    <h6 style={{ color: 'var(--moss)' }}>No favourites yet</h6>
                    <Link to="/shop" className="btn btn-sm mt-2" style={{ backgroundColor: 'var(--zest)', color: 'var(--surface-card)', border: 'none' }}>Discover Products</Link>
                  </div>
                ) : (
                  <div className="row g-3">
                   
                    {favProducts.map(
                  
                    p => (
                      <div key={p.id} className="col-6 col-md-4">
                        <ProductCard product={p} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}