// Local, API-free knowledge layer for the site chatbot.
// SOURCE OF TRUTH: everything below is derived from the existing content files
// (site.js, services.js, faqs.js) — no company information is invented here.
import { site } from '../../content/site.js';
import { services } from '../../content/services.js';
import { homeFaqs } from '../../content/faqs.js';

const fullAddress = `${site.address.line1}, ${site.address.city}, ${site.address.state} ${site.address.zip}`;
const hoursText = site.hours.map((h) => `${h.day}: ${h.time}`).join('\n');

// Reusable action builders (rendered as clickable chips in the chat window).
const callAction = { kind: 'tel', label: `Call ${site.phone}`, href: site.phoneHref };
const emailAction = { kind: 'mailto', label: `Email ${site.email}`, href: `mailto:${site.email}` };
const mapAction = {
  kind: 'external',
  label: 'Get directions',
  href: `https://maps.google.com/?q=${encodeURIComponent(`${site.name}, ${fullAddress}`)}`,
};
const insuranceLink = { kind: 'link', label: 'Insurance page', href: '/insurance' };
const contactLink = { kind: 'link', label: 'Contact us', href: '/contact' };
const servicesLink = { kind: 'link', label: 'All services', href: '/services' };

const has = (text, words) => words.some((w) => text.includes(w));

// Per-service keyword map, built from each service's own data.
const serviceMatchers = services.map((s) => {
  const keywords = new Set(
    [
      ...s.slug.split('-'),
      ...s.title.toLowerCase().split(/\s+/),
      ...s.category.toLowerCase().split(/\s+/),
    ].filter((w) => w.length > 2),
  );
  return { service: s, keywords: [...keywords] };
});

// Extra aliases people commonly use for specific services.
const serviceAliases = {
  'applied-behavior-analysis': ['aba', 'applied behavior', 'behavior analysis'],
  'early-intervention': ['early', 'toddler', 'infant', 'young child'],
  'functional-behavior-assessment': ['fba', 'assessment', 'evaluate', 'evaluation'],
  'parent-training': ['parent', 'caregiver', 'family training', 'coaching'],
  'social-skills-training': ['social', 'friendship', 'peer', 'play skill'],
  'behavior-consultation': ['consultation', 'consult', 'guidance', 'advice'],
};

function findService(text) {
  // Score every service and return the strongest match, so shared generic
  // words (e.g. "training") don't let an earlier service win by accident.
  let best = null;
  let bestScore = 0;
  for (const { service, keywords } of serviceMatchers) {
    const aliases = serviceAliases[service.slug] || [];
    const kwHits = keywords.filter((w) => text.includes(w)).length;
    const aliasHits = aliases.filter((w) => text.includes(w)).length;
    const score = kwHits + aliasHits * 2; // aliases are stronger signals
    if (score > bestScore) {
      bestScore = score;
      best = service;
    }
  }
  return best;
}

function serviceAnswer(service) {
  // Use the first paragraph of the overview so answers stay short and readable.
  const firstPara = service.overview.split('\n\n')[0];
  return {
    text: `${service.title}\n\n${service.short}\n\n${firstPara}`,
    actions: [
      { kind: 'link', label: `Learn more about ${service.title}`, href: `/services/${service.slug}` },
      callAction,
    ],
  };
}

const NOT_FOUND = {
  text: "I couldn't find that information on our website. Please contact us directly and we'll be glad to help.",
  actions: [callAction, emailAction, contactLink],
};

export const greeting = {
  text: `Hi! I'm the ${site.shortName} assistant. Ask me about our services, insurance, hours, or how to reach us.`,
};

// Suggested prompts shown as tappable chips when the chat opens.
export const suggestions = [
  'What services do you provide?',
  'Do you accept my insurance?',
  'What is your phone number?',
  'Where are you located?',
  'What are your hours?',
];

// Core matcher: returns { text, actions? } for a natural-language question.
export function answer(raw) {
  const text = ` ${raw.toLowerCase().trim()} `;

  if (!text.trim()) return greeting;

  // Greetings.
  if (/(^|\s)(hi|hello|hey|hiya|good (morning|afternoon|evening))(\s|$)/.test(text)) {
    return { text: `${greeting.text}`, actions: [servicesLink, insuranceLink, contactLink] };
  }

  // Thanks.
  if (has(text, ['thank', 'thanks', 'appreciate'])) {
    return { text: "You're welcome! Is there anything else I can help you with?" };
  }

  // A specific service mentioned by name/keyword takes priority.
  const explicitService = findService(text);
  const asksAboutServices = has(text, ['service', 'services', 'offer', 'provide', 'programs', 'program', 'therapy', 'treatment', 'help with', 'what do you do']);

  if (explicitService && (asksAboutServices || has(text, ['tell me', 'about', 'include', 'what is', 'what does', 'more']))) {
    return serviceAnswer(explicitService);
  }

  // Insurance / coverage.
  if (has(text, ['insurance', 'coverage', 'covered', 'carrier', 'plan', 'aetna', 'cigna', 'optum', 'united', 'blue cross', 'bcbs', 'medicaid', 'kaiser', 'tricare', 'benefit'])) {
    return {
      text: 'We work with many major insurance carriers and help families verify their ABA benefits. Share your details on our Insurance page and our team will check your coverage for you.',
      actions: [insuranceLink, callAction],
    };
  }

  // Fax (checked before phone, since "fax number" also contains "number").
  if (has(text, ['fax'])) {
    return { text: `Our fax number is ${site.fax}.`, actions: [callAction] };
  }

  // Phone / call.
  if (has(text, ['phone', 'call', 'number', 'telephone', 'reach you', 'contact number', 'ring'])) {
    return { text: `You can reach us by phone at ${site.phone}.`, actions: [callAction] };
  }

  // Email.
  if (has(text, ['email', 'e-mail', ' mail ', 'write to'])) {
    return { text: `You can email us at ${site.email}.`, actions: [emailAction] };
  }

  // Address / location.
  if (has(text, ['address', 'location', 'located', 'office', 'where are you', 'where is', 'based', 'find you', 'directions', 'come in', 'visit'])) {
    return { text: `We're located at:\n${site.address.line1}\n${site.address.city}, ${site.address.state} ${site.address.zip}`, actions: [mapAction, callAction] };
  }

  // Hours.
  if (has(text, ['hour', 'hours', 'open', 'close', 'closing', 'timing', 'when are you', 'schedule today'])) {
    return { text: `Our hours are:\n${hoursText}`, actions: [callAction] };
  }

  // Booking / getting started / appointment.
  if (has(text, ['appointment', 'get started', 'getting started', 'sign up', 'enroll', 'book', 'schedule care', 'consultation', 'intake', 'begin', 'start therapy'])) {
    return {
      text: "Getting started is easy — reach out through our contact form or give us a call, and we'll talk through your child's needs and next steps.",
      actions: [contactLink, callAction],
    };
  }

  // Social media.
  if (has(text, ['instagram', 'facebook', 'social media', 'follow you'])) {
    return {
      text: 'You can follow us on social media:',
      actions: site.socials.map((s) => ({ kind: 'external', label: s.label, href: s.href })),
    };
  }

  // General "what services" (no specific one named).
  if (asksAboutServices) {
    const list = services.map((s) => `• ${s.title} — ${s.short}`).join('\n');
    return { text: `We provide the following ABA services:\n\n${list}`, actions: [servicesLink, callAction] };
  }

  // Who are you / about.
  if (has(text, ['who are you', 'about you', 'about the company', 'tell me about', 'what is this', 'company'])) {
    return {
      text: `${site.name}\n\n${site.tagline}`,
      actions: [{ kind: 'link', label: 'About us', href: '/about' }, servicesLink],
    };
  }

  // Fall back to the general FAQs before giving up.
  for (const f of homeFaqs) {
    const kw = f.q.toLowerCase().replace(/[?.,]/g, '').split(/\s+/).filter((w) => w.length > 3);
    const overlap = kw.filter((w) => text.includes(w)).length;
    if (overlap >= 2) return { text: f.a, actions: [contactLink] };
  }

  return NOT_FOUND;
}
