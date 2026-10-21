
import { FileText, ExternalLink, Lock } from 'lucide-react';
import Seo from '../../components/seo/Seo.jsx';
import { breadcrumbSchema } from '../../lib/seo.js';
import Container from '../../components/ui/Container.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import Button from '../../components/ui/Button.jsx';
import PageHero from '../../components/sections/PageHero.jsx';

// TODO(client): Add more intake forms here as they become available.
const forms = [
  {
    title: 'ABA Intake Form',
    description:
      'For families interested in ABA therapy services. Complete this form to help our team understand your child’s needs and begin the intake process.',
    url: 'https://pdf.ac/Xc2czFJ1IR',
    buttonLabel: 'Open ABA Intake Form',
  },
  {
    title: 'Employment Form',
    description:
      'Interested in joining our team? Complete the employment form to share your information and apply for opportunities with Autism & Behavioral Health.',
    url: 'https://pdf.ac/ti08-ufZw',
    buttonLabel: 'Open Employment Form',
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
        description="Access ABA therapy intake forms for families and employment forms for applicants at Autism & Behavioral Health."
        path="/intake-forms"
        schema={breadcrumbSchema(breadcrumb)}
      />

      <PageHero
        eyebrow="Intake Forms"
        title="Forms to get started"
        subtitle="Whether you're seeking ABA therapy services for your child or interested in joining our team, choose the form that best fits your needs."
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
                    {form.buttonLabel}
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
            Forms open securely in a new tab.
          </p>
        </Container>
      </section>
    </>
  );
}
