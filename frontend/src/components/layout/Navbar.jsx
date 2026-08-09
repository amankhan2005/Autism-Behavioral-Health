import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';

import { nav, aboutMenu, site } from '@/content/site.js';
import { services } from '@/content/services.js';
import Container from '@/components/ui/Container.jsx';
import Button from '@/components/ui/Button.jsx';

import logoDefault from '/images/logo.png';
import logoScroll from '/images/logo-dark.png';

const link =
  'relative px-3 py-2 text-sm font-semibold transition-colors';

const underline = (active) =>
  `after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-white after:transition-transform after:duration-200 ${
    active ? 'after:scale-x-100' : 'after:scale-x-0'
  }`;

function DesktopDropdown({ item, active }) {
  const [open, setOpen] = useState(false);
  const timer = useRef();

  const enter = () => {
    clearTimeout(timer.current);
    setOpen(true);
  };

  const leave = () => {
    timer.current = setTimeout(() => setOpen(false), 120);
  };

  const isServices = item.dropdown === 'services';

  const items = isServices
    ? [
        {
          label: 'All Services',
          to: '/services',
          desc: 'Explore our full range of ABA services.',
        },
        ...services.map((s) => ({
          label: s.title,
          to: `/services/${s.slug}`,
          desc: s.short,
        })),
      ]
    : aboutMenu.map((a) => ({
        label: a.label,
        to: a.to,
        desc:
          a.label === 'Our Team'
            ? 'Meet the people behind our care.'
            : 'Our mission, values, and approach.',
      }));

  return (
    <div
      className="relative"
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      <NavLink
        to={item.to}
        className={`${link} inline-flex items-center gap-1 text-white/90 hover:text-white ${underline(
          active
        )}`}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {item.label}

        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </NavLink>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.16 }}
            className={`absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 ${
              isServices ? 'w-[440px]' : 'w-[280px]'
            }`}
          >
            <div
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl"
              onMouseEnter={enter}
              onMouseLeave={leave}
            >
              {items.map((it) => (
                <NavLink
                  key={it.to}
                  to={it.to}
                  end={it.to === '/services'}
                  className={({ isActive }) =>
                    `block rounded-xl px-3 py-2.5 transition-colors ${
                      isActive
                        ? 'bg-brand-50 text-brand-700'
                        : 'text-ink hover:bg-surface'
                    }`
                  }
                >
                  <div className="text-sm font-semibold">
                    {it.label}
                  </div>

                  {it.desc && (
                    <div className="mt-0.5 text-xs leading-5 text-muted">
                      {it.desc}
                    </div>
                  )}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);

  const { pathname } = useLocation();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    onScroll();

    window.addEventListener('scroll', onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  // Blue solid navbar when scrolling or when not on homepage.
  const solid = scrolled || !isHome;

  const activeGroup = (dropdown) => {
    if (dropdown === 'services') {
      return pathname.startsWith('/services');
    }

    return (
      pathname.startsWith('/about') ||
      pathname.startsWith('/our-team')
    );
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? 'bg-brand-700/95 shadow-soft backdrop-blur-md'
          : 'bg-gradient-to-b from-black/25 to-transparent'
      }`}
    >
      <Container className="flex h-[76px] items-center justify-between">
        {/* LOGO */}
        <Link
          to="/"
          className="m-0 flex items-center p-0"
          aria-label={`${site.name} — home`}
        >
          <img
            src={solid ? logoScroll : logoDefault}
            alt={site.name}
            className="block h-auto max-h-14 w-auto transition-opacity duration-300"
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Main navigation"
        >
          {nav.map((item) =>
            item.dropdown ? (
              <DesktopDropdown
                key={item.to + item.label}
                item={item}
                active={activeGroup(item.dropdown)}
              />
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `${link} text-white/90 hover:text-white ${underline(
                    isActive
                  )}`
                }
              >
                {item.label}
              </NavLink>
            )
          )}

          <NavLink
            to="/employee-portal"
            className={({ isActive }) =>
              `${link} ${
                isActive
                  ? 'text-white'
                  : 'text-white/70 hover:text-white'
              }`
            }
          >
            Employee Portal
          </NavLink>

          {/* CALL BUTTON */}
          <Button
            href={site.phoneHref}
            variant="danger"
            className="ml-3 whitespace-nowrap"
          >
            <Phone
              className="h-4 w-4"
              aria-hidden="true"
            />
            Call Us Now · {site.phone}
          </Button>
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-xl border border-white/40 text-white transition-colors hover:bg-white/10 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </Container>

      {/* MOBILE NAVIGATION */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: 'auto',
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.22,
            }}
            className="overflow-hidden border-t border-white/10 bg-brand-800 text-white lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {nav.map((item) =>
                item.dropdown ? (
                  <div key={item.to + item.label}>
                    <button
                      type="button"
                      onClick={() =>
                        setOpenGroup((group) =>
                          group === item.dropdown
                            ? null
                            : item.dropdown
                        )
                      }
                      className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-semibold transition-colors hover:bg-white/10"
                      aria-expanded={
                        openGroup === item.dropdown
                      }
                    >
                      {item.label}

                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${
                          openGroup === item.dropdown
                            ? 'rotate-180'
                            : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    <AnimatePresence>
                      {openGroup === item.dropdown && (
                        <motion.div
                          initial={{
                            height: 0,
                            opacity: 0,
                          }}
                          animate={{
                            height: 'auto',
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          className="overflow-hidden pl-3"
                        >
                          {(item.dropdown === 'services'
                            ? [
                                {
                                  label: 'All Services',
                                  to: '/services',
                                },
                                ...services.map((s) => ({
                                  label: s.title,
                                  to: `/services/${s.slug}`,
                                })),
                              ]
                            : aboutMenu
                          ).map((sub) => (
                            <NavLink
                              key={sub.to}
                              to={sub.to}
                              end={sub.to === '/services'}
                              className={({ isActive }) =>
                                `block rounded-lg px-4 py-2.5 text-sm transition-colors ${
                                  isActive
                                    ? 'bg-white/15 font-semibold text-white'
                                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                                }`
                              }
                            >
                              {sub.label}
                            </NavLink>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                        isActive
                          ? 'bg-white/15 text-white'
                          : 'text-white/90 hover:bg-white/10'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                )
              )}

              <NavLink
                to="/employee-portal"
                className="rounded-xl px-4 py-3 text-sm font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                Employee Portal
              </NavLink>

              {/* MOBILE CALL BUTTON */}
              <Button
                href={site.phoneHref}
                variant="danger"
                className="mt-2 w-full"
              >
                <Phone
                  className="h-4 w-4"
                  aria-hidden="true"
                />
                Call Us Now · {site.phone}
              </Button>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}