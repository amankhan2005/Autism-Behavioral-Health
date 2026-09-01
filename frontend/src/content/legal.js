// TODO(client): have counsel review all legal copy before launch.
const updated = 'August 2026'; // TODO(client): keep current

export const legalPages = {
  privacy: {
    slug: '/privacy-policy',
    title: 'Privacy Policy',
    icon: 'ShieldCheck',
    updated,
    intro: 'Your family’s privacy matters to us. This policy explains what information we collect, how we use it, and the choices you have.',
    sections: [
      { heading: 'Information we collect', body: 'We collect information you provide directly — such as your name, contact details, and the information you share in our forms — so we can respond to your inquiry and provide care.' },
      { heading: 'How we use information', body: 'We use your information to respond to requests, provide and improve our services, communicate with you, and meet legal and regulatory obligations. We do not sell your personal information.' },
      { heading: 'How we protect information', body: 'We use reasonable administrative, technical, and physical safeguards designed to protect your information. No method of transmission or storage is completely secure.' },
      { heading: 'Sharing', body: 'We share information only with service providers who help us operate, when required by law, or with your consent. We do not sell personal information.' },
      { heading: 'Your choices', body: 'You may request access to, correction of, or deletion of your personal information, subject to applicable law. Contact us to make a request.' },
    ],
    callout: 'This is a general template and not legal advice. Have your policy reviewed by counsel before publishing.',
  },
  terms: {
    slug: '/terms',
    title: 'Terms & Conditions',
    icon: 'ScrollText',
    updated,
    intro: 'These terms govern your use of our website. By using the site, you agree to them.',
    sections: [
      { heading: 'Use of the site', body: 'You may use this website for lawful, personal, non-commercial purposes. You agree not to misuse the site or interfere with its normal operation.' },
      { heading: 'Not medical advice', body: 'Content on this site is for general informational purposes and is not a substitute for professional medical or clinical advice, diagnosis, or treatment.' },
      { heading: 'Intellectual property', body: 'All content, branding, and materials on this site are owned by or licensed to us and may not be reproduced without permission.' },
      { heading: 'Limitation of liability', body: 'The site is provided “as is.” To the fullest extent permitted by law, we are not liable for damages arising from your use of the site.' },
      { heading: 'Changes', body: 'We may update these terms from time to time. Continued use of the site means you accept the updated terms.' },
    ],
    callout: 'This is a general template and not legal advice. Have your terms reviewed by counsel before publishing.',
  },
  cookie: {
    slug: '/cookie-policy',
    title: 'Cookie Policy',
    icon: 'Cookie',
    updated,
    intro: 'This policy explains how and why we use cookies and similar technologies on our website.',
    sections: [
      { heading: 'What cookies are', body: 'Cookies are small text files stored on your device that help websites function and understand how they’re used.' },
      { heading: 'How we use cookies', body: 'We use essential cookies for the site to work, and may use analytics cookies to understand usage and improve the experience.' },
      { heading: 'Managing cookies', body: 'You can control or delete cookies through your browser settings. Disabling some cookies may affect how the site works.' },
    ],
    callout: 'This is a general template and not legal advice. Adjust to reflect the cookies you actually use.',
  },
  doNotSell: {
    slug: '/do-not-sell',
    title: 'Do Not Sell or Share My Personal Information',
    icon: 'ShieldOff',
    updated,
    intro: 'We respect your privacy rights. This page explains your choices regarding the sale or sharing of personal information.',
    sections: [
      { heading: 'We do not sell your information', body: 'Autism & Behavioral Health does not sell your personal information, and we do not share it for cross-context behavioral advertising.' },
      { heading: 'Your rights', body: 'Depending on where you live, you may have the right to opt out of the sale or sharing of personal information, and to request access or deletion.' },
      { heading: 'How to make a request', body: 'To exercise your rights, contact us using the details below. We will respond consistent with applicable law.' },
    ],
    callout: 'This is a general template and not legal advice. Confirm your obligations under applicable state privacy laws with counsel.',
  },
};
