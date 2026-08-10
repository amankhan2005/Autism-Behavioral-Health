import { motion } from 'framer-motion';
import Container from '../ui/Container.jsx';
import Breadcrumb from '../ui/Breadcrumb.jsx';

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumb,
  align = 'left',
  image = '/images/page-hero.jpg',
}) {
  const centered = align === 'center';

  return (
    <section className="relative overflow-hidden bg-brand-700 pt-[76px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />

        {/* Very light overlay for readability */}
        <div className="absolute inset-0 bg-white/75" />
      </div>

      <Container className="relative z-10 py-16 md:py-20 lg:py-24">
        {/* Breadcrumb */}
        {breadcrumb && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Breadcrumb items={breadcrumb} />
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={
            centered
              ? 'mx-auto max-w-3xl text-center'
              : 'max-w-3xl'
          }
        >
          {eyebrow && (
            <span className="eyebrow">
              {eyebrow}
            </span>
          )}

          <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight tracking-tighter2 text-brand-700 md:text-5xl lg:text-6xl">
            {title}
          </h1>

          <div
            className={`spectrum-rule mt-5 h-1 w-24 rounded-full ${
              centered ? 'mx-auto' : ''
            }`}
            aria-hidden="true"
          />

          {subtitle && (
            <p
              className={`mt-5 text-lg leading-relaxed text-ink/70 ${
                centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'
              }`}
            >
              {subtitle}
            </p>
          )}
        </motion.div>
      </Container>
    </section>
  );
}