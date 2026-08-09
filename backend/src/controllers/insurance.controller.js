import { InsuranceInquiry } from '../models/InsuranceInquiry.js';
import { makeSubmissionHandler } from './submission.factory.js';

export const submitInsurance = makeSubmissionHandler({
  Model: InsuranceInquiry,
  kind: 'insurance',
  successMessage: 'Your insurance request has been received. We\u2019ll follow up to verify your benefits.',
});
