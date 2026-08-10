import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Printer,
  Instagram,
  Facebook,
} from 'lucide-react';

import { site, footerNav, legalNav } from '../../content/site.js';
import Container from '../ui/Container.jsx';
import Logo from './Logo.jsx';

const socialIcons = {
  Instagram,
  Facebook,
};

export default function Footer() {
  const year = new Date().getFullYear();
  const { address: a } = site;

  return (
    <footer className="border-t border-line bg-white">
      {/* Spectrum hairline */}
      <div
        className="spectrum-rule h-1.5 w-full"
        aria-hidden="true"
      />

      <Container className="grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr]">
        {/* Company */}
        <div className="max-w-sm">
          <Logo />

          <p className="mt-4 text-sm leading-relaxed text-muted">
            {site.tagline}
          </p>

          <p className="mt-3 text-sm leading-relaxed text-muted">
            Individualized, BCBA-led care that helps children with autism
            build communication, social, and daily-living skills — with
            families as full partners.
          </p>

          {/* Social Media */}
          <div className="mt-6 flex items-center gap-2.5">
            {site.socials.map((social) => {
              const Icon = socialIcons[social.label];

              if (!Icon || !social.href || social.href === '#') {
                return null;
              }

              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${social.label}`}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white text-muted shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
                >
                  <Icon
                    className="h-5 w-5"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </a>
              );
            })}
          </div>
        </div>

        {/* Quick Links */}
        <nav aria-label="Quick links">
          <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-ink">
            Quick Links
          </h2>

          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            {footerNav.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="transition-colors hover:text-brand-700"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-ink">
            Contact
          </h2>

          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li className="flex items-start gap-2.5">
              <MapPin
                className="mt-0.5 h-4 w-4 shrink-0 text-green-600"
                aria-hidden="true"
              />

              <span>
                {a.line1}, {a.city}, {a.state} {a.zip}
              </span>
            </li>

            <li>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2.5 transition-colors hover:text-brand-700"
              >
                <Mail
                  className="h-4 w-4 shrink-0 text-green-600"
                  aria-hidden="true"
                />
                {site.email}
              </a>
            </li>

            <li>
              <a
                href={site.phoneHref}
                className="flex items-center gap-2.5 transition-colors hover:text-brand-700"
              >
                <Phone
                  className="h-4 w-4 shrink-0 text-green-600"
                  aria-hidden="true"
                />
                {site.phone}
              </a>
            </li>

            <li className="flex items-center gap-2.5">
              <Printer
                className="h-4 w-4 shrink-0 text-green-600"
                aria-hidden="true"
              />
              Fax: {site.fax}
            </li>
          </ul>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-line">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted md:flex-row">
          <p>
            &copy; {year} {site.name}. All rights reserved.
          </p>

          <nav
            aria-label="Legal"
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1"
          >
            {legalNav.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="transition-colors hover:text-brand-700"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <p>
            Designed &amp; Developed by{' '}
            <a
              href={site.developer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-700 transition-colors hover:text-brand-900"
            >
              {site.developer.name}
            </a>
          </p>
        </Container>
      </div>
    </footer>
  );
}