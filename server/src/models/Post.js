const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  caption:  { type: String, required: true },
  imageUrl: { type: String, required: true },

  platforms: [String],                 // ['instagram','facebook',…]
  scheduledAt: { type: Date, required: true },

  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'posted', 'failed'],
    default: 'pending'
  },

  // book‑keeping
  createdBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
