import Container from '@/components/ui/Container.jsx';
import Reveal from '@/components/ui/Reveal.jsx';
import { mission, vision } from '@/content/values.js';

const cards = [
  {
    label: 'Our Mission',
    text: mission,
    accent: 'text-green-300',
    border: 'border-green-300/20',
  },
  {
    label: 'Our Vision',
    text: vision,
    accent: 'text-pink-300',
    border: 'border-pink-300/20',
  },
];

export default function MissionVision() {
  return (
    <section className="section bg-brand-900 text-white">
      <Container>
        <div className="grid items-stretch gap-6 md:grid-cols-2 lg:gap-8">
          {cards.map(({ label, text, accent, border }, i) => (
            <Reveal
              key={label}
              delay={i * 0.1}
              className="h-full"
            >
              <article
                className={`flex h-full min-h-[360px] flex-col rounded-3xl border ${border} bg-white/[0.06] p-8 backdrop-blur-sm md:p-10`}
              >
                <span
                  className={`text-xs font-bold uppercase tracking-[0.16em] ${accent}`}
                >
                  {label}
                </span>

                <div className="mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-green-400 via-yellow-300 to-pink-400" />

                <p className="mt-7 flex-1 text-lg leading-relaxed text-white/90 md:text-xl md:leading-relaxed">
                  {text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}