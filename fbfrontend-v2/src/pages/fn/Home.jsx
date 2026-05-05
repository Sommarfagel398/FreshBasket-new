import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../lib/AppContext';
import { MOCK_PRODUCTS } from '../../lib/mockData';
import { LOGO_URL } from '../../context/AuthContext';
import ProductCard from '../../components/fn/ProductCard';

export default function Home() {
  const { addToCart, currentUser } = useApp();
  const navigate = useNavigate();
  const featured = MOCK_PRODUCTS.filter(p => p.featured);
  const fruits = MOCK_PRODUCTS.filter(p => p.category === 'fruits').slice(0, 4);
  const veggies = MOCK_PRODUCTS.filter(p => p.category === 'vegetables').slice(0, 4);

  return (
    <div style={{ backgroundColor: 'var(--paper)' }}>
      {/* Hero */}
      <section className="position-relative overflow-hidden" style={{ minHeight: '90vh', backgroundColor: 'var(--moss)' }}>
        <div className="position-absolute w-100 h-100 top-0 start-0" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1400&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.3 }}></div>
        <div className="container h-100 position-relative d-flex align-items-center" style={{ minHeight: '90vh' }}>
          <div className="row align-items-center">
            <div className="col-12 col-lg-6 py-5">
              <div className="d-inline-flex align-items-center gap-2 mb-4 px-3 py-2 rounded-pill" style={{ backgroundColor: 'rgba(230,126,34,0.15)', border: '1px solid rgba(230,126,34,0.3)' }}>
                <span className="rounded-circle d-inline-block" style={{ width: 8, height: 8, backgroundColor: 'var(--zest)' }}></span>
                <small className="fw-semibold" style={{ color: 'var(--zest)', letterSpacing: '0.1em', fontSize: '0.75rem', textTransform: 'uppercase' }}>100% Organic & Fresh</small>
              </div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--paper)', fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                Nature's Finest,<br />
                <span style={{ color: 'var(--zest)' }}>Delivered </span>
              </h1>
              <p className="my-4" style={{ color: 'var(--sage)', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: 440 }}>
                From our certified organic farms directly to your table. Experience the purest flavours of the season, picked at peak ripeness.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/shop" className="btn fw-bold px-4 py-3" style={{ backgroundColor: 'var(--zest)', color: 'var(--surface-card)', border: 'none', borderRadius: 0, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.85rem' }}>
                  Shop Now <i className="bi bi-arrow-right ms-2"></i>
                </Link>
                <Link to="/shop?category=fruits" className="btn fw-medium px-4 py-3" style={{ backgroundColor: 'transparent', color: 'var(--paper)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 0, fontSize: '0.85rem' }}>
                  Seasonal Picks
                </Link>
              </div>
              <div className="d-flex gap-4 mt-5">
                {[['500+', 'Happy Customers'], ['100%', 'Organic'], ['Same Day', 'Delivery']].map(([val, label]) => (
                  <div key={label}>
                    <div className="fw-bold mb-0" style={{ color: 'var(--zest)', fontSize: '1.3rem', fontFamily: "'Playfair Display', serif" }}>{val}</div>
                    <small style={{ color: 'var(--sage)', fontSize: '0.75rem' }}>{label}</small>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center">
              <img src={LOGO_URL} alt="Fresh & Natural" style={{ width: 360, filter: 'brightness(0) invert(1)', opacity: 0.15 }} className="position-absolute" />
              <div className="row g-3" style={{ maxWidth: 380 }}>
                {featured.slice(0, 4).map((p, i) => (
                  <div key={p.id} className={`col-6 ${i % 2 === 1 ? 'mt-4' : ''}`}>
                    <div className="rounded-3 overflow-hidden shadow-lg" style={{ height: 160, cursor: 'pointer' }} onClick={() => navigate(`/product/${p.id}`)}>
                      <img src={p.image} alt={p.name} className="w-100 h-100" style={{ objectFit: 'cover' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-4" style={{ backgroundColor: 'var(--surface-card)', borderBottom: '1px solid #e8e4de' }}>
        <div className="container">
          <div className="row g-3 text-center">
            {[
              ['bi-award-fill', 'var(--zest)', 'Certified Organic', 'All products certified'],
              ['bi-truck', 'var(--status-success-text)', 'Free Delivery', 'On orders over $50'],
              ['bi-shield-check-fill', 'var(--zest)', 'Quality Guaranteed', '100% fresh or refund'],
              ['bi-clock', 'var(--status-success-text)', 'Same Day Delivery', 'Order before 2pm'],
            ].map(([icon, color, title, sub]) => (
              <div key={title} className="col-6 col-md-3">
                <div className="d-flex align-items-center gap-3 justify-content-center justify-content-md-start">
                  <div className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 44, height: 44, backgroundColor: `${color}15` }}>
                    <i className={`bi ${icon}`} style={{ color, fontSize: '1.1rem' }}></i>
                  </div>
                  <div className="text-start">
                    <div className="fw-semibold small" style={{ color: 'var(--moss)', fontSize: '0.85rem' }}>{title}</div>
                    <div style={{ color: 'var(--sage)', fontSize: '0.72rem' }}>{sub}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <small className="d-block text-uppercase fw-bold mb-2" style={{ color: 'var(--zest)', letterSpacing: '0.15em', fontSize: '0.75rem' }}>Browse By Category</small>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--moss)', fontSize: '2.2rem' }}>What Are You Looking For?</h2>
          </div>
          <div className="row g-4">
            {[
              { label: 'Fresh Fruits', count: MOCK_PRODUCTS.filter(p=>p.category==='fruits').length, img: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&q=80', cat: 'fruits' },
              { label: 'Fresh Vegetables', count: MOCK_PRODUCTS.filter(p=>p.category==='vegetables').length, img: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=600&q=80', cat: 'vegetables' },
            ].map(({ label, count, img, cat }) => (
              <div key={cat} className="col-12 col-md-6">
                <Link to={`/shop?category=${cat}`} className="text-decoration-none d-block position-relative overflow-hidden rounded-4" style={{ height: 280 }}>
                  <img src={img} alt={label} className="w-100 h-100" style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }} onMouseOver={e => e.target.
                  style.transform = 'scale(1.05)'} onMouseOut={e => e.target.style.transform = 'scale(1)'} />
                  <div className="position-absolute w-100 h-100 top-0 start-0" style={{ background: 'linear-gradient(to top, rgba(26,36,33,0.8) 0%, rgba(26,36,33,0.1) 60%)' }}></div>
                  <div className="position-absolute bottom-0 start-0 p-4">
                    <h4 className="fw-bold mb-1" style={{ color: 'var(--paper)', fontFamily: "'Playfair Display', serif" }}>{label}</h4>
                    <span className="badge rounded-pill" style={{ backgroundColor: 'var(--zest)', fontSize: '0.72rem' }}>{count} products</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-5" style={{ backgroundColor: 'var(--surface-card)' }}>
        <div className="container">
          <div className="d-flex align-items-end justify-content-between mb-5">
            <div>
              <small className="d-block text-uppercase fw-bold mb-2" style={{ color: 'var(--zest)', letterSpacing: '0.15em', fontSize: '0.75rem' }}>Handpicked</small>
              <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--moss)', fontSize: '2.2rem', marginBottom: 0 }}>Featured Products</h2>
            </div>
            <Link to="/shop" className="btn btn-sm fw-medium" style={{ color: 'var(--zest)', textDecoration: 'none', borderBottom: '2px solid #E67E22', borderRadius: 0, padding: '4px 0' }}>
              View All <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>
          <div className="row g-4">
            {featured.map(p => (
              <div key={p.id} className="col-6 col-md-4 col-lg-3">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Banner */}
      <section className="py-5">
        <div className="container">
          <div className="rounded-4 overflow-hidden position-relative" style={{ minHeight: 280 }}>
            <div className="position-absolute w-100 h-100 top-0 start-0" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <div className="position-absolute w-100 h-100 top-0 start-0" style={{ background: 'linear-gradient(135deg, rgba(26,36,33,0.92) 0%, rgba(26,36,33,0.4) 100%)' }}></div>
            <div className="position-relative p-5 d-flex align-items-center" style={{ minHeight: 280 }}>
              <div>
                <small className="d-block fw-bold text-uppercase mb-2" style={{ color: 'var(--zest)', letterSpacing: '0.15em', fontSize: '0.75rem' }}>Limited Time</small>
                <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--paper)', fontSize: '2.2rem', marginBottom: 12 }}>Spring Harvest<br />Collection</h2>
                <p style={{ color: 'var(--sage)', maxWidth: 360, marginBottom: 24, lineHeight: 1.7 }}>Fresh seasonal picks arriving daily. From sun-kissed mangoes to crisp spring lettuce.</p>
                <Link to="/shop?badge=Seasonal" className="btn fw-bold px-4 py-2" style={{ backgroundColor: 'var(--zest)', color: 'var(--surface-card)', border: 'none', borderRadius: 0, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.82rem' }}>
                  Shop Seasonal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fresh Fruits Section */}
      <section className="py-5" style={{ backgroundColor: 'var(--surface-card)' }}>
        <div className="container">
          <div className="d-flex align-items-end justify-content-between mb-4">
            <h3 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--moss)' }}>Fresh Fruits</h3>
            <Link to="/shop?category=fruits" className="small fw-medium text-decoration-none" style={{ color: 'var(--zest)' }}>View All Fruits →</Link>
          </div>
          <div className="row g-4">
            {fruits.map(p => (
              <div key={p.id} className="col-6 col-md-3">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fresh Vegetables Section */}
      <section className="py-5">
        <div className="container">
          <div className="d-flex align-items-end justify-content-between mb-4">
            <h3 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--moss)' }}>Fresh Vegetables</h3>
            <Link to="/shop?category=vegetables" className="small fw-medium text-decoration-none" style={{ color: 'var(--zest)' }}>View All Vegetables →</Link>
          </div>
          <div className="row g-4">
            {veggies.map(p => (
              <div key={p.id} className="col-6 col-md-3">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-5" style={{ backgroundColor: 'var(--surface-card)' }}>
        <div className="container">
          <div className="text-center mb-5">
            <small className="d-block text-uppercase fw-bold mb-2" style={{ color: 'var(--zest)', letterSpacing: '0.15em', fontSize: '0.75rem' }}>What Customers Say</small>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--moss)', fontSize: '2.2rem' }}>Fresh Reviews</h2>
          </div>
          <div className="row g-4">
            {[
              { name: 'Lourdes C.', text: 'The freshest produce I\'ve ever had delivered. The avocados were perfectly ripe!', rating: 5, img: 'https://i.pravatar.cc/60?img=5' },
              { name: 'Ricardo C.', text: 'Incredible quality! The Alphonso mangoes are divine. I\'ll never buy from a supermarket again.', rating: 5, img: 'https://i.pravatar.cc/60?img=6' },
              { name: 'Lilian C.', text: 'Same-day delivery is amazing. Everything arrives fresh and beautifully packaged.', rating: 5, img: 'https://i.pravatar.cc/60?img=7' },
            ].map(t => (
              <div key={t.name} className="col-12 col-md-4">
                <div className="p-4 rounded-3 h-100" style={{ backgroundColor: 'var(--paper)', border: '1px solid #e8e4de' }}>
                  <div className="mb-3">
                    {[1,2,3,4,5].map(s => <i key={s} className="bi bi-star-fill me-1" style={{ color: 'var(--zest)', fontSize: '0.8rem' }}></i>)}
                  </div>
                  <p className="mb-4" style={{ color: 'var(--moss)', lineHeight: 1.7, fontStyle: 'italic' }}>"{t.text}"</p>
                  <div className="d-flex align-items-center gap-3">
                    <img src={t.img} alt={t.name} className="rounded-circle" style={{ width: 40, height: 40, objectFit: 'cover' }} />
                    <div>
                      <div className="fw-semibold small" style={{ color: 'var(--moss)' }}>{t.name}</div>
                      <small style={{ color: 'var(--sage)', fontSize: '0.72rem' }}>Verified Customer</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}