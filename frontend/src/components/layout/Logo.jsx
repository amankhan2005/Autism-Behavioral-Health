import { Link } from 'react-router-dom';
import { site } from '../../content/site.js';
import logo from '/images/logo.png';

export default function Logo() {
  return (
    <Link
      to="/"
      className="group flex items-center m-0 p-0"
      aria-label={`${site.name} — home`}
    >
      <img
        src={logo}
        alt={site.name}
        className="block h-auto w-auto max-h-14"
      />
    </Link>
  );
} 