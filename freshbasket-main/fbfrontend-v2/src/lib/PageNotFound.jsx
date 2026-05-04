import { useLocation } from 'react-router-dom';

export default function PageNotFound() {
  const location = useLocation();
  const pageName = location.pathname.substring(1);

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 p-4" style={{ backgroundColor: 'var(--bs-body-bg)' }}>
      <div className="text-center" style={{ maxWidth: 400 }}>
        <h1 className="display-1 fw-light text-secondary mb-0" style={{ opacity: 0.4 }}>404</h1>
        <hr className="w-25 mx-auto my-3" />
        <h2 className="h4 fw-medium mb-3">Page Not Found</h2>
        <p className="text-muted mb-4">
          The page <strong className="text-body">"{pageName}"</strong> could not be found.
        </p>
        <button
          onClick={() => (window.location.href = '/')}
          className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center gap-2"
        >
          <i className="bi bi-house"></i>Go Home
        </button>
      </div>
    </div>
  );
}
