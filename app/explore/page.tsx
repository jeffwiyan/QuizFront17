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
        // Try multiple APIs in case one fails
        const apis = [
          'https://type.fit/api/quotes',
          'https://api.quotable.io/quotes/random?limit=10',
          'https://zenquotes.io/api/random/10'
        ];

        let data: Quote[] = [];

        for (const api of apis) {
          try {
            const response = await fetch(api);
            if (!response.ok) continue;

            if (api.includes('quotable.io')) {
              const quotableData = await response.json();
              data = quotableData.map((q: any) => ({
                text: q.content,
                author: q.author
              }));
            } else if (api.includes('zenquotes.io')) {
              const zenData = await response.json();
              data = zenData.map((q: any) => ({
                text: q.q,
                author: q.a
              }));
            } else {
              data = await response.json();
              // Get random 10 quotes
              data = data.sort(() => 0.5 - Math.random()).slice(0, 10);
            }

            if (data.length > 0) break;
          } catch (apiError) {
            continue;
          }
        }

        if (data.length === 0) {
          throw new Error('Unable to fetch quotes from any source');
        }

        setQuotes(data);
      } catch (err) {
        console.log('API fetch failed, using fallback quotes:', err);
        // Fallback to some inspirational quotes
        setQuotes([
          { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
          { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
          { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
          { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
          { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
          { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
          { text: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" },
          { text: "Keep your face always toward the sunshine—and shadows will fall behind you.", author: "Walt Whitman" }
        ]);
        // Don't set error since we have fallback quotes
        setError(null);
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
