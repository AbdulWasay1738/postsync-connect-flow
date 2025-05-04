// server/scripts/seedAdmin.js
const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
const dotenv   = require('dotenv');
const User     = require('../src/models/User');

dotenv.config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const exists = await User.findOne({ role: 'admin' });
    if (exists) {
      console.log('Admin already exists');
      return process.exit(0);
    }

    const hash = await bcrypt.hash('SuperSecret123', 10);

    await User.create({
      name: 'PostSync Admin',
      email: process.env.ADMIN_EMAIL || 'admin@gmail.com',
      password: hash,
      role: 'admin',
      invitationAccepted: true,
    });

    console.log('Admin seeded');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
