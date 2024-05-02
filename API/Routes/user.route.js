import express from 'express';
import { VerifyToken } from '../Utils/VerifyUser.js';
import { test, updateUserInfo } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/test',test);
router.post('/update/:id',VerifyToken, updateUserInfo);

export default router;