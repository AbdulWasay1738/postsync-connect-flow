const express  = require('express');
const axios    = require('axios');

const { protect, adminOnly } = require('../middleware/auth');
const {
  createPost,
  listCalendarPosts,
  approvePost,
  rejectPost,
} = require('../controllers/postController');

const router = express.Router();   // declare once

/* ── Ayrshare proxy (unchanged) ─────────────────────────────────────────── */
router.post('/post', async (req, res) => {
  try {
    const { post, platforms, mediaUrls } = req.body;
    if (typeof post !== 'string' || !Array.isArray(platforms)) {
      return res
        .status(400)
        .json({ error: 'Required: post (string), platforms (array)' });
    }

    const payload = { post, platforms, mediaUrls };
    const response = await axios.post(
      'https://api.ayrshare.com/api/post',
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.AYRSHARE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    return res
      .status(err.response?.status || 500)
      .json({ error: err.response?.data || err.message });
  }
});

/* ── Scheduling & approval routes ───────────────────────────────────────── */
router
  .route('/')
  .get(protect, listCalendarPosts)
  .post(protect, createPost);

router.patch('/:id/approve', protect, adminOnly, approvePost);
router.patch('/:id/reject',  protect, adminOnly, rejectPost);

module.exports = router;
