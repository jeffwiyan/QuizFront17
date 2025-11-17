import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getInspiration(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/inspirations/${id}`, {
      cache: 'no-store'
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Error fetching inspiration:', error);
    return null;
  }
}

export default async function InspirationDetailPage({ params }: { params: { id: string } }) {
  const inspiration = await getInspiration(params.id);

  if (!inspiration) {
    notFound();
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="mb-0">Inspiration Details</h2>
                <span className="badge bg-light text-primary">ID: {inspiration.id.slice(0, 8)}</span>
              </div>
            </div>
            <div className="card-body">
              <h3 className="card-title mb-3">{inspiration.title}</h3>
              <div className="mb-3">
                <span className="badge bg-secondary fs-6">{inspiration.category}</span>
              </div>
              <div className="mb-4">
                <h6 className="text-muted mb-2">Description</h6>
                <div className="bg-light p-3 rounded">
                  <p className="mb-0">{inspiration.description}</p>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-sm-6">
                  <div className="bg-light p-3 rounded text-center">
                    <small className="text-muted">Created At</small>
                    <div className="fw-bold">{new Date(inspiration.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="bg-light p-3 rounded text-center">
                    <small className="text-muted">Category</small>
                    <div className="fw-bold">{inspiration.category}</div>
                  </div>
                </div>
              </div>
              <div className="d-flex gap-2 flex-wrap">
                <Link href="/inspirations" className="btn btn-secondary">
                  <i className="bi bi-arrow-left me-2"></i>Back to List
                </Link>
                <Link href={`/inspirations/${inspiration.id}/edit`} className="btn btn-warning">
                  <i className="bi bi-pencil me-2"></i>Edit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
