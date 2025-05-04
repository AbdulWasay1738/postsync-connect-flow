const express        = require('express');
const { protect, adminOnly } = require('../middleware/auth');
const {
  listPending,
  createInvitation,
  acceptInvitation,
  declineInvitation,
} = require('../controllers/invitationController');

const router = express.Router();

router.use(protect, adminOnly);

// all routes are admin‑protected
router.use(protect, adminOnly);

router.get('/',        listPending);                //  GET   /api/invitations
router.post('/',       createInvitation);           //  POST  /api/invitations
router.patch('/:id/accept',  acceptInvitation);     //  PATCH /api/invitations/:id/accept
router.patch('/:id/decline', declineInvitation);    //  PATCH /api/invitations/:id/decline

module.exports = router;