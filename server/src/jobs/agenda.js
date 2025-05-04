const Agenda   = require('agenda');
const Post     = require('../models/Post');
const { publishToPlatforms } = require('../services/social');  // wrapper around your existing create‑post code

const agenda = new Agenda({ db: { address: process.env.MONGO_URI, collection: 'jobs' } });

agenda.define('publish scheduled post', async (job) => {
  const { postId } = job.attrs.data;
  const post = await Post.findById(postId);
  if (!post || post.status !== 'approved') return;

  try {
    await publishToPlatforms(post);          // ← call your existing service
    post.status = 'posted';
    await post.save();
  } catch (err) {
    console.error(err);
    post.status = 'failed';
    await post.save();
  }
});

const schedulePostJob = async (post) => {
  await agenda.schedule(post.scheduledAt, 'publish scheduled post', { postId: post._id });
};

module.exports = { agenda, schedulePostJob };
