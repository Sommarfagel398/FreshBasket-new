import React from 'react';
import { Link } from 'react-router-dom';
import { LOGO_URL } from '../../context/AuthContext';

const SOCIAL = ['facebook', 'instagram', 'twitter-x', 'youtube'];
const SHOP_LINKS = [['All Products', '/shop'], ['Fruits', '/shop?category=fruits'], ['Vegetables', '/shop?category=vegetables']];

export default function Footer() {
  return (
    <footer className="pt-5 pb-4 mt-5" style={{ backgroundColor: 'var(--footer-bg)', color: 'var(--paper)' }}>
      <div className="container">
        <div className="row g-4 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="col-12 col-md-4">
            <img src={LOGO_URL} alt="RLKB Fresh Basket" style={{ height: 56, marginBottom: 16, borderRadius: 100 }} />
            <p className="small mb-3" style={{ color: 'var(--sage)', lineHeight: 1.7 }}>
              From our farms to your table. We deliver the freshest organic fruits and vegetables, picked at peak ripeness and delivered to your door.
            </p>
            <div className="d-flex gap-3">
              {SOCIAL.map(s => (
                <a key={s} href="#" aria-label={s} className="d-flex align-items-center justify-content-center rounded-circle text-decoration-none"
                  style={{ width: 36, height: 36, backgroundColor: 'rgba(255,255,255,0.08)', color: 'var(--paper)' }}>
                  <i className={`bi bi-${s}`} />
                </a>
              ))}
            </div>
          </div>

          <div className="col-6 col-md-2 offset-md-1">
            <h6 className="text-uppercase fw-bold mb-3" style={{ color: 'var(--zest)', letterSpacing: '0.1em', fontSize: '0.75rem' }}>Shop</h6>
            <ul className="list-unstyled small mb-0" style={{ color: 'var(--sage)' }}>
              {SHOP_LINKS.map(([label, href]) => (
                <li key={label} className="mb-2"><Link to={href} className="text-decoration-none" style={{ color: 'inherit' }}>{label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="col-12 col-md-3 offset-md-2">
            <h6 className="text-uppercase fw-bold mb-3" style={{ color: 'var(--zest)', letterSpacing: '0.1em', fontSize: '0.75rem' }}>Contact</h6>
            <ul className="list-unstyled small mb-0" style={{ color: 'var(--sage)' }}>
              <li className="mb-2"><i className="bi bi-geo-alt me-2" />123 Farm Road, Green Valley</li>
              <li className="mb-2"><i className="bi bi-telephone me-2" />+1 555-FRESH</li>
              <li className="mb-2"><i className="bi bi-envelope me-2" />hello@freshandnatural.com</li>
              <li className="mb-2"><i className="bi bi-clock me-2" />Mon–Sat, 8am–6pm</li>
            </ul>
          </div>
        </div>

        <div className="row pt-3">
          <div className="col-12 col-md-6 small mb-2 mb-md-0" style={{ color: 'var(--sage)' }}>
            © 2026 RLKB Fresh Basket. All rights reserved.
          </div>
          <div className="col-12 col-md-6 text-md-end small" style={{ color: 'var(--sage)' }}>
            <Link to="#" className="text-decoration-none me-3" style={{ color: 'inherit' }}>Privacy Policy</Link>
            <Link to="#" className="text-decoration-none" style={{ color: 'inherit' }}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}