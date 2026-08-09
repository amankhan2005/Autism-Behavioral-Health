import Container from '@/components/ui/Container.jsx';
import SectionTitle from '@/components/ui/SectionTitle.jsx';
import Reveal from '@/components/ui/Reveal.jsx';
import Accordion from '@/components/ui/Accordion.jsx';

export default function FaqSection({ items, eyebrow = 'FAQ', title = 'Questions families often ask' }) {
  return (
    <section className="section bg-surface">
      <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <SectionTitle eyebrow={eyebrow} title={title} align="left" />
        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-line bg-white px-6">
            <Accordion items={items.map(({ q, a }) => ({ q, a }))} />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
