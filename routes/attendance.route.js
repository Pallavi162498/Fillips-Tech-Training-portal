import express from "express";
import {markAttendance, getAllAttendance, getAttendanceById} from "../controllers/attendance.controller.js";
const router = express.Router()

router.post("/:userId", markAttendance);
router.get("/", getAllAttendance);
router.get("/:userId", getAttendanceById)

export default router;