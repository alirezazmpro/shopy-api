
import { Router } from "express";
const router=Router();

//middleware
import { isAuth } from "./middlewares/isAuth.js";
import { isAdmin } from "./middlewares/isAdmin.js";

// auth Routes
import authRoute from './auth.js';
router.use('/auth',authRoute);

// home Route
import homeRoute from './home.js';

router.use('/',homeRoute);


// Admin Route
import adminRoute from './admin.js';

router.use('/admin',isAuth,isAdmin,adminRoute);
export default router;