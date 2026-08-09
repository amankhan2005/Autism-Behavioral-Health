import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

// Branded breadcrumb: parent links BLUE, current page GREEN.
export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm">
        {items.map((it, i) => {
          const last = i === items.length - 1;
          const isHome = i === 0;
          return (
            <li key={it.to} className="flex items-center gap-1.5">
              {last ? (
                <span
                  aria-current="page"
                  className="rounded-full bg-green-50 px-3 py-1 font-semibold text-green-700 ring-1 ring-green-200"
                >
                  {it.name}
                </span>
              ) : (
                <Link
                  to={it.to}
                  className="inline-flex items-center gap-1.5 font-semibold text-brand-600 transition-colors hover:text-brand-800"
                >
                  {isHome && <Home className="h-3.5 w-3.5" aria-hidden="true" />}
                  {it.name}
                </Link>
              )}
              {!last && <ChevronRight className="h-4 w-4 text-muted/50" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
