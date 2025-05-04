// server/src/index.js

// 1️⃣ Load env first
require('dotenv').config();

const path    = require('path');
const express = require('express');
const cors    = require('cors');

// 2️⃣ Import your own modules
const connectDB    = require('./config/db');
const authRoutes   = require('./routes/authRoutes');
const postRoutes   = require('./routes/postRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const invitationRoutes = require('./routes/invitationRoutes');
const userRoutes   = require('./routes/userRoutes');

// 3️⃣ Import the agenda instance
const agenda = require('./jobs/agenda');

// 4️⃣ Bootstrap everything in an async IIFE so we can await
;(async () => {
  // — Connect to Mongo
  await connectDB();

  // — Start Agenda (it uses mongoose.connection internally)
  //await agenda.start();

  // — Every minute enqueue any due posts
  //    (this should match what you did in jobs/agenda.js)
  //await agenda.every('1 minute', 'enqueue due posts');

  // 5️⃣ Create and configure Express
  const app = express();

  // — Serve uploaded files
  app.use(
    '/uploads',
    express.static(path.join(__dirname, 'uploads'))
  );

  // — CORS + JSON body parsing
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true
    })
  );
  app.use(express.json());

  // 6️⃣ Mount API routes (only once each)
  app.use('/api/auth',        authRoutes);
  app.use('/api/post',        postRoutes);
  app.use('/api/uploadImage', uploadRoutes);
  app.use('/api/invitations', invitationRoutes);
  app.use('/api/users',       userRoutes);

  app.get('/', (_, res) =>
    res.send('Postsync API is running 👍')
  );

  // 7️⃣ Launch
  const PORT = process.env.PORT || 49152;
  app.listen(PORT, () =>
    console.log(`🚀 Server listening on http://localhost:${PORT}`)
  );
})();
