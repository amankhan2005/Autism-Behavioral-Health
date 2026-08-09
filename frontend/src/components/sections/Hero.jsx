import { motion } from 'framer-motion';
import { Phone, ArrowRight } from 'lucide-react';

import Container from '@/components/ui/Container.jsx';
import Button from '@/components/ui/Button.jsx';
import Marquee from '@/components/ui/Marquee.jsx';
import { site, heroMarquee } from '@/content/site.js';

const ease = [0.22, 1, 0.36, 1];

const dotColors = [
  'bg-brand-500',
  'bg-green-500',
  'bg-sun',
  'bg-pink-400',
  'bg-grape',
];

export default function Hero() {
  return (
    <section className="relative flex min-h-[100vh] flex-col justify-end overflow-hidden pt-[76px]">

      {/* Background Video — clean, no overlay */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source
          src="/media/hero.mp4"
          type="video/mp4"
        />
      </video>

      {/* Hero Content */}
      <Container className="relative z-10 w-full">
        <div className="flex min-h-[calc(100vh-76px)] items-center py-20 md:py-24">
          <div className="max-w-5xl text-left">

            {/* Eyebrow */}
            <motion.span
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                ease,
              }}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-white/90 px-5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-700 shadow-soft ring-1 ring-black/5 backdrop-blur"
            >
              <span
                className=""
                aria-hidden="true"
              />

              Autism & Behavioral Health LLC
            </motion.span>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.08,
                ease,
              }}
              className="mt-7 max-w-5xl font-display text-5xl font-extrabold leading-[1.02] tracking-[-0.04em] text-blue-600 sm:text-6xl md:text-7xl lg:text-[5.5rem]"
            >
              Compassionate care.
              <br />
              <span className="text-blue-600">
                Meaningful progress.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.16,
                ease,
              }}
              className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.45)] md:text-xl"
            >
              Evidence-based ABA therapy for children with autism —
              built around your child, delivered alongside your family.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.24,
                ease,
              }}
              className="mt-8 flex flex-wrap items-center justify-start gap-3"
            >
              <Button
                href={site.phoneHref}
                variant="danger"
                size="lg"
              >
                <Phone
                  className="h-5 w-5"
                  aria-hidden="true"
                />
                Call Us Now
              </Button>

              <Button
                to="/contact"
                size="lg"
              >
                Get Started
                <ArrowRight
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </Button>

              <Button
                to="/services"
                size="lg"
                variant="white"
              >
                Explore Services
              </Button>
            </motion.div>
          </div>
        </div>
      </Container>

      {/* Right-to-left Hero Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.6,
          delay: 0.4,
        }}
        className="relative z-10 border-y border-white/40 bg-white/80 py-3 backdrop-blur"
      >
        <Marquee
          duration={30}
          ariaLabel="What we do"
        >
          {heroMarquee.map((label, i) => (
            <span
              key={label}
              className="mx-5 inline-flex items-center gap-3"
            >
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  dotColors[i % dotColors.length]
                }`}
                aria-hidden="true"
              />

              <span className="whitespace-nowrap font-display text-sm font-bold uppercase tracking-[0.12em] text-ink/80">
                {label}
              </span>
            </span>
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
}