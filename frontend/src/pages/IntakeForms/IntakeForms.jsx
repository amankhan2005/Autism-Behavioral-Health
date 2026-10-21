
import { FileText, ExternalLink, Lock } from 'lucide-react';
import Seo from '../../components/seo/Seo.jsx';
import { breadcrumbSchema } from '../../lib/seo.js';
import Container from '../../components/ui/Container.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import Button from '../../components/ui/Button.jsx';
import PageHero from '../../components/sections/PageHero.jsx';

const forms = [
  {
    title: 'ABA Intake Form',
    description:
      'For families interested in ABA therapy services. Complete this form to help our team understand your child’s needs and begin the intake process.',
    url: 'https://pdf.ac/Xc2czFJ1IR',
  },
];

export default function IntakeForms() {
  const breadcrumb = [
    { name: 'Home', to: '/' },
    { name: 'Intake Forms', to: '/intake-forms' },
  ];

  return (
    <>
      <Seo
        title="Intake Forms"
        description="Complete the ABA intake form for families interested in ABA therapy services at Autism & Behavioral Health."
        path="/intake-forms"
        schema={breadcrumbSchema(breadcrumb)}
      />

      <PageHero
        eyebrow="Intake Forms"
        title="ABA Therapy Intake Form"
        subtitle="For families interested in ABA therapy services. Take the first step toward personalized support for your child."
        breadcrumb={breadcrumb}
      />

      <section className="section bg-surface">
        <Container className="max-w-4xl">
          <div className="grid gap-6 sm:grid-cols-2">
            {forms.map((form) => (
              <Reveal key={form.title}>
                <div className="flex h-full flex-col rounded-3xl bg-white p-8 shadow-soft ring-1 ring-line">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                    <FileText
                      className="h-7 w-7"
                      aria-hidden="true"
                    />
                  </span>

                  <h2 className="mt-5 font-display text-xl font-bold text-ink">
                    {form.title}
                  </h2>

                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {form.description}
                  </p>

                  <Button
                    href={form.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 self-start"
                  >
                    Open ABA Intake Form
                    <ExternalLink
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mt-8 flex items-center justify-center gap-2 text-sm text-muted">
            <Lock className="h-4 w-4" aria-hidden="true" />
            The intake form opens in a new tab.
          </p>
        </Container>
      </section>
    </>
  );
}
