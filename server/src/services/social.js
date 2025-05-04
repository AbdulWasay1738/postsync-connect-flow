// server/src/services/social.js
const axios = require('axios');

/**
 * Publish an approved post to all requested platforms via Ayrshare.
 * `post` is the Mongo document we saved earlier.
 */
const publishToPlatforms = async (post) => {
  const payload = {
    post      : post.caption,
    platforms : post.platforms,         // e.g. ['instagram','facebook']
    mediaUrls : [post.imageUrl],        // Ayrshare expects array
  };

  const { data } = await axios.post(
    'https://api.ayrshare.com/api/post',
    payload,
    {
      headers: {
        Authorization: `Bearer ${process.env.AYRSHARE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    },
  );

  return data;    // the Ayrshare response
};

module.exports = { publishToPlatforms };
