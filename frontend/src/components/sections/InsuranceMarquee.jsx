import Marquee from '../ui/Marquee.jsx';
import { insurers } from '../../content/site.js';

export default function InsuranceMarquee({ duration = 40 }) {
  return (
    <Marquee
      duration={duration}
      ariaLabel="Accepted insurance carriers"
    >
      {insurers.map((insurer) => (
        <div
          key={insurer.name}
          className="mx-3 flex h-20 min-w-[190px] items-center justify-center rounded-2xl border border-line bg-white px-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
        >
          <img
            src={insurer.logo}
            alt={insurer.name}
            className="max-h-10 w-auto max-w-[150px] object-contain"
          />
        </div>
      ))}
    </Marquee>
  );
}