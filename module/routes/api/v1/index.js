
import { Router } from "express";
const router=Router();

// auth Routes
import authRoute from './auth.js';
router.use('/auth',authRoute);



export default router;