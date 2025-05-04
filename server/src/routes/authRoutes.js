const { Router } = require('express');
const { body } = require('express-validator');
const { register, login } = require('../controllers/authController');

const router = Router();

router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Min 6 chars')
  ],
  register
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password required')
  ],
  login
);

module.exports = router;
