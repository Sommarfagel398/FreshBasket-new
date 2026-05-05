import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../lib/AppContext';
import { LOGO_URL } from '../../context/AuthContext';

/* ✅ Move OUTSIDE the component */
/*Added two HTML attributes maxlength and InputMode as a prop*/
const InputField = ({
  label,
  icon,
  type = 'text',
  placeholder,
  half = false,
  value,
  onChange,
  maxLength,
  inputMode
}) => (
  <div className={`mb-3 ${half ? 'col-12 col-sm-6' : 'col-12'}`}>
    <label
      className="form-label fw-medium small"
      style={{ color: 'var(--moss)' }}
    >
      {label}
    </label>

    <div className="input-group">
      <span
        className="input-group-text border-end-0"
        style={{
          backgroundColor: 'var(--surface-muted)',
          borderColor: 'var(--bs-border-color)',
          borderRadius: '10px 0 0 10px'
        }}
      >
        <i className={`bi bi-${icon}`} style={{ color: 'var(--sage)' }} />
      </span>
      {/*Added inputMode and Maxlength as a set property*/}
      <input
        type={type}
        inputMode={inputMode}
        maxLength={maxLength}
        className="form-control border-start-0 ps-0"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        style={{
          backgroundColor: 'var(--surface-muted)',
          borderColor: 'var(--bs-border-color)',
          borderRadius: '0 10px 10px 0',
          boxShadow: 'none'
        }}
      />
    </div>
  </div>
);

export default function SignUp() {
  const { signup } = useApp();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: '',
    username: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirm: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  /* ✅ Stable handler */
  const handleChange = (key) => (e) => {
    setForm((prev) => ({
      ...prev,
      [key]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

      if (!form.username.trim()) {
        return setError('Username is required.');
      }

      if (form.username.length < 3) {
        return setError('Username must be at least 3 characters.');
      }

    if (form.password !== form.confirm) {
      return setError("Passwords don't match.");
    }

    if (form.password.length < 6) {
      return setError('Password must be at least 6 characters.');
    }
    if (!/^\d{11}$/.test(form.phone)) {
      return setError('Phone number must be exactly 11 digits.');
    }
    

    setLoading(true);


    const result = await signup({
      full_name: form.full_name,
      username: form.username,  
      email: form.email,
      phone: form.phone,
      address: form.address,
      password: form.password
    });

    setLoading(false);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'Registration failed. Please try again.');
    }
  };

  const handlePhoneChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 11); // strip non-digits, max 11
      setForm((prev) => ({ ...prev, phone: digits }));
  };


  return (
    <div
      className="min-vh-100 d-flex"
      style={{ backgroundColor: 'var(--paper)' }}
    >
      {/* LEFT PANEL */}
      <div
        className="d-none d-lg-flex col-lg-5 flex-column align-items-center justify-content-center p-5 position-relative overflow-hidden"
        style={{ backgroundColor: 'var(--moss)' }}
      >
        <div
          className="position-absolute w-100 h-100 top-0 start-0"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.2
          }}
        />

        <div className="position-relative text-center z-1">
          <img
            src={LOGO_URL}
            alt="Fresh & Natural"
            style={{
              height: 80,
              borderRadius: '50%',
              marginBottom: 28
            }}
          />

          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              color: 'var(--paper)',
              fontSize: '1.9rem',
              lineHeight: 1.3,
              marginBottom: 16
            }}
          >
            Join the<br />Fresh Revolution
          </h2>

          <p
            style={{
              color: 'var(--sage)',
              fontSize: '0.9rem',
              lineHeight: 1.7,
              maxWidth: 280
            }}
          >
            Create your account and enjoy farm-fresh produce delivered to your door.
          </p>

          <div
            className="mt-4 p-3 rounded-3"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
          >
            {[
              'Free delivery on first order',
              'Exclusive member discounts',
              'Track your orders live',
              'Flexible delivery scheduling'
            ].map((b) => (
              <div
                key={b}
                className="d-flex align-items-center gap-2 mb-2"
              >
                <i
                  className="bi bi-check-circle-fill"
                  style={{
                    color: 'var(--zest)',
                    fontSize: '0.85rem'
                  }}
                />
                <small
                  style={{
                    color: 'var(--paper)',
                    fontSize: '0.82rem'
                  }}
                >
                  {b}
                </small>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="col-12 col-lg-7 d-flex align-items-center justify-content-center p-4 p-md-5">
        <div className="w-100" style={{ maxWidth: 520 }}>
          <div className="d-lg-none text-center mb-4">
            <img src={LOGO_URL} alt="Fresh & Natural" style={{ height: 52 }} />
          </div>

          <h3
            className="fw-bold mb-1"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: 'var(--moss)',
              fontSize: '1.8rem'
            }}
          >
            Create Account
          </h3>

          <p className="mb-4 small" style={{ color: 'var(--sage)' }}>
            Start your fresh journey today
          </p>

          {error && (
            <div
              className="alert d-flex align-items-center py-2 small mb-3"
              style={{
                borderRadius: 10,
                border: 'none',
                backgroundColor: 'var(--status-danger-bg)',
                color: 'var(--status-danger-text)'
              }}
            >
              <i className="bi bi-exclamation-circle me-2" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="row g-0">
              <InputField
                label="Full Name"
                icon="person"
                placeholder="John Smith"
                value={form.full_name}
                onChange={handleChange('full_name')}
              />

              <InputField
                label="Username"
                icon="at"
                placeholder="johnsmith123"
                half
                value={form.username}
                onChange={handleChange('username')}
              />

              <InputField
                label="Email Address"
                icon="envelope"
                placeholder="your@email.com"
                type="email"
                half
                value={form.email}
                onChange={handleChange('email')}
              />
                {/* Added prop Max length and input mode*/}
              <InputField
                label="Phone Number"
                icon="telephone"
                placeholder="+63 9XX XXX XXXX"
                type="tel"
                half
                value={form.phone}
                onChange={handlePhoneChange}
                maxLength={11}
                inputMode="numeric"
              />

              <InputField
                label="Delivery Address"
                icon="geo-alt"
                placeholder="123 Main St, City"
                value={form.address}
                onChange={handleChange('address')}
              />

              <InputField
                label="Password"
                icon="lock"
                placeholder="••••••••"
                type="password"
                half
                value={form.password}
                onChange={handleChange('password')}
              />

              <InputField
                label="Confirm Password"
                icon="shield-check"
                placeholder="••••••••"
                type="password"
                half
                value={form.confirm}
                onChange={handleChange('confirm')}
              />
            </div>

            <button
              type="submit"
              className="btn w-100 fw-bold py-3 mt-1"
              disabled={loading}
              style={{
                backgroundColor: 'var(--zest)',
                color: 'var(--surface-card)',
                border: 'none',
                borderRadius: 12,
                fontSize: '0.95rem',
                letterSpacing: '0.5px'
              }}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Creating account...
                </>
              ) : (
                'Create My Account'
              )}
            </button>
          </form>

          <p
            className="text-center mt-4 small"
            style={{ color: 'var(--sage)' }}
          >
            Already have an account?{' '}
            <Link
              to="/signin"
              className="fw-semibold text-decoration-none"
              style={{ color: 'var(--zest)' }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}