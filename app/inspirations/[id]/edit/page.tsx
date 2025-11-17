'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Inspiration = {
  id: string;
  title: string;
  category: string;
  description: string;
};

export default function EditInspirationPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInspiration = async () => {
      try {
        const res = await fetch(`/api/inspirations/${params.id}`);
        if (res.ok) {
          const inspiration: Inspiration = await res.json();
          setFormData({
            title: inspiration.title,
            category: inspiration.category,
            description: inspiration.description
          });
        } else {
          alert('Failed to load inspiration');
          router.push('/inspirations');
        }
      } catch (error) {
        console.error('Error fetching inspiration:', error);
        alert('Failed to load inspiration');
        router.push('/inspirations');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInspiration();
  }, [params.id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.category.trim() || !formData.description.trim()) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/inspirations/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/inspirations');
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to update inspiration');
      }
    } catch (error) {
      console.error('Error updating inspiration:', error);
      alert('Failed to update inspiration');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (isLoading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-warning text-dark">
              <h2 className="mb-0">
                <i className="bi bi-pencil me-2"></i>Edit Inspiration
              </h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="Enter inspiration title"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="category" className="form-label">Category *</label>
                  <select
                    className="form-select"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="Personal">Personal</option>
                    <option value="Professional">Professional</option>
                    <option value="Creative">Creative</option>
                    <option value="Motivational">Motivational</option>
                    <option value="Educational">Educational</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description *</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows={5}
                    value={formData.description}
                    onChange={handleChange}
                    required
                    placeholder="Describe your inspiration..."
                  ></textarea>
                </div>

                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-warning"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Updating...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-2"></i>Update Inspiration
                      </>
                    )}
                  </button>
                  <Link href={`/inspirations/${params.id}`} className="btn btn-secondary">
                    <i className="bi bi-x-circle me-2"></i>Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
