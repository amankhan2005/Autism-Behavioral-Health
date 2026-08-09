import { asyncHandler } from '../utils/asyncHandler.js';
import { ok } from '../utils/ApiResponse.js';
import { sendSubmissionEmails } from '../services/email/send.js';

const meta = (req) => ({ ip: req.ip, userAgent: req.get('user-agent') });

/**
 * Builds a POST handler for a Lead-based form.
 * @param {{ Model: import('mongoose').Model, kind: string, successMessage: string }} cfg
 */
export const makeSubmissionHandler = ({ Model, kind, successMessage }) =>
  asyncHandler(async (req, res) => {
    const doc = await Model.create({
      ...req.body,
      source: req.get('referer') || req.body.source,
      meta: meta(req),
    });
    // Emails are best-effort; a stored submission is the source of truth.
    await sendSubmissionEmails(kind, req.body);
    return ok(res, 201, successMessage, { id: doc._id });
  });
