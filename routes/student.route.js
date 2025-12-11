import express from "express"
import {updateStudent, getAllStudent, getStudentById, deleteStudent} from "../controllers/student.controller.js"
import { authenticate } from "../middlewares/authenticate.middleware.js";
const router = express.Router()

router.get("/", authenticate, getAllStudent);
router.put("/:userId", authenticate, updateStudent);
router.get("/:userId", authenticate, getStudentById);
router.delete("/:userId", authenticate, deleteStudent);

export default router;