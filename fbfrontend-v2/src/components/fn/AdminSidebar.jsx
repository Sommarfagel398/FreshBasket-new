import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LOGO_URL } from '../../context/AuthContext';
import { useApp } from '../../lib/AppContext';
import { useTheme } from '../../lib/ThemeContext';

const NAV = [
  { path: '/admin',           icon: 'bi-speedometer2',   label: 'Dashboard',      exact: true },
  { path: '/admin/orders',    icon: 'bi-bag-check',      label: 'Orders'                      },
  { path: '/admin/products',  icon: 'bi-box-seam',       label: 'Products'                    },
  { path: '/admin/inventory', icon: 'bi-stack',          label: 'Inventory'                   },
  { path: '/admin/customers', icon: 'bi-people',         label: 'Customers'                   },
  { path: '/admin/promos',    icon: 'bi-tag',            label: 'Promo Codes'                 },
  { path: '/admin/delivery',  icon: 'bi-truck',          label: 'Delivery Schedules'          },
  { path: '/admin/reports',   icon: 'bi-bar-chart-line', label: 'Reports'                     },
];

export default function AdminSidebar({ collapsed, onToggle }) {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const app = useApp();
  if (!app) return null;
  const { logout } = app;

  const isActive = (path, exact) =>
    exact ? location.pathname === path : location.pathname.startsWith(path);

  return (
    <div
      className="d-flex flex-column h-100"
      style={{ backgroundColor: 'var(--sidebar-bg)', width: collapsed ? 64 : 240, transition: 'width 0.3s ease', overflow: 'hidden' }}
    >
      {/* Logo + collapse */}
      <div className="d-flex align-items-center justify-content-between p-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', minHeight: 64 }}>
        {!collapsed && <img src={LOGO_URL} alt="Admin" style={{ height: 36, filter: 'brightness(0) invert(1)' }} />}
        <button
          onClick={onToggle}
          className="btn btn-sm rounded-circle ms-auto"
          style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: 'none', color: 'var(--paper)', width: 32, height: 32, padding: 0 }}
        >
          <i className={`bi bi-chevron-${collapsed ? 'right' : 'left'}`} style={{ fontSize: '0.75rem' }} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-grow-1 py-2 overflow-auto">
        {NAV.map(({ path, icon, label, exact }) => {
          const active = isActive(path, exact);
          return (
            <Link
              key={path}
              to={path}
              className="d-flex align-items-center text-decoration-none px-3 py-2 mx-2 rounded-2 mb-1"
              style={{
                backgroundColor: active ? 'rgba(230,126,34,0.15)' : 'transparent',
                color: active ? 'var(--zest)' : 'rgba(252,250,247,0.7)',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
            >
              <i className={`bi ${icon} flex-shrink-0`} style={{ fontSize: '1.1rem', minWidth: 20 }} />
              {!collapsed && <span className="ms-3 small fw-medium">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="p-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <button
          onClick={toggleTheme}
          className="btn w-100 d-flex align-items-center py-2 px-2 rounded-2 mb-1"
          style={{ backgroundColor: 'transparent', border: 'none', color: 'rgba(252,250,247,0.5)', whiteSpace: 'nowrap' }}
        >
          <i className={`bi bi-${isDark ? 'sun' : 'moon'} flex-shrink-0`} style={{ fontSize: '1rem', minWidth: 20 }} />
          {!collapsed && <span className="ms-3 small">{isDark ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>

        <Link to="/" className="d-flex align-items-center text-decoration-none py-2 px-2 rounded-2 mb-1" style={{ color: 'rgba(252,250,247,0.5)', whiteSpace: 'nowrap' }}>
          <i className="bi bi-house flex-shrink-0" style={{ fontSize: '1rem', minWidth: 20 }} />
          {!collapsed && <span className="ms-3 small">View Store</span>}
        </Link>

        <button
          onClick={logout}
          className="btn w-100 d-flex align-items-center py-2 px-2 rounded-2 text-danger"
          style={{ backgroundColor: 'transparent', border: 'none', whiteSpace: 'nowrap' }}
        >
          <i className="bi bi-box-arrow-right flex-shrink-0" style={{ fontSize: '1rem', minWidth: 20 }} />
          {!collapsed && <span className="ms-3 small">Sign Out</span>}
        </button>
      </div>
    </div>
  );
}
