import { asyncHandler } from '../utils/asyncHandler.js';
import { ok } from '../utils/ApiResponse.js';
import { NewsletterSubscriber } from '../models/NewsletterSubscriber.js';
import { sendSubmissionEmails } from '../services/email/send.js';

export const subscribe = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const existing = await NewsletterSubscriber.findOne({ email });
  if (existing && !existing.unsubscribedAt) {
    return ok(res, 200, 'You\u2019re already subscribed \u2014 thank you!');
  }
  await NewsletterSubscriber.findOneAndUpdate(
    { email },
    { email, unsubscribedAt: null, source: req.get('referer') },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  await sendSubmissionEmails('newsletter', { email });
  return ok(res, 201, 'You\u2019re subscribed. Thank you!');
});
