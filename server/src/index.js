// server/src/index.js

// 1️⃣ Load .env before anything else
require('dotenv').config();

const path    = require('path');
const express = require('express');
const cors    = require('cors');

const connectDB    = require('./config/db');
const authRoutes   = require('./routes/authRoutes');
const postRoutes   = require('./routes/postRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const invitationRoutes = require('./routes/invitationRoutes');

// 2️⃣ Connect to MongoDB
connectDB();

const app = express();

// 3️⃣ Serve uploads folder at /uploads
app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'))
);

// 4️⃣ Common middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);
app.use(express.json());

// 5️⃣ API routes
app.use('/api/auth',        authRoutes);
app.use('/api/post',        postRoutes);
app.use('/api/uploadImage', uploadRoutes);

app.get('/', (_, res) =>
  res.send('Postsync API is running 👍')
);

app.use('/api/invitations', invitationRoutes);
// server/src/index.js  (or app.js)
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// server/src/index.js
const { agenda } = require('./jobs/agenda');
agenda.start();
// server/src/index.js
app.use('/api', require('./routes/postRoutes'));



const PORT = process.env.PORT || 49152;
app.listen(PORT, () =>
  console.log(`🚀 Server listening on http://localhost:${PORT}`)
);
