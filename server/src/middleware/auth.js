const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const header = req.headers.authorization; // "Bearer token"
  if (!header) return res.sendStatus(401);

  const [, token] = header.split(' ');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.sendStatus(401);
  }
};
