import { ArrowRight } from 'lucide-react';
import Container from '../ui/Container.jsx';
import Reveal from '../ui/Reveal.jsx';
import { Eyebrow } from '../ui/SectionTitle.jsx';
import Button from '../ui/Button.jsx';

import aboutImage from '/images/about.jpg';

export default function AboutPreview() {
  return (
    <section className="section bg-cream">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        
        <Reveal className="order-2 lg:order-1">
          <div className="relative overflow-hidden rounded-3xl">
            
            <img
              src={aboutImage}
              alt="A therapist and child working together."
              className="aspect-[4/3] w-full object-cover"
            />

           

          </div>
        </Reveal>

        <Reveal delay={0.1} className="order-1 lg:order-2">
          <Eyebrow>Who we are</Eyebrow>

          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tighter2 md:text-[2.5rem]">
            Support that meets your child where they are
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-muted">
            Autism &amp; Behavioral Health LLC provides high-quality ABA
            services for children with autism and developmental needs. We
            partner closely with families to create personalized plans that
            produce real, measurable progress in a warm, nurturing environment.
          </p>

          <Button to="/about" variant="ghost" className="mt-7 -ml-3">
            Learn more about us
            <ArrowRight
              className="h-4 w-4"
              aria-hidden="true"
            />
          </Button>
        </Reveal>

      </Container>
    </section>
  );
}