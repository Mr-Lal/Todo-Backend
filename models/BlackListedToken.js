import mongoose from 'mongoose';

const blackListedTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  }
}, {
  timestamps: true
});

// Optional: Auto-remove expired tokens (TTL index)
blackListedTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model('BlackListedToken', blackListedTokenSchema);
