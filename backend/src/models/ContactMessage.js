import mongoose from 'mongoose';
import { Lead } from './Lead.js';

export const ContactMessage = Lead.discriminator(
  'contact',
  new mongoose.Schema({
    subject: { type: String, trim: true, maxlength: 160 },
    message: { type: String, required: true, trim: true, maxlength: 4000 },
  })
);
