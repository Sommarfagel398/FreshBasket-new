import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../lib/AppContext';
import { LOGO_URL } from '../../context/AuthContext';

export default function SignIn() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(form.email, form.password);
    setLoading(false);
    if (result.success) {
      navigate(result.user?.role === 'admin' ? '/admin' : '/');
    } else {
      setError(result.error || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-vh-100 d-flex" style={{ backgroundColor: 'var(--paper)' }}>
      {/* Left panel */}
      <div
        className="d-none d-lg-flex col-lg-6 flex-column align-items-center justify-content-center p-5 position-relative overflow-hidden"
        style={{ backgroundColor: 'var(--moss)' }}
      >
        <div
          className="position-absolute w-100 h-100 top-0 start-0"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.25 }}
        />
        <div className="position-relative text-center z-1">
          <img src={LOGO_URL} alt="RLKB Fresh Basket" style={{ height: 90, marginBottom: 32, borderRadius: 100 }} />
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--paper)', fontSize: '2.2rem', lineHeight: 1.2, marginBottom: 16 }}>
            From Farm<br />To Your Table
          </h2>
          <p style={{ color: 'var(--sage)', fontSize: '1rem', lineHeight: 1.7, maxWidth: 320 }}>
            The freshest organic fruits and vegetables, delivered with care to your doorstep.
          </p>
          <div className="d-flex justify-content-center gap-4 mt-4">
            {[['bi-award', 'Certified Organic'], ['bi-truck', 'Same-Day Delivery'], ['bi-heart', '100% Fresh']].map(([icon, label]) => (
              <div key={label} className="text-center">
                <i className={`bi ${icon} d-block mb-1`} style={{ color: 'var(--zest)', fontSize: '1.4rem' }} />
                <small style={{ color: 'var(--sage)', fontSize: '0.7rem' }}>{label}</small>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center p-4 p-md-5">
        <div className="w-100" style={{ maxWidth: 420 }}>
          <div className="d-lg-none text-center mb-4">
            <img src={LOGO_URL} alt="Fresh & Natural" style={{ height: 56 }} />
          </div>

          <h3 className="fw-bold mb-1" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--moss)', fontSize: '1.8rem' }}>
            Welcome Back
          </h3>
          <p className="mb-4 small" style={{ color: 'var(--sage)' }}>Sign in to continue shopping</p>

          {error && (
            <div className="alert alert-danger d-flex align-items-center py-2 small mb-3" style={{ borderRadius: 10, border: 'none', backgroundColor: 'var(--status-danger-bg)' }}>
              <i className="bi bi-exclamation-circle me-2" />{error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-medium small" style={{ color: 'var(--moss)' }}>Email Address</label>
              <div className="input-group">
                <span className="input-group-text border-end-0" style={{ backgroundColor: 'var(--surface-muted)', borderColor: 'var(--bs-border-color)', borderRadius: '10px 0 0 10px' }}>
                  <i className="bi bi-envelope" style={{ color: 'var(--sage)' }} />
                </span>
                <input
                  type="email"
                  className="form-control border-start-0 ps-0"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  required
                  style={{ backgroundColor: 'var(--surface-muted)', borderColor: 'var(--bs-border-color)', borderRadius: '0 10px 10px 0', outline: 'none', boxShadow: 'none' }}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-medium small" style={{ color: 'var(--moss)' }}>Password</label>
              <div className="input-group">
                <span className="input-group-text border-end-0" style={{ backgroundColor: 'var(--surface-muted)', borderColor: 'var(--bs-border-color)', borderRadius: '10px 0 0 10px' }}>
                  <i className="bi bi-lock" style={{ color: 'var(--sage)' }} />
                </span>
                <input
                  type="password"
                  className="form-control border-start-0 ps-0"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  required
                  style={{ backgroundColor: 'var(--surface-muted)', borderColor: 'var(--bs-border-color)', borderRadius: '0 10px 10px 0', outline: 'none', boxShadow: 'none' }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn w-100 fw-bold py-3"
              disabled={loading}
              style={{ backgroundColor: 'var(--zest)', color: 'var(--surface-card)', border: 'none', borderRadius: 12, fontSize: '0.95rem', letterSpacing: '0.5px' }}
            >
              {loading
                ? <><span className="spinner-border spinner-border-sm me-2" />Signing in...</>
                : 'Sign In'
              }
            </button>
          </form>

          <p className="text-center mt-4 small" style={{ color: 'var(--sage)' }}>
            Don't have an account?{' '}
            <Link to="/signup" className="fw-semibold text-decoration-none" style={{ color: 'var(--zest)' }}>Create one free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
