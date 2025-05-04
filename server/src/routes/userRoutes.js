const express = require('express');
const { protect, adminOnly } = require('../middleware/auth');
const {
  listUsers,
  approveUser,
  rejectUser,
} = require('../controllers/userController');

const router = express.Router();

router.use(protect, adminOnly);

router.get('/', listUsers);                 //  GET   /api/users
router.patch('/:id/approve', approveUser);  //  PATCH /api/users/:id/approve
router.patch('/:id/reject',  rejectUser);   //  PATCH /api/users/:id/reject

module.exports = router;
