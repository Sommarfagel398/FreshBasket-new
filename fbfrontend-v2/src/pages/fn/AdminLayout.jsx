import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useApp } from '../../lib/AppContext';
import AdminSidebar from '../../components/fn/AdminSidebar';

export default function AdminLayout() {

  const { currentUser } = useApp();
  const [collapsed, setCollapsed] = useState(false);

  if (!currentUser || currentUser.role !== 'admin') return <Navigate to="/signin" />;

  return (
    <div className="d-flex" style={{ height: '100vh', overflow: 'hidden', backgroundColor: 'var(--surface-muted)' }}>
      <AdminSidebar collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />
      <div className="flex-grow-1 d-flex flex-column overflow-hidden">
        {/* Top Bar */}
        <div className="d-flex align-items-center justify-content-between px-4 py-3" style={{ backgroundColor: 'var(--surface-card)', borderBottom: '1px solid #e8e4de', minHeight: 64 }}>
          <h6 className="mb-0 fw-bold" style={{ color: 'var(--moss)' }}>Admin Dashboard</h6>
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center gap-2">
              <img src={currentUser.avatar} alt="" className="rounded-circle" style={{ width: 32, height: 32, objectFit: 'cover' }} />
              <div>
                <div className="small fw-semibold" style={{ color: 'var(--moss)', lineHeight: 1.2 }}>{currentUser.name}</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--sage)', textTransform: 'capitalize' }}>{currentUser.role}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-grow-1 overflow-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}