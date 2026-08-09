import { CareRequest } from '../models/CareRequest.js';
import { makeSubmissionHandler } from './submission.factory.js';

export const submitCareRequest = makeSubmissionHandler({
  Model: CareRequest,
  kind: 'care',
  successMessage: 'Your care request has been received. Our team will reach out shortly.',
});
