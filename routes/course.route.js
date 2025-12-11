import express from "express"
import {addCourse, getAllCourses, getCourseById, updateCourse, deleteCourse} from "../controllers/course.controller.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";
const router = express.Router()

router.post("/", authenticate, addCourse);
router.get("/", authenticate, getAllCourses);
router.get("/:id", authenticate, getCourseById);
router.put("/:id", authenticate, updateCourse);
router.delete("/:id", authenticate, deleteCourse);


export default router;