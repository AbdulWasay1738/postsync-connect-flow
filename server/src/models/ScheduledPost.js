// server/src/models/ScheduledPost.js
const mongoose = require('mongoose');

const ScheduledPostSchema = new mongoose.Schema({
  userId:      { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  platform:    { type: String, enum: ['instagram','facebook'], required: true },
  content:     { type: String, required: true },
  mediaUrl:    { type: String },
  scheduledAt: { type: Date,   required: true },
  status:      { type: String, enum: ['pending','posted','error'], default: 'pending' },
});

module.exports = mongoose.model('ScheduledPost', ScheduledPostSchema);
