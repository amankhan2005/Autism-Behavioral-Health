import Container from '@/components/ui/Container.jsx';
import SectionTitle from '@/components/ui/SectionTitle.jsx';
import Reveal from '@/components/ui/Reveal.jsx';
import { whyChooseUs } from '@/content/values.js';

export default function WhyChooseUs() {
  return (
    <section className="section bg-surface">
      <Container>
        <SectionTitle eyebrow="Why Families Choose Us" title="Care you can trust, progress you can see" />
        <div className="mt-14 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 0.07}>
              <div className="border-t-2 border-brand-600/15 pt-5">
                <span className="font-display text-sm font-extrabold text-pink-500">0{i + 1}</span>
                <h3 className="mt-2 font-display text-lg font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
