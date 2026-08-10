import { writeFileSync, mkdirSync } from 'node:fs';
import { services } from '../src/content/services.js';

const base = process.env.VITE_SITE_URL || 'https://autismbehavioralhealths.com';
const staticPaths = [
  '/', '/about', '/services', '/resources', '/insurance', '/employee-portal',
  '/contact', '/privacy-policy', '/terms', '/cookie-policy', '/do-not-sell',
];
const all = [...staticPaths, ...services.map((s) => `/services/${s.slug}`)];
const today = new Date().toISOString().slice(0, 10);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all
  .map(
    (p) =>
      `  <url>\n    <loc>${base}${p}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${p === '/' ? '1.0' : '0.7'}</priority>\n  </url>`
  )
  .join('\n')}
</urlset>
`;

mkdirSync('public', { recursive: true });
writeFileSync('public/sitemap.xml', xml);
console.log(`sitemap.xml written with ${all.length} URLs`);
