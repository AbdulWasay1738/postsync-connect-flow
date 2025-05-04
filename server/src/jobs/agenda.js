// server/src/jobs/agenda.js
const Agenda = require('agenda');
const mongoose = require('mongoose');

// Reuse the mongoose connection DB
const agenda = new Agenda({ mongo: mongoose.connection.db });

// 1️⃣ Define the job
agenda.define('enqueue due posts', async job => {
  const ScheduledPost = mongoose.model('ScheduledPost');  // or require your model directly
  const now = new Date();

  // find all pending posts that are due
  const due = await ScheduledPost.find({
    scheduledAt: { $lte: now },
    status: 'pending',
  });

  for (let post of due) {
    try {
      // TODO: call your posting function here, e.g. ayrshare.post(…)
      await sendToSocialNetwork(post);

      // mark it done
      post.status = 'posted';
      await post.save();
    } catch (err) {
      console.error('Failed to post', post._id, err);
      // optionally update post.status = 'error'
    }
  }
});

// 2️⃣ Export your agenda instance
module.exports = agenda;
