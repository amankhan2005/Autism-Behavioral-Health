import Seo from '../../components/seo/Seo.jsx';
import { organizationSchema, breadcrumbSchema } from '../../lib/seo.js';
import { ArrowRight } from 'lucide-react';

import Container from '../../components/ui/Container.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import Icon from '../../components/ui/Icon.jsx';
import Button from '../../components/ui/Button.jsx';
import PageHero from '../../components/sections/PageHero.jsx';
import MissionVision from '../../components/sections/MissionVision.jsx';
import WhyChooseUs from '../../components/sections/WhyChooseUs.jsx';
import CtaBand from '../../components/sections/CtaBand.jsx';
import { values } from '../../content/values.js';

export default function About() {
  return (
    <>
      <Seo
        title="About Us"
        path="/about"
        ogType="article"
        schema={[
          organizationSchema(),
          breadcrumbSchema([
            { name: 'Home', to: '/' },
            { name: 'About', to: '/about' },
          ]),
        ]}
      />

      <PageHero
        eyebrow="About Us"
        title="Care built on compassion, guided by evidence"
        subtitle="We provide high-quality ABA services for children with autism and developmental needs — partnering with families to help every child grow with confidence."
        breadcrumb={[
          { name: 'Home', to: '/' },
          { name: 'About', to: '/about' },
        ]}
      />

      {/* Company story */}
      <section className="section bg-white">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl shadow-soft ring-1 ring-line">
              <img
                src="/images/about.jpg"
                alt="Our team supporting a child."
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <span className="eyebrow">Our Story</span>

            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Every child deserves to be understood
            </h2>

            <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted">
              <p>
                Autism &amp; Behavioral Health LLC was founded on a simple
                belief: every child deserves individualized support in a
                nurturing environment that encourages learning, independence,
                and confidence.
              </p>

              <p>
                We work closely with families to create personalized treatment
                plans that produce meaningful, measurable progress — and we
                treat every child as the individual they are.
              </p>
            </div>

            <Button
              to="/our-team"
              variant="secondary"
              className="mt-7"
            >
              Meet our team
              <ArrowRight
                className="h-4 w-4"
                aria-hidden="true"
              />
            </Button>
          </Reveal>
        </Container>
      </section>

      <MissionVision />

      {/* Core values */}
      <section className="section bg-white">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Our Core Values</span>

            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              What guides our care
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {values.map((v, i) => (
              <Reveal
                key={v.title}
                delay={(i % 5) * 0.05}
              >
                <div className="flex h-full flex-col items-center rounded-2xl border border-line bg-white p-6 text-center transition-colors hover:border-brand-200 hover:bg-brand-50/40">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon
                      name={v.icon}
                      className="h-6 w-6"
                    />
                  </span>

                  <p className="mt-3 font-display text-sm font-bold text-ink">
                    {v.title}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <WhyChooseUs />

      {/* Family partnership */}
      <section className="section bg-surface">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">Family Partnership</span>

            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              You are part of the team
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-muted">
              Families are a child's most consistent teachers. We coach and
              collaborate with parents and caregivers every step of the way,
              so progress continues at home, at school, and in the community.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl shadow-soft ring-1 ring-line">
              <img
                src="/images/family.jpg"
                alt="A parent and therapist collaborating."
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}