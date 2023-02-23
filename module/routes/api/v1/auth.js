
import { Router } from "express";
const router=Router();

// Controllers  
import authController from "../../../controllers/api/v1/auth/authController.js";

//  Validators
import authValidator from "./validators/authValidator.js";
// middlware

router.post('/register',authValidator.registerHandle(),authController.register);

router.post('/login',authValidator.loginHandle(),authController.login)

export default router;