import { site } from '@/content/site.js';

/**
 * Renders document metadata. React 19 automatically hoists
 * <title>, <meta>, <link>, and <script> to <head>.
 */
export default function Seo({ title, description, path = '', image, schema }) {
  const fullTitle = title ? `${title} | ${site.shortName}` : `${site.name} | ABA Therapy for Children`;
  const canonical = `${site.url}${path}`;
  const ogImage = image || `${site.url}/og/default.jpg`;
  const schemas = Array.isArray(schema) ? schema : schema ? [schema] : [];

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
      ))}
    </>
  );
}
