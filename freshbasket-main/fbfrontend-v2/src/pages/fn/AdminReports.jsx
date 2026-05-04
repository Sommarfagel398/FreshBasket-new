import React from 'react';
import { useApp } from '../../lib/AppContext';
import { ANALYTICS } from '../../lib/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';

export default function AdminReports() {
    const { orders, products } = useApp();

  const statusData = [
        { name: 'Confirmed', value: orders.filter(o=>o.status==='confirmed').length, color: 'var(--zest)' },
        { name: 'Packing', value: orders.filter(o=>o.status==='packing').length, color: 'var(--status-info-text)' },
        { name: 'Delivering', value: orders.filter(o=>o.status==='delivering').length, color: 'var(--status-success-text)' },
        { name: 'Delivered', value: orders.filter(o=>o.status==='delivered').length, color: 'var(--status-purple-text)' },
        { name: 'Cancelled', value: orders.filter(o=>o.status==='cancelled').length, color: 'var(--status-danger-text)' },
  ].filter(d => d.value > 0);

    const categoryData = [
        { name: 'Fruits', products: products.filter(p=>p.category==='fruits').length, value: products.filter(p=>p.category==='fruits').reduce((s,p)=>s+p.stock,0) },
        { name: 'Vegetables', products: products.filter(p=>p.category==='vegetables').length, value: products.filter(p=>p.category==='vegetables').reduce((s,p)=>s+p.stock,0) },
  ];

  return (
    <div>
      <h4 className="fw-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--moss)' }}>Sales Reports & Analytics</h4>

      {/* Summary KPIs */}
      <div className="row g-3 mb-4">
        {[
          ['Total Revenue', `₱${ANALYTICS.totalRevenue.toLocaleString()}`, 'bi-currency-dollar', 'var(--zest)', '+12% vs last month'],
                    ['Orders', ANALYTICS.totalOrders, 'bi-bag-check', 'var(--status-success-text)', `${orders.filter(o=>o.status==='delivered').length} delivered`],
          ['Avg. Order Value', `₱${ANALYTICS.avgOrderValue}`, 'bi-receipt', 'var(--status-info-text)', 'Per transaction'],
                    ['Active Products', products.length, 'bi-box-seam', 'var(--status-purple-text)', `${products.filter(p=>p.featured).length} featured`],
        ].map(([label, value, icon, color, sub]) => (
          <div key={label} className="col-6 col-xl-3">
            <div className="p-4 rounded-3" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid #e8e4de' }}>
              <div className="d-flex align-items-center gap-3 mb-2">
                <div className="rounded-2 d-flex align-items-center justify-content-center" style={{ width: 40, height: 40, backgroundColor: `${color}18` }}>
                  <i className={`bi ${icon}`} style={{ color, fontSize: '1.1rem' }}></i>
                </div>
                <div>
                  <div className="fw-bold" style={{ color: 'var(--moss)', fontSize: '1.4rem', fontFamily: "'Playfair Display', serif" }}>{value}</div>
                  <div className="small fw-medium" style={{ color: 'var(--moss)' }}>{label}</div>
                </div>
              </div>
              <small style={{ color: 'var(--status-success-text)' }}>{sub}</small>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4 mb-4">
        {/* Revenue Trend */}
        <div className="col-12 col-xl-8">
          <div className="p-4 rounded-3" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid #e8e4de' }}>
            <h6 className="fw-bold mb-4" style={{ color: 'var(--moss)' }}>Monthly Revenue Trend</h6>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={ANALYTICS.revenueByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0ede8" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--sage)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: 'var(--sage)' }} axisLine={false} tickLine={false} tickFormatter={v => `₱${(v/1000).toFixed(0)}k`} />
                <Tooltip formatter={v => [`₱${v.toLocaleString()}`, 'Revenue']} contentStyle={{ borderRadius: 8, border: '1px solid #e8e4de', fontSize: 12 }} />
                <Line type="monotone" dataKey="revenue" stroke="var(--zest)" strokeWidth={3} dot={{ fill: 'var(--zest)', r: 5 }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Status Distribution */}
        <div className="col-12 col-xl-4">
          <div className="p-4 rounded-3" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid #e8e4de' }}>
            <h6 className="fw-bold mb-4" style={{ color: 'var(--moss)' }}>Orders by Status</h6>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                  {statusData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e8e4de', fontSize: 12 }} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '0.75rem' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Top Products */}
        <div className="col-12 col-xl-6">
          <div className="p-4 rounded-3" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid #e8e4de' }}>
            <h6 className="fw-bold mb-4" style={{ color: 'var(--moss)' }}>Top Selling Products</h6>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={ANALYTICS.topProducts}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0ede8" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 9, fill: 'var(--sage)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--sage)' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e8e4de', fontSize: 12 }} />
                <Bar dataKey="sales" fill="var(--zest)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Stock */}
        <div className="col-12 col-xl-6">
          <div className="p-4 rounded-3" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid #e8e4de' }}>
            <h6 className="fw-bold mb-4" style={{ color: 'var(--moss)' }}>Category Overview</h6>
            <div className="table-responsive">
              <table className="table table-borderless" style={{ fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #f0ede8' }}>
                    {['Category', 'Products', 'Total Stock', 'Avg Price'].map(h => (
                      <th key={h} className="small text-uppercase fw-semibold py-2" style={{ color: 'var(--sage)', letterSpacing: '0.05em', fontSize: '0.68rem', border: 'none' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {['fruits', 'vegetables'].map(cat => {
                                        const catProducts = products.filter(p => p.category === cat);
                                        const avgPrice = catProducts.reduce((s,p) => s+p.price, 0) / catProducts.length;
                                        const totalStock = catProducts.reduce((s,p) => s+p.stock, 0);
                    return (
                      <tr key={cat} style={{ borderBottom: '1px solid #f8f5f0' }}>
                        <td className="py-3 text-capitalize fw-semibold" style={{ color: 'var(--moss)' }}>{cat}</td>
                        <td className="py-3" style={{ color: 'var(--sage)' }}>{catProducts.length}</td>
                        <td className="py-3">
                          <span className="badge rounded-pill" style={{ backgroundColor: 'var(--status-success-bg)', color: 'var(--status-success-text)', fontSize: '0.75rem' }}>{totalStock} units</span>
                        </td>
                        <td className="py-3 fw-semibold" style={{ color: 'var(--zest)' }}>₱{avgPrice.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}