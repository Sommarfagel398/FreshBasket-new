
import React, { useState } from 'react';
import { useApp } from '../../lib/AppContext';

export default function AdminCustomers() {
  
  const { users, getUserOrders } = useApp();
  
  const customers = (users || []).filter(u => u.role === 'customer');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  
  const filtered = customers.filter(u => !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <h4 className="fw-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--moss)' }}>Customer Management</h4>

      <div className="mb-4 row g-3">
        {[['bi-people', 'Total Customers', customers.length, 'var(--status-info-text)'], ['bi-bag-check', 'Total Orders', 
      
        useApp().orders.length, 'var(--zest)']].map(([icon, label, val, color]) => (
          <div key={label} className="col-6 col-md-3">
            <div className="p-3 rounded-3" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid #e8e4de' }}>
              <i className={`bi ${icon} d-block mb-1`} style={{ color, fontSize: '1.3rem' }}></i>
              <div className="fw-bold" style={{ color: 'var(--moss)', fontSize: '1.5rem' }}>{val}</div>
              <small style={{ color: 'var(--sage)' }}>{label}</small>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-3">
        <div className="input-group" style={{ maxWidth: 320 }}>
          <span className="input-group-text" style={{ backgroundColor: 'var(--surface-card)', borderColor: 'var(--bs-border-color)' }}><i className="bi bi-search" style={{ color: 'var(--sage)' }}></i></span>
          <input type="text" className="form-control" placeholder="Search customers..." value={search} onChange={e => setSearch(e.target.value)} style={{ borderColor: 'var(--bs-border-color)', boxShadow: 'none' }} />
        </div>
      </div>

      <div className="row g-4">
        <div className={`col-12 ${selected ? 'col-md-7' : ''}`}>
          <div className="rounded-3 overflow-hidden" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid #e8e4de' }}>
            {filtered.map((
            
            u, idx) => {
              const orders = getUserOrders(u.id);
              
              const totalSpent = orders.reduce((s, o) => s + o.total, 0);
              return (
                <div key={u.id} className="d-flex align-items-center gap-3 p-4" style={{ borderBottom: idx < filtered.length - 1 ? '1px solid #f8f5f0' : 'none', cursor: 'pointer', backgroundColor: selected?.
              
                id === u.id ? 'var(--status-warning-bg)' : 'transparent', transition: 'background 0.2s' }}
                  
                  onClick={() => setSelected(selected?.id === u.id ? null : u)}>
                  <img src={u.avatar} alt="" className="rounded-circle flex-shrink-0" style={{ width: 44, height: 44, objectFit: 'cover' }} />
                  <div className="flex-grow-1 min-w-0">
                    <div className="fw-semibold" style={{ color: 'var(--moss)' }}>{u.name}</div>
                    <small style={{ color: 'var(--sage)' }}>{u.email}</small>
                  </div>
                  <div className="text-end d-none d-sm-block">
                    <div className="small fw-semibold" style={{ color: 'var(--zest)' }}>{orders.length} orders</div>
                    <small style={{ color: 'var(--sage)' }}>${totalSpent.toFixed(2)} spent</small>
                  </div>
                  <span className="badge rounded-pill ms-2" style={{ backgroundColor: 'var(--status-success-bg)', color: 'var(--status-success-text)', fontSize: '0.68rem' }}>Customer</span>
                </div>
              );
            })}
          </div>
        </div>

        {selected && (
          <div className="col-12 col-md-5">
            <div className="p-4 rounded-3 sticky-top" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid #e8e4de', top: 80 }}>
              <div className="d-flex justify-content-between mb-3">
                <h6 className="fw-bold mb-0" style={{ color: 'var(--moss)', fontFamily: "'Playfair Display', serif" }}>Customer Details</h6>
                <button onClick={() => setSelected(null)} className="btn btn-sm" style={{ backgroundColor: 'transparent', border: 'none', color: 'var(--sage)', padding: 0 }}><i className="bi bi-x-lg"></i></button>
              </div>
              <div className="text-center mb-4">
                <img src={selected.
                
                avatar} alt="" className="rounded-circle mb-2" style={{ width: 64, height: 64, objectFit: 'cover', border: '3px solid #E67E22' }} />
                <h6 className="fw-bold mb-0" style={{ color: 'var(--moss)' }}>{selected.
                
                name}</h6>
                <small style={{ color: 'var(--sage)' }}>{selected.
                
                email}</small>
              </div>
              {[['bi-telephone', 'Phone', selected.
                
              phone || 'N/A'], ['bi-geo-alt', 'Address', selected.address || 'N/A']].map(([icon, label, val]) => (
                <div key={label} className="d-flex gap-2 mb-2 p-2 rounded-2" style={{ backgroundColor: 'var(--surface-muted)' }}>
                  <i className={`bi ${icon}`} style={{ color: 'var(--zest)', marginTop: 2 }}></i>
                  <div>
                    <div style={{ color: 'var(--sage)', fontSize: '0.7rem', textTransform: 'uppercase' }}>{label}</div>
                    <div className="small fw-medium" style={{ color: 'var(--moss)' }}>{val}</div>
                  </div>
                </div>
              ))}
              <div className="mt-3">
                <h6 className="small fw-bold text-uppercase mb-2" style={{ color: 'var(--sage)', letterSpacing: '0.05em' }}>Order History</h6>
                {getUserOrders(selected.

                id).map(o => (
                  <div key={o.id} className="d-flex justify-content-between mb-1 small p-2 rounded-2" style={{ backgroundColor: 'var(--surface-muted)' }}>
                    <span style={{ color: 'var(--moss)' }}>{o.id} <span className="text-capitalize" style={{ color: 'var(--sage)' }}>({o.status})</span></span>
                    <span style={{ color: 'var(--zest)', fontWeight: 600 }}>${o.total.toFixed(2)}</span>
                  </div>
                ))}
                {getUserOrders(selected.

                id).length === 0 && <p className="small" style={{ color: 'var(--sage)' }}>No orders yet.</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}