const Invitation = require('../models/Invitation');
const User       = require('../models/User');

// ─── List all pending invitations ────────────────────────────────────────────
const listPending = async (req, res) => {
  try {
    const invitations = await Invitation.find({ status: 'pending' }).lean();
    res.json(invitations);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// ─── Admin creates a new invitation ─────────────────────────────────────────
const createInvitation = async (req, res) => {
  const { email, role } = req.body;

  try {
    const existing = await Invitation.findOne({ email, status: 'pending' });
    if (existing) return res.status(409).json({ message: 'Already invited' });

    const invite = await Invitation.create({
      email,
      role,
      invitedBy: req.user._id
    });

    // TODO: send e‑mail notification if desired
    res.status(201).json(invite);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// ─── Admin accepts an invitation ────────────────────────────────────────────
const acceptInvitation = async (req, res) => {
  const { id } = req.params;

  try {
    const invite = await Invitation.findById(id);
    if (!invite) return res.status(404).json({ message: 'Invitation not found' });

    const user = await User.findOne({ email: invite.email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.role = invite.role;
    user.invitationAccepted = true;
    await user.save();

    invite.status = 'accepted';
    await invite.save();

    res.json({ message: 'User added to team', user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// ─── Admin declines an invitation ───────────────────────────────────────────
const declineInvitation = async (req, res) => {
  const { id } = req.params;

  try {
    await Invitation.findByIdAndUpdate(id, { status: 'declined' });
    res.json({ message: 'Invitation declined' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

module.exports = {
  listPending,
  createInvitation,
  acceptInvitation,
  declineInvitation
};
