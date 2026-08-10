import { ArrowRight } from 'lucide-react';
import Container from '../ui/Container.jsx';
import Reveal from '../ui/Reveal.jsx';
import { Eyebrow } from '../ui/SectionTitle.jsx';
import Button from '../ui/Button.jsx';
import InsuranceMarquee from './InsuranceMarquee.jsx';

export default function InsuranceHome() {
  return (
    <section className="section bg-white">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">Insurance</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tighter2 md:text-[2.5rem]">
            We’ll help you navigate coverage
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Understanding insurance shouldn’t be a barrier to care. We work with many major carriers
            and verify your ABA benefits for you.
          </p>
        </Reveal>
      </Container>

      {/* Continuous logo scroller */}
      <Reveal className="mt-12">
        <InsuranceMarquee duration={44} />
      </Reveal>

      <Container>
        <Reveal className="mt-10 text-center">
          <Button to="/insurance">
            Check your coverage <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
