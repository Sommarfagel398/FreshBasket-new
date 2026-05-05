
import React, { useState } from 'react';
import { useApp } from '../../lib/AppContext';
import { ORDER_STATUSES } from '../../lib/mockData';

const STATUS_COLORS = { confirmed: { bg: 'var(--status-warning-bg)', text: 'var(--zest)' }, packing: { bg: 'var(--status-info-bg)', text: 'var(--status-info-text)' }, delivering: { bg: 'var(--status-success-bg)', text: 'var(--status-success-text)' }, delivered: { bg: 'var(--status-purple-bg)', text: 'var(--status-purple-text)' }, cancelled: { bg: 'var(--status-danger-bg)', text: 'var(--status-danger-text)' } };

export default function AdminOrders() {
  
  const { orders, updateOrderStatus } = useApp();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  
  const filtered = orders.filter(o => {
    if (filter !== 'all' && o.status !== filter) return false;
    if (search && !o.id.toLowerCase().includes(search.toLowerCase()) && !o.customerName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  
  const counts = ORDER_STATUSES.reduce((acc, s) => ({ ...acc, [s]: orders.filter(o => o.status === s).length }), {});

  return (
    <div>
      <h4 className="fw-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--moss)' }}>Orders Management</h4>

      {/* Kanban-style status tabs */}
      <div className="d-flex flex-wrap gap-2 mb-4">
        {[['all', 'All', orders.length], ...ORDER_STATUSES.map(s => [s, s.charAt(0).toUpperCase() + s.slice(1), 

        counts[s] || 0])].map(([val, label, count]) => (
          <button key={val} onClick={() => setFilter(val)} className="btn btn-sm px-3 py-2 rounded-pill fw-medium"
            style={{ backgroundColor: filter === val ? 'var(--moss)' : 'var(--surface-card)', color: filter === val ? 'var(--surface-card)' : 'var(--sage)', border: '1px solid #e8e4de', fontSize: '0.8rem' }}>
            {label} <span className="ms-1 badge rounded-pill" style={{ backgroundColor: filter === val ? 'rgba(255,255,255,0.2)' : 'var(--surface-muted)', color: filter === val ? 'var(--surface-card)' : 'var(--sage)', fontSize: '0.65rem' }}>{count}</span>
          </button>
        ))}
      </div>

      <div className="mb-4">
        <div className="input-group" style={{ maxWidth: 320 }}>
          <span className="input-group-text" style={{ backgroundColor: 'var(--surface-card)', borderColor: 'var(--bs-border-color)' }}><i className="bi bi-search" style={{ color: 'var(--sage)' }}></i></span>
          <input type="text" className="form-control" placeholder="Search by ID or customer..." value={search} onChange={e => setSearch(e.target.value)} style={{ borderColor: 'var(--bs-border-color)', boxShadow: 'none' }} />
        </div>
      </div>

      <div className="rounded-3 overflow-hidden" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid #e8e4de' }}>
        {filtered.length === 0 ? (
          <div className="text-center py-5" style={{ color: 'var(--sage)' }}>No orders found</div>
        ) : (
          
          filtered.map((order, idx) => {
            
            const statusStyle = STATUS_COLORS[order.status] || STATUS_COLORS.confirmed;
            return (
              <div key={order.id} className="p-4" style={{ borderBottom: idx < filtered.length - 1 ? '1px solid #f8f5f0' : 'none' }}>
                <div className="d-flex flex-wrap justify-content-between align-items-start gap-3">
                  <div className="flex-grow-1">
                    <div className="d-flex flex-wrap align-items-center gap-2 mb-1">
                      <span className="fw-bold" style={{ color: 'var(--moss)' }}>{order.id}</span>
                      <span className="badge rounded-pill px-2 text-capitalize" style={{ backgroundColor: statusStyle.bg, color: statusStyle.text, fontSize: '0.7rem' }}>{order.status}</span>
                      {order.promoCode && <span className="badge rounded-pill" style={{ backgroundColor: 'var(--status-success-bg)', color: 'var(--status-success-text)', fontSize: '0.65rem' }}><i className="bi bi-tag me-1"></i>{order.promoCode}</span>}
                    </div>
                    <small style={{ color: 'var(--sage)' }}><i className="bi bi-person me-1"></i>{order.customerName} · {order.email}</small><br />
                    <small style={{ color: 'var(--sage)' }}><i className="bi bi-geo-alt me-1"></i>{order.address}</small><br />
                    <small style={{ color: 'var(--sage)' }}><i className="bi bi-calendar me-1"></i>Ordered: {order.date} · Delivery: {order.deliveryDate}</small>
                    <div className="mt-2 d-flex flex-wrap gap-1">
                      {order.items.map(

                      item => (
                        <span key={item.productId} className="badge small" style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--moss)', fontWeight: 400, fontSize: '0.75rem' }}>
                          {item.name} × {item.qty}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="d-flex flex-column align-items-end gap-2">
                    <span className="fw-bold" style={{ color: 'var(--zest)', fontSize: '1.1rem' }}>₱{order.total.toFixed(2)}</span>
                    <span className="badge" style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--sage)', fontSize: '0.72rem', fontWeight: 400 }}>
                      <i className="bi bi-credit-card me-1"></i>{order.paymentMethod}
                    </span>
                    {order.status !== 'delivered' && order.status !== 'cancelled' && (
                      <select className="form-select form-select-sm" value={order.status}
                        onChange={e => updateOrderStatus(order.id, e.target.value)}
                        style={{ fontSize: '0.78rem', borderColor: 'var(--bs-border-color)', color: 'var(--moss)', boxShadow: 'none', minWidth: 150 }}>
                        {ORDER_STATUSES.filter(s => s !== 'cancelled').map(s => (
                          <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                        ))}
                        <option value="cancelled">Cancel Order</option>
                      </select>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}