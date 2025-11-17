'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Inspiration = {
  id: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
};

type ItemCardProps = {
  inspiration: Inspiration;
};

export default function ItemCard({ inspiration }: ItemCardProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this inspiration?')) return;

    try {
      const res = await fetch(`/api/inspirations/${inspiration.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        router.refresh();
      } else {
        alert('Failed to delete inspiration');
      }
    } catch (error) {
      console.error('Error deleting inspiration:', error);
      alert('Failed to delete inspiration');
    }
  };

  return (
    <div className="card h-100">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{inspiration.title}</h5>
        <p className="card-text flex-grow-1">{inspiration.description}</p>
        <div className="mb-2">
          <span className="badge bg-secondary">{inspiration.category}</span>
        </div>
        <div className="mt-auto">
          <Link href={`/inspirations/${inspiration.id}`} className="btn btn-primary me-2">
            View Details
          </Link>
          <Link href={`/inspirations/${inspiration.id}/edit`} className="btn btn-warning me-2">
            Edit
          </Link>
          <button
            className="btn btn-danger"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
