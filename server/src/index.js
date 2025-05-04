const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (_, res) =>
  res.send('Postsync API is running 👍')
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀  Server listening on http://localhost:${PORT}`)
);
