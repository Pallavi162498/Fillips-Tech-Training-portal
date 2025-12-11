import express from "express"
import {getAllInstructor, updateInstructor, getInstructorById, deleteInstructor} from "../controllers/instructor.controller.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";
const router = express.Router()

router.get("/", authenticate, getAllInstructor);
router.put("/:userId", authenticate, updateInstructor);
router.get("/:userId", authenticate, getInstructorById);
router.delete("/:userId", authenticate, deleteInstructor);

export default router;