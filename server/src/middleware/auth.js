const jwt  = require('jsonwebtoken');
const User = require('../models/User');   // so we can load the full user doc

/**
 * protect ‑ parse Bearer token, verify JWT, attach user to req
 * Usage: router.use(protect)
 */
const protect = async (req, res, next) => {
  const header = req.headers.authorization; // "Bearer <token>"
  if (!header) return res.sendStatus(401);

  const [, token] = header.split(' ');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // fetch the user so we know their role, email, etc.
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.sendStatus(401);

    req.user = user;        // attach full user object
    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

/**
 * adminOnly ‑ allow only users with role === 'admin'
 * Usage: router.use(protect, adminOnly)
 */
const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin')
    return res.status(403).json({ message: 'Admin privileges required' });

  next();
};

module.exports = { protect, adminOnly };
