const User = require('../models/User');

/**
 * GET /api/users
 *   – if ?pending=true → only users needing approval (non‑admin, not accepted)
 *   – else             → all non‑admin users (you can tighten if you like)
 */
const listUsers = async (req, res) => {
  try {
    const query = { role: { $ne: 'admin' } };

    if (req.query.pending === 'true') {
      query.invitationAccepted = false;
    }
    const users = await User.find(query).select('-password').lean();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

/** PATCH /api/users/:id/approve  – promote to editor + mark accepted */
const approveUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.invitationAccepted = true;
    user.role = req.body.role || 'editor';
    await user.save();

    res.json({ message: 'User approved', user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

/** PATCH /api/users/:id/reject – mark as rejected (or remove) */
const rejectUser = async (req, res) => {
  try {
    // simplest: just delete the account
    // await User.findByIdAndDelete(req.params.id);

    // or flag it:
    await User.findByIdAndUpdate(req.params.id, {
      invitationAccepted: false,
      role: 'viewer',
      // you can add `rejected: true` if you track it
    });

    res.json({ message: 'User rejected' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

module.exports = { listUsers, approveUser, rejectUser };
