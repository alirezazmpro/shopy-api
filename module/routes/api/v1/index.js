
import { Router } from "express";
const router=Router();

// auth Routes
import authRoute from './auth.js';
router.use('/auth',authRoute);

// home Route
import homeRoute from './home.js';

router.use('/',homeRoute);


// Admin Route
import adminRoute from './admin.js';

router.use('/admin',adminRoute);
export default router;