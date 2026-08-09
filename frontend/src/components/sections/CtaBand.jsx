import Container from '@/components/ui/Container.jsx';
import Button from '@/components/ui/Button.jsx';
import { site } from '@/content/site.js';

export default function CtaBand({
  title = 'Let’s take the next step together.',
  text = 'Tell us about your child and your goals. We’ll guide you through what comes next — with warmth and no pressure.',
}) {
  return (
    <section className="section bg-cream">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-brand-600 px-6 py-14 text-center text-white md:px-16 md:py-16">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-pink-400/25 blur-2xl" aria-hidden="true" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tighter2 md:text-4xl">{title}</h2>
            <p className="mt-4 text-lg text-white/85">{text}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button to="/contact" variant="white" size="lg">Get Started</Button>
              <Button href={site.phoneHref} variant="ghost" size="lg" className="text-white hover:bg-white/10">Call {site.phone}</Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
