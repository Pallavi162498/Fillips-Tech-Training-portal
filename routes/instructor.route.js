import express from "express"
import {getAllInstructor, updateInstructor, getInstructorById, deleteInstructor} from "../controllers/instructor.controller.js";
const router = express.Router()

router.get("/", getAllInstructor);
router.put("/:userId", updateInstructor);
router.get("/:userId", getInstructorById);
router.delete("/:userId", deleteInstructor);

export default router;