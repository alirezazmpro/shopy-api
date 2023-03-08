


import { Router } from "express";
const router=Router();

// Controllers
import courseController from "../../../controllers/api/v1/admin/courseController.js";
import adminController from "../../../controllers/api/v1/admin/adminController.js";
// Vlidators
import courseValidator from "./validators/courseValidator.js";
// middlewares
import convertFileToField from "./middlewares/convertFileToField.js";
// Helpers
import uploadImage from "../../../helpers/uploadImages.js";

// admin routes
router.get('/',adminController.index)

// Course routes

router.get('/courses',courseController.index);

router.post('/courses/create',
uploadImage.single('images'),
convertFileToField.handle,
courseValidator.handle(),
courseController.store);

//delete course
router.delete('/courses/:id',courseController.destroy)

export default router;