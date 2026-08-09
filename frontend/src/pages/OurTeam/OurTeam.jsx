import { ArrowRight, Sparkles } from 'lucide-react';
import Seo from '@/components/seo/Seo.jsx';
import { breadcrumbSchema } from '@/lib/seo.js';
import Container from '@/components/ui/Container.jsx';
import Reveal from '@/components/ui/Reveal.jsx';
import Button from '@/components/ui/Button.jsx';
import PageHero from '@/components/sections/PageHero.jsx';
import { team } from '@/content/team.js';

const accentMap = {
  brand: {
    ring: 'ring-brand-200',
    chip: 'bg-brand-50 text-brand-700',
  },
  green: {
    ring: 'ring-green-200',
    chip: 'bg-green-50 text-green-700',
  },
  pink: {
    ring: 'ring-pink-200',
    chip: 'bg-pink-50 text-pink-700',
  },
};

const teamImages = {
  'Rose Ngatia': '/images/rose.jpg',
  'Mercy Ngatia': '/images/mercy.jpg',
};

export default function OurTeam() {
  return (
    <>
      <Seo
        title="Our Team"
        description="Meet the team behind Autism & Behavioral Health LLC — passionate professionals dedicated to compassionate, evidence-based ABA care for children with autism."
        path="/our-team"
        schema={breadcrumbSchema([
          { name: 'Home', to: '/' },
          { name: 'About', to: '/about' },
          { name: 'Our Team', to: '/our-team' },
        ])}
      />

      <PageHero
        eyebrow="Our Team"
        title="The people behind our care"
        subtitle="Passionate about autism care and empowering every individual we serve."
        breadcrumb={[
          { name: 'Home', to: '/' },
          { name: 'About', to: '/about' },
          { name: 'Our Team', to: '/our-team' },
        ]}
      />

      {/* Team Members */}
      <section className="section bg-white">
        <Container>
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
            {team.map((m, i) => {
              const a = accentMap[m.accent] || accentMap.brand;
              const image = teamImages[m.name];

              return (
                <Reveal key={m.name} delay={i * 0.08}>
                  <article
                    className={`group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-cream shadow-soft ring-1 ${a.ring} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
                  >
                    {/* Team Image */}
                    <div className="relative overflow-hidden bg-surface">
                      <img
                        src={image}
                        alt={m.name}
                        className="h-[360px] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                        loading={i === 0 ? 'eager' : 'lazy'}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-8">
                      <h2 className="font-display text-xl font-extrabold text-ink">
                        {m.name}
                      </h2>

                      <p className="mt-1 text-sm font-bold text-brand-600">
                        {m.credentials}
                      </p>

                      <span
                        className={`mt-3 inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold ${a.chip}`}
                      >
                        {m.role}
                      </span>

                      <p className="mt-6 flex-1 text-[15px] leading-relaxed text-muted">
                        {m.bio}
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Hiring CTA */}
      <section className="section bg-surface">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-brand-700 px-6 py-14 text-center text-white md:px-16">
              <div
                className="spectrum-rule absolute inset-x-0 top-0 h-1.5"
                aria-hidden="true"
              />

              <div
                className="pointer-events-none absolute -right-16 -top-10 h-56 w-56 rounded-full bg-pink-400/25 blur-3xl"
                aria-hidden="true"
              />

              <div
                className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-green-400/20 blur-3xl"
                aria-hidden="true"
              />

              <div className="relative mx-auto max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em]">
                  <Sparkles
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                  Careers
                </span>

                <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tighter2 md:text-4xl">
                  We are Hiring BCBAs
                </h2>

                <p className="mt-4 text-lg text-white/85">
                  Please contact us and start the journey toward growth.
                </p>

                <div className="mt-8">
                  <Button
                    to="/contact"
                    variant="white"
                    size="lg"
                  >
                    Contact Us
                    <ArrowRight
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}