import express from "express"
import {addEnrollment, updateStudent, getAllStudent, getStudentById, deleteStudent} from "../controllers/student.controller.js"
const router = express.Router()

router.post("/enrollment", addEnrollment);
router.get("/", getAllStudent);
router.put("/:userId", updateStudent);
router.get("/:userId", getStudentById);
router.delete("/:userId", deleteStudent);

export default router;