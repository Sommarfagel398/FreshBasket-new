import React from 'react';

export default function StarRating({ rating = 0, size = 'md', interactive = false, onRate }) {
  const stars = [1, 2, 3, 4, 5];
  const fontSize = size === 'sm' ? '0.75rem' : size === 'lg' ? '1.25rem' : '1rem';

  return (
    <div className="d-flex align-items-center gap-1" style={{ lineHeight: 1 }}>
      {stars.map(star => (
        <i
          key={star}
          className={`bi bi-star${star <= Math.round(rating) ? '-fill' : ''}`}
          style={{
            fontSize,
            color: star <= Math.round(rating) ? 'var(--color-star)' : 'var(--bs-border-color)',
            cursor: interactive ? 'pointer' : 'default',
            transition: 'color 0.15s',
          }}
          onClick={() => interactive && onRate && onRate(star)}
        />
      ))}
    </div>
  );
}
