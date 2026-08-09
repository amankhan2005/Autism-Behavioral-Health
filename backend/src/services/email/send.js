import { sendEmail } from './resend.js';
import { builders } from './templates/messages.js';
import { env } from '../../config/env.js';
import { logger } from '../../config/logger.js';

/**
 * Sends the admin notification + user auto-reply for a submission.
 * Never throws — email failure must not fail a stored submission.
 */
export async function sendSubmissionEmails(kind, data) {
  try {
    const { admin, user } = builders[kind](data);
    await Promise.allSettled([
      sendEmail({ to: env.EMAIL_ADMIN, subject: admin.subject, html: admin.html, replyTo: data.email }),
      sendEmail({ to: data.email, subject: user.subject, html: user.html }),
    ]);
  } catch (err) {
    logger.error({ err, kind }, 'sendSubmissionEmails failed');
  }
}
