import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    enum: ['student', 'university', 'admin'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expireAfterSeconds: 0 } // MongoDB TTL index for auto-cleanup
  }
});

// Create index for faster lookups
sessionSchema.index({ email: 1 });
sessionSchema.index({ expiresAt: 1 });

const Session = mongoose.models.Session || mongoose.model('Session', sessionSchema);

export default Session;