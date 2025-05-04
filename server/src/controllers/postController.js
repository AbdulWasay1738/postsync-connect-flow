const Post  = require('../models/Post');
const { schedulePostJob } = require('../jobs/agenda');

//  ── Create schedule ────────────────────────────────────────────────────────
const createPost = async (req, res) => {
  try {
    const { caption, imageUrl, platforms, scheduledAt } = req.body;

    const post = await Post.create({
      caption,
      imageUrl,
      platforms,
      scheduledAt,
      createdBy: req.user._id,
      status: req.user.role === 'admin' ? 'approved' : 'pending'
    });

    // admin schedules immediately
    if (post.status === 'approved') {
      await schedulePostJob(post);
    }

    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

//  ── List for calendar (all approved/pending*non‑admin filtered) ────────────
const listCalendarPosts = async (req, res) => {
  const posts = await Post.find({ status: { $in: ['approved', 'pending'] } })
                          .select('-__v')
                          .lean();
  res.json(posts);
};

//  ── Admin approval ─────────────────────────────────────────────────────────
const approvePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).send('Not found');
  if (post.status !== 'pending')
    return res.status(409).send('Already processed');

  post.status = 'approved';
  post.approvedBy = req.user._id;
  await post.save();
  await schedulePostJob(post);

  res.json({ message: 'approved', post });
};

const rejectPost = async (req, res) => {
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    { status: 'rejected', approvedBy: req.user._id },
    { new: true }
  );
  if (!post) return res.status(404).send('Not found');
  res.json({ message: 'rejected', post });
};

module.exports = { createPost, listCalendarPosts, approvePost, rejectPost };
