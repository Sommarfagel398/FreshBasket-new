import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../lib/AppContext';
import { useTheme } from '../../lib/ThemeContext';
import { LOGO_URL } from '../../context/AuthContext';

export default function Navbar() {
  const { currentUser, logout, cartCount, favourites } = useApp();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => { logout(); navigate('/'); setMenuOpen(false); setDropdownOpen(false); };
  const isActive = (path) => location.pathname === path ? 'active' : '';

  console.log('Navbar render', { currentUser, cartCount, favourites });

  return (
    <nav className="navbar navbar-expand-lg sticky-top shadow-sm navbar-custom">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={LOGO_URL} alt="RLKB Fresh Basket" style={{ height: 48 }} />
        </Link>

        <button className="navbar-toggler border-0" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
          <i className="bi bi-list fs-4" style={{ color: 'var(--moss)' }} />
        </button>

        <div className={`navbar-collapse ${menuOpen ? 'show' : 'collapse'}`}>
          <ul className="navbar-nav mx-auto gap-1">
            <li className="nav-item">
              <Link className={`nav-link fw-medium ${isActive('/')}`} to="/" onClick={() => setMenuOpen(false)} style={{ color: 'var(--moss)' }}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link fw-medium ${isActive('/shop')}`} to="/shop" onClick={() => setMenuOpen(false)} style={{ color: 'var(--moss)' }}>Shop</Link>
            </li>
            {currentUser?.role === 'admin' && (
              <li className="nav-item">
                <Link className={`nav-link fw-medium ${isActive('/admin')}`} to="/admin" onClick={() => setMenuOpen(false)} style={{ color: 'var(--zest)' }}>
                  <i className="bi bi-speedometer2 me-1" />Dashboard
                </Link>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-sm border-0 d-flex align-items-center justify-content-center rounded-circle"
              onClick={toggleTheme}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              style={{ width: 36, height: 36, backgroundColor: 'var(--surface-muted)', color: 'var(--moss)' }}
            >
              <i className={`bi bi-${isDark ? 'sun' : 'moon'}`} style={{ fontSize: '0.95rem' }} />
            </button>

            {currentUser ? (
              <>
                {currentUser.role === 'customer' && (
                  <>
                    <Link
                      to="/account/favourites"
                      className="btn btn-sm border-0 position-relative d-flex align-items-center justify-content-center rounded-circle"
                      onClick={() => setMenuOpen(false)}
                      style={{ width: 36, height: 36, backgroundColor: 'var(--surface-muted)' }}
                    >
                      <i className="bi bi-heart" style={{ color: 'var(--zest)', fontSize: '0.95rem' }} />
                      {favourites.length > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill" style={{ backgroundColor: 'var(--zest)', fontSize: '0.6rem' }}>
                          {favourites.length}
                        </span>
                      )}
                    </Link>
                    <Link
                      to="/cart"
                      className="btn btn-sm border-0 position-relative d-flex align-items-center justify-content-center rounded-circle"
                      onClick={() => setMenuOpen(false)}
                      style={{ width: 36, height: 36, backgroundColor: 'var(--surface-muted)' }}
                    >
                      <i className="bi bi-bag" style={{ color: 'var(--moss)', fontSize: '0.95rem' }} />
                      {cartCount > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill" style={{ backgroundColor: 'var(--zest)', fontSize: '0.6rem' }}>
                          {cartCount}
                        </span>
                      )}
                    </Link>
                  </>
                )}

                <div className="dropdown" ref={dropdownRef}>
                  <button
                    className="btn btn-sm border-0 d-flex align-items-center gap-2"
                    style={{ backgroundColor: 'var(--surface-muted)', borderRadius: 20, padding: '4px 10px 4px 4px' }}
                    onClick={() => setDropdownOpen(o => !o)}
                  >
                    <img src={currentUser.avatar || `https://i.pravatar.cc/100?u=${currentUser.email}`} alt="" className="rounded-circle" style={{ width: 28, height: 28, objectFit: 'cover' }} />
                    <span className="d-none d-md-inline fw-medium small" style={{ color: 'var(--moss)' }}>
                      {currentUser.name?.split(' ')[0]}
                    </span>
                    <i className="bi bi-chevron-down" style={{ fontSize: '0.65rem', color: 'var(--sage)' }} />
                  </button>

                  {dropdownOpen && (
                    <ul className="dropdown-menu dropdown-menu-end shadow border-0 show" style={{ marginTop: 6, minWidth: 200 }}>
                      {currentUser.role === 'customer' && (
                        <>
                          <li><Link className="dropdown-item small" to="/account" onClick={() => { setDropdownOpen(false); setMenuOpen(false); }}><i className="bi bi-person me-2" />My Account</Link></li>
                          <li><Link className="dropdown-item small" to="/account/orders" onClick={() => { setDropdownOpen(false); setMenuOpen(false); }}><i className="bi bi-bag-check me-2" />My Orders</Link></li>
                          <li><Link className="dropdown-item small" to="/account/favourites" onClick={() => { setDropdownOpen(false); setMenuOpen(false); }}><i className="bi bi-heart me-2" />Favourites</Link></li>
                          <li><hr className="dropdown-divider" /></li>
                        </>
                      )}
                      {currentUser.role === 'admin' && (
                        <>
                          <li><Link className="dropdown-item small" to="/admin" onClick={() => { setDropdownOpen(false); setMenuOpen(false); }}><i className="bi bi-speedometer2 me-2" />Admin Dashboard</Link></li>
                          <li><hr className="dropdown-divider" /></li>
                        </>
                      )}
                      <li>
                        <button className="dropdown-item small text-danger" onClick={handleLogout}>
                          <i className="bi bi-box-arrow-right me-2" />Sign Out
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              </>
            ) : (
              <div className="d-flex gap-2">
                <Link to="/signin" className="btn btn-outline-secondary btn-sm fw-medium" onClick={() => setMenuOpen(false)}>Sign In</Link>
                <Link to="/signup" className="btn btn-sm fw-medium text-white" style={{ backgroundColor: 'var(--zest)', borderColor: 'var(--zest)' }} onClick={() => setMenuOpen(false)}>Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
