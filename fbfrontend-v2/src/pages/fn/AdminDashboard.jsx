import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../lib/AppContext';
import { ANALYTICS } from '../../lib/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';


const KPI = ({ icon, title, value, sub, color }) => (
  <div className="col-6 col-xl-3">
    <div className="p-4 rounded-3 h-100" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid #e8e4de' }}>
      <div className="d-flex align-items-start justify-content-between mb-3">
        <div className="rounded-2 d-flex align-items-center justify-content-center" style={{ width: 44, height: 44, backgroundColor: `${color}18` }}>
          <i className={`bi ${icon}`} style={{ color, fontSize: '1.2rem' }}></i>
        </div>
      </div>
      <div className="fw-bold mb-0" style={{ fontSize: '1.6rem', color: 'var(--moss)', fontFamily: "'Playfair Display', serif" }}>{value}</div>
      <div className="fw-medium small" style={{ color: 'var(--moss)' }}>{title}</div>
      <small style={{ color: 'var(--sage)' }}>{sub}</small>
    </div>
  </div>
);

const STATUS_COLORS = { confirmed: 'var(--zest)', packing: 'var(--status-info-text)', delivering: 'var(--status-success-text)', delivered: 'var(--status-purple-text)', cancelled: 'var(--status-danger-text)' };

export default function AdminDashboard() {
  
  const { orders, products } = useApp();
  const recentOrders = orders.slice(0, 5);
  
  const lowStock = products.filter(p => p.stock < 30);

  return (
    <div>
      <div className="mb-4">
        <h4 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--moss)', marginBottom: 4 }}>Good morning! 🌱</h4>
        <p className="small mb-0" style={{ color: 'var(--sage)' }}>Here's what's happening with your store today.</p>
      </div>

      {/* KPIs */}
      <div className="row g-3 mb-4">
        <KPI icon="bi-currency-dollar" title="Total Revenue" value={`₱${ANALYTICS.totalRevenue.toLocaleString()}`} sub="+12% this month" color="var(--zest)" />
        <KPI icon="bi-bag-check" title="Total Orders" value={ANALYTICS.totalOrders} sub={`₱${orders.filter(o => o.status === 'delivering').length} delivering`} color="var(--status-success-text)" />
        <KPI icon="bi-people" title="Customers" value={ANALYTICS.totalCustomers} sub="3 new this week" color="var(--status-info-text)" />
        <KPI icon="bi-receipt" title="Avg. Order" value={`₱${ANALYTICS.avgOrderValue}`} sub="Per transaction" color="var(--status-purple-text)" />
      </div>

      <div className="row g-3 mb-4">
        {/* Revenue Chart */}
        <div className="col-12 col-xl-8">
          <div className="p-4 rounded-3 h-100" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid #e8e4de' }}>
            <h6 className="fw-bold mb-4" style={{ color: 'var(--moss)' }}>Revenue Overview</h6>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={ANALYTICS.revenueByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0ede8" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--sage)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: 'var(--sage)' }} axisLine={false} tickLine={false} tickFormatter={v => `₱${(v/1000).toFixed(0)}k`} />
                <Tooltip formatter={v => [`₱${v.toLocaleString()}`, 'Revenue']} contentStyle={{ borderRadius: 8, border: '1px solid #e8e4de', fontSize: 12 }} />
                <Line type="monotone" dataKey="revenue" stroke="var(--zest)" strokeWidth={2.5} dot={{ fill: 'var(--zest)', r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products */}
        <div className="col-12 col-xl-4">
          <div className="p-4 rounded-3 h-100" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid #e8e4de' }}>
            <h6 className="fw-bold mb-4" style={{ color: 'var(--moss)' }}>Top Products</h6>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={ANALYTICS.topProducts} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0ede8" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fill: 'var(--sage)' }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: 'var(--sage)' }} axisLine={false} tickLine={false} width={100} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e8e4de', fontSize: 12 }} />
                <Bar dataKey="sales" fill="var(--zest)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="row g-3">
        {/* Recent Orders */}
        <div className="col-12 col-xl-8">
          <div className="p-4 rounded-3" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid #e8e4de' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h6 className="fw-bold mb-0" style={{ color: 'var(--moss)' }}>Recent Orders</h6>
              <Link to="/admin/orders" className="btn btn-sm" style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--moss)', border: 'none', fontSize: '0.78rem' }}>View All</Link>
            </div>
            <div className="table-responsive">
              <table className="table table-borderless mb-0" style={{ fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #f0ede8' }}>
                    {['Order ID', 'Customer', 'Date', 'Total', 'Status'].map(h => (
                      <th key={h} className="small text-uppercase fw-semibold pb-2" style={{ color: 'var(--sage)', letterSpacing: '0.05em', fontSize: '0.7rem' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(

                  o => (
                    <tr key={o.id} style={{ borderBottom: '1px solid #f8f5f0' }}>
                      <td className="fw-semibold py-2" style={{ color: 'var(--moss)' }}>{o.id}</td>
                      <td className="py-2" style={{ color: 'var(--moss)' }}>{o.customerName}</td>
                      <td className="py-2" style={{ color: 'var(--sage)' }}>{o.date}</td>
                      <td className="py-2 fw-semibold" style={{ color: 'var(--zest)' }}>₱{o.total.toFixed(2)}</td>
                      <td className="py-2">
                        <span className="badge rounded-pill px-2 py-1 text-capitalize" style={{ backgroundColor: `${

                        STATUS_COLORS[o.status]}18`, color: STATUS_COLORS[o.status], fontSize: '0.7rem' }}>
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="col-12 col-xl-4">
          <div className="p-4 rounded-3" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid #e8e4de' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h6 className="fw-bold mb-0" style={{ color: 'var(--moss)' }}>Low Stock Alerts</h6>
              <span className="badge rounded-pill" style={{ backgroundColor: 'var(--status-danger-bg)', color: 'var(--status-danger-text)', fontSize: '0.7rem' }}>{lowStock.length}</span>
            </div>
            {lowStock.slice(0, 6).map(

            p => (
              <div key={p.id} className="d-flex align-items-center gap-3 mb-2 p-2 rounded-2" style={{ backgroundColor: 'var(--status-danger-bg)' }}>
                <img src={p.image} alt={p.name} className="rounded-2 flex-shrink-0" style={{ width: 36, height: 36, objectFit: 'cover' }} />
                <div className="flex-grow-1 min-w-0">
                  <div className="small fw-medium text-truncate" style={{ color: 'var(--moss)' }}>{p.name}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--status-danger-text)' }}>{p.stock} units left</div>
                </div>
              </div>
            ))}
            {lowStock.length === 0 && <p className="small text-center" style={{ color: 'var(--sage)' }}>All products well stocked!</p>}
          </div>
        </div>
      </div>
    </div>
  );
}