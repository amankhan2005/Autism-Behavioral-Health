import { site } from '../../content/site.js';

/**
 * Renders document metadata. React 19 automatically hoists
 * <title>, <meta>, <link>, and <script> to <head>.
 *
 * Title pattern and the default description mirror the live website
 * (autismbehavioralhealths.com) as the source of truth. Pages that exist
 * on the live site pass its exact page title (e.g. "About Us"); pages that
 * don't (service details, legal, portal, 404) keep their own titles, which
 * still render with the same shared suffix.
 */
export default function Seo({ title, description, path = '', image, schema, ogType = 'website' }) {
  const fullTitle = title ? `${title} | ${site.seoTitleBase}` : site.seoTitleBase;
  const metaDescription = description || site.description;
  const canonical = `${site.url}${path}`;
  const ogImage = image || `${site.url}/og/default.jpg`;
  const schemas = Array.isArray(schema) ? schema : schema ? [schema] : [];

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
      ))}
    </>
  );
}
