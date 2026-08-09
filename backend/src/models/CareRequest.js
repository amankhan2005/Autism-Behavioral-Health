import mongoose from 'mongoose';
import { Lead } from './Lead.js';

export const CareRequest = Lead.discriminator(
  'care',
  new mongoose.Schema({
    childFirstName: { type: String, trim: true, maxlength: 80 },
    childAgeRange: { type: String, enum: ['0-2', '3-5', '6-9', '10-13', '14-17'], required: true },
    serviceInterest: { type: String, trim: true, maxlength: 120 },
    preferredContact: { type: String, enum: ['phone', 'email'], default: 'phone' },
    preferredTime: { type: String, enum: ['morning', 'afternoon', 'evening', 'anytime'], default: 'anytime' },
    message: { type: String, trim: true, maxlength: 4000 },
  })
);
