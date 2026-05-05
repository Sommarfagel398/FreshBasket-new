import React, { useState } from 'react';
import { useApp } from '../../lib/AppContext';

export default function AdminInventory() {

  const { products, updateProduct } = useApp();
  const [editId, setEditId] = useState(null);
  const [editStock, setEditStock] = useState('');
  const [search, setSearch] = useState('');


  const filtered = products.filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()));


  const getStatus = (stock) => {
    if (stock <= 0) return { label: 'Out of Stock', bg: 'var(--status-danger-bg)', text: 'var(--status-danger-text)', barColor: 'var(--status-danger-text)' };
    if (stock < 30) return { label: 'Critical', bg: 'var(--status-danger-bg)', text: 'var(--status-danger-text)', barColor: 'var(--status-danger-text)' };
    if (stock < 80) return { label: 'Low', bg: 'var(--status-warning-bg)', text: 'var(--zest)', barColor: 'var(--zest)' };
    return { label: 'In Stock', bg: 'var(--status-success-bg)', text: 'var(--status-success-text)', barColor: 'var(--status-success-text)' };
  };


  const handleSave = (id) => {
    updateProduct(id, { stock: parseInt(editStock) });
    setEditId(null);
  };


  const lowCount = products.filter(p => p.stock < 30).length;

  const outCount = products.filter(p => p.stock <= 0).length;

  const maxStock = Math.max(...products.map(p => p.stock));

  return (
    <div>
      <h4 className="fw-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--moss)' }}>Inventory Management</h4>

      {/* Summary */}
      <div className="row g-3 mb-4">
        {[
          ['bi-box-seam', 'Total SKUs', products.length, 'var(--status-info-text)'],
        
          ['bi-check-circle', 'In Stock', products.filter(p=>p.stock>80).length, 'var(--status-success-text)'],
          ['bi-exclamation-triangle', 'Low Stock (<30)', lowCount, 'var(--zest)'],
          ['bi-x-circle', 'Out of Stock', outCount, 'var(--status-danger-text)'],
        ].map(([icon, label, count, color]) => (
          <div key={label} className="col-6 col-md-3">
            <div className="p-3 rounded-3 text-center" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid #e8e4de' }}>
              <i className={`bi ${icon} d-block mb-1`} style={{ color, fontSize: '1.4rem' }}></i>
              <div className="fw-bold" style={{ color: 'var(--moss)', fontSize: '1.4rem' }}>{count}</div>
              <small style={{ color: 'var(--sage)', fontSize: '0.75rem' }}>{label}</small>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-3">
        <div className="input-group" style={{ maxWidth: 300 }}>
          <span className="input-group-text" style={{ backgroundColor: 'var(--surface-card)', borderColor: 'var(--bs-border-color)' }}><i className="bi bi-search" style={{ color: 'var(--sage)' }}></i></span>
          <input type="text" className="form-control" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} style={{ borderColor: 'var(--bs-border-color)', boxShadow: 'none' }} />
        </div>
      </div>

      <div className="rounded-3 overflow-hidden" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid #e8e4de' }}>
        <table className="table mb-0" style={{ fontSize: '0.85rem' }}>
          <thead style={{ backgroundColor: 'var(--surface-muted)' }}>
            <tr>
              {['Product', 'Category', 'Price', 'Stock Level', 'Status', 'Update Stock'].map(h => (
                <th key={h} className="small text-uppercase fw-semibold py-3" style={{ color: 'var(--sage)', letterSpacing: '0.05em', fontSize: '0.7rem', border: 'none' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(
// @ts-ignore
            p => {
              const status = getStatus(p.stock);
              const barWidth = Math.min(100, (p.stock / maxStock) * 100);
              return (
                <tr key={p.id} style={{ borderColor: 'var(--surface-muted)' }}>
                  <td className="py-3">
                    <div className="d-flex align-items-center gap-2">
                      <img src={p.image} alt={p.name} className="rounded-2" style={{ width: 36, height: 36, objectFit: 'cover' }} />
                      <span className="fw-medium" style={{ color: 'var(--moss)' }}>{p.name}</span>
                    </div>
                  </td>
                  <td className="py-3 text-capitalize" style={{ color: 'var(--sage)' }}>{p.category}</td>
                  <td className="py-3 fw-semibold" style={{ color: 'var(--zest)' }}>₱{p.price.toFixed(2)}</td>
                  <td className="py-3" style={{ minWidth: 140 }}>
                    <div className="d-flex align-items-center gap-2">
                      <span className="fw-semibold small" style={{ color: 'var(--moss)', minWidth: 28 }}>{p.stock}</span>
                      <div className="flex-grow-1 rounded-pill overflow-hidden" style={{ height: 6, backgroundColor: 'var(--surface-muted)' }}>
                        <div className="rounded-pill" style={{ width: `${barWidth}%`, height: '100%', backgroundColor: status.barColor, transition: 'width 0.5s ease' }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className="badge rounded-pill px-2" style={{ backgroundColor: status.bg, color: status.text, fontSize: '0.72rem' }}>{status.label}</span>
                  </td>
                  <td className="py-3">
                    {editId === p.id ? (
                      <div className="d-flex gap-1 align-items-center">
                        <input type="number" className="form-control form-control-sm" value={editStock} onChange={e => setEditStock(e.target.value)} style={{ width: 80, borderColor: 'var(--bs-border-color)', boxShadow: 'none', fontSize: '0.82rem' }} />
                        <button onClick={() => handleSave(p.id)} className="btn btn-sm" style={{ backgroundColor: 'var(--zest)', color: 'var(--surface-card)', border: 'none', padding: '3px 8px' }}><i className="bi bi-check2"></i></button>
                        <button onClick={() => setEditId(null)} className="btn btn-sm" style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--moss)', border: 'none', padding: '3px 8px' }}><i className="bi bi-x"></i></button>
                      </div>
                    ) : (
                      <button onClick={() => { setEditId(p.id); setEditStock(p.stock); }} className="btn btn-sm" style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--moss)', border: 'none', borderRadius: 6, fontSize: '0.78rem' }}>
                        <i className="bi bi-pencil me-1"></i>Update
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}