import express from "express"
import {addEnrollment, getAllEnrollment, completeCourse, getEnrollmentById, updateEnrollment, deleteEnrollment} from "../controllers/enrollment.controller.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";
const router = express.Router()

router.post("/", authenticate, addEnrollment);
router.get("/", authenticate, getAllEnrollment);
router.put("/completeCourse/:id", authenticate, completeCourse);
router.get("/:id", authenticate, getEnrollmentById);
router.put("/:id", authenticate, updateEnrollment);
router.delete("/:id", authenticate, deleteEnrollment);

export default router