'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Quote = {
  text: string;
  author: string;
};

export default function ExplorePage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch('https://type.fit/api/quotes');
        if (!response.ok) {
          throw new Error('Failed to fetch quotes');
        }
        const data: Quote[] = await response.json();
        // Get random 10 quotes
        const randomQuotes = data.sort(() => 0.5 - Math.random()).slice(0, 10);
        setQuotes(randomQuotes);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading inspirational quotes...</span>
          </div>
          <p className="mt-2">Loading inspirational quotes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Quotes</h4>
          <p>{error}</p>
          <Link href="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="mb-0">
              <i className="bi bi-lightbulb text-warning me-2"></i>Explore Inspirations
            </h1>
            <Link href="/" className="btn btn-secondary">
              <i className="bi bi-house me-2"></i>Back to Home
            </Link>
          </div>

          <div className="alert alert-info" role="alert">
            <i className="bi bi-info-circle me-2"></i>
            Here are some inspirational quotes from around the world. Feel free to draw inspiration from them for your personal archive!
          </div>

          <div className="row">
            {quotes.map((quote, index) => (
              <div key={index} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100">
                  <div className="card-body d-flex flex-column">
                    <blockquote className="blockquote mb-3 flex-grow-1">
                      <p className="mb-2">"{quote.text}"</p>
                    </blockquote>
                    <footer className="blockquote-footer mb-0">
                      — {quote.author || 'Unknown'}
                    </footer>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <button
              className="btn btn-outline-primary me-2"
              onClick={() => window.location.reload()}
            >
              <i className="bi bi-arrow-clockwise me-2"></i>Load New Quotes
            </button>
            <Link href="/inspirations/create" className="btn btn-success">
              <i className="bi bi-plus-circle me-2"></i>Add to My Archive
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
