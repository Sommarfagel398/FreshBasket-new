
import React, { useState } from 'react';

// import { Link } from 'react-router-dom';
import { useApp } from '../../lib/AppContext';

const EMPTY = { name: '', category: 'fruits', price: '', unit: 'per kg', stock: '', image: '', badge: '', description: '', tags: '', featured: false };

export default function AdminProducts() {
  
  const { products, addProduct, updateProduct, deleteProduct } = useApp();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [deleteId, setDeleteId] = useState(null);

  
  const filtered = products.filter(p => {
    if (category !== 'all' && p.category !== category) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const openAdd = () => { setForm(EMPTY); setEditingId(null); setShowModal(true); };
  
  const openEdit = (p) => { setForm({ ...p, tags: p.tags?.join(', ') || '' }); setEditingId(p.id); setShowModal(true); };

  const handleSave = () => {
    
    const data = { ...form, price: parseFloat(form.price), stock: parseInt(form.stock), tags: form.tags.split(',').map(t => t.trim()).filter(Boolean), rating: editingId ? form.rating : 0, reviews: editingId ? form.reviews : 0 };
    if (editingId) updateProduct(editingId, data);
    else addProduct(data);
    setShowModal(false);
  };

  const confirmDelete = () => { deleteProduct(deleteId); setDeleteId(null); };

  
  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--moss)' }}>Product Catalog</h4>
        <button onClick={openAdd} className="btn fw-semibold" style={{ backgroundColor: 'var(--zest)', color: 'var(--surface-card)', border: 'none', borderRadius: 8 }}>
          <i className="bi bi-plus-lg me-2"></i>Add Product
        </button>
      </div>

      <div className="d-flex flex-wrap gap-3 mb-4">
        <div className="input-group flex-grow-1" style={{ maxWidth: 300 }}>
          <span className="input-group-text" style={{ backgroundColor: 'var(--surface-card)', borderColor: 'var(--bs-border-color)' }}><i className="bi bi-search" style={{ color: 'var(--sage)' }}></i></span>
          <input type="text" className="form-control" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} style={{ borderColor: 'var(--bs-border-color)', boxShadow: 'none' }} />
        </div>
        <div className="d-flex gap-2">
          {['all', 'fruits', 'vegetables'].map(c => (
            <button key={c} onClick={() => setCategory(c)} className="btn btn-sm px-3 py-2 rounded-pill fw-medium"
              style={{ backgroundColor: category === c ? 'var(--moss)' : 'var(--surface-card)', color: category === c ? 'var(--surface-card)' : 'var(--sage)', border: '1px solid #e8e4de', fontSize: '0.8rem', textTransform: 'capitalize' }}>
              {c === 'all' ? 'All' : c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-3 overflow-hidden" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid #e8e4de' }}>
        <table className="table table-hover mb-0" style={{ fontSize: '0.85rem' }}>
          <thead style={{ backgroundColor: 'var(--surface-muted)' }}>
            <tr>
              {['Product', 'Category', 'Price', 'Stock', 'Rating', 'Featured', 'Actions'].map(h => (
                <th key={h} className="small text-uppercase fw-semibold py-3" style={{ color: 'var(--sage)', letterSpacing: '0.05em', fontSize: '0.7rem', border: 'none' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(

            p => (
              <tr key={p.id} style={{ borderColor: 'var(--surface-muted)' }}>
                <td className="py-3">
                  <div className="d-flex align-items-center gap-3">
                    <img src={p.image} alt={p.name} className="rounded-2" style={{ width: 44, height: 44, objectFit: 'cover' }} />
                    <div>
                      <div className="fw-medium" style={{ color: 'var(--moss)' }}>{p.name}</div>
                      {p.badge && <span className="badge small" style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--sage)', fontSize: '0.65rem' }}>{p.badge}</span>}
                    </div>
                  </div>
                </td>
                <td className="py-3 text-capitalize" style={{ color: 'var(--sage)' }}>{p.category}</td>
                <td className="py-3 fw-semibold" style={{ color: 'var(--zest)' }}>₱{p.price.toFixed(2)} <span className="fw-normal text-muted small">{p.unit}</span></td>
                <td className="py-3">
                  <span className="badge rounded-pill px-2" style={{ backgroundColor: p.stock < 30 ? 'var(--status-danger-bg)' : p.stock < 80 ? 'var(--status-warning-bg)' : 'var(--status-success-bg)', color: p.stock < 30 ? 'var(--status-danger-text)' : p.stock < 80 ? 'var(--zest)' : 'var(--status-success-text)', fontSize: '0.75rem' }}>
                    {p.stock}
                  </span>
                </td>
                <td className="py-3 small" style={{ color: 'var(--sage)' }}>
                  <i className="bi bi-star-fill me-1" style={{ color: 'var(--zest)', fontSize: '0.7rem' }}></i>{p.rating}
                </td>
                <td className="py-3">
                  {p.featured ? <i className="bi bi-check-circle-fill" style={{ color: 'var(--status-success-text)' }}></i> : <i className="bi bi-circle" style={{ color: 'var(--bs-border-color)' }}></i>}
                </td>
                <td className="py-3">
                  <div className="d-flex gap-1">
                    <button onClick={() => openEdit(p)} className="btn btn-sm" style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--moss)', border: 'none', borderRadius: 6, padding: '4px 10px' }}>
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button onClick={() => setDeleteId(p.id)} className="btn btn-sm" style={{ backgroundColor: 'var(--status-danger-bg)', color: 'var(--status-danger-text)', border: 'none', borderRadius: 6, padding: '4px 10px' }}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content border-0 rounded-4">
              <div className="modal-header" style={{ borderColor: 'var(--surface-muted)' }}>
                <h5 className="modal-title fw-bold" style={{ color: 'var(--moss)', fontFamily: "'Playfair Display', serif" }}>{editingId ? 'Edit Product' : 'Add New Product'}</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body p-4">
                <div className="row g-3">
                  {[['Product Name', 'name', 'text', ''], ['Image URL', 'image', 'text', '']].map(([label, key, type]) => (
                    <div key={key} className="col-12">
                      <label className="form-label small fw-medium" style={{ color: 'var(--moss)' }}>{label}</label>
                      <input type={type} className="form-control" value={

                      form[key]} onChange={set(key)} style={{ borderColor: 'var(--bs-border-color)', boxShadow: 'none' }} />
                    </div>
                  ))}
                  <div className="col-6">
                    <label className="form-label small fw-medium" style={{ color: 'var(--moss)' }}>Category</label>
                    <select className="form-select" value={form.category} onChange={set('category')} style={{ borderColor: 'var(--bs-border-color)', boxShadow: 'none' }}>
                      <option value="fruits">Fruits</option>
                      <option value="vegetables">Vegetables</option>
                    </select>
                  </div>
                  <div className="col-3">
                    <label className="form-label small fw-medium" style={{ color: 'var(--moss)' }}>Price (₱)</label>
                    <input type="number" step="0.01" className="form-control" value={form.price} onChange={set('price')} style={{ borderColor: 'var(--bs-border-color)', boxShadow: 'none' }} />
                  </div>
                  <div className="col-3">
                    <label className="form-label small fw-medium" style={{ color: 'var(--moss)' }}>Stock</label>
                    <input type="number" className="form-control" value={form.stock} onChange={set('stock')} style={{ borderColor: 'var(--bs-border-color)', boxShadow: 'none' }} />
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-medium" style={{ color: 'var(--moss)' }}>Unit</label>
                    <input type="text" className="form-control" value={form.unit} onChange={set('unit')} placeholder="per kg, each, etc." style={{ borderColor: 'var(--bs-border-color)', boxShadow: 'none' }} />
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-medium" style={{ color: 'var(--moss)' }}>Badge</label>
                    <input type="text" className="form-control" value={form.badge} onChange={set('badge')} placeholder="Organic, Seasonal, etc." style={{ borderColor: 'var(--bs-border-color)', boxShadow: 'none' }} />
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-medium" style={{ color: 'var(--moss)' }}>Tags (comma-separated)</label>
                    <input type="text" className="form-control" value={form.tags} onChange={set('tags')} placeholder="organic, seasonal, premium" style={{ borderColor: 'var(--bs-border-color)', boxShadow: 'none' }} />
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-medium" style={{ color: 'var(--moss)' }}>Description</label>
                    <textarea className="form-control" rows={3} value={form.description} onChange={set('description')} style={{ borderColor: 'var(--bs-border-color)', boxShadow: 'none', resize: 'none' }}></textarea>
                  </div>
                  <div className="col-12">
                    <div className="form-check">
                      <input type="checkbox" className="form-check-input" id="featured" checked={form.featured} onChange={set('featured')} style={{ accentColor: 'var(--zest)' }} />
                      <label className="form-check-label small fw-medium" htmlFor="featured" style={{ color: 'var(--moss)' }}>Feature this product on homepage</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer" style={{ borderColor: 'var(--surface-muted)' }}>
                <button className="btn" onClick={() => setShowModal(false)} style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--moss)', border: 'none', borderRadius: 8 }}>Cancel</button>
                <button className="btn fw-semibold" onClick={handleSave} disabled={!form.name || !form.price}
                  style={{ backgroundColor: 'var(--zest)', color: 'var(--surface-card)', border: 'none', borderRadius: 8 }}>
                  {editingId ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-sm modal-dialog-centered">
            <div className="modal-content border-0 rounded-4 p-4 text-center">
              <i className="bi bi-trash d-block mb-3" style={{ color: 'var(--status-danger-text)', fontSize: '2.5rem' }}></i>
              <h6 className="fw-bold mb-2" style={{ color: 'var(--moss)' }}>Delete Product?</h6>
              <p className="small mb-4" style={{ color: 'var(--sage)' }}>This action cannot be undone.</p>
              <div className="d-flex gap-2 justify-content-center">
                <button onClick={() => setDeleteId(null)} className="btn btn-sm" style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--moss)', border: 'none' }}>Cancel</button>
                <button onClick={confirmDelete} className="btn btn-sm fw-semibold" style={{ backgroundColor: 'var(--status-danger-text)', color: 'var(--surface-card)', border: 'none' }}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}