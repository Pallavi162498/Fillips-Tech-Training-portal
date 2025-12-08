import express from "express"
import {getAllInstructor, updateInstructor, getInstructorById, deleteInstructor} from "../controllers/instructor.controller.js";
const router = express.Router()

router.get("/", getAllInstructor);
router.put("/:id", updateInstructor);
router.get("/:id", getInstructorById);
router.delete("/:id", deleteInstructor);

export default router;