import { site } from '@/content/site.js';

export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': ['Organization', 'MedicalBusiness'],
  name: site.name,
  url: site.url,
  telephone: site.phone,
  faxNumber: site.fax,
  email: site.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.line1,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip,
    addressCountry: 'US',
  },
  sameAs: site.socials.map((s) => s.href).filter((h) => h && h !== '#'),
});

export const faqSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
});

export const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: `${site.url}${it.to}`,
  })),
});

export const serviceSchema = (svc) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: svc.title,
  description: svc.short,
  provider: { '@type': 'Organization', name: site.name, url: site.url },
});
