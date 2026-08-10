// Business info — SINGLE SOURCE OF TRUTH.
export const site = {
  name: 'Autism & Behavioral Health LLC',
  shortName: 'Autism & Behavioral Health',
  tagline: 'Compassionate, evidence-based ABA therapy for children with autism.',
  // SEO title suffix + meta description mirror the live site (source of truth).
  seoTitleBase: 'Behavioral Health & ABA Services in Delaware',
  description:
    'Autism & Behavioral Health LLC provides compassionate behavioral health and ABA services in Delaware. Contact us now for tailored support.',
  url: import.meta.env.VITE_SITE_URL || 'https://autismbehavioralhealths.com',
  phone: '302-983-8390',
  phoneHref: 'tel:3029838390',
  fax: '302-639-6688',
  email: 'info@autismbehavioralhealths.com',
  address: {
    line1: '750 Barksdale Rd',
    city: 'Newark',
    state: 'DE',
    zip: '19709',
  },
  hours: [
    { day: 'Monday – Friday', time: '8:00 AM – 6:00 PM' },
    { day: 'Saturday', time: '9:00 AM – 1:00 PM' },
    { day: 'Sunday', time: 'Closed' },
  ],
  socials: [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/autismandbehavioralhealthllc/',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61580368117716',
  },
],
  employeeFormsUrl: 'https://pdf.ac/ti08-ufZw',
  developer: { name: 'WebieApp Solutions LLC', url: 'https://www.webieapp.com/' },
};

// Primary desktop nav. Home is explicit. About and Services are dropdowns.
export const aboutMenu = [
  { label: 'About Us', to: '/about' },
  { label: 'Our Team', to: '/our-team' },
];

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about', dropdown: 'about' },
  { label: 'Services', to: '/services', dropdown: 'services' },
  { label: 'Insurance', to: '/insurance' },
  { label: 'Resources', to: '/resources' },
  { label: 'Contact', to: '/contact' },
];

export const legalNav = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms & Conditions', to: '/terms' },
  { label: 'Cookie Policy', to: '/cookie-policy' },
  { label: 'Do Not Sell or Share My Personal Information', to: '/do-not-sell' },
];

// Footer "Quick Links".
export const footerNav = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Our Team', to: '/our-team' },
  { label: 'Services', to: '/services' },
  { label: 'Insurance', to: '/insurance' },
  { label: 'Resources', to: '/resources' },
  { label: 'Contact', to: '/contact' },
  { label: 'Employee Portal', to: '/employee-portal' },
];

// Accepted carriers — drive the insurance logo marquee (home + insurance page).
export const insurers = [
  {
    name: 'Aetna',
    logo: '/insurance/aetna.png',
  },
  {
    name: 'UnitedHealthcare',
    logo: '/insurance/unitedhealthcare.png',
  },
  {
    name: 'Optum',
    logo: '/insurance/optum.png',
  },
  {
    name: 'Cigna',
    logo: '/insurance/cigna.png',
  },
  {
    name: 'Blue Cross Blue Shield',
    logo: '/insurance/bcbs.png',
  },
  {
    name: 'Medicaid',
    logo: '/insurance/medicaid.png',
  },
  {
    name: 'Kaiser',
    logo: '/insurance/kaiser.png',
  },
  {
    name: 'Tricare',
    logo: '/insurance/tricare.png',
  },
];
// Right-to-left hero marquee phrases (ABA/autism scope only).
export const heroMarquee = [
  'Autism care', 'ABA therapy', 'Compassionate care', 'Evidence-based support',
  'Early intervention', 'Social skills', 'Parent training', 'Developmental support',
];
