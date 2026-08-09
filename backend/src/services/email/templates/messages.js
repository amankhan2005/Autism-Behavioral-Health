import { layout } from './base.js';

const ageLabel = { '0-2': '0–2 years', '3-5': '3–5 years', '6-9': '6–9 years', '10-13': '10–13 years', '14-17': '14–17 years' };

// Each builder returns { admin, user } = the two emails to send.
export const builders = {
  contact: (d) => ({
    admin: {
      subject: `New contact message from ${d.fullName}`,
      html: layout({
        heading: 'New contact message',
        intro: 'Someone reached out through the website contact form.',
        rows: [
          { label: 'Name', value: d.fullName },
          { label: 'Email', value: d.email },
          { label: 'Phone', value: d.phone },
          { label: 'Subject', value: d.subject },
          { label: 'Message', value: d.message },
        ],
      }),
    },
    user: {
      subject: 'We received your message',
      html: layout({
        heading: `Thank you, ${d.fullName.split(' ')[0]}`,
        intro: 'We\u2019ve received your message and a member of our team will be in touch soon. If your matter is urgent, please call us.',
        footnote: 'With care,<br>The Autism &amp; Behavioral Health team',
      }),
    },
  }),

  care: (d) => ({
    admin: {
      subject: `New Schedule Care request from ${d.fullName}`,
      html: layout({
        heading: 'New Schedule Care request',
        intro: 'A family requested to begin care.',
        rows: [
          { label: 'Parent / caregiver', value: d.fullName },
          { label: 'Email', value: d.email },
          { label: 'Phone', value: d.phone },
          { label: 'Child (first name)', value: d.childFirstName },
          { label: 'Child age range', value: ageLabel[d.childAgeRange] || d.childAgeRange },
          { label: 'Service interest', value: d.serviceInterest },
          { label: 'Preferred contact', value: d.preferredContact },
          { label: 'Preferred time', value: d.preferredTime },
          { label: 'Message', value: d.message },
        ],
      }),
    },
    user: {
      subject: 'Your care request has been received',
      html: layout({
        heading: `Thank you, ${d.fullName.split(' ')[0]}`,
        intro: 'We\u2019ve received your request to schedule care. Our team will reach out to talk through your child\u2019s needs and the next steps \u2014 with no pressure and no obligation.',
        footnote: 'Warmly,<br>The Autism &amp; Behavioral Health team',
      }),
    },
  }),

  insurance: (d) => ({
    admin: {
      subject: `New insurance verification request from ${d.fullName}`,
      html: layout({
        heading: 'New insurance verification request',
        intro: 'A family asked us to help verify their coverage.',
        rows: [
          { label: 'Name', value: d.fullName },
          { label: 'Email', value: d.email },
          { label: 'Phone', value: d.phone },
          { label: 'Insurance provider', value: d.insuranceProvider },
          { label: 'Member ID', value: d.memberId },
          { label: 'Service interest', value: d.serviceInterest },
          { label: 'Message', value: d.message },
        ],
      }),
    },
    user: {
      subject: 'We received your insurance request',
      html: layout({
        heading: `Thank you, ${d.fullName.split(' ')[0]}`,
        intro: 'We\u2019ve received your insurance verification request and will follow up to help you understand your ABA benefits and coverage.',
        footnote: 'Warmly,<br>The Autism &amp; Behavioral Health team',
      }),
    },
  }),

  newsletter: (d) => ({
    admin: {
      subject: 'New newsletter subscriber',
      html: layout({ heading: 'New subscriber', intro: 'A new email joined the newsletter list.', rows: [{ label: 'Email', value: d.email }] }),
    },
    user: {
      subject: 'You\u2019re subscribed',
      html: layout({ heading: 'Thanks for subscribing', intro: 'You\u2019ll receive occasional resources and updates from our team. You can unsubscribe at any time.' }),
    },
  }),
};
