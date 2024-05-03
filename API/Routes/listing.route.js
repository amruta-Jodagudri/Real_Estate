import express from 'express';
import { VerifyToken } from '../Utils/VerifyUser.js';
import { createListing } from '../controllers/listing.controller.js';

const router = express();


router.post('/create',VerifyToken,createListing);

export default router;