import express from "express";
import {createClass, getAllClasses, getClassById, updateClass, deleteClass} from "../controllers/class.controller.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";
const router = express.Router()

router.post("/", authenticate, createClass);
router.get("/", authenticate, getAllClasses);
router.get("/:id", authenticate, getClassById);
router.put("/:id", authenticate, updateClass);
router.delete("/:id", authenticate, deleteClass);

export default router