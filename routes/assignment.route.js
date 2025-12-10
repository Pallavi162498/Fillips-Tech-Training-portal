import express from "express"
import {createAssignment, getAllAssignment, submitAssignment, getAssignmentById, updateAssignment, deleteAssignment} from "../controllers/assignment.controller.js";
const router = express.Router()

router.post("/", createAssignment);
router.get("/", getAllAssignment);
router.get("/:id", getAssignmentById);
router.post("/:id/submit", submitAssignment);
router.put("/:id", updateAssignment);
router.delete("/:id", deleteAssignment);

export default router