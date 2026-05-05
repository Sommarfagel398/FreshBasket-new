
import React, { useState } from 'react';
import { useApp } from '../../lib/AppContext';

const EMPTY = { code: '', discount: '', type: 'percentage', minOrder: '', maxUses: '', expiresAt: '', active: true };

export default function AdminPromos() {
  
  const { promos, addPromo, updatePromo, deletePromo } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY);

  
  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const openAdd = () => { setForm(EMPTY); setEditId(null); setShowModal(true); };
  
  const openEdit = (p) => { setForm(p); setEditId(p.id); setShowModal(true); };

  const handleSave = () => {
    const data = { ...form, discount: parseFloat(form.discount), minOrder: parseFloat(form.minOrder), maxUses: parseInt(form.maxUses) };
    if (editId) updatePromo(editId, data);
    else addPromo(data);
    setShowModal(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--moss)' }}>Promo Codes</h4>
        <button onClick={openAdd} className="btn fw-semibold" style={{ backgroundColor: 'var(--zest)', color: 'var(--surface-card)', border: 'none', borderRadius: 8 }}>
          <i className="bi bi-plus-lg me-2"></i>Create Promo
        </button>
      </div>

      <div className="row g-3">
        {promos.map(

        p => (
          <div key={p.id} className="col-12 col-md-6">
            <div className="p-4 rounded-3 h-100" style={{ backgroundColor: 'var(--surface-card)', border: `2px solid ${p.active ? 'var(--zest)' : 'var(--bs-border-color)'}`, opacity: p.active ? 1 : 0.7 }}>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h5 className="fw-bold mb-1" style={{ color: 'var(--moss)', fontFamily: 'monospace', letterSpacing: '0.1em' }}>{p.code}</h5>
                  <span className="badge rounded-pill" style={{ backgroundColor: p.active ? 'var(--status-success-bg)' : 'var(--surface-muted)', color: p.active ? 'var(--status-success-text)' : 'var(--sage)', fontSize: '0.7rem' }}>
                    {p.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="text-end">
                  <div className="fw-bold" style={{ color: 'var(--zest)', fontSize: '1.4rem', fontFamily: "'Playfair Display', serif" }}>
                    {p.type === 'percentage' ? `${p.discount}%` : `₱${p.discount}`}
                  </div>
                  <small style={{ color: 'var(--sage)' }}>{p.type === 'percentage' ? 'Percentage off' : 'Fixed discount'}</small>
                </div>
              </div>

              <div className="row g-2 mb-3 small" style={{ color: 'var(--sage)' }}>
                <div className="col-6"><i className="bi bi-bag-check me-1"></i>Min. order: <strong style={{ color: 'var(--moss)' }}>₱{p.minOrder}</strong></div>
                <div className="col-6"><i className="bi bi-calendar me-1"></i>Expires: <strong style={{ color: 'var(--moss)' }}>{p.expiresAt}</strong></div>
                <div className="col-12">
                  <div className="d-flex justify-content-between mb-1">
                    <span>Usage: {p.uses}/{p.maxUses}</span>
                    <span>{Math.round((p.uses/p.maxUses)*100)}%</span>
                  </div>
                  <div className="rounded-pill overflow-hidden" style={{ height: 4, backgroundColor: 'var(--surface-muted)' }}>
                    <div className="rounded-pill" style={{ width: `${Math.min(100,(p.uses/p.maxUses)*100)}%`, height: '100%', backgroundColor: 'var(--zest)' }}></div>
                  </div>
                </div>
              </div>

              <div className="d-flex gap-2">
                <button onClick={() => openEdit(p)} className="btn btn-sm" style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--moss)', border: 'none', borderRadius: 6 }}>
                  <i className="bi bi-pencil me-1"></i>Edit
                </button>
                <button onClick={() => updatePromo(p.id, { active: !p.active })} className="btn btn-sm" style={{ backgroundColor: p.active ? 'var(--status-danger-bg)' : 'var(--status-success-bg)', color: p.active ? 'var(--status-danger-text)' : 'var(--status-success-text)', border: 'none', borderRadius: 6 }}>
                  {p.active ? <><i className="bi bi-pause me-1"></i>Deactivate</> : <><i className="bi bi-play me-1"></i>Activate</>}
                </button>
                <button onClick={() => deletePromo(p.id)} className="btn btn-sm ms-auto" style={{ backgroundColor: 'transparent', color: 'var(--status-danger-text)', border: 'none', fontSize: '0.78rem' }}>
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-4">
              <div className="modal-header" style={{ borderColor: 'var(--surface-muted)' }}>
                <h5 className="modal-title fw-bold" style={{ color: 'var(--moss)', fontFamily: "'Playfair Display', serif" }}>{editId ? 'Edit Promo' : 'Create Promo Code'}</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body p-4">
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label small fw-medium" style={{ color: 'var(--moss)' }}>Promo Code</label>
                    <input type="text" className="form-control text-uppercase fw-bold" value={form.code} onChange={set('code')} placeholder="e.g. SUMMER20" style={{ borderColor: 'var(--bs-border-color)', boxShadow: 'none', fontFamily: 'monospace', letterSpacing: '0.1em' }} />
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-medium" style={{ color: 'var(--moss)' }}>Discount</label>
                    <input type="number" className="form-control" value={form.discount} onChange={set('discount')} style={{ borderColor: 'var(--bs-border-color)', boxShadow: 'none' }} />
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-medium" style={{ color: 'var(--moss)' }}>Type</label>
                    <select className="form-select" value={form.type} onChange={set('type')} style={{ borderColor: 'var(--bs-border-color)', boxShadow: 'none' }}>
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed ($)</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-medium" style={{ color: 'var(--moss)' }}>Min. Order ($)</label>
                    <input type="number" className="form-control" value={form.minOrder} onChange={set('minOrder')} style={{ borderColor: 'var(--bs-border-color)', boxShadow: 'none' }} />
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-medium" style={{ color: 'var(--moss)' }}>Max Uses</label>
                    <input type="number" className="form-control" value={form.maxUses} onChange={set('maxUses')} style={{ borderColor: 'var(--bs-border-color)', boxShadow: 'none' }} />
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-medium" style={{ color: 'var(--moss)' }}>Expiry Date</label>
                    <input type="date" className="form-control" value={form.expiresAt} onChange={set('expiresAt')} style={{ borderColor: 'var(--bs-border-color)', boxShadow: 'none' }} />
                  </div>
                  <div className="col-12">
                    <div className="form-check">
                      <input type="checkbox" className="form-check-input" id="active" checked={form.active} onChange={set('active')} style={{ accentColor: 'var(--zest)' }} />
                      <label className="form-check-label small fw-medium" htmlFor="active" style={{ color: 'var(--moss)' }}>Active (customers can use this code)</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer" style={{ borderColor: 'var(--surface-muted)' }}>
                <button className="btn" onClick={() => setShowModal(false)} style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--moss)', border: 'none', borderRadius: 8 }}>Cancel</button>
                <button className="btn fw-semibold" onClick={handleSave} disabled={!form.code || !form.discount}
                  style={{ backgroundColor: 'var(--zest)', color: 'var(--surface-card)', border: 'none', borderRadius: 8 }}>
                  {editId ? 'Save Changes' : 'Create Code'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}