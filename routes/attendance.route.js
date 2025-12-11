import express from "express";
import {markAttendance, getAllAttendance, getAttendanceById} from "../controllers/attendance.controller.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";
const router = express.Router()

router.post("/:userId", authenticate, markAttendance);
router.get("/", authenticate, getAllAttendance);
router.get("/:userId", authenticate, getAttendanceById)

export default router;