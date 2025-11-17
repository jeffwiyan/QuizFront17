import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="text-center">
            <div className="display-1 text-muted mb-4">404</div>
            <h1 className="h2 mb-3">Page Not Found</h1>
            <p className="text-muted mb-4">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
              <Link href="/" className="btn btn-primary btn-lg">
                <i className="bi bi-house me-2"></i>Go Home
              </Link>
              <Link href="/inspirations" className="btn btn-outline-primary btn-lg">
                <i className="bi bi-lightbulb me-2"></i>View Inspirations
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
