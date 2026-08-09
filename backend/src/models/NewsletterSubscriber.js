import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true, maxlength: 160 },
    source: { type: String, trim: true },
    unsubscribedAt: { type: Date, default: null },
  },
  { timestamps: true, collection: 'subscribers' }
);

export const NewsletterSubscriber = mongoose.model('NewsletterSubscriber', schema);
