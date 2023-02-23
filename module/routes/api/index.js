
import { Router } from "express";
const router=Router();


// version api
import apiV1 from './v1/index.js';
router.use('/v1',apiV1);

export default router;