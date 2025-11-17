import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body text-center">
              <h1 className="card-title mb-4">Personal Inspiration Archive</h1>
              <div className="mb-4">
                <p className="mb-2"><strong>Name:</strong> Jeff Wiyan</p>
                <p className="mb-2"><strong>NIM:</strong> 535240149</p>
                <p className="mb-4"><strong>Topic:</strong> Personal Inspiration Archive</p>
              </div>
              <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                <Link href="/inspirations" className="btn btn-primary">
                  <i className="bi bi-lightbulb me-2"></i>View My Inspirations
                </Link>
                <Link href="/explore" className="btn btn-outline-primary">
                  <i className="bi bi-search me-2"></i>Explore More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
