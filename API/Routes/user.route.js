import express from 'express';
import { VerifyToken } from '../Utils/VerifyUser.js';
import { deleteUser, test, updateUserInfo } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/test',test);
router.post('/update/:id',VerifyToken, updateUserInfo);
router.delete('/delete/:id',VerifyToken, deleteUser);

export default router;