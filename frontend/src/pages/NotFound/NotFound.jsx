import Seo from '@/components/seo/Seo.jsx';
import Container from '@/components/ui/Container.jsx';
import Button from '@/components/ui/Button.jsx';

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found" description="The page you’re looking for can’t be found." path="/404" />
      <section className="grid min-h-[70vh] place-items-center bg-white pt-24">
        <Container className="max-w-lg text-center">
          <p className="font-display text-7xl font-extrabold text-brand-600">404</p>
          <h1 className="mt-4 text-3xl font-bold">We couldn&rsquo;t find that page</h1>
          <p className="mt-4 text-muted">The link may be broken or the page may have moved. Let&rsquo;s get you back on track.</p>
          <div className="mt-8 flex justify-center gap-3">
            <Button to="/">Back to Home</Button>
            <Button to="/services" variant="secondary">View Services</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
