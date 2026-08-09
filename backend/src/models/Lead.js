import mongoose from 'mongoose';

const options = { discriminatorKey: 'kind', timestamps: true, collection: 'leads' };

const leadSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 160 },
    phone: { type: String, trim: true, maxlength: 40 },
    status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new', index: true },
    source: { type: String, trim: true },
    consent: { type: Boolean, default: false },
    meta: {
      ip: { type: String },
      userAgent: { type: String },
    },
  },
  options
);

leadSchema.index({ createdAt: -1 });
leadSchema.index({ email: 1 });

export const Lead = mongoose.model('Lead', leadSchema);
