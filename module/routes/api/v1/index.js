
import { Router } from "express";
const router=Router();

// auth Routes
import authRoute from './auth.js';
router.use('/auth',authRoute);

// home Route
import homeRoute from './home.js';

router.use('/',homeRoute);

export default router;