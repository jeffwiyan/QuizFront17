import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Portfolio Profesional - Jeff Wiyan',
  description: 'Portfolio profesional menampilkan koleksi project dan karya terbaik'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-light">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
          <div className="container">
            <Link href="/" className="navbar-brand fw-bold">
              <i className="bi bi-person-circle me-2"></i>
              Portfolio Jeff Wiyan
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link href="/" className="nav-link">
                    <i className="bi bi-house-door me-1"></i>Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/inspirations" className="nav-link">
                    <i className="bi bi-lightbulb me-1"></i>Inspirations
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/explore" className="nav-link">
                    <i className="bi bi-search me-1"></i>Explore
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <main className="flex-grow-1">{children}</main>
        <footer className="bg-dark text-white py-4 mt-5">
          <div className="container text-center">
            <p className="mb-0">
              <i className="bi bi-code-slash me-2"></i>
              Dibuat dengan Next.js & Bootstrap • Portfolio Jeff Wiyan
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
