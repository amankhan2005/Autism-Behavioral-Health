import mongoose from 'mongoose';
import { Lead } from './Lead.js';

export const InsuranceInquiry = Lead.discriminator(
  'insurance',
  new mongoose.Schema({
    insuranceProvider: { type: String, required: true, trim: true, maxlength: 120 },
    memberId: { type: String, trim: true, maxlength: 80 }, // optional by design (minimize PHI)
    serviceInterest: { type: String, trim: true, maxlength: 120 },
    message: { type: String, trim: true, maxlength: 4000 },
  })
);
