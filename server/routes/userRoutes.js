import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUsers,

} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();
router.route('/all').get(getUsers);

router.route('/').post(registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);


export default router;
