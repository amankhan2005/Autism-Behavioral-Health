import { ContactMessage } from '../models/ContactMessage.js';
import { makeSubmissionHandler } from './submission.factory.js';

export const submitContact = makeSubmissionHandler({
  Model: ContactMessage,
  kind: 'contact',
  successMessage: 'Thank you for reaching out. We\u2019ll be in touch soon.',
});
