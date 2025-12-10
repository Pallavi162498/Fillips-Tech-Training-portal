import express from "express"
import {addEnrollment, getAllEnrollment, getEnrollmentById, updateEnrollment, deleteEnrollment} from "../controllers/enrollment.controller.js";
const router = express.Router()

router.post("/", addEnrollment);
router.get("/", getAllEnrollment);
router.get("/:id", getEnrollmentById);
router.put("/:id", updateEnrollment);
router.delete("/:id", deleteEnrollment);

export default router