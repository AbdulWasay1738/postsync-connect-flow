const bcrypt            = require('bcryptjs');
const jwt               = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const User        = require('../models/User');
const Invitation  = require('../models/Invitation');

// ─── Helpers ──────────────────────────────────────────────────────────────────
const genToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// ─── REGISTER ────────────────────────────────────────────────────────────────
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });

  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ msg: 'Email already exists' });

    const hash  = await bcrypt.hash(password, 12);

    // Every self‑signup starts as viewer + pending invitation
    const user = await User.create({
      name,
      email,
      password: hash,
      role: 'viewer',
      invitationAccepted: false
    });

    // Create an invitation document so the admin can approve
    await Invitation.create({
      email: user.email,
      user : user._id,          // link back to user doc
      role : 'viewer'           // default, admin can change later
    });

    return res
      .status(201)
      .json({ message: 'Signup successful – pending admin approval' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// ─── LOGIN ───────────────────────────────────────────────────────────────────
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // block users whose invitation hasn't been accepted yet
    if (!user.invitationAccepted)
      return res
        .status(403)
        .json({ message: 'Your invitation is pending admin approval' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = genToken(user._id.toString());
    res.json({
      token,
      user: {
        id   : user._id,
        name : user.name,
        email: user.email,
        role : user.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
