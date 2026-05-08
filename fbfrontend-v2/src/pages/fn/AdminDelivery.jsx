import React from 'react';

export default function AdminDelivery() {
  const schedules = [
    { day: 'Monday',    slots: ['8:00 AM – 12:00 PM', '1:00 PM – 5:00 PM'], available: true },
    { day: 'Tuesday',   slots: ['8:00 AM – 12:00 PM', '1:00 PM – 5:00 PM'], available: true },
    { day: 'Wednesday', slots: ['8:00 AM – 12:00 PM'],                       available: true },
    { day: 'Thursday',  slots: ['8:00 AM – 12:00 PM', '1:00 PM – 5:00 PM'], available: true },
    { day: 'Friday',    slots: ['8:00 AM – 12:00 PM', '1:00 PM – 5:00 PM', '5:00 PM – 8:00 PM'], available: true },
    { day: 'Saturday',  slots: ['9:00 AM – 1:00 PM'],                        available: true },
    { day: 'Sunday',    slots: [],                                            available: false },
  ];

  return (
    <div>
      <h4 className="fw-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--moss)' }}>Delivery Schedule</h4>
      <div className="p-4 rounded-3" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid #e8e4de', maxWidth: 500 }}>
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
  );
}