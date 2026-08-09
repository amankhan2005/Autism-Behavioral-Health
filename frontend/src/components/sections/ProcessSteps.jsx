import Container from '@/components/ui/Container.jsx';
import SectionTitle from '@/components/ui/SectionTitle.jsx';
import Reveal from '@/components/ui/Reveal.jsx';
import { process } from '@/content/process.js';

export default function ProcessSteps() {
  return (
    <section className="section bg-cream">
      <Container>
        <SectionTitle eyebrow="Our Process" title="A clear path, from first hello to real progress" />
        <ol className="mt-16 grid gap-8 md:grid-cols-3 lg:grid-cols-5">
          {process.map((p, i) => (
            <Reveal as="li" key={p.step} delay={i * 0.08}>
              <div className="relative">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-600 font-display text-lg font-extrabold text-white">{p.step}</span>
                {i < process.length - 1 && (
                  <span className="absolute left-14 top-6 hidden h-px w-[calc(100%-3.5rem)] bg-line lg:block" aria-hidden="true" />
                )}
              </div>
              <h3 className="mt-5 font-display text-base font-bold text-ink">{p.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.text}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
