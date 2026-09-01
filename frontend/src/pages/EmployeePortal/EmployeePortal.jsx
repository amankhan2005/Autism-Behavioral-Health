import { FileText, ExternalLink, Lock } from 'lucide-react';
import Seo from '../../components/seo/Seo.jsx';
import { breadcrumbSchema } from '../../lib/seo.js';
import Container from '../../components/ui/Container.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import Button from '../../components/ui/Button.jsx';
import PageHero from '../../components/sections/PageHero.jsx';
import { site } from '../../content/site.js';

// TODO(client): add more forms here as they become available.
const forms = [
  { title: 'Employee Forms', description: 'Access and complete your employee forms securely through PDFfiller.', url: site.employeeFormsUrl },
];

export default function EmployeePortal() {
  return (
    <>
      <Seo
        title="Employee Portal"
        description="Secure access to employee forms for the Autism & Behavioral Health team."
        path="/employee-portal"
        schema={breadcrumbSchema([{ name: 'Home', to: '/' }, { name: 'Employee Portal', to: '/employee-portal' }])}
      />
      <PageHero
        eyebrow="Employee Portal"
        title="Forms for our team"
        subtitle="Securely access the documents you need. More forms will be added here over time."
        breadcrumb={[{ name: 'Home', to: '/' }, { name: 'Employee Portal', to: '/employee-portal' }]}
      />

      <section className="section bg-surface">
        <Container className="max-w-4xl">
          <div className="grid gap-6 sm:grid-cols-2">
            {forms.map((f) => (
              <Reveal key={f.title}>
                <div className="flex h-full flex-col rounded-3xl bg-white p-8 shadow-soft ring-1 ring-line">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600"><FileText className="h-7 w-7" aria-hidden="true" /></span>
                  <h2 className="mt-5 font-display text-xl font-bold text-ink">{f.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{f.description}</p>
                  <Button href={f.url} target="_blank" rel="noopener noreferrer" className="mt-6 self-start">
                    Open Employee Forms <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 flex items-center justify-center gap-2 text-sm text-muted">
            <Lock className="h-4 w-4" aria-hidden="true" /> Forms open securely on PDFfiller in a new tab.
          </p>
        </Container>
      </section>
    </>
  );
}
