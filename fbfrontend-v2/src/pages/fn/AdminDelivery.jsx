import React, { useState } from 'react';
import { DELIVERY_ZONES } from '../../lib/mockData';

export default function AdminDelivery() {
  const [zones, setZones] = useState(DELIVERY_ZONES);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});


  const openEdit = (zone) => { setEditId(zone.id); setEditForm({ ...zone }); };

  const saveEdit = () => { setZones(prev => prev.map(z => z.id === editId ? { ...editForm } : z)); setEditId(null); };

  const schedules = [
    { day: 'Monday', slots: ['8:00 AM – 12:00 PM', '1:00 PM – 5:00 PM'], available: true },
    { day: 'Tuesday', slots: ['8:00 AM – 12:00 PM', '1:00 PM – 5:00 PM'], available: true },
    { day: 'Wednesday', slots: ['8:00 AM – 12:00 PM'], available: true },
    { day: 'Thursday', slots: ['8:00 AM – 12:00 PM', '1:00 PM – 5:00 PM'], available: true },
    { day: 'Friday', slots: ['8:00 AM – 12:00 PM', '1:00 PM – 5:00 PM', '5:00 PM – 8:00 PM'], available: true },
    { day: 'Saturday', slots: ['9:00 AM – 1:00 PM'], available: true },
    { day: 'Sunday', slots: [], available: false },
  ];

  return (
    <div>
      <h4 className="fw-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--moss)' }}>Delivery Zones & Schedules</h4>

      <div className="row g-4">
        {/* Zones */}
        <div className="col-12 col-lg-7">
          <h6 className="fw-bold mb-3" style={{ color: 'var(--moss)' }}>Delivery Zones</h6>
          {zones.map(zone => (
            <div key={zone.id} className="mb-3 p-4 rounded-3" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid #e8e4de' }}>
              {editId === zone.id ? (
                <div className="row g-2">
                  {[['Zone Name', 'name', 'text'], ['Delivery Fee (₱)', 'fee', 'number'], ['Min. Order (₱)', 'minOrder', 'number'], ['Estimated Time', 'estimatedTime', 'text']].map(([label, key, type]) => (
                    <div key={key} className="col-12 col-sm-6">
                      <label className="form-label small fw-medium mb-1" style={{ color: 'var(--moss)' }}>{label}</label>
                      <input type={type} step={type === 'number' ? '0.01' : undefined} className="form-control form-control-sm" value={
// @ts-ignore
                      editForm[key]} onChange={e => setEditForm(p => ({...p, [key]: type === 'number' ? parseFloat(e.target.value) : e.target.value}))} style={{ borderColor: 'var(--bs-border-color)', boxShadow: 'none' }} />
                    </div>
                  ))}
                  <div className="col-12 d-flex gap-2 mt-2">
                    <button onClick={saveEdit} className="btn btn-sm fw-semibold" style={{ backgroundColor: 'var(--zest)', color: 'var(--surface-card)', border: 'none' }}>Save</button>
                    <button onClick={() => setEditId(null)} className="btn btn-sm" style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--moss)', border: 'none' }}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="fw-bold mb-1" style={{ color: 'var(--moss)' }}>{zone.name}</h6>
                    <div className="d-flex flex-wrap gap-3 small" style={{ color: 'var(--sage)' }}>
                      <span><i className="bi bi-truck me-1"></i>Fee: <strong style={{ color: 'var(--zest)' }}>₱{zone.fee}</strong></span>
                      <span><i className="bi bi-bag-check me-1"></i>Min order: <strong style={{ color: 'var(--moss)' }}>₱{zone.minOrder}</strong></span>
                      <span><i className="bi bi-clock me-1"></i>{zone.estimatedTime}</span>
                    </div>
                  </div>
                  <button onClick={() => openEdit(zone)} className="btn btn-sm" style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--moss)', border: 'none', borderRadius: 6 }}>
                    <i className="bi bi-pencil me-1"></i>Edit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Schedule */}
        <div className="col-12 col-lg-5">
          <h6 className="fw-bold mb-3" style={{ color: 'var(--moss)' }}>Weekly Schedule</h6>
          <div className="p-4 rounded-3" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid #e8e4de' }}>
            {schedules.map(s => (
              <div key={s.day} className="d-flex align-items-start gap-3 mb-3 pb-3" style={{ borderBottom: '1px solid #f8f5f0' }}>
                <div className="fw-semibold small" style={{ color: 'var(--moss)', minWidth: 90 }}>{s.day}</div>
                {s.available ? (
                  <div className="d-flex flex-wrap gap-1">
                    {s.slots.map(slot => (
                      <span key={slot} className="badge" style={{ backgroundColor: 'var(--status-success-bg)', color: 'var(--status-success-text)', fontSize: '0.7rem', fontWeight: 400, padding: '3px 8px' }}>{slot}</span>
                    ))}
                  </div>
                ) : (
                  <span className="badge" style={{ backgroundColor: 'var(--status-danger-bg)', color: 'var(--status-danger-text)', fontSize: '0.7rem', fontWeight: 400 }}>Closed</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}