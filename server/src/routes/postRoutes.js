const express = require('express');
const router = express.Router();
const axios = require('axios');

// POST /api/post
router.post('/', async (req, res) => {
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
          'Content-Type': 'application/json'
        }
      }
    );

    return res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    return res
      .status(err.response?.status || 500)
      .json({ error: err.response?.data || err.message });
  }
});

module.exports = router;
