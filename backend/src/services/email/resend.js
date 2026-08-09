import { Resend } from 'resend';
import { env, emailEnabled } from '../../config/env.js';
import { logger } from '../../config/logger.js';

const client = emailEnabled ? new Resend(env.RESEND_API_KEY) : null;

// Sends one email. No-ops (safely) when RESEND_API_KEY is not configured.
export async function sendEmail({ to, subject, html, replyTo }) {
  if (!client) {
    logger.info({ to, subject }, 'Email skipped (RESEND_API_KEY not set)');
    return { skipped: true };
  }
  const { data, error } = await client.emails.send({
    from: env.EMAIL_FROM,
    to,
    subject,
    html,
    ...(replyTo && { replyTo }),
  });
  if (error) {
    logger.error({ error, to, subject }, 'Resend send failed');
    return { error };
  }
  return { id: data?.id };
}
