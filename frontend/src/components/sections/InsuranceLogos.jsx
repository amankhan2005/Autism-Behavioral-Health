import { insurers } from '@/content/site.js';

// Static, evenly-spaced logo row. Single row on desktop (8 columns),
// wrapping to 4 (tablet) then 2 (mobile) only when space requires it.
// Shares the tile styling with InsuranceMarquee for visual consistency.
export default function InsuranceLogos() {
  return (
    <ul
      className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-1 sm:grid-cols-4 sm:gap-4 lg:grid-cols-8"
      aria-label="Accepted insurance carriers"
    >
      {insurers.map((insurer) => (
        <li key={insurer.name} className="flex">
          <div className="flex h-20 w-full items-center justify-center rounded-2xl border border-line bg-white px-4 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <img
              src={insurer.logo}
              alt={insurer.name}
              loading="lazy"
              className="max-h-9 w-auto max-w-[120px] object-contain"
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
