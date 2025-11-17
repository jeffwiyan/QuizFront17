import Link from 'next/link';
import ItemCard from '../components/ItemCard';

async function getInspirations() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/inspirations`, {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  } catch (error) {
    console.error('Error fetching inspirations:', error);
    return [];
  }
}

export default async function InspirationsPage() {
  const inspirations = await getInspirations();

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="mb-0">My Inspiration Archive</h1>
            <Link href="/inspirations/create" className="btn btn-success">
              <i className="bi bi-plus-circle me-2"></i>Add New Inspiration
            </Link>
          </div>

          {inspirations.length === 0 ? (
            <div className="text-center text-muted py-5">
              <i className="bi bi-lightbulb display-1 mb-3"></i>
              <h4>No inspirations yet</h4>
              <p>Add your first inspiration to get started!</p>
              <Link href="/inspirations/create" className="btn btn-primary">
                Create Your First Inspiration
              </Link>
            </div>
          ) : (
            <div className="row">
              {inspirations.map((inspiration: any) => (
                <div key={inspiration.id} className="col-md-6 col-lg-4 mb-4">
                  <ItemCard inspiration={inspiration} />
                </div>
              ))}
            </div>
          )}

          <div className="mt-4">
            <Link href="/" className="btn btn-secondary">
              <i className="bi bi-arrow-left me-2"></i>Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
