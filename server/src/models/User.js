const mongoose = require('mongoose');

const { Schema, model } = require('mongoose');

const userSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  /* NEW ↓ */
  role: {
    type: String,
    enum: ['admin', 'editor', 'viewer'],
    default: 'viewer'
  },
  invitationAccepted: { type: Boolean, default: false }
}, { timestamps: true });


module.exports = model('User', userSchema);
