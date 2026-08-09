import Seo from '@/components/seo/Seo.jsx';
import { organizationSchema, faqSchema } from '@/lib/seo.js';
import { homeFaqs } from '@/content/faqs.js';

import Hero from '@/components/sections/Hero.jsx';
import TrustBar from '@/components/sections/TrustBar.jsx';
import AboutPreview from '@/components/sections/AboutPreview.jsx';
import ServicesGrid from '@/components/sections/ServicesGrid.jsx';
import WhyChooseUs from '@/components/sections/WhyChooseUs.jsx';
import ProcessSteps from '@/components/sections/ProcessSteps.jsx';
import MissionVision from '@/components/sections/MissionVision.jsx';
import InsuranceHome from '@/components/sections/InsuranceHome.jsx';
import FaqSection from '@/components/sections/FaqSection.jsx';
import CtaBand from '@/components/sections/CtaBand.jsx';

export default function Home() {
  return (
    <>
      <Seo
        title="ABA Therapy for Children with Autism"
        description="Compassionate, evidence-based ABA therapy for children with autism. Personalized, BCBA-led treatment plans and family-centered care."
        path="/"
        schema={[organizationSchema(), faqSchema(homeFaqs)]}
      />
      <Hero />
      <TrustBar />
      <AboutPreview />
      <ServicesGrid />
      <WhyChooseUs />
      <ProcessSteps />
      <MissionVision />
      <InsuranceHome />
      <FaqSection items={homeFaqs} />
      <CtaBand />
    </>
  );
}
