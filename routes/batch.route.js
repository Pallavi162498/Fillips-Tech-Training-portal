import express from "express"
import {createBatch, getAllBatch, getBatchById, updatebatch, deleteBatch} from "../controllers/batch.controller.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";
const router = express.Router()

router.post("/", authenticate, createBatch);
router.get("/", authenticate, getAllBatch);
router.get("/:id", authenticate, getBatchById);
router.put("/:id", authenticate, updatebatch);
router.delete("/:id", authenticate, deleteBatch)
export default router;