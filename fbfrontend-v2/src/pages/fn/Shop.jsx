import React, { useState, useMemo } from 'react';
import { useApp } from '../../lib/AppContext';
import ProductCard from '../../components/fn/ProductCard';

export default function Shop() {
  const { products } = useApp();
  const urlParams = new URLSearchParams(window.location.search);
  const initialCat = urlParams.get('category') || 'all';
  const [category, setCategory] = useState(initialCat);
  const [sort, setSort] = useState('featured');
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [priceMax, setPriceMax] = useState(500);

  const filtered = useMemo(() => {
    let res = [...products];
    if (category !== 'all') res = res.filter(p => p.category === category);
    if (selectedTag) {
      res = res.filter(p => p.tags?.some(tag => tag.toLowerCase() === selectedTag.toLowerCase()));
    }
    if (search.trim()) {
      const lowerSearch = search.toLowerCase();
      res = res.filter(p =>
        p.name.toLowerCase().includes(lowerSearch) ||
        p.tags?.some(tag => tag.toLowerCase().includes(lowerSearch))
      );
    }
    res = res.filter(p => p.price <= priceMax);
    if (sort === 'price-asc') res.sort((a,b) => a.price - b.price);
    else if (sort === 'price-desc') res.sort((a,b) => b.price - a.price);
    else if (sort === 'rating') res.sort((a,b) => b.rating - a.rating);
    else if (sort === 'newest') res.sort((a,b) => b.id - a.id);
    return res;
  }, [products, category, sort, search, selectedTag, priceMax]);

  return (
    <div style={{ backgroundColor: 'var(--paper)', minHeight: '100vh' }}>
      {/* Header */}
      <div className="py-5" style={{ backgroundColor: 'var(--moss)', backgroundImage: 'url(https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1200&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay' }}>
        <div className="container text-center py-4">
          <h1 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--paper)', fontSize: '3rem', marginBottom: 8 }}>Our Market</h1>
          <p style={{ color: 'var(--sage)' }}>Freshly harvested, delivered to you</p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-4">
          {/* Sidebar */}
          <div className="col-12 col-lg-3">
            <div className="sticky-top" style={{ top: '100px', zIndex: 1 }}>
              {/* Search */}
              <div className="mb-4">
                <div className="input-group">
                  <span className="input-group-text" style={{ backgroundColor: 'var(--surface-card)', borderColor: 'var(--bs-border-color)', borderRight: 'none' }}>
                    <i className="bi bi-search" style={{ color: 'var(--sage)' }}></i>
                  </span>
                  <input type="text" className="form-control border-start-0" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)}
                    style={{ backgroundColor: 'var(--surface-card)', borderColor: 'var(--bs-border-color)', boxShadow: 'none' }} />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-4 p-4 rounded-3" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid #e8e4de' }}>
                <h6 className="fw-bold mb-3 text-uppercase" style={{ color: 'var(--moss)', fontSize: '0.75rem', letterSpacing: '0.1em' }}>Categories</h6>
                {[['all', 'All Products', products.length], ['fruits', 'Fresh Fruits', products.filter(
                              p=>p.category==='fruits').length], ['vegetables', 'Vegetables', products.filter(p=>p.category==='vegetables').length]].map(([val, label, count]) => (
                  <button key={val} onClick={() => setCategory(val)} className="btn btn-sm d-flex align-items-center justify-content-between w-100 text-start mb-2 px-3 py-2 rounded-2"
                    style={{ backgroundColor: category === val ? 'var(--zest)' : 'transparent', color: category === val ? 'var(--surface-card)' : 'var(--moss)', border: category === val ? 'none' : '1px solid #e8e4de', fontWeight: category === val ? 600 : 400 }}>
                    <span>{label}</span>
                    <span className="badge rounded-pill" style={{ backgroundColor: category === val ? 'rgba(255,255,255,0.3)' : 'var(--surface-muted)', color: category === val ? 'var(--surface-card)' : 'var(--sage)', fontSize: '0.65rem' }}>{count}</span>
                  </button>
                ))}
              </div>

              {/* Price Range */}
<div
  className="mb-4 p-4 rounded-3"
  style={{
    backgroundColor: 'var(--surface-card)',
    border: '1px solid #e8e4de'
  }}
>
  <h6
    className="fw-bold mb-3 text-uppercase d-flex justify-content-between"
    style={{
      color: 'var(--moss)',
      fontSize: '0.75rem',
      letterSpacing: '0.1em'
    }}
  >
    Price Range{" "}
    <span style={{ color: 'var(--zest)', fontWeight: 700 }}>
      ≤ ₱{priceMax}
    </span>
  </h6>

  <input
    type="range"
    className="form-range"
    min="0"
    max="500"
    step="10"
    value={priceMax}
    onChange={(e) => setPriceMax(Number(e.target.value))}
    style={{ accentColor: 'var(--zest)' }}
  />

  <div className="d-flex justify-content-between mt-1">
    <small style={{ color: 'var(--sage)', fontSize: '0.72rem' }}>
      ₱0
    </small>
    <small style={{ color: 'var(--sage)', fontSize: '0.72rem' }}>
      ₱500
    </small>
  </div>
</div>

              {/* <div className="mb-4 p-4 rounded-3" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid #e8e4de' }}>
                <h6 className="fw-bold mb-3 text-uppercase d-flex justify-content-between" style={{ color: 'var(--moss)', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
                  Price Range <span style={{ color: 'var(--zest)', fontWeight: 700 }}>≤ ₱{priceMax}</span>
                </h6>
                <input type="range" className="form-range" min="1" max="20" value={priceMax} onChange={e => setPriceMax(Number(e.target.value))} style={{ accentColor: 'var(--zest)' }} />
                <div className="d-flex justify-content-between mt-1">
                  <small style={{ color: 'var(--sage)', fontSize: '0.72rem' }}>₱1</small>
                  <small style={{ color: 'var(--sage)', fontSize: '0.72rem' }}>₱300</small>
                </div>
              </div> */}

              {/* Badges Quick Filter */}
              <div className="p-4 rounded-3" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid #e8e4de' }}>
                <h6 className="fw-bold mb-3 text-uppercase" style={{ color: 'var(--moss)', fontSize: '0.75rem', letterSpacing: '0.1em' }}>Product Tags</h6>
                <div className="d-flex flex-wrap gap-2">
                  {['Organic', 'Seasonal', 'Premium', 'Popular', 'Superfood'].map(tag => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                      className="btn btn-sm rounded-pill"
                      style={{
                        backgroundColor: selectedTag === tag ? 'var(--zest)' : 'var(--surface-muted)',
                        color: selectedTag === tag ? 'var(--surface-card)' : 'var(--moss)',
                        fontSize: '0.72rem',
                        border: 'none',
                        padding: '4px 12px'
                      }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="col-12 col-lg-9">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <p className="mb-0 small" style={{ color: 'var(--sage)' }}>Showing <strong style={{ color: 'var(--moss)' }}>{filtered.length}</strong> products</p>
              <select className="form-select form-select-sm" value={sort} onChange={e => setSort(e.target.value)} style={{ width: 'auto', borderColor: 'var(--bs-border-color)', color: 'var(--moss)', fontSize: '0.85rem', backgroundColor: 'var(--surface-card)', boxShadow: 'none' }}>
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-5">
                <i className="bi bi-search d-block mb-3" style={{ fontSize: '3rem', color: 'var(--sage)' }}></i>
                <h5 style={{ color: 'var(--moss)' }}>No products found</h5>
                <p style={{ color: 'var(--sage)' }}>Try adjusting your filters</p>
                <button onClick={() => { setCategory('all'); setSearch(''); setPriceMax(20); }} className="btn btn-sm" style={{ backgroundColor: 'var(--zest)', color: 'var(--surface-card)', border: 'none' }}>Clear Filters</button>
              </div>
            ) : (
              <div className="row g-4">
                {filtered.map(p => (
                  <div key={p.id} className="col-6 col-md-4">
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
