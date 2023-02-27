
import { Router } from "express";
const router=Router();

// Controllers  
import userController from "../../../controllers/api/v1/userController.js";

// middlwares
import { isAuth } from "./middlewares/isAuth.js";


router.get('/users',isAuth,userController.index);

export default router;