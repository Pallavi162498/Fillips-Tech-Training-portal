import express from "express"
import {addEnrollment, getAllEnrollment, completeCourse, getEnrollmentById, updateEnrollment, deleteEnrollment} from "../controllers/enrollment.controller.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";
const router = express.Router()

router.post("/", authenticate, addEnrollment);
router.get("/", getAllEnrollment);
router.put("/completeCourse/:id", completeCourse);
router.get("/:id", getEnrollmentById);
router.put("/:id", updateEnrollment);
router.delete("/:id", deleteEnrollment);

export default router