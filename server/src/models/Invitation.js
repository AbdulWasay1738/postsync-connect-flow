const mongoose = require('mongoose');
const invitationSchema = new mongoose.Schema({
  email:      { type: String, required: true, unique: true },
  role:       { type: String, enum: ['editor', 'viewer'], default: 'viewer' },
  status:     { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' },
  invitedBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // admin
  user:       { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // created on signup
  token:      { type: String },                                      // if you e‑mail later
  createdAt:  { type: Date, default: Date.now }
});

module.exports = mongoose.model('Invitation', invitationSchema);