import express from "express"
import {addEnrollment, updateStudent, getAllStudent, getStudentById, deleteStudent} from "../controllers/student.controller.js"
const router = express.Router()

router.post("/enrollment", addEnrollment);
router.get("/", getAllStudent);
router.put("/:id", updateStudent);
router.get("/:id", getStudentById);
router.delete("/:id", deleteStudent);

export default router;